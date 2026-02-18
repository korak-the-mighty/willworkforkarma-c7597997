

# Homepage Rebuild — Fixed Structure

Replacing the current homepage with exactly the 8-block structure specified. Nothing added, nothing invented.

---

## Changes to `src/pages/Index.tsx`

Full rewrite. The page becomes exactly these blocks in order:

### 1. HERO
- `min-h-screen`, full-width, full-bleed image (existing hero image)
- Existing copy centered: "I push vision, clarity and creative confidence."
- No changes to overlay or image positioning
- **Unchanged from current**

### 2. STATEMENT 1
- Full-width, centered, `py-24 md:py-32 px-6`
- One line: `[STATEMENT 1 — to be written later]`
- `text-2xl md:text-4xl font-heading tracking-tight`
- No body text, no sub-copy

### 3. WORK BANNER: SHARE
- Full-width, `bg-muted`, clickable link to `/work/share`
- Shows: project name (SHARE), role (Strategy Lead), year (2023), one short line (the `summary` from data)
- Not `min-h-[70vh]` — just enough height to feel substantial: `py-16 md:py-24 px-8 md:px-16`
- Title large, meta small and muted

### 4. STATEMENT 2
- Same treatment as Statement 1
- `[STATEMENT 2 — to be written later]`

### 5. WORK BANNER: MAN
- Same structure as SHARE banner
- Links to `/work/man`

### 6. STATEMENT 3
- Same treatment as Statement 1
- `[STATEMENT 3 — to be written later]`

### 7. ABOUT
- Minimal, human section
- Not full viewport height — just `py-16 md:py-24 px-6 text-center`
- One or two lines of placeholder text: `[ABOUT — to be written later]`
- Small, restrained type: `text-base md:text-lg text-muted-foreground max-w-xl mx-auto`

### 8. FOOTER
- Already handled by Layout.tsx — simple, one closing line
- **No changes needed**

---

## Removed from current homepage
- "Context" section with statement + body text pair (replaced by clean Statement 1)
- `min-h-[70vh]` on project blocks (replaced by padded banners)
- "Closing Statement" scene (replaced by Statement 3 + About)

## No changes to
- `src/components/Layout.tsx` — footer and header stay as they are
- Data files
- Any other pages

---

## Technical: WorkBanner component

```text
Props: slug, title, year, role, summary
- Link wrapper, group, block, w-full
- bg-muted py-16 md:py-24 px-8 md:px-16
- Title: text-4xl md:text-6xl font-heading tracking-tight
- Meta line: text-sm text-muted-foreground mt-2 — "2023 · Strategy Lead"
- Summary: text-base text-muted-foreground mt-4 max-w-2xl
- Hover: title color shifts via group-hover
```
