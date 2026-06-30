# PROJECT_CODEMAP.md
> Structural source of truth. Architecture only. No backlog, no opinions.

---

## STACK

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript, Vite |
| Styling | Tailwind CSS v3, shadcn/ui primitives |
| Routing | React Router v6 |
| State | React context + local useState only |
| Content | Markdown files parsed at build time (no CMS, no backend) |
| Media | Cloudflare R2 CDN |
| Dev server | `npm run dev` → port 8080 |

---

## ROUTING

Defined in `src/App.tsx`. Order matters — specific routes precede the generic catch-all.

```
/                     → src/pages/Index.tsx
/work                 → src/pages/Work.tsx
/work/abb-emobility   → src/pages/CaseABB.tsx          (markdown-driven, see CASE RENDERING)
/work/share           → src/pages/CaseShare.tsx        (markdown-driven, see CASE RENDERING)
/work/man             → src/pages/CaseMAN.tsx          (markdown-driven, see CASE RENDERING)
/work/wtr             → src/pages/CaseWTR.tsx          (markdown-driven, see CASE RENDERING)
/work/bmw             → src/pages/CaseBMW.tsx          (markdown-driven, see CASE RENDERING)
/work/drivelog        → src/pages/CaseDrivelogV2.tsx   (markdown-driven, see CASE RENDERING)
/work/:slug           → src/pages/CaseDetail.tsx       (legacy fallback, not used by any live case)
/about                → src/pages/About.tsx
/contact              → src/pages/Contact.tsx
/privacy-policy       → src/pages/PrivacyPolicy.tsx
*                     → src/pages/NotFound.tsx
```

---

## LAYOUT SYSTEM

**Owner:** `src/components/Layout.tsx`

- Default export is `LayoutWithProvider` — wraps `Layout` in `MenuProvider`
- Every page uses `Layout`, so every page is inside `MenuProvider`
- `Layout` accepts: `children`, `fullWidth?: boolean`, `theme?: { bg: string }`
- `fullWidth` skips the `max-w-4xl` content container
- `theme.bg` is injected into `html`, `body`, `#root` via `useEffect` to prevent overscroll color banding
- `Header` is defined inside `Layout.tsx` — not a separate file
- `Footer` is defined inside `Layout.tsx` — not a separate file
- Debug tool: append `?bgdebug=1` to any URL to highlight background offenders

**Z-index allocation (Layout):**
- Header: `z-[60]`
- OverlayMenu outer: `z-50`

---

## MENU SYSTEM

**Owner:** `src/context/MenuContext.tsx`, `src/components/OverlayMenu.tsx`, `src/components/Layout.tsx`

**Data flow:**
```
MenuProvider (in LayoutWithProvider)
  └── Layout reads useMenu() → passes isOpen/onClose to OverlayMenu
  └── Header reads useMenu() → toggles menuOpen on click
  └── HeroHeadline (in Index.tsx) reads useMenu() → fades on open
```

**MenuContext exports:** `MenuContext`, `MenuProvider`, `useMenu`

**OverlayMenu z-index stack (desktop):**
```
z-0      mobile overlay (bg-black/90, md:hidden)
z-10     desktop base (bg-[#01031A], hidden md:block)
z-[15]   case hero images (crossfade on hover)
z-20     desktop dimming veil (bg-black/80, pointer-events-none)
z-30     content layers (mobile layout, desktop layout)
```

**MENU_CASES** in `OverlayMenu.tsx` is hardcoded — independent of the markdown content system. Must be kept in sync manually when cases change.

---

## CONTENT SYSTEM

**Owner:** `src/lib/caseRegistry.ts`, `src/lib/parseCaseContent.ts`

**Flow:**
```
content/cases/*.md
  → import.meta.glob (eager, Vite build time)
  → parseCaseContent.ts (custom parser)
  → registry: Record<slug, CaseData>
  → getCaseData(slug) / getAllCases()
  → consumed by the six dedicated case pages (CaseABB.tsx, CaseShare.tsx, CaseMAN.tsx, CaseWTR.tsx, CaseBMW.tsx, CaseDrivelogV2.tsx) and content hooks
  → NOT consumed by CaseDetail.tsx — that page reads from legacy src/data/cases.ts (see CASE RENDERING)
```

**Content files:**
```
content/cases/abb-emobility.md
content/cases/bmw.md
content/cases/drivelog.md
content/cases/man.md
content/cases/share.md
content/cases/wtr.md
content/homepage.md
content/about.md
content/contact.md
content/index.yml
```

**Content hooks:**
```
src/hooks/useHomepageContent.ts   → reads content/homepage.md
src/hooks/useCaseHeroContent.ts   → reads case hero copy
src/hooks/useAboutContent.ts      → reads content/about.md
src/hooks/useContactContent.ts    → reads content/contact.md
```

**Markdown format:** Custom — not standard markdown. Frontmatter YAML + `## section-name` delimiters + key-value section bodies. Parsed by `parseCaseContent.ts`.

---

## CASE RENDERING

**Single system.** All six live cases (`abb-emobility`, `share`, `man`, `wtr`, `bmw`, `drivelog`) follow the same pipeline:

```
content/cases/<slug>.md
  → parseCaseContent.ts
  → caseRegistry.ts → getCaseData(slug)
  → dedicated page (CaseABB.tsx, CaseShare.tsx, CaseMAN.tsx, CaseWTR.tsx, CaseBMW.tsx, CaseDrivelogV2.tsx)
      calls getCaseData(slug), then maps caseData.sections
  → src/components/CaseSection.tsx — switches on section.type and renders the matching component
      ('hero' | 'text' | 'text-media' | 'media' | 'scrolly' | 'gallery' | 'proof' | 'custom-component' | 'campaign' | 'statement-interstitial')
```

