# PROJECT_MAP.md
> Operational architecture reference. Read before starting any session.

---

## REPOSITORY OVERVIEW

- **Framework:** React + TypeScript SPA, Vite, Tailwind CSS v3, shadcn/ui primitives
- **Routing:** React Router v6, defined in `src/App.tsx`
- **Content:** Markdown files in `content/` — parsed at build time via `src/lib/caseRegistry.ts` using `import.meta.glob`. No CMS, no backend.
- **Rendering:** Client-side only. All data is static (markdown → parsed TypeScript objects).
- **Media hosting:** Cloudflare R2 CDN (`pub-d695aab3039745849234fbcc82eb82bb.r2.dev`)
- **Dev server:** `npm run dev` → port 8080

---

## CORE SYSTEMS

### Homepage system
- **Purpose:** Editorial homepage with hero, case sequence, statements, about section
- **Primary:** `src/pages/Index.tsx`
- **Content source:** `content/homepage.md` → `src/hooks/useHomepageContent.ts`
- **Case hero copy:** `src/hooks/useCaseHeroContent.ts`
- **Supporting:** `src/components/EditorialCase.tsx` (renders SHARE, MAN, BMW, DRIVELOG blocks)
- **Warning:** ABB case in the homepage is a hardcoded custom block in Index.tsx, NOT using EditorialCase. Treat separately.

### Mobile menu system
- **Purpose:** Full-screen overlay menu triggered by header burger button
- **Primary:** `src/components/OverlayMenu.tsx`, `src/context/MenuContext.tsx`
- **Wrapping:** `src/components/Layout.tsx` exports `LayoutWithProvider` (wraps all pages in `MenuProvider`)
- **Header:** Defined inside `Layout.tsx` — reads `useMenu()` directly, renders burger/X crossfade toggle
- **Warning:** `MENU_CASES` in `OverlayMenu.tsx` is hardcoded and **not connected to the markdown content system**. Adding a new case requires updating both the markdown and this array.
- **Warning:** `HeroHeadline` in `Index.tsx` is a separate inner component by design — it must stay inside `MenuProvider` tree to read `menuOpen`. Do not collapse it back into the `Index` body.

### Markdown / content system
- **Purpose:** Case page content authored in markdown, parsed to typed objects at build time
- **Primary:** `src/lib/caseRegistry.ts`, `src/lib/parseCaseContent.ts`
- **Content files:** `content/cases/*.md` (one per case), `content/homepage.md`, `content/about.md`, `content/contact.md`
- **Types:** `src/types/case.ts`
- **Warning:** Markdown sections use a custom format (not standard markdown). Frontmatter + `## section-name` delimiters + key-value pairs. Editing requires understanding the parser.

### Case rendering system
- **Purpose:** Display individual case studies
- **Two parallel systems exist:**
  1. **Hardcoded pages** — `CaseABB.tsx`, `CaseShare.tsx`, `CaseMAN.tsx`, `CaseBMW.tsx`, `CaseDrivelogV2.tsx`. These are bespoke pages with direct component composition.
  2. **Generic CaseDetail** — `src/pages/CaseDetail.tsx` driven by markdown via `caseRegistry`. Used for any slug not matched by a specific route.
- **Routes:** Hardcoded routes in `App.tsx` take precedence over the generic `/work/:slug` catch-all.
- **Case components:** `src/components/Case*.tsx` — compose inside case pages. Do not edit without reading the specific page that uses them.

### Animation system
- **Scrollytelling:** `src/components/ScrollyVideoSection.tsx` — frame-by-frame animation driven by scroll position. Frames stored in `public/videos/abb-mobilefly-frames/` and `abb-mobilefly-frames-mobile/`. **Do not modify without understanding the frame/scroll mechanic.**
- **Horizontal pan (mobile):** `src/components/FeaturedMediaSection.tsx` — 200vh sticky scroll drives `translateX`. **Do not modify without understanding this mechanic.**
- **Hover transitions:** Opacity crossfades on EditorialCase (desktop only), OverlayMenu case images (desktop only). Mobile suppresses hover states.

### Media handling system
- **Images:** All heavy images served from R2 CDN. Local `public/` only for small assets (SVGs, profile photo, favicons).
- **Lazy loading:** `lazy-img` CSS class + `onLoad` handler adds `loaded` class. Global observer in `App.tsx` handles dynamically added images.
- **Hero image:** `src/assets/HenrikLehtikangas-hero2026.webp` — local asset, `loading="eager" fetchPriority="high"`.

