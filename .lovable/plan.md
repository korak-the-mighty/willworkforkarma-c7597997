

## Apply the Approved Plan (with two tweaks)

Three files changed. No guessing — all changes are explicit.

---

### 1. `src/components/Layout.tsx` — Enhanced useEffect + wrapper bg + #root

**Replace lines 52-82** (the entire useEffect block) with the full implementation:

- Set `backgroundColor` on `html`, `body`, AND `#root`
- Set `color-scheme: dark` on html
- Store all previous values and restore on cleanup
- Debug scanner with the two requested guards:
  - Skip media tags (`img`, `video`, `picture`, `svg`, `canvas`)
  - Skip `position: fixed` elements
  - Skip tiny elements (width < 8 or height < 8)
  - Compare against computed body bg (not hardcoded hex)
  - Log offender count at end

**Line 85** — Add inline style to wrapper div:

```
<div className="flex min-h-screen flex-col" style={theme ? { backgroundColor: theme.bg } : undefined}>
```

Footer already has `bg-transparent` — no change needed.

---

### 2. `src/index.css` — No changes needed

Already clean: overscroll-behavior is present (line 114-116), broad transparency hacks already removed.

---

### 3. `src/components/CaseSectionWrapper.tsx` — Restore full implementation (with tweak #2)

Restore from fragment back to the full section wrapper. The key difference from the previous version: `fullWidth` controls full-bleed, NOT the default. Normal sections get no special positioning.

```tsx
type SectionTone = "default" | "subtle" | "emphasis";

interface CaseSectionWrapperProps {
  tone?: SectionTone;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const toneMap: Record<SectionTone, string> = {
  default: "",
  subtle: "",
  emphasis: "",
};

const CaseSectionWrapper = ({
  tone = "default",
  fullWidth = false,
  className = "",
  children,
}: CaseSectionWrapperProps) => (
  <section
    className={`${fullWidth ? FULL_BLEED : ""} ${toneMap[tone]} ${className}`.trim()}
  >
    {children}
  </section>
);

export default CaseSectionWrapper;
```

Tone map values are empty strings — structural layout only, no painted backgrounds.

---

### Summary

| File | What changes |
|------|-------------|
| `src/components/Layout.tsx` | Replace useEffect with full version (html/body/#root/color-scheme + guarded debug scanner); add inline bg style to wrapper div |
| `src/components/CaseSectionWrapper.tsx` | Restore full section wrapper; fullWidth triggers FULL_BLEED, default is clean |
| `src/index.css` | No changes |

### Verification

Open `/work/abb-emobility?bgdebug=1` — expect 0 red outlines and 0 console offenders. No bands, no overscroll mismatch.