Each dedicated page is a thin wrapper (~33-51 lines): `Layout` + `CaseLoader` + `caseData.sections.map(section => <CaseSection section={section} />)`. The per-page differences are cosmetic (loader color/role, `CaseShare.tsx` additionally renders `CaseSnapshot`).

`src/pages/CaseDetail.tsx` (mounted at the generic `/work/:slug` route) is a **legacy fallback not used by any live case** — it reads from the old hardcoded `src/data/cases.ts`, not from `caseRegistry`/markdown, and composes a different, legacy set of components (`CaseSpecSheet`, `CaseHook`, `CaseBamStatement`, `CaseModule`, `CaseOutcome`, `CaseWhyMe`, `CaseSectionWrapper`).

**Case component inventory:**
```
CaseBamStatement   CaseCampaign      CaseCard
CaseFacts          CaseGallery       CaseHeroMedia
CaseHighlights     CaseHook          CaseLoader
CaseMedia          CaseMediaGrid     CaseModule
CaseOutcome        CasePullQuote     CaseSection
CaseSectionWrapper CaseSnapshot      CaseSpecSheet
CaseStatementInterstitial           CaseTextBlock
CaseTextMedia      CaseWhyMe
```

**Supporting:**
```
src/components/AppLoader.tsx
src/components/CaseLoader.tsx
src/components/ProofSection.tsx
src/components/LetsTalk.tsx
```

---

## HOMEPAGE STRUCTURE

**Owner:** `src/pages/Index.tsx`

Section sequence:
```
1.  Hero — full-screen image + HeroHeadline (useMenu-aware)
2.  ABB case — hardcoded custom Link block (NOT EditorialCase)
3.  Statement 1
4.  SHARE — EditorialCase
5.  Statement 2
6.  MAN — EditorialCase
7.  Statement 3
8.  BMW — EditorialCase
9.  DRIVELOG — EditorialCase
10. See All CTA
11. About section — portrait, blobs, copy
```

**`HeroHeadline`** is a separate inner component in `Index.tsx` that calls `useMenu()`. It must remain a separate component — collapsing it into `Index` body breaks context tree access.

**`EditorialCase`** (`src/components/EditorialCase.tsx`): renders desktop (split half/half hover) and mobile (stacked image + text) layouts from a single component.

---

## ANIMATION SYSTEM

### Scrollytelling
**Owner:** `src/components/ScrollyVideoSection.tsx`

- Frame-by-frame animation driven by scroll position
- Frame images in `public/videos/abb-mobilefly-frames/` (desktop) and `abb-mobilefly-frames-mobile/` (mobile)
- 166 desktop frames, 204 mobile frames (ABB case)
- Frame manifest at `public/videos/abb-mobilefly-frames/manifest.json`

### Horizontal pan (mobile)
**Owner:** `src/components/FeaturedMediaSection.tsx`

- Mobile only (`md:hidden`)
- `200vh` scroll container, sticky viewport window
- Vertical scroll progress drives `translateX` from `0` to `-(imageWidth - viewportWidth)`
- Desktop: full-bleed `object-cover` at `h-[900px]`

### Hover crossfades
- `EditorialCase.tsx`: image darken/text reveal on desktop hover
- `OverlayMenu.tsx`: case background image crossfade on case hover (desktop)
- Both: opacity transitions only, no transforms

---

## MEDIA

- Heavy assets: Cloudflare R2 CDN (`pub-d695aab3039745849234fbcc82eb82bb.r2.dev`)
- Local `public/`: profile photo, blobs (SVGs), favicon
- Hero image: `src/assets/HenrikLehtikangas-hero2026.webp` (local, eager-loaded)
- Lazy loading: `lazy-img` class + `onLoad` adds `loaded` class. Global `MutationObserver` in `App.tsx` handles dynamically mounted images.

---

## HIGH-RISK ARCHITECTURAL BOUNDARIES

| File | Boundary |
|---|---|
| `src/components/Layout.tsx` | Owns Header, Footer, MenuProvider, theme injection — changes propagate to all pages |
| `src/context/MenuContext.tsx` | Single source of menu state — breaking this breaks Header, OverlayMenu, HeroHeadline simultaneously |
| `src/components/OverlayMenu.tsx` | Dual mobile/desktop layouts with independent z-index stack — z-index changes affect image crossfade visibility |
| `src/components/FeaturedMediaSection.tsx` | Scroll-driven mechanic — do not modify without understanding the translateX/sticky pattern |
| `src/components/ScrollyVideoSection.tsx` | Frame math tied to DOM measurements — do not modify without understanding scroll position mapping |
| `src/lib/parseCaseContent.ts` | Custom parser for all markdown content — silent failures break all case pages |
| `src/App.tsx` | Route order matters — hardcoded routes must precede `/work/:slug` |
| `content/cases/*.md` | Custom section syntax — parser errors silently produce empty pages |

---

## KEY DEPENDENCIES

```
react-router-dom    routing
@tanstack/react-query  (present but minimal use)
lucide-react        icons (Menu, X in Layout; X removed from OverlayMenu)
tailwind-merge / clsx  class merging (via shadcn)
shadcn/ui           base primitives in src/components/ui/
```

Shadcn components live in `src/components/ui/` — regenerate via CLI, do not hand-edit.
