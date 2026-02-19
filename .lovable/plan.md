

# ABB E-mobility Case — Final Adjustments (with guardrails)

Five edits across `Layout.tsx` and `CaseABB.tsx`. Incorporates both guardrails.

---

## 1. Background Continuity Through Footer (backgroundColor only)

**Layout.tsx** -- Add optional `theme` prop. Only set `backgroundColor` on the wrapper via inline style. All text colors controlled exclusively via classes.

- `LayoutProps` gains `theme?: { bg: string }`
- Footer accepts same prop
- Outer `div`: `style={theme ? { backgroundColor: theme.bg } : undefined}`
- Footer text classes swap conditionally: `text-white`, `text-white/50`, `text-white/30` when themed; default `text-muted-foreground` etc. otherwise
- No `color` set in inline styles -- all text via Tailwind classes

**CaseABB.tsx** -- Pass `theme={{ bg: "#1E1E1E" }}` to Layout. Change inner wrapper from `bg-[#01031A]` to `bg-[#1E1E1E]`.

---

## 2. Footer Headline -- Avoid "Let's talk" Duplication

When `theme` is active (case pages), footer headline changes from:

> "I'm available for work. Let's talk."

to:

> "I'm available for work."

This avoids repetition with the new "Let's talk." CTA at the end of the case content. Non-themed pages keep the original headline.

---

## 3. Increase Case Body Typography

Add constant `BODY_TEXT = "text-[1.25rem] leading-[1.65]"` and apply to each body copy wrapper in Context, Tension, Decision, Execution, and Outcome sections. MicroLabels, hero, navigation, and footer unchanged.

---

## 4. Remove "What This Required" Section

Delete lines 299--307 (the entire section). Clean removal.

---

## 5. Add "Let's talk." CTA After Outcome

After the artifact row (line 296), insert:

```text
<section className="py-24 md:py-32">
  <div className="text-center">
    <Link to="/contact"
      className="font-heading text-2xl md:text-4xl tracking-tight text-white hover:opacity-60 transition-opacity">
      Let's talk.
    </Link>
  </div>
</section>
```

Import `Link` from `react-router-dom` at top of CaseABB.tsx.

---

## Technical: Layout.tsx Changes

```text
interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  theme?: { bg: string };
}

const Footer = ({ theme }: { theme?: { bg: string } }) => (
  <footer>
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start py-8 gap-6">
        <p className={`font-heading text-lg md:text-xl tracking-tight ${theme ? "text-white" : ""}`}>
          {theme ? "I'm available for work." : "I'm available for work. Let's talk."}
        </p>
        <div className="flex gap-8 text-sm">
          <Link ... className={`arrow-link transition-colors ${theme ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}>Work</Link>
          <!-- same pattern for About, Contact -->
        </div>
      </div>
      <div className="pb-8">
        <p className={`text-sm ${theme ? "text-white/30" : "text-muted-foreground"}`}>Privacy Policy</p>
      </div>
    </div>
  </footer>
);

const Layout = ({ children, fullWidth = false, theme }: LayoutProps) => {
  // ...
  return (
    <div className="flex min-h-screen flex-col"
         style={theme ? { backgroundColor: theme.bg } : undefined}>
      ...
      <Footer theme={theme} />
    </div>
  );
};
```

Key difference from previous plan: **no `color` in inline styles** -- only `backgroundColor`. All text colors use Tailwind classes.

---

## Summary

| Change | File | Detail |
|--------|------|--------|
| Theme prop (bg only) | Layout.tsx | `backgroundColor` inline, text via classes |
| Footer headline dedup | Layout.tsx | Conditional: drops "Let's talk." when themed |
| Body text bump | CaseABB.tsx | `text-[1.25rem] leading-[1.65]` on body wrappers |
| Remove "What this required" | CaseABB.tsx | Delete section lines 299-307 |
| Add "Let's talk." CTA | CaseABB.tsx | Centered Link to /contact after Outcome |
| Pass theme to Layout | CaseABB.tsx | `theme={{ bg: "#1E1E1E" }}` |

