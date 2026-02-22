

## Kill GPU Banding: Paint Base BG in Scrolly Layers

### Problem
bgdebug shows 0 offenders, but horizontal bands persist because transparent layers over GPU-composited sticky/canvas elements create visible seams.

### Solution
Paint the real page background color on scrolly layers using a CSS variable, instead of relying on transparency.

---

### 1. `src/components/Layout.tsx` -- Expose theme bg as CSS var with safe restore

In the existing useEffect (lines 62-67), add `--page-bg` storage, setting, and cleanup:

**Line 62-67** -- Store prevPageBg, then set the CSS variable after colorScheme:

```typescript
const prevColorScheme = html.style.colorScheme;
const prevPageBg = document.documentElement.style.getPropertyValue("--page-bg");

html.style.backgroundColor = theme.bg;
body.style.backgroundColor = theme.bg;
if (root) root.style.backgroundColor = theme.bg;
html.style.colorScheme = "dark";
document.documentElement.style.setProperty("--page-bg", theme.bg);
```

**Lines 110-111** -- Restore in cleanup (after colorScheme restore):

```typescript
html.style.colorScheme = prevColorScheme;
if (prevPageBg) document.documentElement.style.setProperty("--page-bg", prevPageBg);
else document.documentElement.style.removeProperty("--page-bg");
if (debugTimer) clearTimeout(debugTimer);
```

---

### 2. `src/components/ScrollyVideoSection.tsx` -- Paint bg using var(--page-bg)

Replace every `bg-transparent` and inline `backgroundColor: "transparent"` with `bg-[var(--page-bg)]`. Add `transform-gpu` to sticky container.

| Line | Current | New |
|------|---------|-----|
| 199 | `bg-transparent` | `bg-[var(--page-bg)]` |
| 209 | `bg-transparent h-screen` | `bg-[var(--page-bg)] h-screen` |
| 213 | `bg-transparent h-screen flex...` | `bg-[var(--page-bg)] h-screen flex...` |
| 222 | `backgroundColor: "transparent"` in style | Remove `backgroundColor` from inline style (keep height only) |
| 224 | `relative bg-transparent` | `relative bg-[var(--page-bg)]` |
| 226 | `sticky top-0 h-screen` | `sticky top-0 h-screen transform-gpu` |
| 227 | `bg-transparent` + `style={{ backgroundColor: "transparent" }}` | `bg-[var(--page-bg)]`, remove inline style entirely |

---

### Verification

- Load `/work/abb-emobility?bgdebug=1` -- still 0 offenders (scrolly layers now paint the same color as body)
- Scroll through: no horizontal seam/banding
- No overscroll color mismatch

### Files Modified

| File | Change |
|------|--------|
| `src/components/Layout.tsx` | Store/set/restore `--page-bg` CSS variable |
| `src/components/ScrollyVideoSection.tsx` | Replace all transparent with `var(--page-bg)`, add `transform-gpu` |

