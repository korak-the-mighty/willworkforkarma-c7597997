

## Hard Fix: Force Uniform #101010 Background

### Root cause

`body` has `@apply bg-background` in `src/index.css`, which resolves to a warm off-white (`hsl(40, 20%, 97%)`). The ABB page sets `#101010` only on a child `<div>` inside Layout. Any sub-pixel rendering gap between sections exposes the light body background as a visible horizontal band.

---

### Changes

#### 1. src/index.css -- Add global background overrides for dark-themed pages

After the existing `body` rule (line 105), add a new scoped rule. The Layout component already sets `backgroundColor` via inline style on its wrapper div -- we need the full document stack (`html`, `body`, `#root`) to also go transparent so nothing leaks through.

Add after line 111:

```css
/* Dark-themed case pages: ensure no light background bleeds through */
.theme-dark-bg {
  background-color: transparent !important;
}

html:has(.theme-dark-bg) body,
html:has(.theme-dark-bg) #root {
  background-color: inherit !important;
}
```

Also add a direct safety rule for the ABB-specific case inside `@layer base`:

```css
main, section, footer, header {
  background-color: transparent;
}
```

This ensures no structural element paints its own background unless explicitly told to.

#### 2. src/components/Layout.tsx -- Apply theme background to html/body level

Move the background color from the wrapper div to the full document tree when a theme is active:

- Add a `useEffect` that sets `document.documentElement.style.backgroundColor` and `document.body.style.backgroundColor` to `theme.bg` when the theme prop is present, and cleans up on unmount.
- Remove the inline `style` from the wrapper div (it becomes redundant).
- Add className `theme-dark-bg` to the wrapper div when theme is present.

This ensures html/body/root all share the same background, eliminating any bleed-through.

#### 3. src/pages/CaseABB.tsx -- No changes needed

Already clean from previous passes. MEDIA_HOVER is `""`, no bg classes on wrappers, theme is `{{ bg: "#101010" }}`.

---

### Technical detail

| File | Change |
|------|--------|
| `src/index.css` | Add transparent background rule for `main`, `section`, `footer`, `header`; add `.theme-dark-bg` class |
| `src/components/Layout.tsx` | Add `useEffect` to set html/body background from theme prop; add `theme-dark-bg` class to wrapper |

### Why this works

The banding happens because the CSS cascade paints `body` with a light color, and Layout only paints its child div dark. Any sub-pixel gap between sections (common with percentage-based padding, fractional viewport units, or browser rounding) exposes the light body. By making html/body match the theme color, there is nothing light to leak through.

### Safety

- Non-themed pages (homepage, about, contact) are unaffected -- `useEffect` only runs when `theme` is present and cleans up on unmount.
- The `transparent` rule on structural elements is safe because they should inherit, not paint their own backgrounds.
- No layout changes, no new colors, no gradients.

