

## Final Chrome Banding Fix

### Change 1 -- Shift base background
**File:** `src/pages/CaseABB.tsx` (line 56)

```
// From:
theme={{ bg: "#101010" }}
// To:
theme={{ bg: "#0D0D0D" }}
```

### Change 2 -- Add noise film overlay
**File:** `src/index.css`

Append at the end of the file:

```css
:root {
  --page-noise-opacity: 0.035;
}

body::before {
  content: "";
  position: fixed !important;
  inset: 0 !important;
  pointer-events: none !important;
  z-index: 9999 !important;
  opacity: var(--page-noise-opacity);
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(255,255,255,0.018) 0px,
      rgba(255,255,255,0.018) 1px,
      rgba(0,0,0,0.018) 2px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.012) 0px,
      rgba(255,255,255,0.012) 1px,
      rgba(0,0,0,0.012) 2px
    );
  mix-blend-mode: overlay;
}

@media (prefers-reduced-motion: reduce) {
  body::before {
    opacity: 0.02;
  }
}
```

### Summary
- Two files, two minimal changes
- Noise overlay: fixed, non-interactive (`pointer-events: none`), z-index 9999
- Reduced-motion fallback included
- After publish, hard-refresh Chrome on `/work/abb-emobility` to confirm banding is resolved

