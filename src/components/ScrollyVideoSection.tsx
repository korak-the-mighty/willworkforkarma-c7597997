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

const MOBILE_BP = "(max-width: 768px)";
const MOBILE_MANIFEST = "/videos/abb-mobilefly-frames-mobile/manifest.json";
const MOBILE_BASE = "/videos/abb-mobilefly-frames-mobile/";

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

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE_BP).matches : false
  );

  const [track, setTrack] = useState(0);
  const [error, setError] = useState(false);
  const [frameMissing, setFrameMissing] = useState<string | null>(null);
  const [manifest, setManifest] = useState<{ count: number; ext: string } | null>(null);

  // Listen for viewport changes (resize / orientation)
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_BP);
    const onChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const activeManifestUrl = isMobile ? MOBILE_MANIFEST : manifestUrl;
  const activeBasePath = isMobile ? MOBILE_BASE : basePath;

  const loadFrame = useCallback(
    (index: number, ext: string): Promise<HTMLImageElement> => {
      const cache = frameCache.current;
      if (cache.has(index)) return Promise.resolve(cache.get(index)!);
      return new Promise((resolve, reject) => {
        const img = new Image();
        const url = framePath(activeBasePath, index, ext);
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
    [activeBasePath]
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

  // Fetch manifest — fall back to desktop if mobile fails
  useEffect(() => {
    frameCache.current.clear();
    lastDrawnRef.current = -1;
    setManifest(null);
    setError(false);
    setFrameMissing(null);

    fetch(activeManifestUrl)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data: { count: number; ext: string }) => {
        manifestRef.current = data;
        setManifest(data);
        setTrack(data.count * pxPerFrame);
      })
      .catch(() => {
        if (activeManifestUrl !== manifestUrl) {
          // mobile failed → try desktop
          fetch(manifestUrl)
            .then((r) => r.json())
            .then((data: { count: number; ext: string }) => {
              manifestRef.current = data;
              setManifest(data);
              setTrack(data.count * pxPerFrame);
            })
            .catch(() => setError(true));
        } else {
          setError(true);
        }
      });
  }, [activeManifestUrl, manifestUrl, pxPerFrame]);

  // Draw frame 0 immediately, then eagerly preload ALL frames
  useEffect(() => {
    if (!manifest) return;
    const { count, ext } = manifest;

    // Show frame 0 ASAP
    loadFrame(0, ext).then(() => drawFrame(0));

    // Background preload with controlled concurrency
    const CONCURRENCY = 6;
    let pointer = 0;

    const next = (): Promise<void> => {
      while (pointer < count && frameCache.current.has(pointer)) pointer++;
      if (pointer >= count) return Promise.resolve();
      const idx = pointer++;
      return loadFrame(idx, ext).catch(() => {}).then(() => next());
    };

    const workers = Array.from({ length: Math.min(CONCURRENCY, count) }, () => next());
    // Fire-and-forget — no cleanup needed
    Promise.all(workers);
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
      <div className="bg-transparent">
        {manifest ? (
          <img src={framePath(activeBasePath, 0, manifest.ext)} alt="ABB E-mobility product sequence" className="w-full" />
        ) : (
          <div className="h-screen" />
        )}
      </div>
    );
  }

  if (error) return <div className="bg-transparent h-screen" />;

  if (frameMissing) {
    return (
      <div className="bg-transparent h-screen flex items-center justify-center">
        <p className="text-white/60 text-sm font-mono">Frames missing: {frameMissing}</p>
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      style={track ? { height: `calc(100vh + ${track}px)`, backgroundColor: "transparent" } : { height: "100vh", backgroundColor: "transparent" }}
      data-scrolly="wrapper"
      className="relative bg-transparent"
    >
      <div className="sticky top-0 h-screen">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen bg-transparent" style={{ backgroundColor: "transparent" }}>
          <canvas ref={canvasRef} data-scrolly="canvas" className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
};

export default ScrollyVideoSection;
