

# Master Homepage Update — Implementation Plan

A comprehensive overhaul: new typography, cinematic homepage flow, editorial case layouts, full-screen overlay menu, about section with blobs, and global interaction patterns.

---

## Scope Summary

| Area | What happens |
|------|-------------|
| Typography | Clash Display replaces Switzer for all headings |
| Header | Inline nav removed, burger icon added, full-screen overlay menu |
| Hero | Attribution line added below headline |
| ABB E-mobility | New hero project section after hero, `min-h-[70vh]`, immersive |
| Case sequence | Alternating editorial layouts with image-edge alignment and viewport-centered overlapping titles |
| Statements | Clash Display, large, generous spacing, chapter-break feel |
| About | Circular portrait, creative copy placeholder, three muted-rose territory blobs |
| "See all" link | Subtle arrow-link after last case |
| Arrow hover | Global `.arrow-link` class with micro-bounce |
| Image treatment | All case images darkened by default, brighten on hover |
| New cases | ABB, BMW, DRIVELOG added to data with dummy content |
| Footer | No changes — stays minimal |

---

## File Changes

### 1. `src/index.css`
- Replace Switzer font import with Clash Display from Fontshare
- Update `h1-h6` font-family rule to `'Clash Display'`
- Add `.arrow-link` class with `::before` pseudo-element arrow, micro-bounce keyframe, and `prefers-reduced-motion` handling
- Add custom CSS variable `--rose-blob` for the muted rose blob color (HSL value like `350 30% 80%` for light, `350 20% 35%` for dark)

### 2. `tailwind.config.ts`
- Change `fontFamily.heading` from `['Switzer', 'sans-serif']` to `['Clash Display', 'sans-serif']`

### 3. `src/data/cases.ts`
- Add `subline` and `area` optional fields to `Case` interface
- Add three new case entries with dummy content:
  - **ABB E-mobility** (index 0): slug `abb-emobility`, year 2024, area "Brand & Digital", role "Creative Lead"
  - **BMW** (after MAN): slug `bmw`, year 2021, area "Campaign"
  - **DRIVELOG** (last): slug `drivelog`, year 2020, area "Product"
- Existing SHARE and MAN cases get `subline` and `area` fields added
- All cases get proper dummy content for all required fields (problem, decision, modules, outcomes, etc.)

### 4. `src/components/Layout.tsx`
- Remove inline `<nav>` with Work/About/Contact links from Header
- Add a burger icon (three-line SVG) positioned top-right
- Add `useState` for overlay menu open/close
- Import and render new `OverlayMenu` component
- Footer unchanged

### 5. `src/components/OverlayMenu.tsx` (new)
- Full-screen fixed overlay, `bg-[#01031A]`, `z-50`
- Fade-in animation (opacity 0 to 1, 300ms)
- Left side: large typographic links (Work, About, Contact) using `font-heading text-5xl md:text-7xl text-white`, each with `.arrow-link` class
- Right side: small circular portrait placeholder (`w-24 h-24 rounded-full bg-white/10`) + contact info (email, LinkedIn) in small muted text
- Close button (X) top-right
- Mobile: stacked layout (links on top, contact below)
- Links close the menu on click via `onClick` handler

### 6. `src/components/EditorialCase.tsx` (new)
- Props: `slug`, `title`, `year`, `area`, `subline`, `imageAlign: "left" | "right"`
- Wraps in a `Link` to `/work/{slug}` with `group` class
- Layout: relative container, full-width
- Image side: a `div` that is `absolute` on the left or right edge of the viewport (50% width), using `brightness-75` default, `group-hover:brightness-100` transition 300ms. No zoom, no parallax.
- Case title: `absolute` positioned, centered across the full viewport width (`left-0 right-0 text-center`), vertically centered, `z-10`. Uses `font-heading text-5xl md:text-7xl lg:text-8xl tracking-tight`. Strong editorial overlap — the title visually cuts across the image.
- Default state: only title visible
- Desktop hover: subline, area, year fade in (`opacity-0 group-hover:opacity-100 transition-opacity duration-300`)
- Mobile: stacked vertically — image full width, info below, always visible (no hover)
- Min height: `min-h-[60vh] md:min-h-[70vh]`

