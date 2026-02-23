

## Restore Scrolly Sticky Behavior + Correct Height Math

### Problem
Two previous changes broke the scrolly section:
1. `sticky` was changed to `relative` on line 226, so the canvas no longer pins during scroll
2. The wrapper height was changed from `calc(100vh + ${track}px)` to `${track}px`, which is only correct for relative positioning

Both need to be reverted together -- they are a matched pair.

### Changes (src/components/ScrollyVideoSection.tsx only)

**Line 222** -- Restore calc height for sticky:
```
// From:
style={track ? { height: `${track}px` } : { height: "100vh" }}
// To:
style={track ? { height: `calc(100vh + ${track}px)` } : { height: "100vh" }}
```

**Line 226** -- Restore sticky positioning:
```
// From:
<div className="relative top-0 h-screen transform-gpu">
// To:
<div className="sticky top-0 h-screen transform-gpu">
```

### Why both changes must go together
- `sticky` keeps the canvas pinned at `top: 0` while the user scrolls through the wrapper
- The wrapper must be `100vh + track` tall so there is exactly `track` pixels of scroll travel while the sticky element is pinned
- With `relative`, the inner div just sits at the top and scrolls away -- no pinning, no frame scrubbing
- With `sticky` but only `track` height, the wrapper is too short and clips the animation

### Nothing else changes
- Background classes (`bg-[var(--page-bg)]`) stay as-is
- `transform-gpu` stays on the sticky container
- Canvas and full-bleed div unchanged

