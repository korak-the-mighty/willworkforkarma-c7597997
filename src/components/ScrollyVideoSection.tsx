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
  const isVisible = useRef(false);
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
    setTrack(video.duration * pxPerSecond);
  }, [pxPerSecond]);

  useEffect(() => {
    if (reducedMotion || fallback || track === 0) return;

    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    const duration = video.duration;

    const onScroll = () => {
      if (!isVisible.current) return;
      rafId.current = requestAnimationFrame(() => {
        const rect = wrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const total = rect.height - viewportHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;
        const targetTime = progress * duration;
        if (Math.abs(video.currentTime - targetTime) > 0.03) {
          video.currentTime = targetTime;
        }
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(wrapper);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
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
      className="relative bg-[#1E1E1E]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <video
          ref={videoRef}
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
