

# Quick Refinement Pass — 6 Changes

Two files modified: `src/components/Layout.tsx` and `src/pages/CaseABB.tsx`. Two new image assets copied into the project.

---

## 1. Header: Burger + Name Always Visible

**File: `src/components/Layout.tsx`**

- Replace logo text "Willworkforkarma" with "Henrik Lehtikangas" (keep `font-heading`)
- Increase burger icon from `size={24}` to `size={40}` and enlarge the tap target with padding (`p-2`)
- Header stays `absolute` with `z-40` — always visible, no scroll-hide logic exists so no changes needed there

## 2. Execution: Double Spacing Around Manifesto Block

**File: `src/pages/CaseABB.tsx`**

- Line 211: Change `mt-10` to `mt-20` on the manifesto wrapper (doubles the gap after "...scaling them globally.")
- Line 230: Change `mt-12` to `mt-24` on "Over two years..." paragraph (doubles the gap after the last manifesto item)

## 3. Manifesto Keywords in Highlight Color

**File: `src/pages/CaseABB.tsx`**

- Lines 213, 217, 221, 225: Change `text-white` to `text-[#ECA9CC]` on the four keyword paragraphs (BUILT, ESTABLISHED, ALIGNED, SET)
- Descriptions remain white (inherited)
- Left vertical line unchanged

## 4. Gallery: 5 Tiles + No Cropping

**File: `src/pages/CaseABB.tsx`**

- Copy uploaded images into the project:
  - `user-uploads://ABB-media_11.png` to `src/assets/ABB-media_11.png`
  - `user-uploads://ABB-media_4-2.webp` to `src/assets/ABB-media_4-2.webp`
- Add two new entries to `galleryItems` array (total 5 tiles) using the new images
- Replace the `columns-2 md:columns-3` layout with a curated CSS Grid:
  - 1 dominant large tile (spanning 2 columns) + 4 supporting tiles with varied aspect ratios
  - Layout: `grid grid-cols-2 md:grid-cols-3 gap-4` with the first item spanning `md:col-span-2 md:row-span-2`
- Change all gallery images from `object-cover` to `object-contain`
- Add `bg-black/20 p-3` to each tile for subtle dark background and internal padding
- Keep lightbox click behavior intact

## 5. Media Swap: Replace Wide Dash

**File: `src/pages/CaseABB.tsx`**

- Change the import on line 12 from `ABB-visuals-wide-dash.avif` to `ABB-media_11.png` (the uploaded configurator screenshot)
- The full-bleed placement and sizing at line 260-266 stays the same

## 6. Fix Bad Line Break in Outcome

**File: `src/pages/CaseABB.tsx`**

- Line 281: Increase the container max-width from `max-w-[42rem]` to `max-w-[46rem]` to give the sentence more room
- Add `word-break: keep-all` equivalent via className `break-keep` to prevent mid-word breaks
- Use non-breaking space `\u00A0` between "its" and "ambition" to prevent orphan

---

## Technical Summary

| Change | File | Lines |
|--------|------|-------|
| Header name + burger size | Layout.tsx | 9-18 |
| Manifesto top spacing | CaseABB.tsx | 211 |
| Manifesto bottom spacing | CaseABB.tsx | 230 |
| Keywords to highlight color | CaseABB.tsx | 213, 217, 221, 225 |
| Gallery 5 tiles + object-contain | CaseABB.tsx | 31-35, 240-257 |
| Wide dash swap | CaseABB.tsx | 12, 260-266 |
| Outcome text wrap fix | CaseABB.tsx | 281-285 |
| New assets copied | src/assets/ | 2 files |

