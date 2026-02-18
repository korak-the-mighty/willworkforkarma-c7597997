

# Homepage Reframe — Full-Width Storytelling System

This is a fundamental reset of the homepage from a contained portfolio layout to a full-viewport guided walk.

---

## What Changes

### 1. Layout System for Homepage

The current `Layout` component wraps all content in `max-w-4xl px-6`. The homepage needs to break free entirely.

**Approach**: Add a `fullWidth` prop to `Layout`. When true, the `<main>` wrapper removes the constraining container, letting the homepage own the viewport. The header and footer remain unchanged.

**File**: `src/components/Layout.tsx`
- Add optional `fullWidth` boolean prop
- When `fullWidth={true}`, render `<main>` children without the `max-w-4xl px-6 py-16` wrapper

---

### 2. Homepage Complete Rewrite (`src/pages/Index.tsx`)

Replace everything with four sections, all full-width:

#### Section 1 — Hero (Stage)
- `h-screen` (100vh), starts directly under nav
- Full-bleed image (`HenrikLehtikangas-hero2026.webp`), `object-cover`
- Responsive `object-position`: `object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]`
- Subtle overlay `bg-black/20`
- H1 centered horizontally and vertically
- Type: `text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight text-white`
- Calm weight (`font-medium`, not `font-semibold/bold`) — confident, not shouting
- No subline, no buttons, no additional text

#### Section 2 — Act + Evidence Flow (repeating pattern)
Each act = statement + project. Three acts total.

**Statement blocks**:
- Full-width, centered
- `text-3xl md:text-4xl lg:text-5xl font-heading` (smaller than hero)
- `leading-[1.15]`
- Generous padding: `py-24 md:py-32 lg:py-40`
- No `max-w` container — text floats in full viewport width with just `px-6`

**Project blocks** (Evidence):
- Full-bleed image placeholder (`w-screen`, `aspect-[16/9]`, `bg-muted`)
- Title overlaid on the image: positioned bottom-left with padding, white text, `text-3xl md:text-4xl font-heading`
- Meta (year, role from `facts.role`) shown as small secondary text
- Desktop hover: meta fades in (opacity transition), title stays visible
- Mobile: meta always visible, small
- Entire block is a `Link` to `/work/{slug}` — fully clickable
- Projects alternate composition: first project title bottom-left, second title bottom-right
- No cards, no separate text blocks below the image

**Flow**: Statement 1 -> Project SHARE -> Statement 2 -> Project MAN -> Statement 3

#### Section 3 — Henrik Moment (Human Beat)
- Full-width section, content centered
- Small portrait placeholder: `w-24 h-24 rounded-full bg-muted mx-auto`
- One or two short placeholder lines: `[HENRIK MOMENT — to be written later]`
- Not dominant — presence, not biography
- Calm spacing: `py-20 md:py-28`

#### Section 4 — Karma Module (Epilogue)
- Full-width, calm background
- One short paragraph placeholder: `[WHY KARMA — to be written later]`
- Centered, generous padding
- No "Get in touch" link here (that lives in the footer already)
- No footer clutter

**Removed from homepage**:
- Section 3 (About with circular portrait + about text + karma line) — replaced by Henrik Moment
- Section 4 (Contact with WhatsApp/email/LinkedIn) — removed, contact lives on its own page and in footer

---

### 3. Footer Adjustment (`src/components/Layout.tsx`)

The existing Karma module in the footer stays as-is for non-homepage pages. On the homepage, the Karma Module (Section 4) serves as the page-level epilogue, and the footer's "Good work comes back around." closing line still appears below.

No structural footer changes needed.

---

## Files Summary

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Full rewrite — 4 sections, all full-width, no containers |
| `src/components/Layout.tsx` | Add `fullWidth` prop to remove main container for homepage |

No data model changes. No new files. No font changes.

---

## Technical Details

**ProjectEvidence component** (inline in Index.tsx):
```
Props: slug, title, year, role, align ("left" | "right")
- Full-bleed Link wrapper
- aspect-[16/9] bg-muted relative overflow-hidden
- Title: absolute bottom-left or bottom-right, white, large
- Meta: absolute, small, opacity-0 group-hover:opacity-100 on desktop
- Mobile: meta opacity-100 always (via md:opacity-0 md:group-hover:opacity-100)
```

**Layout fullWidth prop**:
```
When fullWidth=true:
  <main className="flex-1">{children}</main>
When fullWidth=false (default):
  <main className="flex-1"><div className="mx-auto max-w-4xl px-6 py-16 md:py-24">{children}</div></main>
```

