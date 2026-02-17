

# Phase 1 Frame — Implementation

Three adjustments to the approved plan per your remarks, then execute.

---

## Remarks Applied

1. **Hero image**: Use the uploaded portrait (`HenrikLehtikangas-hero2026.webp`) as the real hero image, not a placeholder. Copy to `src/assets/` and import in the homepage component.
2. **Vertical editorial layout on ALL cases**: Apply the vertical-only module/hook layout to both SHARE and MAN. No side-by-side `grid-cols-2` anywhere in case pages.
3. **No new fonts**: Keep Switzer for headings and Inter for body. No serif introduction. Replace any remaining `font-serif` references with `font-heading`.

---

## 1. Copy Hero Image

Copy `user-uploads://HenrikLehtikangas-hero2026.webp` to `src/assets/HenrikLehtikangas-hero2026.webp`.

---

## 2. Homepage Rewrite (`src/pages/Index.tsx`)

Replace entirely with four sections:

### Section 1 — Full-Width Hero
- Full-bleed breakout (`relative left-1/2 -ml-[50vw] w-screen`), `h-[85vh]`
- Real image via `import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp"`, rendered as `<img>` with `object-cover`
- H1: "I push vision, clarity and creative confidence." — left-aligned, bottom-left, large type (`text-4xl md:text-6xl lg:text-7xl font-heading`)
- Subtle `bg-black/20` overlay div for legibility
- No buttons, no supporting lines, no capability list

### Section 2 — Statement + Work Flow
- Three statements, each centered, large type (`text-3xl md:text-4xl lg:text-5xl font-heading`), generous padding (`py-20 md:py-32`)
- Between/after statements: project preview cards (image placeholder `aspect-[16/9] bg-muted`, title, tags, year) linking to case pages
- Exact copy:
  1. "I help clients and teams see what actually matters."
  2. "I turn complexity into clear direction and action."
  3. "I inspire and lead creative work with relentless passion."
- Flow: Statement 1 > Project 1 (SHARE) > Statement 2 > Project 2 (MAN) > Statement 3

### Section 3 — About
- Circular placeholder (`rounded-full bg-muted w-40 h-40`)
- `[ABOUT TEXT — to be written later]`
- `[KARMA LINE — to be written later]`

### Section 4 — Contact
- WhatsApp: `https://wa.me/4915141655661`
- Email: `[EMAIL]`
- LinkedIn: `[LINKEDIN URL]`
- No forms

---

## 3. Case Detail — Header Update (`src/pages/CaseDetail.tsx`)

Add placeholders after the title block:
- `[CASE HEADLINE]` as a subheading
- `[CASE INTRO PARAGRAPH]` as muted text

Everything else in CaseDetail stays as-is (it already uses the vertical component flow).

---

## 4. CaseHook — Vertical Only (`src/components/CaseHook.tsx`)

Remove `grid md:grid-cols-2`. Stack vertically:
- Problem text paragraphs
- Spacing (`mt-8 md:mt-12`)
- Full-width image placeholder (`aspect-[16/9] bg-muted`)

---

## 5. CaseModule — Vertical Only (`src/components/CaseModule.tsx`)

Remove `grid md:grid-cols-2` two-column layout. Replace with vertical stack:
- For `strategy`/`execution`: title, then text paragraphs, then full-width media placeholder — all stacked
- Alternate visual order: odd-index = text first, even-index = image first
- `break` type stays as full-bleed placeholder
- All image placeholders: `aspect-[16/9] bg-muted w-full`

---

## 6. CaseCard — Fix `font-serif` (`src/components/CaseCard.tsx`)

Replace `font-serif` with `font-heading` on the title `<h3>`.

---

## 7. Layout — Fix `font-serif` (`src/components/Layout.tsx`)

Replace `font-serif` with `font-heading` on the site name link.

---

## Files Summary

| File | Action |
|------|--------|
| `src/assets/HenrikLehtikangas-hero2026.webp` | Copy from upload |
| `src/pages/Index.tsx` | Full rewrite — 4 sections |
| `src/components/CaseHook.tsx` | Rewrite — vertical stack |
| `src/components/CaseModule.tsx` | Rewrite — vertical editorial flow |
| `src/pages/CaseDetail.tsx` | Add headline/intro placeholders |
| `src/components/CaseCard.tsx` | `font-serif` to `font-heading` |
| `src/components/Layout.tsx` | `font-serif` to `font-heading` |

No data model changes. No copy changes beyond specified placeholders. No new fonts.

