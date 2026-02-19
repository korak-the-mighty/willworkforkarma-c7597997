

# ABB E-mobility Case Page — Refinements

Seven targeted edits to `src/pages/CaseABB.tsx` plus two new asset copies.

---

## Assets to Copy

- `user-uploads://abb-e-mobility-mcs-hero.mp4` to `src/assets/abb-e-mobility-mcs-hero.mp4` (new hero video)
- `user-uploads://ABB-media_4.webp` to `src/assets/ABB-media_4.webp` (Decision section full-width image)

---

## Changes to `src/pages/CaseABB.tsx`

### 1. Hero video — swap to local asset

Replace the external URL constant with a local import:

```text
import heroVideo from "@/assets/abb-e-mobility-mcs-hero.mp4";
```

Remove the `HERO_VIDEO_SRC` constant and use `heroVideo` in the `<video>` element's `src`.

### 2. Hero copy change

Change the H1 from:
> Defining the digital brand foundation of ABB E-mobility.

To:
> Building the digital brand foundation of a global e-mobility leader.

Use `e&#8209;mobility` or `e&#x2011;mobility` (non-breaking hyphen) in places where "E-mobility" should not break across lines. For the hero H1 specifically, wrap with `<span className="whitespace-nowrap">e-mobility</span>` or use `&nbsp;` strategically. The simplest approach: use `e&#8209;mobility` (non-breaking hyphen entity) throughout the page wherever "E-mobility" appears, preventing mid-word line breaks.

### 3. Decision full-width image — replace placeholder

Import the new asset:
```text
import decisionImg from "@/assets/ABB-media_4.webp";
```

Replace the empty placeholder div (line 185-187) with an actual image using the FULL_BLEED class and the same brightness hover treatment as other media.

### 4. Context copy — add "ABB"

Line 87: Change `"E-mobility operated inside ABB corporate."` to `"ABB E-mobility operated inside ABB corporate."`

### 5. Context micro label alignment

The "CONTEXT" label is currently inside a `max-w-4xl mx-auto` wrapper (line 81), while the text column uses a calculated left padding `md:pl-[max(2rem,calc((100vw-56rem)/2))]`. Move the MicroLabel out of its own wrapper and into the text column div so it aligns flush with the body copy below it.

### 6. Decision — left-align "A new system" and change copy

The centered statement "A new system." (lines 170-174) will be:
- Changed to left-aligned within the `max-w-4xl mx-auto` text wrapper (remove `text-center`, add `px-6 md:px-8 max-w-4xl mx-auto`)
- Text changed to: "A new flexible, future proof brand system."
- Keep the large Clash Display sizing

### 7. Non-breaking "E-mobility" globally

Throughout the file, replace regular hyphens in "E-mobility" / "e-mobility" with non-breaking hyphens (`\u2011`) to prevent the word from splitting across lines. This affects hero text, context copy, and anywhere else the term appears.

---

## Technical Details

### Context label alignment fix

Before (lines 80-86):
```text
<div className="px-6 md:px-8 max-w-4xl mx-auto">
  <MicroLabel>Context</MicroLabel>
</div>
<div className="grid grid-cols-12 gap-8 items-start">
  <div className="col-span-12 md:col-span-5 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-0">
```

After: Remove the separate MicroLabel wrapper div. Place `<MicroLabel>Context</MicroLabel>` inside the text column div (before the body copy div), so it inherits the same left padding and aligns with the paragraphs.

### Decision statement realignment

Before (lines 170-174):
```text
<div className="py-20 md:py-28 text-center px-6">
  <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
    A new system.
  </p>
</div>
```

After:
```text
<div className="py-20 md:py-28 px-6 md:px-8 max-w-4xl mx-auto">
  <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
    A new flexible, future proof brand system.
  </p>
</div>
```

### Non-breaking hyphen

Use the Unicode non-breaking hyphen character (U+2011) instead of the regular hyphen in "E-mobility" / "e-mobility". This is a single character swap that prevents line-break opportunities at the hyphen. In JSX, use `{"\u2011"}` or the HTML entity within text.

The simplest approach: use `E\u2011mobility` in all string literals and JSX text nodes where the term appears.

