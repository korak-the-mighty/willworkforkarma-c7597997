
# Fix Scrolly Flapping — Remove IntersectionObserver, Use Continuous RAF

One file changed: `src/components/ScrollyVideoSection.tsx`

---

## Problem

The `IntersectionObserver` is flapping `active true/false` rapidly on the published site, which kills the RAF loop before it can update `video.currentTime`. The video stays frozen.

## Solution

Remove `IntersectionObserver` entirely. Start a single continuous RAF loop on effect mount that never stops until unmount. Inside `tick()`, use a lightweight "near viewport" check to skip `currentTime` updates when the wrapper is far away, but keep the loop alive regardless.

---

## Changes

### 1. Remove `isVisible` ref (line 13)

No longer needed -- the RAF loop runs unconditionally.

### 2. Replace effect body (lines 32-81)

```typescript
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
```

### 3. Add debug data attributes (lines 93, 98)

- Wrapper div: add `data-scrolly="wrapper"`
- Video element: add `data-scrolly="video"`

---

## What changes vs. what stays

| Before | After |
|--------|-------|
| IntersectionObserver gates RAF start/stop | No IntersectionObserver |
| RAF stops when not intersecting | RAF runs continuously from mount to unmount |
| Flapping kills the loop | "Near viewport" gate skips updates but keeps loop alive |
| No debug attributes | `data-scrolly` on wrapper and video |
| No frame-rate debug log | Log progress/targetTime/currentTime every ~30 frames |

Everything else unchanged: refs, asset path, bounding-rect math, duration guard, 0.03s threshold, clamp to `[0, duration-0.001]`, reduced-motion fallback, markup, styling.
