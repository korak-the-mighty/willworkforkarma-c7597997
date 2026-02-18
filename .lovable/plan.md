

# Homepage Reset — Scene-Based Storytelling

A structural reset that removes the current "statement-evidence alternation" pattern and replaces it with a cinematic scene system where each section feels like a distinct moment.

---

## What changes

### Current problems
- The Act + Evidence pattern creates a repetitive rhythm (statement, grey slab, statement, grey slab, statement) that feels like a template, not a story.
- Henrik Moment and Karma Module are thin placeholder sections that break momentum.
- The footer has a full "Why Karma" block that duplicates homepage content.
- Project blocks are grey `aspect-[16/9]` rectangles — they don't feel like scenes.

### New structure (5 scenes + footer)

**Scene 1 — Hero**
- `min-h-screen`, full-bleed image, `bg-black/20` overlay
- H1 centered horizontally and vertically, calm weight
- Copy unchanged: "I push vision, clarity and creative confidence."
- No changes to image positioning logic

**Scene 2 — Context**
- Full-width section, vertically centered content
- Part A: One large statement (`text-3xl md:text-5xl lg:text-6xl font-heading`, centered)
- Part B: Below it, a restrained text block (2-4 lines, `max-w-2xl mx-auto`, `text-base md:text-lg text-muted-foreground`, centered)
- Both parts are placeholder copy for now:
  - A: `[CONTEXT STATEMENT — to be written later]`
  - B: `[CONTEXT BODY — 2-4 lines, to be written later]`
- Generous padding: `py-24 md:py-32`

**Scene 3 — Project: SHARE**
- Full-width scene, `min-h-[70vh]`, `bg-muted` background (whole section, not a small card)
- Content positioned inside the scene: large project title (`text-4xl md:text-6xl font-heading`), subtle metadata (year, role) in small muted text
- Entire section is a clickable `Link` to `/work/share`
- Feels like entering a room, not looking at a thumbnail

**Scene 4 — Project: MAN**
- Same structure as Scene 3 but for the second case
- Links to `/work/man`

**Scene 5 — Closing Statement**
- Full-width, centered, one sentence
- Placeholder: `[CLOSING STATEMENT — to be written later]`
- `text-2xl md:text-4xl font-heading`, generous padding `py-24 md:py-32`

**Footer (Layout.tsx)**
- Strip down to minimal: just the closing line "Good work comes back around."
- Remove the "Why Karma" eyebrow, placeholder body, and "Get in touch" link
- Simple `border-t`, small padding, one line of muted text

### Removed from homepage
- The three interleaved statements (moved to a single Context section)
- Henrik Moment section (does not serve the story path)
- Karma Module section (does not serve the story path)
- `ProjectEvidence` component (replaced by full-scene project blocks)

---

## Files

| File | Action |
|------|--------|
| `src/pages/Index.tsx` | Full rewrite — 5 scenes |
| `src/components/Layout.tsx` | Simplify footer to closing line only |

---

## Technical details

**Project scene component** (inline in Index.tsx):
```text
Props: slug, title, year, role
- Link wrapper (block, full width)
- min-h-[70vh] bg-muted flex items-end
- Content in bottom-left: p-8 md:p-16
- Title: text-4xl md:text-6xl font-heading tracking-tight
- Meta: text-sm text-muted-foreground mt-2, opacity transition on hover
- group class on Link for hover effects
```

**Footer simplification**:
```text
<footer>
  <div className="border-t border-border">
    <div className="mx-auto max-w-4xl px-6 py-8">
      <p className="text-sm text-muted-foreground">
        Good work comes back around.
      </p>
    </div>
  </div>
</footer>
```

