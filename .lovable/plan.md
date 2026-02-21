
# Fix Scrolly Video — Continuous RAF Loop + Micro-Fixes

One file changed: `src/components/ScrollyVideoSection.tsx`

---

## Changes (lines 31-67)

Replace the scroll-event-based effect with a continuous RAF loop, plus the two micro-fixes:

### 1. Continuous RAF loop (no scroll listener)

Remove `window.addEventListener("scroll", ...)`. Instead, when `IntersectionObserver` sets `isVisible = true`, kick off a self-scheduling `requestAnimationFrame` tick that polls `getBoundingClientRect()` every frame. When visibility is lost, the loop stops.

### 2. Micro-fix: guard duration each tick

Do not store `const duration = video.duration` outside the loop. Instead, read it inside `tick()` and bail early if it's `NaN`, `0`, or non-finite.

### 3. Micro-fix: clamp targetTime

Before setting `video.currentTime`, clamp `targetTime` to `[0, duration - 0.001]` to avoid seeking past the last frame.

### 4. Temporary debug logs

Add three `console.log` statements for production verification (to be removed afterward).

---

## Resulting effect code (lines 31-67)

```typescript
useEffect(() => {
  if (reducedMotion || fallback || track === 0) return;

  const wrapper = wrapperRef.current;
  const video = videoRef.current;
  if (!wrapper || !video) return;

  console.log("[scrolly] mounted");

  const tick = () => {
    const duration = video.duration;
    if (!duration || !isFinite(duration) || duration === 0) {
      if (isVisible.current) rafId.current = requestAnimationFrame(tick);
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const total = rect.height - viewportHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    const progress = total > 0 ? scrolled / total : 0;
    const targetTime = Math.min(Math.max(progress * duration, 0), duration - 0.001);

    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }

    if (isVisible.current) {
      rafId.current = requestAnimationFrame(tick);
    }
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      const wasVisible = isVisible.current;
      isVisible.current = entry.isIntersecting;
      console.log("[scrolly] active", entry.isIntersecting);
      if (entry.isIntersecting && !wasVisible) {
        rafId.current = requestAnimationFrame(tick);
      }
    },
    { threshold: 0 }
  );
  observer.observe(wrapper);

  return () => {
    observer.disconnect();
    cancelAnimationFrame(rafId.current);
  };
}, [track, fallback, reducedMotion]);
```

Also add to `handleMetadata` (line 27):

```typescript
console.log("[scrolly] metadata duration", video.duration);
```

---

## What changes vs. what stays

| Before | After |
|--------|-------|
| `window.addEventListener("scroll", ...)` | No scroll listener |
| RAF fires once per scroll event | RAF loops continuously while in view |
| `duration` captured once outside loop | `duration` read each tick, guarded for NaN/0 |
| `targetTime` unclamped | Clamped to `[0, duration - 0.001]` |
| No debug logs | 3 temporary `console.log` statements |

Everything else unchanged: refs, asset path, bounding-rect math, 0.03s threshold, reduced-motion fallback, markup, styling.
