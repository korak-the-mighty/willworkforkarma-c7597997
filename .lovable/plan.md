
## Changes to the ABB Case Page

### 1. More vertical space between scrolly module and gallery
- Change the gallery wrapper's top margin from `mt-16` to `mt-40 md:mt-56` (lines 255) to create significantly more breathing room after the scrolly video section.

### 2. Organic, "spread on a table" gallery layout
Replace the rigid CSS grid with a free-form layout where each gallery item has unique sizing and positioning offsets, creating the feel of items casually placed on a surface.

**Approach:**
- Define per-item style data (width, margin/padding offsets) to break the grid regularity.
- Use a flex-wrap or CSS grid with varied column spans and deliberate asymmetric margins/paddings per item -- no rotation.
- Each of the 5 items gets a unique combination of: `max-width` (varied between ~38% and ~58% of the container), `margin-top`, `margin-left`/`margin-right` nudges, creating an organic scatter.

**Specific item layout (no rotation):**

| Item | Width | Vertical offset | Horizontal nudge |
|------|-------|-----------------|------------------|
| 0 (dominant) | ~55% | 0 | left-aligned |
| 1 | ~38% | pushed down ~2rem | nudged right ~3rem |
| 2 | ~42% | pulled up ~1rem | left ~1rem |
| 3 | ~48% | pushed down ~4rem | right-aligned |
| 4 | ~36% | pulled up ~2rem | centered-left |

- Container uses `flex flex-wrap` with `items-start` so items flow naturally with their individual offsets.
- Each item keeps existing `bg-black/20 p-3 cursor-pointer` styling and lightbox click behavior.
- On mobile (below md), simplify to a single-column stacked layout with subtler spacing variations to keep it usable.

### Technical details
- **File:** `src/pages/CaseABB.tsx`
- **Line 247:** Change `mt-24 md:mt-36` -- no change needed here (scrolly spacing is fine as-is from scrolly side).
- **Line 255:** Change `mt-16` to `mt-40 md:mt-56` for more vertical space.
- **Lines 255-271:** Replace the rigid grid gallery with the organic flex layout. Add a `GALLERY_LAYOUT` array with per-item style objects. Map over `galleryItems` applying these styles inline.
- No changes to scroll logic, preload logic, lightbox, or any other section.
