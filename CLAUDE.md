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

## Architecture

This is a personal portfolio site for Henrik Lehtikangas — a creative director. It is a **React + TypeScript SPA** built with Vite, styled with Tailwind CSS v3, and uses shadcn/ui for base UI primitives.

### Routing

`src/App.tsx` defines all routes via React Router v6:

| Route | Page |
|---|---|
| `/` | `Index` — editorial homepage |
| `/work` | `Work` — case grid |
| `/work/abb-emobility` | `CaseABB` — hardcoded one-off case page |
| `/work/:slug` | `CaseDetail` — generic case page driven by data |
| `/about` | `About` |
| `/contact` | `Contact` |

### Content / Data Layer

All case study content lives in **`src/data/cases.ts`** as a typed `Case[]` array. This is the single source of truth for case metadata, narrative content, modules, themes, and media references. There is no backend or CMS — adding or editing a case means editing this file.

Each `Case` object has:
- **`heroMedia`** — type/src for the top-of-page image or video
- **`modules`** — ordered array of `CaseModule` blocks (`strategy`, `execution`, `break`)
- **`theme`** — per-case HSL CSS variable overrides (`bg`, `fg`, `muted`, `accent`) that are applied as inline CSS variables to the case page wrapper
- **`facts`**, **`highlights`**, **`outcomes`**, **`sections`**, **`gallery`** — various structured content blocks

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
