import { useRef, useState, useEffect, useCallback } from "react";

interface ScrollyVideoSectionProps {
  src: string;
  pxPerSecond?: number;
}

const ScrollyVideoSection = ({ src, pxPerSecond = 900 }: ScrollyVideoSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [track, setTrack] = useState(0);
  const [fallback, setFallback] = useState(false);
  
  const rafId = useRef(0);

  // Detect prefers-reduced-motion
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const handleMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration || !isFinite(video.duration)) {
      setFallback(true);
      return;
    }
    video.currentTime = 0;
    console.log("[scrolly] metadata duration", video.duration);
    setTrack(video.duration * pxPerSecond);
  }, [pxPerSecond]);

  useEffect(() => {
    if (reducedMotion || fallback || track === 0) return;

    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    console.log("[scrolly] mounted");
    let frameCount = 0;

    const tick = () => {
      const duration = video.duration;
      if (!duration || !isFinite(duration) || duration === 0) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;

      // Skip updates when far away (but keep RAF alive)
      const near = rect.bottom > -200 && rect.top < vh + 200;
      if (!near) {
        rafId.current = requestAnimationFrame(tick);
        return;
      }

      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const targetTime = Math.min(Math.max(progress * duration, 0), duration - 0.001);

      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        video.currentTime = targetTime;
      }

      // Low-frequency debug log (~every 30 frames when near)
      frameCount++;
      if (frameCount % 30 === 0) {
        console.log("[scrolly]", { progress, targetTime, currentTime: video.currentTime });
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId.current);
    };
  }, [track, fallback, reducedMotion]);

  if (reducedMotion || fallback) {
    return (
      <div className="bg-[#1E1E1E]">
        <video src={src} controls muted playsInline preload="auto" className="w-full" />
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
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <video
          ref={videoRef}
          data-scrolly="video"
          src={src}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={handleMetadata}
          onError={() => setFallback(true)}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
};

export default ScrollyVideoSection;
