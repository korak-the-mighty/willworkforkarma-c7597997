

# Layout-Driven Confidence — Refactoring for Visual Hierarchy and Pacing

This refactor restructures the site through layout, spacing, and typographic hierarchy rather than adding content. The goal: every element earns its space.

---

## Data Model Changes (`src/data/cases.ts`)

Add a `pullQuote` field to each case — a single short, declarative sentence that captures the key decision or insight. This powers the typographic "BAM" moments on case pages.

```text
Case interface additions:
  pullQuote: string   // e.g., "The real problem wasn't communication. It was silence."
```

Example values:
- SHARE: "Five decks. Five stories. Zero conviction."
- MAN: "He didn't need a brand. He needed to be seen."

---

## Layout Container (`src/components/Layout.tsx`)

Widen the content column from `max-w-3xl` to `max-w-4xl` to give visuals and typography more room to breathe. Case detail pages will break out of this column for full-width image slots.

---

## Home Page (`src/pages/Index.tsx`)

**Hero overhaul:**
- Remove the `HeroVisual` SVG component entirely — it competes with the statement
- Make the hero statement significantly larger (`text-5xl md:text-7xl`) and give it massive vertical breathing room (`py-24 md:py-36`)
- Present the three supporting lines (strategy, narrative, brand) as a structured list with tracking, not a paragraph — each on its own line, separated by subtle spacing
- The personality line ("No decks about decks...") stays, styled smaller and spaced away from the statement

**Selected work section:**
- Remove the "Selected work" label — it's unnecessary
- Increase spacing between case cards (`space-y-24` or more)

---

## Work Page (`src/pages/Work.tsx`)

**Gallery treatment:**
- Remove the "Work" heading — the page speaks for itself
- Dramatically increase spacing between cards (`space-y-32`) so each case breathes as its own moment
- Each card gets more vertical weight: cover image is taller (aspect ratio shift from 16:9 toward 3:2)

---

## Case Card (`src/components/CaseCard.tsx`)

- Lead with the visual: cover image gets more prominence, taller aspect ratio
- Title gets larger (`text-3xl`)
- Summary becomes a single line or two max — trim display, not data
- Tags move closer to title, year stays aligned right
- Hover: image opacity shift stays, add subtle translateY on the text block

---

## Case Detail Page (`src/pages/CaseDetail.tsx`)

This is the biggest structural change — rethinking the vertical rhythm of the entire page.

**New layout flow:**

```text
1. Title + Year + Tags (compact header)
2. Summary (one or two lines, muted)
3. Full-width cover image slot (breaks out of content column)
4. Case Facts strip
5. --- breathing space ---
6. SITUATION section
7. --- full-width image slot (placeholder for real images) ---
8. APPROACH section
9. Pull Quote — large typographic "BAM" moment
10. --- gallery grid (2-3 images) ---
11. OUTCOME section
12. Highlights (moved to end, as proof/results)
```

Key changes:
- Cover image and gallery images break out of the `max-w-4xl` column to full viewport width using negative margins
- Pull quote rendered at `text-3xl md:text-5xl` in serif, centered, with generous vertical padding — this is the "BAM" moment
- Highlights move from top to bottom (after Outcome) — they're the proof, not the preview
- Each narrative section gets more internal spacing and shorter text blocks

---

## Case Section (`src/components/CaseSection.tsx`)

- Section heading becomes larger (`text-2xl md:text-3xl`) with more top padding
- Text rendered as individual paragraphs (split on `\n\n`) with spacing between them, not as one block with `whitespace-pre-line`
- Each paragraph is a short, declarative block — the data already has line breaks, just style them with more vertical rhythm
- Optional image slot after text, full-width

---

## New Component: `CasePullQuote`

A simple component that renders a single statement at large typographic scale:
- Serif font, `text-3xl md:text-5xl`, centered
- Generous vertical padding (`py-16 md:py-24`)
- Subtle top/bottom border or just whitespace for separation
- Near-black text, nothing decorative

---

## Image Slots (`PlaceholderCover` + `CaseGallery`)

- Replace SVG-generated graphics with simple neutral placeholder containers (`bg-muted` with no SVG content) — the instruction says "assume real images will be provided" and "do not generate graphics"
- Cover image slot: full-width, aspect-ratio `2:1` or `21:9` for cinematic feel
- Gallery slots: maintain 2+1 grid but with neutral `bg-muted` backgrounds only
- Add a between-sections full-width image slot (new) for rhythm between Situation and Approach

---

## `HeroVisual` Component

Delete this component. It's no longer used after the hero redesign.

---

## Summary of File Changes

| File | Change |
|------|--------|
| `src/data/cases.ts` | Add `pullQuote` field to interface and both cases |
| `src/components/Layout.tsx` | Widen content column to `max-w-4xl` |
| `src/pages/Index.tsx` | Larger hero, structured supporting lines, remove HeroVisual, more card spacing |
| `src/pages/Work.tsx` | Remove heading, increase card spacing, gallery feel |
| `src/pages/CaseDetail.tsx` | Reorder blocks, add pull quote, full-width image slots, move highlights to end |
| `src/components/CaseSection.tsx` | Larger headings, split paragraphs, more vertical rhythm |
| `src/components/CaseCard.tsx` | Larger title, taller cover, refined hover |
| `src/components/CasePullQuote.tsx` | New — large typographic statement component |
| `src/components/PlaceholderCover.tsx` | Replace SVGs with neutral `bg-muted` containers |
| `src/components/CaseGallery.tsx` | Replace SVGs with neutral placeholders |
| `src/components/HeroVisual.tsx` | Delete |
