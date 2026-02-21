

# Fix Scrolly Video Seeking — Gate on `seekableReady` + `readyState`

One file changed: `src/components/ScrollyVideoSection.tsx`

---

## Problem

The RAF loop runs and progress math is correct, but `video.currentTime` stays at 0 in production. The browser rejects seeks because `readyState` is too low, and the unlock sequence in `handleMetadata` races with the scrub loop by resetting `currentTime` back to 0.

## Changes

### 1. Add `seekableReady` state + ref (after line 12)

```typescript
const [seekableReady, setSeekableReady] = useState(false);
const seekableReadyRef = useRef(false);
```

### 2. Rewrite `handleMetadata` (lines 21-45)

Remove the unlock sequence and all `currentTime` assignments. Only compute track height and register `loadeddata`/`canplay` listeners. Return a cleanup that removes those listeners (safe hygiene even with `{ once: true }`):

```typescript
const handleMetadata = useCallback(() => {
  const video = videoRef.current;
  if (!video || !video.duration || !isFinite(video.duration)) {
    setFallback(true);
    return;
  }
  console.log("[scrolly] metadata duration", video.duration);
  setTrack(video.duration * pxPerSecond);

  const onReady = () => setSeekableReady(true);
  video.addEventListener("loadeddata", onReady, { once: true });
  video.addEventListener("canplay", onReady, { once: true });

  // Cleanup hygiene (even with { once: true })
  return () => {
    video.removeEventListener("loadeddata", onReady);
    video.removeEventListener("canplay", onReady);
  };
}, [pxPerSecond]);
```

Note: Since `handleMetadata` is called as an event handler via `onLoadedMetadata`, the return value is ignored by React. To actually run cleanup, we will store the cleanup function in a ref and call it on unmount via a dedicated effect. Updated approach:

- Store a `cleanupRef = useRef<(() => void) | null>(null)` 
- In `handleMetadata`, assign `cleanupRef.current = () => { video.removeEventListener(...) }`
- Add a small effect that returns `() => cleanupRef.current?.()`

### 3. Add unlock effect when `seekableReady` becomes true (new effect, after handleMetadata)

```typescript
useEffect(() => {
  if (!seekableReady) return;
  seekableReadyRef.current = true;
  const video = videoRef.current;
  if (!video) return;

  console.log("[scrolly] seekableReady — unlocking");
  video.muted = true;
  video.playsInline = true;
  video.play().then(() => {
    video.pause();
    video.currentTime = 0;
  }).catch(() => {});
}, [seekableReady]);
```

### 4. Add listener cleanup effect (new effect)

```typescript
useEffect(() => {
  return () => { cleanupRef.current?.(); };
}, []);
```

### 5. Gate seeks in RAF tick (lines 57-62)

Add guard at top of `tick()` using the ref (avoids stale closure):

```typescript
if (!seekableReadyRef.current || video.readyState < 2) {
  rafId.current = requestAnimationFrame(tick);
  return;
}
```

No changes to RAF deps array needed since we read the ref, not the state.

---

## `currentTime` assignments — before vs. after

| Location | Before | After |
|----------|--------|-------|
| `handleMetadata` line 27 | `currentTime = 0` | Removed |
| `handleMetadata` line 38-40 | seek to `t`, then back to `0` | Removed |
| Unlock effect (new) | -- | `currentTime = 0` (single source of truth) |
| RAF `tick()` line 80 | `currentTime = targetTime` | Kept, gated on `seekableReadyRef + readyState >= 2` |

## What does NOT change

- Continuous RAF loop (mount to unmount), near-viewport gate
- Bounding-rect progress math, duration guard, 0.03s threshold, clamp to `[0, duration - 0.001]`
- Debug logs and `data-scrolly` attributes
- Reduced-motion / fallback paths
- Video JSX attributes, asset path

