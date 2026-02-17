

# Typography + Dark Mode Default + Per-Project Themes

Three identity-level changes: swap headline font to Switzer, default to dark mode, and allow case pages to override theme colors per project.

---

## 1. Font Swap: Instrument Serif to Switzer

**`src/index.css`**
- Replace the Google Fonts `@import` line: remove `Instrument+Serif`, add Switzer via the Fontshare CDN (`https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&display=swap`). Keep Inter as-is.
- Update the heading rule from `font-family: 'Instrument Serif', serif` to `font-family: 'Switzer', sans-serif` with `font-weight: 500`.

**`tailwind.config.ts`**
- Add `fontFamily` to the `extend` block:
  - `heading: ['Switzer', 'sans-serif']`
  - `body: ['Inter', 'sans-serif']`
- This enables `font-heading` and `font-body` utility classes throughout the project.

**Component references**: Any `font-serif` classes on headings (e.g., in `CaseDetail.tsx` header, `CaseBamStatement`, `CaseWhyMe`) will be updated to `font-heading` so they pick up Switzer instead of Instrument Serif.

---

## 2. Dark Mode as Default

**`index.html`**
- Add `class="dark"` to the `<html>` tag. This activates the existing `.dark` CSS variable set site-wide with zero component changes needed.

That's it. The dark token set already exists in `index.css`. All `hsl(var(--...))` references automatically resolve to dark values.

---

## 3. Per-Project Background Themes on Case Pages

**Data model (`src/data/cases.ts`)**
- Add a `theme` field to the `Case` interface:
  ```
  theme: {
    bg: string;      // HSL values, e.g. "220 20% 12%"
    fg: string;
    muted: string;
    accent: string;
  }
  ```
- Add theme values for each case:
  - SHARE: a cool blue-dark tone (e.g., `bg: "215 25% 10%"`, `fg: "210 15% 88%"`, etc.)
  - MAN: a warm brown-dark tone (e.g., `bg: "30 15% 10%"`, `fg: "35 15% 88%"`, etc.)

**`src/pages/CaseDetail.tsx`**
- Wrap the `<article>` (or a parent div) with inline `style` that sets CSS custom properties from the case's `theme` object:
  ```tsx
  style={{
    '--background': caseData.theme.bg,
    '--foreground': caseData.theme.fg,
    '--muted': caseData.theme.muted,
    '--accent': caseData.theme.accent,
  } as React.CSSProperties}
  ```
- This overrides the dark-mode defaults only within the case page scope. All existing `bg-background`, `text-foreground`, `text-muted-foreground` classes automatically pick up the per-project colors. No component changes needed beyond this wrapper.

---

## Files Summary

| File | Change |
|------|--------|
| `index.html` | Add `class="dark"` to `<html>` |
| `src/index.css` | Swap Instrument Serif import for Switzer (Fontshare CDN); update heading font-family |
| `tailwind.config.ts` | Add `fontFamily.heading` and `fontFamily.body` to extend |
| `src/data/cases.ts` | Add `theme` field to `Case` interface + values for SHARE and MAN |
| `src/pages/CaseDetail.tsx` | Apply per-case CSS variables via inline `style` on wrapper element |
| `src/components/CaseBamStatement.tsx` | Replace `font-serif` with `font-heading` |
| `src/components/CaseWhyMe.tsx` | Replace `font-serif` with `font-heading` (if present) |

No layout changes. No copy changes. No generated graphics.

