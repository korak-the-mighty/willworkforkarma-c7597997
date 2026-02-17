

# Willworkforkarma — Editorial Portfolio

A minimal, typography-first portfolio showing how a senior creative leader thinks and works. Calm, confident, honest.

---

## Design Direction

- **Typography-first**: Large, confident headings with editorial weight. Body text with generous line-height and spacing for easy reading.
- **Color**: Near-monochrome — off-white background, near-black text, one subtle accent for interactive elements only.
- **Layout**: Narrow, readable content column centered on page. Generous whitespace throughout. No sidebars or clutter.
- **Motion**: None decorative. Only subtle fade-ins on narrative sections if they support reading flow.

---

## Site Structure

### Header
- "Willworkforkarma" on the left
- Navigation links on the right: Work, About, Contact
- Minimal and consistent across all pages

### Footer
- A short, human karma line (e.g., "Good work comes back around.")
- Understated, not preachy

---

## Pages

### 1. Home (`/`)
- A single strong statement about how you approach work
- 1–2 short supporting lines beneath it
- A curated preview of selected cases (title, year, summary, cover image) linking to their detail pages
- No hero banner, no visual gimmicks — just words and work

### 2. Work (`/work`)
- Full list of all cases
- Each shows: title, year, tags, short summary, cover image
- Clicking any case navigates to its detail page
- Clean stacked list layout

### 3. Case Detail (`/work/[slug]`)
- **Header area**: Title, year, tags, short summary
- **Cover image**: Generous width
- **Narrative sections**, each as its own clearly separated visual block:
  - **Situation** — Context and challenge
  - **Approach** — Key decisions and thinking
  - **Outcome** — Results and learnings
- Each section has heading, text, and optional image
- Consistent, reusable section component enables future motion or layout changes per-block

### 4. About (`/about`)
- A personal, honest statement — more short essay than CV
- How you think, what you value in work
- Optional placeholder for a portrait image

### 5. Contact (`/contact`)
- A short inviting message
- Email displayed directly (no contact form)
- Optional links to LinkedIn or other profiles

---

## Content & Data

- All case data in a single TypeScript file as a typed array
- Each case: `slug`, `title`, `year`, `summary`, `tags`, `coverImage`, `sections[]` (each with `heading`, `text`, `image?`)
- Structured for easy migration to files, JSON, or a CMS later
- Two starter cases pre-populated:
  - **"SHARE"** — demonstrates the narrative structure
  - **"MAN"** — different tags/tone, same structure

---

## Reusable Components

- **Layout** — Shared wrapper with Header + Footer, used on every page
- **CaseCard** — Preview card for case listings (Home + Work pages)
- **CaseSection** — Individual narrative block (situation/approach/outcome), each visually separated for clarity and future flexibility
- **Tag** — Simple label for case categories

