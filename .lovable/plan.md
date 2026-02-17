

# Cinematic Case Template — Full Refactor

Transform the Case Detail page from an editorial essay into a cinematic, argument-driven case film. New data model, new components, new page flow.

---

## 1. Data Model Overhaul (`src/data/cases.ts`)

Extend the `Case` interface with new fields while keeping backward-compatible fields where useful:

```text
New/updated fields:
  client: string
  role: string (replaces facts.role)
  team: string
  timeline: string
  output: string
  problem: string          // 2-3 punchy sentences
  decision: string         // the "BAM" statement
  whyMe: string            // 1 short paragraph
  heroMedia: { type: "image" | "video"; src: string; poster?: string }
  modules: Array<{
    type: "strategy" | "execution" | "break"
    title?: string
    text?: string
    media: string[]
  }>
  outcomes: string[]
```

The old `facts`, `sections`, `pullQuote`, `highlights` fields can be removed or kept for reference — the page will render exclusively from the new structure.

### Rewritten SHARE content (decisive, short):
- **problem**: "Sixty people. Five leads. Five slide decks. Every quarter, leadership asked what the team actually did — and got five different answers. The problem wasn't communication. It was that nobody had decided what the story was."
- **decision**: "We killed five decks and wrote one page."
- **modules**: Strategy module about the listening phase + decision to reject frameworks; Execution module about the one-page format; Break module (media slot).
- **outcomes**: Specific, measurable results.
- **whyMe**: Short paragraph on why this kind of work matters.

### Rewritten MAN content (same treatment):
- **problem**: "Thirty years of craft. Zero visual identity. Architects expected polish; he wanted honesty. The brief wasn't 'build a brand' — it was 'show who I already am.'"
- **decision**: "No logo. No tagline. Just his name, presented with craft-level care."
- Similar module/outcome structure.

---

## 2. New Components

### `CaseHeroMedia`
- Full-bleed container: `w-screen` breakout via `calc` or negative margins from the `max-w-4xl` parent.
- Height: `h-[80vh]` desktop, `h-[55vh]` mobile.
- Renders `bg-muted` placeholder now; structured to accept `<img>` or `<video>` from `heroMedia` prop.
- No decorative elements.

### `CaseSpecSheet`
- Single-row responsive grid: 6 columns on desktop, 2-col on mobile.
- Fields: Client, Year, Role, Team, Timeline, Output.
- Uppercase `text-[10px]` labels, `text-sm` values.
- Replaces existing `CaseFacts` on the case detail page.

### `CaseHook`
- Two-column layout: `md:grid-cols-2`.
- Left: problem statement rendered as short paragraphs.
- Right: `bg-muted` media placeholder (`aspect-[4/3]`).
- Mobile: stacks vertically.

### `CaseBamStatement`
- Large centered serif text: `text-4xl md:text-5xl lg:text-6xl`.
- Generous vertical padding: `py-20 md:py-32`.
- Just text. Maximum whitespace.

### `CaseMediaGrid`
- 2-column grid on desktop, 1-column on mobile.
- Each cell: `bg-muted` placeholder with `aspect-[3/2]`.
- Optional caption below each cell (`text-xs text-muted-foreground`).

### `CaseOutcome`
- Bulleted list of outcomes (same style as existing `CaseHighlights`).
- Plus one closing sentence rendered below the list.

### `CaseWhyMe`
- Full-width band: breaks out of content column.
- Near-black background (`bg-foreground`), off-white text (`text-background`).
- Contains a short paragraph + a link row (Next Case / Contact).
- Generous padding: `py-16 md:py-24`.

---

## 3. Module Rendering Logic

The `modules` array drives the middle of the page. Each module renders based on its `type`:

- **"strategy"**: Title + text block + optional media grid. Text-heavy, analytical.
- **"execution"**: Title + text + larger media grid. Work-forward.
- **"break"**: Full-bleed media slot only (no text). Creates visual breathing room.

Modules alternate layout direction (text-left/media-right, then flip) for visual rhythm.

---

## 4. Updated `CaseDetail.tsx` — Render Order

```text
1. Title + Year + Tags (compact header, inside max-w-4xl)
2. CaseHeroMedia (full-bleed, 80vh)
3. CaseSpecSheet (inside max-w-4xl)
4. CaseHook (problem + media, inside max-w-4xl)
5. CaseBamStatement (decision, inside max-w-4xl)
6. Modules loop (alternating layouts, media breaks go full-bleed)
7. CaseMediaGrid (output gallery, inside max-w-4xl)
8. CaseOutcome (inside max-w-4xl)
9. CaseWhyMe (full-bleed dark band + next case link)
```

No more `CaseSection`, `CaseFacts`, `CasePullQuote`, `CaseHighlights`, or `CaseGallery` imports on this page — all replaced by the new components.

---

## 5. Full-Bleed Strategy

Full-bleed elements (HeroMedia, break modules, WhyMe) use this pattern within the `max-w-4xl` parent:

```text
className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
```

This avoids needing to restructure `Layout.tsx`.

---

## 6. Files Summary

| File | Action |
|------|--------|
| `src/data/cases.ts` | Extend interface, add new fields, rewrite SHARE + MAN content |
| `src/components/CaseHeroMedia.tsx` | New — full-bleed hero container |
| `src/components/CaseSpecSheet.tsx` | New — metadata strip (replaces CaseFacts on this page) |
| `src/components/CaseHook.tsx` | New — problem + media two-column |
| `src/components/CaseBamStatement.tsx` | New — large typographic moment |
| `src/components/CaseMediaGrid.tsx` | New — 2-up output gallery |
| `src/components/CaseOutcome.tsx` | New — outcomes list + closing line |
| `src/components/CaseWhyMe.tsx` | New — dark full-width closing band |
| `src/components/CaseModule.tsx` | New — renders strategy/execution/break modules |
| `src/pages/CaseDetail.tsx` | Rewrite to use new components and data structure |

Existing components (`CaseFacts`, `CasePullQuote`, `CaseHighlights`, `CaseGallery`, `CaseSection`) remain in the codebase for potential reuse elsewhere but are no longer imported by CaseDetail.

