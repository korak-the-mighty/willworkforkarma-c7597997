

## Fix: Remove huge vertical gap after scrolly module

### Problem
The wrapper uses `calc(100vh + ${track}px)` for height, but since the inner container changed from `sticky` to `relative`, the viewport height is already occupied by the inner div. Adding `100vh` again creates a massive blank gap.

### Change

**File:** `src/components/ScrollyVideoSection.tsx`  
**Line 222** -- Change:

```typescript
style={track ? { height: `calc(100vh + ${track}px)` } : { height: "100vh" }}
```

To:

```typescript
style={track ? { height: `${track}px` } : { height: "100vh" }}
```

One expression change. Nothing else touched.

### Why
`track = count * pxPerFrame` already represents the total scroll distance. The inner `relative` div provides its own `h-screen` height. Adding `100vh` on top double-counts the viewport, producing the gap.

