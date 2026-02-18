

# Refinement Pass — Homepage Adjustments

Four precise corrections. No structural changes.

---

## Changes

### 1. ABB E-mobility — Center title block

**File: `src/pages/Index.tsx` (lines 70-80)**

Change the inner positioning div from `flex-col justify-end p-8 md:p-16` to `flex-col items-center justify-center text-center`. This centers the title, subline, area, and year both horizontally and vertically within the hero project container.

The hover-reveal row also gets `justify-center` so the metadata stays centered below the title.

### 2. About Section — Remove button-like styling from blobs

The Blob component (lines 24-43) already uses inline JS for hover effects (translateY, scale, shadow) and has no click handlers. However, the `cursor` defaults to text. To further remove any button-like impression:

- Add `cursor-default` to the blob className
- The hover behavior is already correct per spec (translateY -3px, scale 1.02, soft shadow, 260ms cubic-bezier)
- No other changes needed — the layout already matches the two-column reference with portrait left and copy right

### 3. Arrow-link consistency — Add class to footer links

**File: `src/components/Layout.tsx` (lines 31-33)**

Footer nav links currently use plain styling without the `arrow-link` class. Add `arrow-link` to each footer link so they get the same slide-in arrow + micro-bounce hover behavior as the rest of the site.

### 4. Remove footer border-top divider

**File: `src/components/Layout.tsx` (line 24)**

Remove `border-t border-border` from the `<footer>` element. The spacing between Karma and footer remains generous without a hard line.

---

## Technical Details

### ABB title centering (Index.tsx line 70)
```text
Before: className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16"
After:  className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
```

Also center the hover metadata row (line 75):
```text
Before: className="hidden md:flex mt-4 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
After:  className="hidden md:flex mt-4 gap-4 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
```

### Blob cursor fix (Index.tsx line 26)
Add `cursor-default` to existing className string.

### Footer links with arrow-link (Layout.tsx lines 31-33)
```text
Before: className="text-muted-foreground hover:text-foreground transition-colors"
After:  className="arrow-link text-muted-foreground hover:text-foreground transition-colors"
```

### Footer divider removal (Layout.tsx line 24)
```text
Before: <footer className="border-t border-border">
After:  <footer>
```
