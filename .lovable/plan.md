

# Visual Weight & Credibility — Implementation Plan

The site currently reads like a text blog. This plan adds visual storytelling, structured credibility signals, and stronger hierarchy while keeping the calm, monochrome editorial tone.

---

## 1. Replace Placeholder Images with Editorial Cover Visuals

Create SVG-based cover images directly in the components — abstract, textural, minimal visuals generated with CSS/SVG so they feel designed, not stock.

- **SHARE cover**: A typographic/grid composition — overlapping letterforms or a structured grid pattern in warm grays
- **MAN cover**: A material/texture feel — subtle grain, a diagonal cut, or a workshop-inspired abstract shape
- **Gallery images** (6 total, 3 per case): Simple geometric/textural compositions — gradients, grain overlays, paper textures

These will be built as React components or inline SVGs so they render cleanly without external image dependencies.

---

## 2. Data Model Updates (`src/data/cases.ts`)

Extend the `Case` interface with:

- `facts`: object with `role`, `scope`, `team`, `timeline`, `output` (all strings)
- `highlights`: array of 3 short strings (key decisions/results)
- `gallery`: array of image paths (placeholder SVGs for now)

Break existing long paragraph text in sections into shorter chunks (2-3 sentences each, stored as string but rendered with paragraph breaks).

---

## 3. Home Page (`src/pages/Index.tsx`)

**Hero section redesign:**
- Split layout: text on left, a large abstract typographic visual on the right (or a full-width visual strip above the text)
- The strong statement stays, but gets bigger presence
- Add one personality line underneath: something slightly sharp, honest, non-corporate (e.g., *"No decks about decks. No frameworks for frameworks."*)

**Case preview cards:**
- Show the new cover visuals prominently
- Stronger visual hierarchy

---

## 4. Work Page (`src/pages/Work.tsx`)

**Stronger card layout:**
- Each card gets a more defined structure: cover image takes up more visual space
- Add a subtle hover state: slight image opacity shift + text color change
- Tags become more visible
- Overall feel shifts from "blog list" to "portfolio grid"

---

## 5. Case Detail Page (`src/pages/CaseDetail.tsx`)

**Case Facts strip** (new component `CaseFacts`):
- Placed after the header/summary, before the cover image
- Horizontal strip showing: Role | Scope | Team | Timeline | Output
- Small text, uppercase labels, clean grid layout
- Subtle border top/bottom for separation

**Highlights block** (new component `CaseHighlights`):
- Placed after the summary, before the facts strip
- 3 concise bullet points — key decisions or results
- Styled as a minimal bulleted list with slightly bolder text

**Gallery block** (new component `CaseGallery`):
- Placed between Approach and Outcome sections
- 2-3 placeholder images in a simple grid (2-column or staggered)
- Abstract/textural SVG placeholders matching the editorial tone

**Section text:**
- Break long paragraphs into shorter chunks within the existing section component
- Update the case data text to include line breaks between shorter paragraphs

---

## 6. New Components

| Component | Purpose |
|-----------|---------|
| `CaseFacts` | Horizontal metadata strip (role, scope, team, timeline, output) |
| `CaseHighlights` | 3-bullet summary of key decisions/results |
| `CaseGallery` | 2-3 image grid between narrative sections |
| `PlaceholderCover` | SVG-based abstract cover visual (per-case variant) |

---

## 7. File Changes Summary

| File | Change |
|------|--------|
| `src/data/cases.ts` | Add `facts`, `highlights`, `gallery` fields; break long text into shorter paragraphs |
| `src/pages/Index.tsx` | Hero redesign with visual element + personality line |
| `src/pages/Work.tsx` | Stronger card layout with hover states |
| `src/pages/CaseDetail.tsx` | Add CaseFacts, CaseHighlights, CaseGallery blocks |
| `src/components/CaseCard.tsx` | Enhanced card with stronger visual hierarchy and hover |
| `src/components/CaseFacts.tsx` | New — horizontal metadata strip |
| `src/components/CaseHighlights.tsx` | New — 3-bullet key results |
| `src/components/CaseGallery.tsx` | New — image grid for case pages |
| `src/components/PlaceholderCover.tsx` | New — SVG-based editorial cover visuals |
| `src/index.css` | Minor additions for hover transitions |

All changes stay within the near-monochrome palette and editorial tone. No loud colors, no decorative animation, no external image dependencies.
