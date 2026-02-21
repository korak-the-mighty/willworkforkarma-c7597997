

# Fix: Unlock Programmatic Seeking in Production

One file changed: `src/components/ScrollyVideoSection.tsx`

## Problem

The RAF loop runs and math is correct, but `video.currentTime` stays at 0 in production. Some browsers require a play/pause cycle before allowing programmatic seeking.

## Change

Add a silent play/pause unlock sequence with a tiny seek/reset inside the existing `handleMetadata` callback (lines 23-30). After the existing logic, append the unlock block.

**Updated handleMetadata (replacing lines 23-30):**

```typescript
const handleMetadata = useCallback(() => {
  const video = videoRef.current;
  if (!video || !video.duration || !isFinite(video.duration)) {
    setFallback(true);
    return;
  }
  video.currentTime = 0;
  console.log("[scrolly] metadata duration", video.duration);
  setTrack(video.duration * pxPerSecond);

  // Unlock seeking in browsers that require activation
  video.muted = true;
  video.playsInline = true;
  const unlock = video.play();
  if (unlock !== undefined) {
    unlock.then(() => {
      video.pause();
      const t = Math.min(0.05, Math.max(0, video.duration - 0.05));
      video.currentTime = t;
      requestAnimationFrame(() => { video.currentTime = 0; });
    }).catch(() => {
      // ignore - not all browsers need this
    });
  }
}, [pxPerSecond]);
```

## What does NOT change

- RAF loop logic, scroll math, seeking threshold, targetTime clamp
- Debug logs and data-scrolly attributes
- Reduced-motion / fallback paths
- Video element JSX attributes
- Asset path

