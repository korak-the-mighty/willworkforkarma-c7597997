

# Emergency Stabilization Pass (Adjusted)

Two amendments applied to the approved plan before implementation.

---

## Amendments

1. **Hero object-position**: Use `object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]` (smallest screens shift image up more to protect the head).
2. **No About/Contact typography changes**: Remove `About.tsx` and `Contact.tsx` from this pass entirely.

---

## 1. Hero Fix (`src/pages/Index.tsx`)

- Change `h-[85vh]` to `min-h-[85vh]`
- Image: add `object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]`
- Center H1 both horizontally and vertically: replace `flex items-end` with `flex items-center justify-center`
- H1: `text-center max-w-4xl mx-auto px-6`, scale to `text-5xl md:text-7xl lg:text-8xl font-semibold`
- Keep overlay `bg-black/20`, keep exact copy unchanged

## 2. Statement + Work Module Rhythm (`src/pages/Index.tsx`)

- Statements: scale to `text-4xl md:text-5xl lg:text-6xl`, add `leading-[1.1]`
- Reduce statement padding from `py-20 md:py-32` to `py-14 md:py-20`
- Cap project thumbnail height with `max-h-[50vh]`
- Add `mb-6` on preview wrapper for spacing
- WhatsApp link: add `target="_blank" rel="noopener noreferrer"`

## 3. Case Page Editorial Rhythm

### CaseModule (`src/components/CaseModule.tsx`)
- Increase outer padding: `py-16 md:py-20`
- Increase inner gap: `space-y-12 md:space-y-16`
- Add `pt-4` to text blocks, `mb-4` after text before media
- Body text: `text-base md:text-lg leading-relaxed`

### CaseHook (`src/components/CaseHook.tsx`)
- Increase padding: `py-20 md:py-28`
- Increase gap: `space-y-12 md:space-y-16`

### CaseDetail header (`src/pages/CaseDetail.tsx`)
- Title: `text-5xl md:text-6xl`
- Headline placeholder: `text-3xl md:text-4xl`
- Intro paragraph: add `max-w-2xl`

## 4. Global "Why Karma" Module (`src/components/Layout.tsx`)

Replace footer content with:
- **Karma module**: eyebrow "WHY KARMA", placeholder body `[WHY KARMA TEXT -- to be written later]`, "Get in touch" link to `/contact`
- **Closing line**: "Good work comes back around." below a `border-t`

## 5. Link Fixes (`src/pages/Index.tsx`)

- WhatsApp: `target="_blank" rel="noopener noreferrer"`
- Confirm project preview links work correctly

---

## Files Summary

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Hero centering, object-position, type scale; statement rhythm; WhatsApp target |
| `src/components/CaseModule.tsx` | Spacing tokens, text size |
| `src/components/CaseHook.tsx` | Spacing tokens |
| `src/pages/CaseDetail.tsx` | Header type scale, intro max-width |
| `src/components/Layout.tsx` | Replace footer with karma module + closing line |

No changes to `About.tsx` or `Contact.tsx` in this pass.

