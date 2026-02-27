

## Create CaseShare.tsx Case Study Page

Two files changed, one file created.

---

### 1. New File: `src/pages/CaseShare.tsx`

Create a new page mirroring `CaseABB.tsx` structure exactly, with Share-specific content and warm dark background `#0f0c0c`.

**Imports**: `Link` from react-router-dom, `Layout`, `CaseSectionWrapper`. No media imports yet (placeholders only).

**Helpers** (copied from CaseABB):
- `MicroLabel` -- pink `#ECA9CC` uppercase tracked label
- `FULL_BLEED` class string
- `BODY_TEXT` = `text-[1.25rem] leading-[1.65]`

**Sections in order:**

| # | Section | Pattern from CaseABB | Share Content |
|---|---------|---------------------|---------------|
| 1 | **Hero** | Full-viewport `h-screen` with centered text overlay | Dark placeholder div instead of video. Label: "Share". Tags: "Branding . Brand System . Consumer Goods" in `#ECA9CC`. Headline: "Do good. And enjoy it. Making helping something people choose again." in Clash Display `text-4xl md:text-6xl lg:text-7xl`. |
| 2 | **Context** | 12-col grid, text left (col-span-6), image right (half-bleed `md:w-[50vw]`) | Label: "Context". Copy: 3 paragraphs. Right: placeholder div with `bg-white/5 aspect-[3/2]`. |
| 3 | **Tension** | 12-col grid, image left (half-bleed), text right -- reversed from Context | Label: "Tension". Copy: 3 short lines. Left: placeholder div. |
| 4 | **BAM Statement** | Centered large Clash Display text between sections (`py-20 md:py-28 max-w-4xl`) | "If it doesn't win on shelf, it doesn't help anyone." |
| 5 | **Decision** | Text block left-aligned in `max-w-4xl`, then half-bleed right placeholder | Label: "Decision". Copy: 3 lines. Right: placeholder div. |
| 6 | **Execution** | Text block + gallery/media area below | Label: "Execution". Copy: 3 lines. Below: 3 placeholder image divs in a staggered gallery layout (same `flex flex-wrap` pattern as ABB gallery but with placeholder `bg-white/5` divs). |
| 7 | **Impact** | Wrapped in `CaseSectionWrapper tone="emphasis" fullWidth` (same as ABB Outcome) | Label: "Impact". Centered body: 2 lines. Large centered thesis in Clash Display. Pink deliverables line at bottom. |
| 8 | **Let's talk** | Centered `Link to="/contact"` | Same styling as ABB. |

No lightbox needed (no real images yet).

---

### 2. Modified File: `src/App.tsx`

- Add `import CaseShare from "./pages/CaseShare";` after the CaseABB import (line 8).
- Add route `<Route path="/work/share" element={<CaseShare />} />` on line 26, right after the ABB route and before the generic `/work/:slug` route.

---

### Technical Notes

- No new components created -- only `Layout`, `CaseSectionWrapper`, `Link` are used.
- All media slots use `<div className="bg-white/5 aspect-[3/2]" />` as placeholders, matching the dimensions ABB uses for its images/videos.
- Hero placeholder uses `bg-[#0f0c0c]` (same as page bg) with a subtle `bg-white/5` overlay.
- Footer inherits `#0f0c0c` background via the `Layout theme={{ bg: "#0f0c0c" }}` prop.

