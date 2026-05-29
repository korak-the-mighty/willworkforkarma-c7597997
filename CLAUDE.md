# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at http://localhost:8080
npm run build      # Production build
npm run build:dev  # Dev-mode build (keeps source maps, etc.)
npm run lint       # Run ESLint
npm run test       # Run tests once (vitest)
npm run test:watch # Run tests in watch mode
```

## What this site is

This is Henrik Lehtikangas's personal portfolio — he is a creative director, not a coder. There is no team, no CMS, no backend, no API. The site is a direct representation of how Henrik thinks and works. Content is his; code serves content, not the other way around.

Start every session by understanding the structure before touching anything.

## Architecture

This is a **React + TypeScript SPA** built with Vite, styled with Tailwind CSS v3, and uses shadcn/ui for base UI primitives.

### The real rendering pipeline — read this first

Every live case study follows this pipeline:

```
content/cases/<slug>.md
  → src/lib/parseCaseContent.ts   (parses markdown + frontmatter into typed sections)
  → src/lib/caseRegistry.ts       (loads all .md files at build time, exposes getCaseData(slug))
  → src/pages/Case<Name>.tsx      (dedicated page per case, calls getCaseData)
  → src/components/CaseSection.tsx (renders each section by type)
  → individual section components  (CaseHeroMedia, CaseTextBlock, CaseTextMedia, CaseMedia, etc.)
```

Each case has its own dedicated page in `src/pages/`. The markdown file is the single source of truth for that case's content — text, images, section order, everything.

### What is legacy and should not be touched

- **`src/pages/CaseDetail.tsx`** — generic fallback page, not used by any live case. Legacy. Do not refactor or fix.
- **`src/data/cases.ts`** — old hardcoded TypeScript data. Legacy. Not the source of truth.
- The components that compose `CaseDetail` (`CaseSpecSheet`, `CaseHook`, `CaseBamStatement`, `CaseModule`, `CaseOutcome`, `CaseWhyMe`, `CaseSectionWrapper`) — legacy, only used by CaseDetail.

### Routing

`src/App.tsx` defines all routes via React Router v6:

| Route | Page |
|---|---|
| `/` | `Index` — editorial homepage |
| `/work` | `Work` — case grid |
| `/work/abb-emobility` | `CaseABB` — markdown-driven |
| `/work/share` | `CaseShare` — markdown-driven |
| `/work/man` | `CaseMAN` — markdown-driven |
| `/work/wtr` | `CaseWTR` — markdown-driven |
| `/work/bmw` | `CaseBMW` — markdown-driven |
| `/work/drivelog` | `CaseDrivelogV2` — markdown-driven |
| `/work/:slug` | `CaseDetail` — legacy fallback, not used by live cases |
| `/about` | `About` |
| `/contact` | `Contact` |

### Content / Data Layer

Case content lives in **`content/cases/<slug>.md`**. Each file has:
- A frontmatter block (`---`) with `slug`, `route`, `status`, `summary`, and `snapshot` data
- A `## Media Inventory` block listing all media assets with ids and URLs
- Named section blocks (`## section-hero`, `## section-context`, etc.) each with a `type` field and content

To edit a case: edit its markdown file. To add a new case: create a new `.md` file and a new dedicated page in `src/pages/`.

### Content files for other pages

- `content/homepage.md` — homepage content
- `content/about.md` — about page
- `content/contact.md` — contact page
- `content/otherwork.md` — the "other cases" grid
- `content/gate.md` — gated access content

### Per-Case Theming

Case detail pages inject per-case colors by setting CSS custom properties (`--background`, `--foreground`, `--muted`, `--accent`) as inline styles on the article wrapper. The `Layout` component also applies `theme.bg` to `html`, `body`, and `#root` via a `useEffect` to avoid color-banding on overscroll. The global design tokens are defined in `src/index.css`.

### Layout & Components

- **`src/components/Layout.tsx`** — wraps every page with the sticky `Header` (hamburger nav) and `Footer`. Accepts `fullWidth` prop (skips the `max-w-4xl` content container) and optional `theme` prop for case-page background bleed.
- **`src/components/OverlayMenu.tsx`** — full-screen nav overlay triggered by the hamburger button.
- **`src/components/EditorialCase.tsx`** — reusable editorial case block used on the Index page (title centered over split image/blank half).
- **Case-specific components** (`CaseHeroMedia`, `CaseSpecSheet`, `CaseHook`, `CaseBamStatement`, `CaseModule`, `CaseMediaGrid`, `CaseOutcome`, `CaseWhyMe`, `CaseSectionWrapper`) — compose the `CaseDetail` page layout.
- **`src/components/ui/`** — shadcn/ui primitives (do not edit these directly; re-generate via shadcn CLI if needed).

### Styling Conventions

- Fonts: **Clash Display** (headings, `font-heading`) via Fontshare API; **Inter** (body, weight 300) via Google Fonts.
- The `.arrow-link` utility class in `index.css` adds the animated `→` prefix on hover links.
- A full-page CSS noise grain texture is applied via `body::before` in `index.css`.
- Path alias `@/` maps to `src/`.

### Dev server

Runs on port **8080**. HMR overlay is disabled. The `lovable-tagger` plugin is active in development only (tags components for the Lovable.dev platform).

### Background debug tool

Append `?bgdebug=1` to any case URL to highlight elements with unexpected background colors (helps diagnose color-banding issues on case pages).

### FeaturedMediaSection

`src/components/FeaturedMediaSection.tsx` — scroll-driven horizontal pan on mobile. On mobile only (`md:hidden`), a `200vh` container with a sticky viewport-height window. Vertical scroll progress drives `translateX` on the image from `0` to `-(imageWidth - viewportWidth)`. Desktop shows full-bleed `object-cover` at `h-[900px]`. Do not modify this component without understanding this mechanic.
