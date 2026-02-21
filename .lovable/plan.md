

# Scrolly Video Module — Final Plan

One new component, one asset placement, one page edit.

---

## Asset Location

Copy `user-uploads://ABB-E-mobility-mobilefly-short.mp4` to `public/videos/ABB-E-mobility-mobilefly-short.mp4`.

Reference as a plain string path `"/videos/ABB-E-mobility-mobilefly-short.mp4"` — no ES module import needed.

---

## New Component: `src/components/ScrollyVideoSection.tsx`

**Props:**
```typescript
interface ScrollyVideoSectionProps {
  src: string;
  pxPerSecond?: number; // default 900
}
```

**Layout:**
```text
<div>  <!-- outer wrapper, height = 100vh + track -->
  <div>  <!-- sticky container, top:0, h-screen -->
    <video />  <!-- fills viewport, object-contain -->
  </div>
</div>
```

**Core logic:**

- On `loadedmetadata`: read `video.duration`, compute `track = duration * pxPerSecond`, set `currentTime = 0`
- Wrapper height: `calc(100vh + ${track}px)`
- Scroll handler via `requestAnimationFrame`, gated by `IntersectionObserver` (only runs while wrapper is in viewport)
- Compute: `progress = clamp((scrollY - wrapperOffsetTop) / track, 0, 1)`, then `targetTime = progress * duration`
- **Threshold optimization**: only update `video.currentTime` if `Math.abs(video.currentTime - targetTime) > 0.03`
- Video attributes: `muted`, `playsInline`, `preload="auto"`, no autoplay

**Accessibility / Fallback:**

- `prefers-reduced-motion`: render standard `<video controls>` instead of scroll-scrub
- If metadata fails to load: fall back to `<video controls>`

**Styling:** `bg-[#1E1E1E]`, video uses `object-contain`

---

## Page Edit: `src/pages/CaseABB.tsx`

**Import:** `import ScrollyVideoSection from "@/components/ScrollyVideoSection";` (no video asset import)

**Insertion:** After the "continuity." paragraph (around line 241), before the Gallery section:

```tsx
{/* Scrolly Video Highlight */}
<div className="mt-24 md:mt-36">
  <ScrollyVideoSection src="/videos/ABB-E-mobility-mobilefly-short.mp4" />
</div>
```

---

## Summary

| Item | Detail |
|------|--------|
| New file | `src/components/ScrollyVideoSection.tsx` |
| Asset | `public/videos/ABB-E-mobility-mobilefly-short.mp4` (static, no import) |
| Page edit | `src/pages/CaseABB.tsx` — import + insert after line 241 |
| Scroll math | `track = duration * 900`, RAF-gated by IntersectionObserver |
| Threshold | Skip `currentTime` update if delta less than 0.03s |
| Mobile | `muted + playsInline + preload="auto"` |
| Reduced motion | Standard `<video controls>` fallback |

