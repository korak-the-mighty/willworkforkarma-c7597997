

# ABB E-mobility Case Page — Structural Refinement (Updated)

Six edits to `src/pages/CaseABB.tsx`. No other files changed. Incorporates both user tweaks.

---

## 1. Execution Section — Hierarchy with A400 Paragraph Retained

Restructure lines 191-232:

- Keep MicroLabel and opening paragraph ("The first new charger generation -- A400 -- became the proving ground.")
- Add generous spacing (`mt-16`)
- Add sub-heading: "System in practice" -- `text-lg text-white font-normal tracking-normal` (Inter, no uppercase, no micro-label style)
- After sub-heading (`mt-6`), place the A400 paragraph ("It was the first product built under the new positioning...") -- kept intact, given breathing room
- After that paragraph (`mt-10`), the bullet list with increased spacing (`space-y-4` instead of `space-y-2`)
- After bullets (`mt-12`), the two closing paragraphs about continuity

---

## 2. Gallery — Scalable Masonry Layout (3 now, structured for 5)

Replace lines 235-269 (the current 12-col grid) with a CSS columns masonry layout.

Structure uses a `galleryItems` array of objects so adding tiles later is a one-line addition:

```
const galleryItems = [
  { src: galleryImg11, alt: "ABB E-mobility interface", aspect: "aspect-[4/5]" },
  { src: galleryImg3, alt: "ABB E-mobility charger", aspect: "aspect-[3/2]", offsetClass: "md:mt-8" },
  { src: galleryImg13, alt: "ABB E-mobility components", aspect: "aspect-[4/3]" },
];
```

Rendered with `columns-2 md:columns-3 gap-4` and `.map()` over the array. Each tile gets `break-inside-avoid mb-4 overflow-hidden cursor-pointer`. To add tiles 4 and 5 later, just push to the array. Container stays `max-w-4xl mx-auto px-6 md:px-8`.

---

## 3. Outcome Section — Centered Thesis Block

Lines 282-314: Wrap the three supporting sentences in a centered constrained block (`max-w-[42rem] mx-auto text-center px-6 space-y-2`) with generous vertical padding (`py-12`). Large headline and artifact row unchanged.

---

## 4. Replace CaseWhyMe with "What This Required"

Remove `CaseWhyMe` import and its usage (plus the unused `caseData`, `caseIndex`, `nextCase`, `nextCaseLink` variables). Replace with:

```
<section className="py-24 md:py-32">
  <div className="px-6 md:px-8 max-w-4xl mx-auto">
    <MicroLabel>What this required</MicroLabel>
    <p className="max-w-[72ch] leading-relaxed text-white">
      Holding the line between engineering depth and human clarity at global scale.
    </p>
  </div>
</section>
```

Dark background maintained. No links, no next case CTA. Page ends here.

---

## 5. Remove White Background Block

Achieved automatically by removing `CaseWhyMe` (which rendered the light-background band).

---

## 6. No External Links

No "Visit" link. No outbound references.

---

## Technical Details

### Execution reflow (lines 191-232)

```
<section className="py-24 md:py-32">
  <div className="px-6 md:px-8 max-w-4xl mx-auto">
    <MicroLabel>Execution</MicroLabel>
    <div className="max-w-[72ch] leading-relaxed">
      <p>The first new charger generation -- A400 -- became the proving ground.</p>

      <p className="text-lg text-white font-normal mt-16">System in practice</p>

      <p className="mt-6">
        It was the first product built under the new positioning, with a
        redesigned interface and industrial language. We used it to validate
        the new visual and interaction principles before scaling them globally.
      </p>

      <div className="space-y-4 mt-10">
        <p>-- Built a modular digital architecture</p>
        <p>-- Created a reusable component library</p>
        ...
      </div>

      <p className="mt-12">Over two years, teams evolved and roles shifted.</p>
      <p className="mt-4">I remained responsible for maintaining strategic and structural continuity.</p>
    </div>
  </div>
  ...
</section>
```

### Masonry gallery (data-driven, scalable)

```
const galleryItems = [
  { src: galleryImg11, alt: "...", aspect: "aspect-[4/5]" },
  { src: galleryImg3, alt: "...", aspect: "aspect-[3/2]", offsetClass: "md:mt-8" },
  { src: galleryImg13, alt: "...", aspect: "aspect-[4/3]" },
  // Add up to 2 more tiles here when assets are available
];

<div className="mt-16 px-6 md:px-8 max-w-4xl mx-auto">
  <div className="columns-2 md:columns-3 gap-4">
    {galleryItems.map((item, i) => (
      <div key={i} className={`break-inside-avoid mb-4 overflow-hidden cursor-pointer ${item.offsetClass || ""}`}
           onClick={() => setLightboxSrc(item.src)}>
        <img src={item.src} alt={item.alt}
             className={`w-full h-auto object-cover ${item.aspect} ${MEDIA_HOVER}`} />
      </div>
    ))}
  </div>
</div>
```

### Outcome centered block

```
<div className="max-w-[42rem] mx-auto text-center px-6 space-y-2 py-12">
  <p>ABB E-mobility gained a system capable of expressing its ambition.</p>
  <p>The architecture extended beyond marketing into product dashboards and infrastructure tools.</p>
  <p>The positioning became tangible.</p>
</div>
```

