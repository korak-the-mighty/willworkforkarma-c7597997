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
  const [manifest, setManifest] = useState<{ count: number; ext: string } | null>(null);

  const loadFrame = useCallback(
    (index: number, ext: string): Promise<HTMLImageElement> => {
      const cache = frameCache.current;
      if (cache.has(index)) return Promise.resolve(cache.get(index)!);
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          cache.set(index, img);
          resolve(img);
        };
        img.onerror = reject;
        img.src = framePath(basePath, index, ext);
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
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
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
      const index = Math.round(progress * (count - 1));

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

  return (
    <div
      ref={wrapperRef}
      style={track ? { height: `calc(100vh + ${track}px)` } : { height: "100vh" }}
      data-scrolly="wrapper"
      className="relative bg-[#1E1E1E]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <canvas ref={canvasRef} data-scrolly="canvas" className="h-full w-full object-contain" />
      </div>
    </div>
  );
};

export default ScrollyVideoSection;
