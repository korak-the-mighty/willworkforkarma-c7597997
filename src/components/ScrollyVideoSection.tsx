import { useRef, useState, useEffect, useCallback } from "react";

interface ScrollyVideoSectionProps {
  manifestUrl: string;
  basePath: string;
  pxPerFrame?: number;
}

const framePath = (basePath: string, index: number, ext: string) =>
  `${basePath}${String(index + 1).padStart(4, "0")}.${ext}`;

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ScrollyVideoSection = ({
  manifestUrl,
  basePath,
  pxPerFrame = 9,
}: ScrollyVideoSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCache = useRef(new Map<number, HTMLImageElement>());
  const lastDrawnRef = useRef(-1);
  const rafId = useRef(0);
  const manifestRef = useRef<{ count: number; ext: string } | null>(null);

  const [track, setTrack] = useState(0);
  const [error, setError] = useState(false);
  const [frameMissing, setFrameMissing] = useState<string | null>(null);
  const [manifest, setManifest] = useState<{ count: number; ext: string } | null>(null);

  const loadFrame = useCallback(
    (index: number, ext: string): Promise<HTMLImageElement> => {
      const cache = frameCache.current;
      if (cache.has(index)) return Promise.resolve(cache.get(index)!);
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = framePath(basePath, index, ext);
        img.onload = () => {
          cache.set(index, img);
          resolve(img);
        };
        img.onerror = () => {
          if (index === 0) setFrameMissing(url);
          reject(new Error(`Frame 404: ${url}`));
        };
        img.src = url;
      });
    },
    [basePath]
  );

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = frameCache.current.get(index);
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const cw = Math.floor(window.innerWidth * dpr);
    const ch = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(canvas.width / iw, canvas.height / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (canvas.width - dw) / 2, dy = (canvas.height - dh) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, dx, dy, dw, dh);
    lastDrawnRef.current = index;
  }, []);

  // Fetch manifest
  useEffect(() => {
    fetch(manifestUrl)
      .then((r) => r.json())
      .then((data: { count: number; ext: string }) => {
        manifestRef.current = data;
        setManifest(data);
        setTrack(data.count * pxPerFrame);
      })
      .catch(() => setError(true));
  }, [manifestUrl, pxPerFrame]);

  // Preload first 10 frames + draw frame 0
  useEffect(() => {
    if (!manifest) return;
    const n = Math.min(manifest.count, 10);
    for (let i = 0; i < n; i++) {
      loadFrame(i, manifest.ext);
    }
    loadFrame(0, manifest.ext).then(() => drawFrame(0));
  }, [manifest, loadFrame, drawFrame]);

  // RAF loop
  useEffect(() => {
    if (reducedMotion || error || track === 0 || !manifest) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const { count, ext } = manifest;

    const tick = () => {
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -200 || rect.top > vh + 200) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }
      const total = rect.height - vh;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = total > 0 ? scrolled / total : 0;

      let index = Math.floor(progress * (count - 1) + 1e-6);
      index = clamp(index, 0, count - 1);

      if (index !== lastDrawnRef.current) {
        const cached = frameCache.current.get(index);
        if (cached) {
          drawFrame(index);
        } else {
          loadFrame(index, ext).then(() => drawFrame(index));
        }
      }

      // Progressive preload +/-5
      for (let d = 1; d <= 5; d++) {
        if (index + d < count && !frameCache.current.has(index + d)) loadFrame(index + d, ext);
        if (index - d >= 0 && !frameCache.current.has(index - d)) loadFrame(index - d, ext);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [track, error, manifest, loadFrame, drawFrame]);

  if (reducedMotion) {
    return (
      <div className="bg-[#1E1E1E]">
        {manifest ? (
          <img src={framePath(basePath, 0, manifest.ext)} alt="ABB E-mobility product sequence" className="w-full" />
        ) : (
          <div className="h-screen" />
        )}
      </div>
    );
  }

  if (error) return <div className="bg-[#1E1E1E] h-screen" />;

  if (frameMissing) {
    return (
      <div className="bg-[#1E1E1E] h-screen flex items-center justify-center">
        <p className="text-white/60 text-sm font-mono">Frames missing: {frameMissing}</p>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={track ? { height: `calc(100vh + ${track}px)` } : { height: "100vh" }}
      data-scrolly="wrapper"
      className="relative bg-[#1E1E1E]"
    >
      <div className="sticky top-0 h-screen">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen bg-[#1E1E1E]">
          <canvas ref={canvasRef} data-scrolly="canvas" className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
};

export default ScrollyVideoSection;
