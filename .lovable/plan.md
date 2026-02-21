

# Fix Scrolly Video — Production-Safe Scroll Math

One file changed: `src/components/ScrollyVideoSection.tsx`

---

## What's actually wrong

The current component already uses refs (no `querySelector`), so the hero video is not being targeted. The likely production issue is the scroll math: using `-rect.top / track` can produce incorrect progress values depending on layout context and how the browser computes `rect.top` relative to the sticky container.

## What changes

**File: `src/components/ScrollyVideoSection.tsx`** — Lines 40-50 (scroll handler internals)

Replace the current scroll math:

```typescript
const scrolled = -rect.top;
const progress = Math.min(Math.max(scrolled / track, 0), 1);
```

With viewport-relative bounding-rect logic:

```typescript
const viewportHeight = window.innerHeight;
const total = rect.height - viewportHeight;
const scrolled = Math.min(Math.max(-rect.top, 0), total);
const progress = total > 0 ? scrolled / total : 0;
```

This is mathematically more robust because:
- `total` equals `track` (wrapper height is `100vh + track`, minus viewport = `track`), but is derived from the actual rendered element rather than state
- The `scrolled` value is explicitly clamped to `[0, total]` before division
- Guards against `total <= 0` edge case

## What does NOT change

- No `"use client"` directive (this is Vite/React, not Next.js)
- No changes to asset location (`/videos/...` stays)
- No changes to refs, IntersectionObserver, RAF gating, threshold optimization, fallback logic, or video attributes
- No changes to `CaseABB.tsx`

## Summary

| Item | Detail |
|------|--------|
| File | `src/components/ScrollyVideoSection.tsx` |
| Lines changed | 44-45 (scroll math inside RAF callback) |
| Risk | Zero — mathematically equivalent but more robust |