### 7. `src/pages/Index.tsx` (full rewrite)
Structure in exact order:

```text
1. HERO (unchanged except add attribution line)
   - "-- Henrik Lehtikangas" below H1
   - text-sm md:text-base text-white/60 mt-6 tracking-widest

2. HERO PROJECT: ABB E-mobility
   - Full-width Link, min-h-[70vh], bg-muted, relative
   - Dark overlay by default (bg-black/40)
   - group-hover: overlay lightens (bg-black/20)
   - Title bottom-left: text-4xl md:text-6xl font-heading text-white
   - Desktop hover: subline/area/year fade in
   - Mobile: info visible below

3. STATEMENT 1
   - H2, font-heading, text-2xl md:text-4xl lg:text-5xl
   - Centered, py-24 md:py-32
   - Placeholder text

4. SHARE (EditorialCase, imageAlign="right")

5. STATEMENT 2

6. MAN (EditorialCase, imageAlign="left")

7. STATEMENT 3

8. BMW (EditorialCase, imageAlign="right")

9. DRIVELOG (EditorialCase, imageAlign="left")

10. "See all of my work" arrow-link
    - Centered, py-16 md:py-24
    - Link to /work with arrow-link class

11. ABOUT section
    - Circular portrait placeholder (w-32 h-32 rounded-full bg-muted mx-auto)
    - H2 title
    - Creative copy placeholder
    - Three blobs: "Brand", "Product", "Campaign"
      - Custom muted rose: bg-[hsl(350,30%,80%)] / dark mode aware
      - rounded-full px-6 py-3 text-sm font-heading
      - Hover: translateY(-3px), scale(1.02), brightness, shadow
      - Transition: 260ms cubic-bezier(.2,.8,.2,1)
    - Blobs are not interactive (no click handlers)

12. KARMA block placeholder (one line, keep it clean)
```

### 8. `src/components/CaseHeroMedia.tsx`
- Add `brightness-75` default filter and `hover:brightness-100` transition

### 9. `src/components/CaseCard.tsx`
- Add image darkening treatment to the PlaceholderCover wrapper

---

## Technical Details

### Clash Display import
```text
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
```

### Arrow link micro-bounce
```text
@keyframes arrow-bounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(3px); }
}
.arrow-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
.arrow-link::before {
  content: '\2192';
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 260ms ease, transform 260ms ease;
}
.arrow-link:hover::before {
  opacity: 1;
  transform: translateX(0);
  animation: arrow-bounce 400ms ease 260ms 1;
}
@media (prefers-reduced-motion: reduce) {
  .arrow-link:hover::before { animation: none; }
}
```

### EditorialCase overlap positioning
```text
Container: relative, min-h-[60vh] md:min-h-[70vh], overflow-hidden
Image div: absolute, top-0 bottom-0, w-1/2
  - imageAlign="right": right-0
  - imageAlign="left": left-0
  - bg-muted brightness-75 group-hover:brightness-100 transition duration-300
Title: absolute, inset-x-0, top-1/2 -translate-y-1/2, text-center, z-10
  - font-heading text-5xl md:text-7xl lg:text-8xl
  - NOT constrained to any container — spans full viewport
Mobile: position static, image full width, title below
```

### About blob styling
```text
Inline style or Tailwind arbitrary value for muted rose:
bg-[hsl(350,25%,82%)] text-[hsl(350,30%,25%)]
dark:bg-[hsl(350,15%,30%)] dark:text-[hsl(350,20%,75%)]
Hover: transform: translateY(-3px) scale(1.02)
       filter: brightness(1.05)
       box-shadow: 0 4px 12px rgba(0,0,0,0.08)
       transition: all 260ms cubic-bezier(.2,.8,.2,1)
```

### Overlay menu fade
```text
Wrapper: fixed inset-0 z-50 bg-[#01031A]
Animation: animate-in fade-in duration-300 (from tailwindcss-animate)
Close: onClick sets state to false
Layout: flex flex-col md:flex-row, md:items-center
  Left: flex-1, large links stacked vertically
  Right: md:w-80, portrait + contact info
```

