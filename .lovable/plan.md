
# Homepage Content Lock + Refinement Pass

Precision tuning — no structural changes. Locking all copy, updating the About and Karma sections to match reference layouts, adjusting statement spacing, and redesigning the footer.

---

## Changes

### 1. `src/pages/Index.tsx` — Full content lock + About/Karma redesign

**Copy replacements (exact text locked):**
- Statement 1: "I help clients and teams see what actually matters."
- Statement 2: "I turn complexity into clear direction and action."
- Statement 3: "I inspire and lead creative work with relentless passion."

**ABB hover data update** (in `src/data/cases.ts`):
- subline: "Charging infrastructure reimagined for scale and clarity."
- area: "Brand & Digital Product"

**SHARE data update:**
- subline: "A platform designed to simplify mobility experiences."
- area: "Digital Product"

**MAN data update:**
- subline: "A focused digital presence for a global transport brand."
- area: "Brand & Digital"

**BMW data update:**
- subline: "Campaign thinking grounded in clarity and craft."
- area: "Campaign" (unchanged)

**DRIVELOG data update:**
- subline: "From idea to product — a pragmatic mobility solution."
- area: "Product" (simplified)

**Statement spacing increase:**
- Change from `py-24 md:py-32` to `py-32 md:py-40`

**About section redesign** (matches reference image layout):
- Two-column layout on desktop: left side has portrait image with blobs overlapping below/around it; right side has "Henrik" H2, body copy, and "More about me" / "Contact me" arrow-links
- Mobile: stacked vertically
- Profile image: imported from `src/assets/HenrikLehtikangas-profile_picture.webp`
- Blobs positioned organically near the portrait (not centered in a row)

**Karma block redesign** (matches reference):
- Left-aligned text (not centered), within a max-width container
- Three lines: "I try to be decent, curious, and honest." / "I care deeply about the work — and the people doing it." / "Somehow, that keeps coming back."
- A separator dash
- "That's why I work for karma."
- Clean spacing above and below

### 2. `src/data/cases.ts` — Update sublines and areas

Lock the subline and area fields to the exact values specified above for all five cases.

### 3. `src/components/Layout.tsx` — Footer redesign

Replace the current minimal footer with the reference layout:
- Top row: left side "I'm available for work. Let's talk." (font-heading), right side "Work / About / Contact" links
- Bottom row: left side "Privacy Policy" link
- Border-top separator
- Proper horizontal padding matching the site

### 4. Copy profile image to project

Copy `user-uploads://HenrikLehtikangas-profile_picture.webp` to `src/assets/HenrikLehtikangas-profile_picture.webp` and import it in Index.tsx.

### 5. Image treatment confirmation

No changes needed — `brightness-75` default with `group-hover:brightness-100` is already applied across `EditorialCase.tsx`, `CaseHeroMedia.tsx`, and `CaseCard.tsx`.

---

## Technical Details

### About section layout (desktop)
```text
Grid: grid-cols-1 md:grid-cols-2, gap-12 md:gap-16
Left column:
  - Relative container
  - Portrait: w-64 md:w-80 rounded-full overflow-hidden
  - Blobs: positioned with relative offsets below/beside portrait
Right column:
  - H2 "Henrik" — font-heading text-4xl md:text-5xl
  - Body copy — text-base text-muted-foreground leading-relaxed max-w-lg
  - Links row: "More about me" and "Contact me" as arrow-links
```

### Karma block layout
```text
Container: max-w-4xl mx-auto px-6 md:px-8, py-16 md:py-24
Text: text-base md:text-lg text-foreground, leading-relaxed
  Line 1: I try to be decent, curious, and honest.
  Line 2: I care deeply about the work — and the people doing it.
  Line 3: Somehow, that keeps coming back.
  Separator: — (em dash on its own line, py-4)
  Closing: That's why I work for karma.
Alignment: text-left (not centered)
```

### Footer layout
```text
Container: border-t border-border
Inner: max-w-7xl mx-auto px-6 md:px-8
Row 1 (py-8): flex justify-between items-start
  Left: "I'm available for work. Let's talk." — font-heading text-lg md:text-xl
  Right: flex gap-8, Links (Work, About, Contact) — text-sm
Row 2 (pb-8): "Privacy Policy" — text-sm text-muted-foreground
```
