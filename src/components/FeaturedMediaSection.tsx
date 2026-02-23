import { useRef, useState, useEffect, useCallback } from "react";

const DEBUG = true;
const FORCE_OVERFLOW = true;

interface FeaturedMediaSectionProps {
  src: string;
  alt: string;
  mode?: "pan-x";
  className?: string;
}

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const DESKTOP_MQ = "(min-width: 1024px)";

const getScrollParent = (el: HTMLElement): HTMLElement | Window => {
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
};

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
  const prevHeight = useRef(0);
  const prevTx = useRef(0);
  const scrollTargetRef = useRef<HTMLElement | Window | null>(null);

  // Debug refs
  const debugViewportW = useRef(0);
  const debugScrollW = useRef(0);
  const debugScrollDistance = useRef(0);
  const debugTravel = useRef(0);
  const debugScrolled = useRef(0);
  const debugProgress = useRef(0);
  const scrollEventCount = useRef(0);
  const scrollTargetType = useRef<"window" | "element">("window");
  const [debugTick, setDebugTick] = useState(0);

  const [wrapperHeight, setWrapperHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 1
  );
  const [translateX, setTranslateX] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const sw = track.scrollWidth;
    const vw = window.innerWidth;
    const dist = Math.max(0, sw - vw);
    maxOffsetRef.current = dist;

    debugViewportW.current = vw;
    debugScrollW.current = sw;
    debugScrollDistance.current = dist;

    const nextHeight = dist > 0 ? window.innerHeight + dist : window.innerHeight;
    if (nextHeight !== prevHeight.current) {
      prevHeight.current = nextHeight;
      setWrapperHeight(nextHeight);
    }
  }, []);

  const updateTransform = useCallback(() => {
    rafPending.current = false;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const maxOffset = maxOffsetRef.current;
    if (maxOffset === 0) {
      debugTravel.current = 0;
      debugScrolled.current = 0;
      debugProgress.current = 0;
      if (prevTx.current !== 0) {
        prevTx.current = 0;
        setTranslateX(0);
      }
      setDebugTick((t) => t + 1);
      return;
    }
    const rect = wrapper.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    debugTravel.current = travel;
    if (travel <= 0) {
      debugScrolled.current = 0;
      debugProgress.current = 0;
      if (prevTx.current !== 0) {
        prevTx.current = 0;
        setTranslateX(0);
      }
      setDebugTick((t) => t + 1);
      return;
    }
    const scrolled = clamp(-rect.top, 0, travel);
    const progress = clamp(scrolled / travel, 0, 1);
    debugScrolled.current = scrolled;
    debugProgress.current = progress;
    const next = Math.round(progress * maxOffset);
    if (next !== prevTx.current) {
      prevTx.current = next;
      setTranslateX(next);
    }
    setDebugTick((t) => t + 1);
  }, []);

  const onScroll = useCallback(() => {
    scrollEventCount.current += 1;
    if (rafPending.current) return;
    rafPending.current = true;
    rafId.current = requestAnimationFrame(updateTransform);
  }, [updateTransform]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    let ro: ResizeObserver | undefined;
    let active = false;

    const enable = () => {
      if (active) return;
      active = true;
      const wrapper = wrapperRef.current;
      const target = wrapper ? getScrollParent(wrapper) : window;
      scrollTargetRef.current = target;
      scrollTargetType.current = target === window ? "window" : "element";
      measure();
      target.addEventListener("scroll", onScroll as EventListener, { passive: true });
      window.addEventListener("resize", measure);
      const track = trackRef.current;
      if (track && typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(measure);
        ro.observe(track);
      }
      updateTransform();
    };

    const disable = () => {
      if (!active) return;
      active = false;
      const target = scrollTargetRef.current;
      if (target) {
        target.removeEventListener("scroll", onScroll as EventListener);
      }
      scrollTargetRef.current = null;
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafId.current);
      ro?.disconnect();
      ro = undefined;
    };

    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if ("matches" in e && e.matches) {
        disable();
      } else {
        enable();
      }
    };

    onChange(mq);

    if (mq.addEventListener) {
      mq.addEventListener("change", onChange as (e: MediaQueryListEvent) => void);
    } else if (mq.addListener) {
      mq.addListener(onChange as (e: MediaQueryListEvent) => void);
    }

    return () => {
      disable();
      if (mq.removeEventListener) {
        mq.removeEventListener("change", onChange as (e: MediaQueryListEvent) => void);
      } else if (mq.removeListener) {
        mq.removeListener(onChange as (e: MediaQueryListEvent) => void);
      }
    };
  }, [measure, onScroll, updateTransform]);

  const handleImageLoad = useCallback(() => {
    measure();
    updateTransform();
  }, [measure, updateTransform]);

  const forceMinWidth =
    FORCE_OVERFLOW && typeof window !== "undefined"
      ? { minWidth: `${Math.ceil(window.innerWidth * 1.25)}px` }
      : undefined;

  return (
    <section className={`block lg:hidden relative bg-[var(--page-bg)] ${className ?? ""}`}>
      {DEBUG && (
        <div className="block lg:hidden fixed bottom-2 left-2 z-50 text-xs leading-tight bg-black/70 text-white rounded-md px-2 py-2 font-mono">
          <div>vW: {debugViewportW.current}</div>
          <div>sW: {debugScrollW.current}</div>
          <div>sDist: {debugScrollDistance.current}</div>
          <div>wH: {Math.round(wrapperHeight)}</div>
          <div>travel: {Math.round(debugTravel.current)}</div>
          <div>scrolled: {Math.round(debugScrolled.current)}</div>
          <div>prog: {debugProgress.current.toFixed(3)}</div>
          <div>tX: {translateX}</div>
          <div>evts: {scrollEventCount.current}</div>
          <div>target: {scrollTargetType.current}</div>
          <span className="hidden">{debugTick}</span>
        </div>
      )}
      <div ref={wrapperRef} style={{ height: wrapperHeight ? `${wrapperHeight}px` : "100vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[var(--page-bg)] transform-gpu">
          <div
            ref={trackRef}
            className="h-full flex flex-nowrap w-max"
            style={{
              transform: `translateX(-${translateX}px)`,
              willChange: "transform",
            }}
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-auto object-contain shrink-0 max-w-none"
              draggable={false}
              onLoad={handleImageLoad}
              style={{ maxWidth: "none", ...(forceMinWidth || {}) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMediaSection;
