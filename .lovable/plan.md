

# ABB E-mobility — Full Rebuild with Media, Highlight Colour & Refinements

Complete rebuild of `src/pages/CaseABB.tsx` incorporating real media assets, the #ECA9CC highlight colour, a full-viewport hero video, image lightbox, and four specific refinements from feedback.

---

## Feedback Fixes (integrated throughout)

1. **True half-bleed edge-to-center media** -- The current implementation already uses `md:w-[50vw]` with `md:ml-auto` / `md:mr-auto` inside `overflow-hidden` sections, which is correct. The rebuild will preserve this pattern and ensure no `max-width` wrapper constrains the media containers. Each half-bleed section uses the full 12-col grid at viewport width, with media divs set to `w-[50vw]` anchored to the appropriate edge.

2. **Micro labels restyled** -- Change from `text-[11px] uppercase tracking-[0.25em] text-white/30 font-light` to `text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8`. Bigger size (13px), less aggressive tracking (0.12em), headline font (Clash Display), highlight colour instead of white/30.

3. **Hero small lines -- reduce tracking** -- The hero's "ABB E-mobility" label and "Branding · UI/UX · 2024-2025" meta line will use `tracking-normal` or `tracking-[0.02em]` max. No wide-tracked SaaS-style spacing. Feels editorial.

4. **Brightness hover** -- Applied only to media elements (images/video in Context, Tension, gallery, and full-width media). Uses `brightness-[0.85] hover:brightness-100 transition-[filter] duration-300`. Not applied to hero video (which uses a fixed overlay instead). Consistent across all media.

5. **Hero video src swappable** -- Defined as a single constant at top of file for easy replacement with a local asset later.

---

## Assets to Copy

Six files copied into `src/assets/`:
- `ABB_E-mobility_3.png`
- `ABB_E-mobility_11.png`
- `ABB_E-mobility_13.png`
- `ABB-emobility-context.webp`
- `ABB-c50-launch.mp4`
- `ABB-visuals-wide-dash.avif`

---

## File Changes

### 1. `src/pages/CaseABB.tsx` -- Full Rewrite

**Constants at top of file:**
```text
const HERO_VIDEO_SRC = "https://e-mobility.abb.com/..."; // easily swappable to local asset
```

**MicroLabel component (updated):**
```text
const MicroLabel = ({ children }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);
```

**Lightbox state:**
```text
const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
```

**HERO** -- Full-viewport video:
- `h-screen w-full overflow-hidden` container
- `<video>` with `autoPlay muted loop playsInline`, `src={HERO_VIDEO_SRC}`, absolute fill, object-cover
- Dark overlay: `absolute inset-0 bg-black/35`
- Centered text stack (z-10, flex col, items-center, justify-center):
  - "ABB E-mobility" -- `text-sm tracking-[0.02em] text-white font-body`
  - "Branding · UI/UX · 2024--2025" -- `text-sm tracking-[0.02em] text-[#ECA9CC] font-body mt-2`
  - "Defining the digital brand foundation of ABB E-mobility." -- `font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6`

**CONTEXT** -- Text left, media right (half-bleed):
- Section: `py-24 md:py-32 overflow-hidden`
- MicroLabel inside `max-w-4xl mx-auto px-6 md:px-8`
- Grid: `grid-cols-12 gap-8 items-start`
- Text col: `col-span-12 md:col-span-5`, padded with `md:pl-[max(2rem,calc((100vw-56rem)/2))]`
- Body copy: `text-white` (pure white), `max-w-[72ch]`, `space-y-4 leading-relaxed`
- Media col: `col-span-12 md:col-span-6 md:col-start-7 md:mt-20`
- Media inner: `md:ml-auto md:w-[50vw] aspect-[3/2] overflow-hidden`
- Image: `ABB-emobility-context.webp`, `h-full w-full object-cover brightness-[0.85] hover:brightness-100 transition-[filter] duration-300`

**TENSION** -- Media left (half-bleed), text right:
- Same reversed layout as current
- Media inner: `md:mr-auto md:w-[50vw] aspect-[3/2] overflow-hidden`
- Video: `ABB-c50-launch.mp4`, autoPlay muted loop playsInline, `h-full w-full object-cover brightness-[0.85] hover:brightness-100 transition-[filter] duration-300`
- Text col: `col-span-12 md:col-span-4 md:col-start-8`
- Body copy: `text-white`

**DECISION** -- Text + centered statement + full-width media:
- Body copy: `text-white`
- Centered statement: unchanged styling (font-heading, text-3xl md:text-5xl, white)
- Full-width media: placeholder kept (ABB-media 4 not uploaded)

**EXECUTION** -- Text + gallery + full-width media:
- Body copy: `text-white`
- Gallery replaces current stacked placeholders:
  - Grid: `grid-cols-12 gap-4`
  - Large image (ABB_E-mobility_11.png): `col-span-12 md:col-span-7 aspect-[4/3]`
  - Two smaller images stacked: `col-span-12 md:col-span-5 space-y-4 md:mt-12`
    - ABB_E-mobility_3.png: `aspect-[3/2]`
    - ABB_E-mobility_13.png: `aspect-[3/2]`
  - All images: `cursor-pointer`, `brightness-[0.85] hover:brightness-100 transition-[filter] duration-300`
  - onClick: `setLightboxSrc(imgSrc)`
- After gallery: full-width `ABB-visuals-wide-dash.avif` (edge-to-edge using FULL_BLEED class), same brightness treatment

**OUTCOME** -- Reordered per latest prompt:
- MicroLabel
- Large centered statement FIRST: "For the first time, product, platform and brand moved as one."
- Then body copy (3 paragraphs), `text-white`
- Artifact row: `text-[#ECA9CC]` instead of `text-white/40`

**LIGHTBOX** -- Rendered at bottom of component, before closing `</div>`:
```text
{lightboxSrc && (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer"
       onClick={() => setLightboxSrc(null)}>
    <img src={lightboxSrc} className="max-w-[90vw] max-h-[90vh] object-contain" onClick={e => e.stopPropagation()} />
    <button className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity"
            onClick={() => setLightboxSrc(null)}>
      <X size={32} />
    </button>
  </div>
)}
```

### 2. No other files changed

`src/App.tsx` already routes `/work/abb-emobility` to CaseABB. No changes to Layout, data/cases, or index.css.

---

## Summary of Refinement Fixes

| Fix | Before | After |
|-----|--------|-------|
| Half-bleed media | `w-[50vw]` with `ml-auto`/`mr-auto` in overflow-hidden -- already correct | Confirmed; no max-width wrapper constrains media |
| Micro labels | 11px, tracking-[0.25em], white/30, font-light | 13px, tracking-[0.12em], #ECA9CC, font-heading, font-light |
| Hero tracking | Default/wide tracking on small lines | tracking-[0.02em] -- tight, editorial feel |
| Brightness hover | Inconsistent / not applied | brightness-[0.85] + hover:brightness-100 on all media except hero video |
| Hero video src | Inline string | Top-level constant `HERO_VIDEO_SRC` for easy swap |

