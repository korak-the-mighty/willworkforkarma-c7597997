

# Execution Block — Editorial Manifesto Redesign

Single file edit: `src/pages/CaseABB.tsx`, lines 211-227.

---

## What Changes

Replace the six-line bullet list (lines 211-227) with four stacked manifesto blocks using the content specified.

## New Structure

```text
BUILT
The modular digital foundation

ESTABLISHED
A scalable component system

ALIGNED
Product, interface and visual language under one logic

SET
Global standards for imagery and expression
```

## Implementation

Replace lines 211-227 with a single container div:

- Outer wrapper: `border-l border-[#ECA9CC]/50 pl-6 md:pl-8 space-y-12 md:space-y-16 mt-10`
  - The `border-l` + pink at 50% opacity provides the subtle vertical structural line
- Each of the four blocks: `space-y-2`
  - Top word: `<p className="font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-white">BUILT</p>`
  - Description: `<p>The modular digital foundation</p>` (inherits `BODY_TEXT` from parent wrapper)

## Styling Details

| Element | Classes |
|---------|---------|
| Keyword (BUILT etc.) | `font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-white` |
| Description line | Inherited from parent `BODY_TEXT` (text-[1.25rem] leading-[1.65]) |
| Block spacing | `space-y-12 md:space-y-16` between blocks |
| Inner spacing | `space-y-2` within each block |
| Left line | `border-l border-[#ECA9CC]/50 pl-6 md:pl-8` on outer wrapper |

## What Does NOT Change

- "System in practice" sub-heading (line 200)
- Preceding paragraph about A400 (line 196)
- Following paragraphs about team continuity (lines 229-235)
- Gallery, Outcome, CTA, or any other section

