

## Deterministic Fix: Debug Mode + Footer/Base Alignment (Amended)

Three changes across two files. Debug scanner uses `rgb(16, 16, 16)` as the "correct" color to avoid false negatives.

---

### 1. src/index.css -- Remove broad CSS rules, add overscroll fix

**Remove lines 112-125** (the `main, section, footer, header { background-color: transparent; }` rule, the `.theme-dark-bg` block, and the `html:has(.theme-dark-bg)` rules).

**Add** (in their place):

```css
html, body {
  overscroll-behavior-y: none;
}
```

This stops overscroll bounce from revealing a mismatched background. The Layout `useEffect` handles html/body background directly -- the CSS rules are redundant and can mask the real offender.

---

### 2. src/components/Layout.tsx -- Add bgdebug scanner, fix footer, remove theme-dark-bg class

**useEffect (lines 52-62):** After setting html/body backgrounds, add the debug scanner:

- Check `window.location.search.includes("bgdebug=1")`
- After 500ms timeout, scan all `body *` elements
- For each element, get `getComputedStyle(el).backgroundColor`
- Flag if it is NOT `rgba(0, 0, 0, 0)` AND NOT `transparent` AND NOT `rgb(16, 16, 16)`
- Flagged elements get `outline: 2px solid red`, `data-bgdebug` attribute, and console log
- Store timeout ID for cleanup

**Amendment applied:** The scanner compares against `rgb(16, 16, 16)` (the browser-computed form of `#101010`), not the raw hex value. This prevents false negatives from format mismatches.

**Line 24 (Footer):** Add `className="bg-transparent"` to the `<footer>` element.

**Line 65 (wrapper div):** Remove the `theme-dark-bg` class reference (the CSS rules it depended on are being removed). Change to just `"flex min-h-screen flex-col"`.

---

### Files touched

| File | Change |
|------|--------|
| `src/index.css` | Remove lines 112-125 (transparent + theme-dark-bg + :has rules); add `overscroll-behavior-y: none` |
| `src/components/Layout.tsx` | Add bgdebug scanner in useEffect; add `bg-transparent` on footer; remove `theme-dark-bg` from wrapper |

### Usage

Navigate to `/work/abb-emobility?bgdebug=1` -- any element painting a non-base background will be outlined red and logged to console. Fix that specific element, and banding is resolved.

