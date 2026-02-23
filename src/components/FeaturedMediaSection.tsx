import { useRef, useState, useEffect, useCallback } from "react";

interface FeaturedMediaSectionProps {
  src: string;
  alt: string;
  mode?: "pan-x";
  className?: string;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const DESKTOP_MQ = "(min-width: 1024px)";

const FeaturedMediaSection = ({
  src,
  alt,
  mode: _mode = "pan-x",
  className,
}: FeaturedMediaSectionProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafPending = useRef(false);
  const rafId = useRef(0);
  const maxOffsetRef = useRef(0);

  const [wrapperHeight, setWrapperHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const [translateX, setTranslateX] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const sw = track.scrollWidth;
    const vw = window.innerWidth;
    const dist = Math.max(0, sw - vw);
    maxOffsetRef.current = dist;
    setWrapperHeight(dist > 0 ? window.innerHeight + dist : window.innerHeight);
  }, []);

  const updateTransform = useCallback(() => {
    rafPending.current = false;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const maxOffset = maxOffsetRef.current;
    if (maxOffset === 0) {
      setTranslateX(0);
      return;
    }
    const rect = wrapper.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    if (travel <= 0) {
      setTranslateX(0);
      return;
    }
    const scrolled = clamp(-rect.top, 0, travel);
    const progress = scrolled / travel;
    setTranslateX(Math.round(progress * maxOffset));
  }, []);

  const onScroll = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = true;
    rafId.current = requestAnimationFrame(updateTransform);
  }, [updateTransform]);

  useEffect(() => {
    if (window.matchMedia(DESKTOP_MQ).matches) return;

    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    const track = trackRef.current;
    let ro: ResizeObserver | undefined;
    if (track && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(track);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafId.current);
      ro?.disconnect();
    };
  }, [measure, onScroll]);

  const handleImageLoad = useCallback(() => {
    measure();
    // also run one transform update so position is correct
    updateTransform();
  }, [measure, updateTransform]);

  return (
    <section className={`block lg:hidden relative bg-[var(--page-bg)] ${className ?? ""}`}>
      <div ref={wrapperRef} style={{ height: `${wrapperHeight}px` }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[var(--page-bg)] transform-gpu">
          <div
            ref={trackRef}
            className="h-full flex"
            style={{
              transform: `translateX(-${translateX}px)`,
              willChange: "transform",
            }}
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-auto object-contain"
              draggable={false}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMediaSection;