### Theme system
- **Purpose:** Per-page background color applied to `html`, `body`, `#root` to prevent color banding on overscroll
- **Primary:** `src/components/Layout.tsx` (the `useEffect` in `Layout`)
- **Debug tool:** Append `?bgdebug=1` to any case URL to highlight background offenders

---

## ACTIVE MOBILE FILES

**Primary (touch these for mobile work):**
- `src/components/OverlayMenu.tsx` — mobile menu layout, overlays, CTAs
- `src/components/EditorialCase.tsx` — mobile stacked layout (aspect ratio, text sizing)
- `src/pages/Index.tsx` — homepage mobile sections, ABB hero mobile block
- `src/components/Layout.tsx` — Header positioning, z-index, burger button

**Secondary (check but usually don't change):**
- `src/components/FeaturedMediaSection.tsx` — mobile horizontal pan mechanic
- `src/components/ScrollyVideoSection.tsx` — mobile frame switching
- `src/context/MenuContext.tsx` — menu state (rarely needs changes)

**Usually NOT needed during mobile passes:**
- `src/components/Case*.tsx` (case page detail components — desktop-dominant)
- `src/lib/caseRegistry.ts`, `src/lib/parseCaseContent.ts`
- `content/` markdown files
- `src/pages/CaseABB.tsx` etc. (unless specifically debugging a case page)

---

## HIGH-RISK FILES

| File | Risk |
|---|---|
| `src/components/Layout.tsx` | Contains Header, Footer, MenuProvider, theme injection. Changes can break all pages simultaneously. |
| `src/context/MenuContext.tsx` | Menu state shared across Header, OverlayMenu, HeroHeadline. Breaking context breaks the entire menu system. |
| `src/components/FeaturedMediaSection.tsx` | Scroll-driven horizontal pan. Mobile and desktop layouts are completely different. Easy to destroy the mechanic. |
| `src/components/ScrollyVideoSection.tsx` | Frame-by-frame scrollytelling. Fragile. Do not touch without reading the scroll math. |
| `src/components/OverlayMenu.tsx` | Dual mobile/desktop layouts with a layered z-index stack. Changes to z-index order break image crossfades or content visibility. |
| `src/App.tsx` | Route order matters — hardcoded case routes must come before generic `/work/:slug`. |
| `src/lib/parseCaseContent.ts` | Custom markdown parser. Touching it can silently break all case pages. |
| `content/cases/*.md` | Custom section format — not standard markdown. Syntax errors break case pages silently. |

---

## CURRENT KNOWN ISSUES

- **ABB hero mobile:** The hero text overlay (`opacity-0 md:group-hover:opacity-100`) never shows on mobile. Mobile users see only the image + small text below. This is a known gap — no hover state on touch.
- **About section blob row:** Uses negative margins (`-mt-14`, `-translate-y-10`) for visual overlap. Can collapse awkwardly at edge screen widths.
- **Mobile menu bottom CTAs:** Two `flex-1` pills (WhatsApp + Copy email). On very small screens the text may be cramped. No minimum tap-target enforcement.
- **Footer spacing:** Footer has `pb-8` only, no top padding — sits close to last content block on pages without a full-height final section.
- **MENU_CASES duplication risk:** The 4 cases in `OverlayMenu.tsx` are hardcoded independently of the markdown content system. Adding/removing/renaming a case requires updating both places.

---

## CURRENT DESIGN RULES

- **Editorial and cinematic** — calm pacing, not app-like interactions
- **No scroll snap** — was trialled and removed; do not reintroduce
- **Spatial breathing** — large padding, generous white space; do not compress sections
- **Hover states are desktop-only** — never use hover to convey meaning on mobile
- **No forced transitions** — avoid slide-in panels, drawer animations, page transitions
- **Minimal and premium** — restraint over decoration
- **Avoid desktop regressions** — every mobile pass must verify desktop is untouched
- **No new dependencies** — use existing Tailwind + shadcn + lucide-react

---

## SESSION START RULES

1. Read `CLAUDE.md` first (project-level instructions override defaults)
2. Read `PROJECT_MAP.md` second (this file)
3. Assume Claude Code (CC) is running in a worktree — the working directory is the worktree, not the main repo
4. Always `git pull origin main` at the start of a session before touching files
5. Read the specific files you'll edit before making changes — do not guess at content
6. Ask for only the minimal files needed — do not request broad dumps
7. Do not reopen solved architectural decisions (snap rhythm, close button removal, HeroHeadline extraction, etc.)
8. Do not rely on memory from previous chat sessions — read the actual file state
9. After each commit, push to `origin/main` and pull into the main worktree at `/Users/henriklehtikangas/willworkforkarma-c7597997`
10. Commits go to the worktree branch; push using `git push origin <worktree-branch>:main`
