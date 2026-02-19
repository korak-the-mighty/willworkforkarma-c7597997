

# ABB E-mobility — Bespoke Case Page

A dedicated editorial case page for ABB E-mobility, built as a standalone page component rather than using the generic CaseDetail template. The page follows a cinematic narrative scroll with two-column asymmetric layouts and half-bleed media.

---

## Approach

Create a new page component `src/pages/CaseABB.tsx` that renders the full ABB case as a bespoke editorial scroll. Update the router to serve this page at `/work/abb-emobility` instead of the generic CaseDetail.

---

## File Changes

### 1. `src/pages/CaseABB.tsx` (new)

A single-file editorial page. Dark base via inline CSS variables. No reuse of generic case components (CaseModule, CaseHook, etc.) — everything is purpose-built inline for this narrative.

**Structure:**

```text
HERO
  - H1: "ABB E-mobility" (Clash Display, text-5xl md:text-7xl)
  - H2: "Defining the digital brand foundation of ABB E-mobility." (text-xl md:text-2xl, muted, max-w-2xl)
  - Full-bleed media placeholder below (edge-to-edge, aspect-[16/9], bg-muted)
  - No overlay text on media

CONTEXT
  - Micro label: "CONTEXT" (text-[11px] uppercase tracking-[0.25em] text-white/30 font-light)
  - Two-column grid (grid-cols-12)
    - Text: col-span-5 (left), max-w ~65ch
    - Media: col-span-6 col-start-7 (right), half-bleed to right edge
      - Uses: ml-auto, w-[calc(50vw)] attached to right viewport edge
      - mt-16 or mt-20 to offset lower than text
  - Copy as specified (4 paragraphs)

TENSION
  - Micro label: "TENSION"
  - Two-column grid (grid-cols-12), reversed
    - Media: col-span-6 (left), half-bleed to left edge
      - Uses: mr-auto, w-[calc(50vw)] attached to left viewport edge
      - mt-16 offset
    - Text: col-span-5 col-start-8 (right)
  - Copy as specified (3 stanza blocks with line breaks)
  - No centered statement

DECISION
  - Micro label: "DECISION"
  - Text block (narrow measure, left-aligned): "Build a standalone modular..."
  - Centered statement: "A new system." (font-heading text-3xl md:text-5xl, py-20 md:py-28, text-center)
  - Continue text: "One that could express..."
  - Full-width media placeholder below (aspect-[16/9])

EXECUTION
  - Micro label: "EXECUTION"
  - Text block with copy as specified
  - Bullet list using "–" prefix (styled as plain text, not <ul>)
  - Closing paragraph about continuity
  - Stacked media placeholders below in varied widths:
    - First: full width
    - Second: two-column (grid-cols-2)
    - Third: half-bleed right

OUTCOME
  - Micro label: "OUTCOME"
  - Text block (3 lines)
  - Horizontal artifact row: single line of items separated by " · "
    - "Modular digital design system · Global brand website · Scalable component library · Product interface adoption"
    - text-sm text-white/40, centered, py-8
  - Final centered statement: "For the first time, product, platform and brand moved as one."
    - font-heading text-3xl md:text-5xl, py-20 md:py-28, text-center

WHY ME + NEXT CASE
  - Reuse existing CaseWhyMe component with the ABB whyMe text and next case link
```

**Half-bleed media implementation:**

```text
Right-attached media:
  Container: overflow-hidden
  Inner div: ml-auto w-[50vw] aspect-[3/2] bg-muted
  This makes the media start at viewport center and extend to right edge

Left-attached media:
  Container: overflow-hidden
  Inner div: mr-auto w-[50vw] aspect-[3/2] bg-muted
  This makes the media start at left edge and end at viewport center
```

The page wraps in `Layout` without `fullWidth` but uses a custom full-width wrapper internally to break out of the max-w container for media elements.

Actually — since the page needs full viewport control for half-bleed media, it will use `Layout fullWidth` and handle all horizontal padding internally via `px-6 md:px-8` on text containers, with a `max-w-4xl mx-auto` for the text measure (58-72ch).

**Micro label component (inline):**

```text
const MicroLabel = ({ children }) => (
  <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-light mb-8">
    {children}
  </p>
);
```

**Color scheme:**

The page sets inline CSS variables to force dark mode colors:
- `--background: 220 20% 5%` (near #01031A)
- `--foreground: 210 15% 90%`
- `--muted: 220 15% 12%`

Body text: `text-white/70` for secondary paragraphs, `text-white` for primary.

### 2. `src/App.tsx`

Add a route for `/work/abb-emobility` BEFORE the generic `/work/:slug` route so it takes priority:

```text
<Route path="/work/abb-emobility" element={<CaseABB />} />
<Route path="/work/:slug" element={<CaseDetail />} />
```

### 3. No other files modified

The generic CaseDetail, data/cases, Layout, and index.css remain untouched.

---

## Technical Details

### Two-column grid with vertical offset

```text
<div className="grid grid-cols-12 gap-8 items-start">
  <div className="col-span-12 md:col-span-5">
    {/* Text content */}
  </div>
  <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-20">
    {/* Half-bleed media */}
    <div className="md:w-[50vw] aspect-[3/2] bg-muted" />
  </div>
</div>
```

For right-attached: the media div gets no special margin — it naturally extends right because the grid column is at the right edge and the content is wider than the column.

For left-attached (reversed): media column is `col-span-6` starting at column 1, and uses `md:-ml-[calc((100vw-100%)/2)]` to extend to the left viewport edge while ending at center.

### Text measure control

All body text wraps in `max-w-[65ch]` to maintain the 58-72ch reading width.

### Spacing rhythm

- Between sections: `py-24 md:py-32`
- Micro label to content: `mb-8`
- Between paragraphs: `space-y-4`
- Centered statements: `py-20 md:py-28`

### Dark base enforcement

```text
<div style={{
  '--background': '220 20% 5%',
  '--foreground': '210 15% 90%',
  '--muted': '220 15% 12%',
} as React.CSSProperties}
className="bg-[#01031A] text-[hsl(210,15%,90%)]">
```

