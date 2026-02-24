

## Homepage Update Plan

This plan covers 10 changes in a single implementation pass across 3 files.

---

### 1. Background Colors

**File: `src/pages/Index.tsx`**

- Wrap the entire `Layout` content (or use inline style on the outermost element) to set the homepage background to `#06070D`.
- Update the `Statement` component to include `backgroundColor: '#05060A'` as an inline style on its `<section>`.

---

### 2. Case Image Paths

**File: `src/data/cases.ts`**

Verify and ensure these paths are set (most already correct from prior edits):
- ABB: `/ABB-media-1.webp`
- SHARE: `/share-1.webp`
- MAN: `/MAN-1.webp`
- BMW: `/bmw-1.webp`
- DRIVELOG: `/dongle1_001.webp`

---

### 3. Case Tile Hover Behavior

**File: `src/pages/Index.tsx`** (ABB full-width tile)

- Replace the current hover text (which shows `abb.title` at large size + subline/area/year) with:
  - Hero headline: "Building the digital brand foundation of a global e-mobility leader." at ~`text-2xl md:text-3xl` with `font-heading`, lighter weight
  - Supporting text: "ABB E-mobility . Brand & Digital" in small uppercase tracked style
- Keep opacity-0 default, fade in on hover at 600ms ease-in-out.

**File: `src/components/EditorialCase.tsx`** (half-width tiles)

- Add a new `heroHeadline` prop and a `supportingText` prop.
- Replace the current hover text block: instead of showing the large `title` + subline + area + year, show:
  - Hero headline at `text-xl md:text-2xl` font-heading
  - Supporting text below in `text-xs uppercase tracking-widest`
- Both hidden by default (opacity-0), fade in on group-hover (600ms ease-in-out).

**File: `src/pages/Index.tsx`** — pass new props to each `EditorialCase`:
- SHARE: headline="Making 'helping' the most desirable product on the shelf.", supporting="SHARE . Brand"
- MAN: headline="A focused digital presence for a global transport brand.", supporting="MAN . Brand & Digital"
- BMW: headline="Staying ahead, globally.", supporting="BMW . Campaign"
- DRIVELOG: headline="From idea to product -- a pragmatic mobility solution.", supporting="DRIVELOG . Product"

---

### 4. Statement Lines

Already at 200px via inline styles. Will add the `#05060A` background color (see item 1).

---

### 5. Burger Menu Always Visible

**File: `src/components/Layout.tsx`**

- Change the `<header>` from `absolute` to `fixed` positioning so it stays visible on scroll at all times.

---

### 6. Hero Section

No "-- Henrik Lehtikangas" attribution line currently exists in the code (was already removed in a prior edit). Will verify and confirm -- no change needed.

---

### 7. About Section -- Copy

**File: `src/pages/Index.tsx`**

Replace the About section right-side copy:
- Remove the `<h2>Henrik</h2>` headline.
- Replace body paragraphs with the exact provided text, with "Let's talk." as a `<Link to="/contact">`.
- Keep "More about me" and "Contact me" links.

---

### 8. About Section -- Assets

**File: `src/pages/Index.tsx`**

- Replace portrait: change from imported `profileImg` to `/HenrikLehtikangas-profilepicture.webp`.
- Remove `rounded-full` and `overflow-hidden` from the portrait wrapper so the image displays as-is (no circular crop).
- Replace the three `<Blob>` components with `<img>` tags for `/blob-brand.svg`, `/blob-product.svg`, `/blob-campaign.svg`.
- Position blobs in a relative container clustered bottom-left of the portrait using absolute positioning.

---

### 9. Blob Interactions

**File: `src/pages/Index.tsx`**

- Replace the `Blob` component with a new component that:
  - Renders an `<img>` tag for the SVG blob.
  - On hover: applies pink tint overlay (`#ECA9CC` at 15% opacity) via a pseudo-element or wrapper, `scale(1.03)`, transition 300ms ease.
  - On hover: also changes the "Contact me" link color to `#ECA9CC` (use React state to track any blob hover).
  - On click: navigates to `/contact`.
  - Cursor: pointer.

---

### 10. Footer CTA

**File: `src/components/Layout.tsx`**

- The footer currently shows "Let's talk." when no theme is set (homepage) and "I'm available for work." on themed pages. Change the themed version to also just say "Let's talk."

---

### Summary of Files Changed

| File | Changes |
|---|---|
| `src/pages/Index.tsx` | Background color, statement bg, ABB hover text, EditorialCase props, About section copy/assets/blobs, blob interactions |
| `src/components/EditorialCase.tsx` | New `heroHeadline` + `supportingText` props, updated hover text rendering |
| `src/components/Layout.tsx` | Fixed header, footer CTA text |
| `src/data/cases.ts` | Verify image paths (minor if any) |

