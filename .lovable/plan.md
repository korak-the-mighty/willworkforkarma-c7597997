

## Fix: Hover-Induced Background Banding

Four edits to ensure hover effects only affect image/video pixels, never wrapper containers.

---

### 1. CaseCard.tsx (line 12)

Remove `brightness-75 transition-[filter] duration-300 group-hover:brightness-100` from the wrapper div. Wrapper keeps only `overflow-hidden`.

**Before:** `"overflow-hidden brightness-75 transition-[filter] duration-300 group-hover:brightness-100"`
**After:** `"overflow-hidden"`

PlaceholderCover is a placeholder -- when replaced with an actual `<img>`, brightness goes on the image element.

---

### 2. EditorialCase.tsx (lines 18, 37)

**Desktop wrapper (line 18):** Remove `bg-muted brightness-75 transition-[filter] duration-300 group-hover:brightness-100`. Replace with `border border-white/[0.06]` (consistent with background system).

**Before:** `absolute top-0 bottom-0 w-1/2 bg-muted brightness-75 transition-[filter] duration-300 group-hover:brightness-100`
**After:** `absolute top-0 bottom-0 w-1/2 border border-white/[0.06]`

**Mobile placeholder (line 37):** Remove `bg-muted brightness-75`. Replace with `border border-white/[0.06]`.

**Before:** `"w-full aspect-[16/10] bg-muted brightness-75"`
**After:** `"w-full aspect-[16/10] border border-white/[0.06]"`

---

### 3. CaseHeroMedia.tsx (lines 10, 20, 26)

Remove `group` from wrapper div. Change `group-hover:brightness-100` to `hover:brightness-100` on both `<video>` and `<img>` elements.

**Line 10 wrapper:** Remove `group` from className.
**Line 20 video:** `group-hover:brightness-100` becomes `hover:brightness-100`.
**Line 26 img:** `group-hover:brightness-100` becomes `hover:brightness-100`.

---

### 4. Index.tsx (line 69)

Remove the hover-reactive overlay. Change to a static overlay with no hover transition.

**Before:** `"absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20"`
**After:** `"absolute inset-0 bg-black/30"`

Also remove `bg-muted` from line 68 (the parent container). Replace with transparent.

**Line 68 before:** `"relative min-h-[70vh] bg-muted overflow-hidden"`
**Line 68 after:** `"relative min-h-[70vh] overflow-hidden"`

---

### Files touched

| File | Change |
|------|--------|
| `src/components/CaseCard.tsx` | Remove brightness from wrapper |
| `src/components/EditorialCase.tsx` | Remove bg-muted + brightness from wrappers |
| `src/components/CaseHeroMedia.tsx` | Switch group-hover to direct hover |
| `src/pages/Index.tsx` | Static overlay, remove bg-muted |

No new colors, no gradients, no layout changes. Hover affects only image/video pixels.

