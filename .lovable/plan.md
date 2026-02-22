

## Refactor: Case Page Background System

Centralize all background logic into a single structural controller. Remove scattered background classes from child components. Editorial restraint only.

---

### 1. Create `CaseSectionWrapper` component

**File:** `src/components/CaseSectionWrapper.tsx` (new)

A thin structural wrapper that owns background tone logic.

**Props:**
- `tone`: `"default" | "subtle" | "emphasis"` (default: `"default"`)
- `fullWidth`: boolean (default: `false`)
- `className`: optional additional classes
- `children`: React nodes

**Tone mapping:**
- `default` -- transparent (inherits base)
- `subtle` -- `bg-white/[0.03]` (slight structural lift)
- `emphasis` -- `bg-white/[0.06]` (thesis/outcome blocks)

**Layout behavior:**
- `fullWidth={false}`: uses full-bleed pattern (`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen`) to break out of constrained container
- `fullWidth={true}`: uses `w-full` (already in a full-width layout like CaseABB)

Background applied to outer `<section>`. Children render inside untouched.

---

### 2. Remove backgrounds from child components

**CaseHook.tsx** (line 15)
- Remove `bg-muted` from the placeholder `<div>`. Change to transparent with a subtle border: `border border-white/[0.06]`.

**CaseModule.tsx** (lines 15, 35)
- Remove `bg-muted` from the break-type placeholder (line 15) and the fallback media placeholder (line 35). Replace with `border border-white/[0.06]`.

**CaseMediaGrid.tsx** (line 15)
- Remove `bg-muted` from grid cells. Replace with `border border-white/[0.06]` for empty placeholders only (when no `cell.src`). When image is present, no background needed.

**CaseWhyMe.tsx** (lines 8, 11)
- Remove the `FULL_BLEED` constant and `bg-foreground text-background` from the outer div.
- Simplify to a plain `<div>` with just padding (`py-16 md:py-24`).
- Background and full-bleed responsibility moves entirely to the parent `CaseSectionWrapper`.

---

### 3. Update `CaseDetail.tsx`

Import `CaseSectionWrapper` and wrap section groups with appropriate tones:

- **Header / Hero / Spec Sheet** -- `tone="default"` (or unwrapped, since default is transparent)
- **Hook** -- wrapped in `CaseSectionWrapper tone="subtle"`
- **BAM Statement** -- `tone="default"` (unwrapped)
- **Modules** -- `tone="default"` (unwrapped)
- **Gallery** -- `tone="default"` (unwrapped)
- **Outcomes** -- wrapped in `CaseSectionWrapper tone="subtle"`
- **Why Me** -- wrapped in `CaseSectionWrapper tone="emphasis"`

---

### 4. Update `CaseABB.tsx`

- Remove `bg-[#101010]` from the inner `<div>` (line 57). Base background is already controlled via `Layout theme={{ bg: "#101010" }}`.
- The `className` becomes just `text-white` (keeping CSS custom properties for compatibility).
- Wrap the Outcome section (`<section>` at line 303) in `CaseSectionWrapper tone="emphasis" fullWidth`.
- Context and Tension sections remain unwrapped (default tone).
- All other sections remain unchanged -- no structural or functional modifications.

---

### Files touched

| File | Action |
|------|--------|
| `src/components/CaseSectionWrapper.tsx` | Create new |
| `src/components/CaseHook.tsx` | Remove `bg-muted` |
| `src/components/CaseModule.tsx` | Remove `bg-muted` (2 places) |
| `src/components/CaseMediaGrid.tsx` | Remove `bg-muted` |
| `src/components/CaseWhyMe.tsx` | Remove full-bleed + inverted bg |
| `src/pages/CaseDetail.tsx` | Wrap sections with `CaseSectionWrapper` |
| `src/pages/CaseABB.tsx` | Remove hardcoded bg, wrap Outcome section |

### Guardrails

- No new colors introduced
- No gradients
- No motion changes
- Vertical editorial rhythm preserved
- Full-bleed background continuity maintained
