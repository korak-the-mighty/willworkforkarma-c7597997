

# Image-Sequence Scrolly Scrubber — Implementation Plan

## Files to create/modify

| File | Action |
|------|--------|
| `public/videos/abb-mobilefly-frames/manifest.json` | Create |
| `src/components/ScrollyVideoSection.tsx` | Rewrite |
| `src/pages/CaseABB.tsx` | Update props (line ~248) |

---

## 1. `public/videos/abb-mobilefly-frames/manifest.json`

```json
{ "count": 165, "ext": "webp" }
```

Frame files must be named `0001.webp` through `0165.webp` (1-indexed, zero-padded to 4 digits). Extract externally:

```text
ffmpeg -i public/videos/ABB-E-mobility-mobilefly-short.mp4 \
  -vf "fps=30" \
  public/videos/abb-mobilefly-frames/%04d.webp
```

Then update `count` in manifest.json to match actual output.

---

## 2. `src/components/ScrollyVideoSection.tsx` — Full rewrite

### Props

```typescript
interface ScrollyVideoSectionProps {
  manifestUrl: string;   // "/videos/abb-mobilefly-frames/manifest.json"
  basePath: string;      // "/videos/abb-mobilefly-frames/"
  pxPerFrame?: number;   // default 9
}
```

### Frame filename helper (1-indexed)

```typescript
const framePath = (basePath: string, index: number, ext: string) =>
  `${basePath}${String(index + 1).padStart(4, "0")}.${ext}`;
// index 0 -> "0001.webp", index 164 -> "0165.webp"
```

### State and refs

- `manifest: { count: number; ext: string } | null` — fetched on mount
- `track: number` — `count * pxPerFrame`, sets wrapper height
- `error: boolean` — fallback if fetch fails
- `wrapperRef`, `canvasRef` — DOM refs
- `frameCache: useRef(new Map<number, HTMLImageElement>())` — in-memory image cache
- `lastDrawnRef: useRef(-1)` — skip redundant draws
- `rafId: useRef(0)`

### Reduced motion

```typescript
const reducedMotion = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

### Effects

1. **Fetch manifest** on mount, set `manifest` and `track`.

2. **Preload first 10 frames** when manifest loads. Each frame: create `new Image()`, set `src` to `framePath(basePath, i, ext)`, store in `frameCache` on load.

3. **RAF loop** (deps: `[track, error, reducedMotion]`):
   - Near-viewport gate (200px threshold, same as before).
   - Bounding-rect progress math (identical to current):
     ```typescript
     const total = rect.height - vh;
     const scrolled = clamp(-rect.top, 0, total);
     const progress = total > 0 ? scrolled / total : 0;
     const index = Math.round(progress * (count - 1));
     ```
   - If `index !== lastDrawnRef.current` and frame is cached, draw to canvas via `ctx.drawImage()`, update `lastDrawnRef`.
   - If frame not cached, load it on demand, draw on load.
   - Progressive preload: load frames within +/-5 of current index.

4. **Canvas resize** — on manifest load and window resize, set `canvas.width`/`canvas.height` to match container, redraw current frame.

### Render

```
wrapper div (height: 100vh + track)
  sticky div (top:0, h-screen, flex center)
    <canvas> (w-full h-full object-contain via CSS)
```

Reduced motion: render `<img src={framePath(basePath, 0, ext)}>` statically, no RAF.

Error/loading: show empty dark container until manifest loads.

---

## 3. `src/pages/CaseABB.tsx` — line ~248

```typescript
// Before
<ScrollyVideoSection src="/videos/ABB-E-mobility-mobilefly-short.mp4" />

// After
<ScrollyVideoSection
  manifestUrl="/videos/abb-mobilefly-frames/manifest.json"
  basePath="/videos/abb-mobilefly-frames/"
/>
```

---

## Key detail: 1-indexed filenames

All frame references use `String(index + 1).padStart(4, "0")` where `index` is the 0-based progress index (0 to count-1). This maps to filenames `0001.webp` through `NNNN.webp`.

## What does NOT change

- Position in page layout (after "strategic and structural continuity" paragraph)
- Sticky full-viewport behavior
- Dark background (`bg-[#1E1E1E]`)
- Scroll distance proportionality
- Normal scrolling resumes after sequence completes

