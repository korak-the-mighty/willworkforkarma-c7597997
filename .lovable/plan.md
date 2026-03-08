

## Add "One View" Snapshot Feature to Share Case Page

Three changes total. No existing files modified except `CaseShare.tsx` (minimal additions only).

---

### 1. Install `dom-to-image-more` and `framer-motion`

Add both as dependencies. `dom-to-image-more` for PNG export, `framer-motion` for AnimatePresence enter/exit animations.

---

### 2. New File: `src/components/CaseSnapshot.tsx`

A full-screen overlay component receiving `{ title, contextLine, decisionLine, outcomeLine, images, onClose }`.

- **Container**: `fixed inset-0 z-50 bg-[#0A0A0A] overflow-auto p-8 md:p-16`
- **Title**: top-left, `font-heading text-4xl md:text-6xl font-light text-white` — animates in from top (`y: -100 → 0`)
- **Three labeled rows** (Context / Decision / Outcome): label `text-white/30 text-xs uppercase tracking-widest`, value `text-white text-lg` — each flies in from left (`x: -200 → 0`), staggered by 0.1s
- **Three images**: horizontal grid `grid grid-cols-3 gap-4`, `aspect-video object-cover`, all with `crossOrigin="anonymous"` — fly in from bottom (`y: 100 → 0`), staggered
- **Two buttons** bottom-center: "Download Snapshot" and "Back to Full Case" — fade in last (`opacity: 0 → 1`, delay ~0.8s)
- **Exit**: entire overlay `opacity → 0` via `framer-motion exit`
- **Download**: refs the snapshot container div, calls `domtoimage.toPng()` with proper options, triggers download as `share-snapshot.png`

---

### 3. Modified: `src/pages/CaseShare.tsx` (additions only)

- Import `useState` (already imported), `AnimatePresence` and `motion` from framer-motion, `CaseSnapshot`
- Add `const [isSnapshot, setIsSnapshot] = useState(false)`
- Wrap existing `<div className="text-white">` content with a motion.div that transitions opacity to 0 when `isSnapshot` is true (no unmount)
- Render `<AnimatePresence>{isSnapshot && <CaseSnapshot ... onClose={() => setIsSnapshot(false)} />}</AnimatePresence>` after the content div
- Add fixed bottom-right "One View" button: `fixed bottom-6 right-6 z-40 border border-white/20 text-white/40 hover:text-white hover:border-white/40 text-xs tracking-widest uppercase px-5 py-2.5 transition-colors` — hidden when snapshot is open

No existing copy, layout, structure, or styling is changed.

