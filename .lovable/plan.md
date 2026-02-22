

## Audit and Fix: ABB Case Page Background Bands

Four targeted edits to eliminate visible background banding. No structural or layout changes.

---

### 1. CaseSectionWrapper.tsx -- Reduce tone contrast

**Lines 14-15:** Change tone values:
- `subtle`: `bg-white/[0.03]` to `bg-white/[0.02]`
- `emphasis`: `bg-white/[0.06]` to `bg-white/[0.04]`

### 2. CaseABB.tsx -- Remove CSS variable overrides

**Lines 50-58:** Remove the inline `style` block with `--background`, `--foreground`, `--muted` overrides. Simplify the `<div>` to just `className="text-white"`.

### 3. CaseHeroMedia.tsx -- Remove bg-muted

**Line 10:** Replace `bg-muted` with `border border-white/[0.06]` in the outer div's className.

### 4. CaseGallery.tsx -- Remove bg-muted

**Lines 3-5:** Replace `bg-muted` with `border border-white/[0.06]` on all three placeholder divs.

---

### Files touched

| File | Change |
|------|--------|
| `src/components/CaseSectionWrapper.tsx` | Reduce subtle to 0.02, emphasis to 0.04 |
| `src/pages/CaseABB.tsx` | Remove CSS variable style overrides |
| `src/components/CaseHeroMedia.tsx` | Replace bg-muted with border |
| `src/components/CaseGallery.tsx` | Replace bg-muted with border |

No new colors, no gradients, no layout changes, vertical rhythm preserved.

