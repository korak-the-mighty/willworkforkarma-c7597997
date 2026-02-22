

## Fix: Remove 3 Background Offenders Identified by bgdebug

The scanner found exactly 3 offending elements. All are identified, all have specific fixes.

### Offenders

| # | Element | Computed BG | Source | Cause |
|---|---------|------------|--------|-------|
| 1 | Scrolly wrapper div | `rgb(30, 30, 30)` / `#1E1E1E` | `ScrollyVideoSection.tsx` line 224 | `bg-[#1E1E1E]` class |
| 2 | Scrolly inner full-bleed div | `rgb(30, 30, 30)` / `#1E1E1E` | `ScrollyVideoSection.tsx` line 227 | `bg-[#1E1E1E]` class |
| 3 | Hero video overlay | `rgba(0, 0, 0, 0.35)` | `CaseABB.tsx` line 62 | `bg-black/35` class |

### Fixes

#### 1. `src/components/ScrollyVideoSection.tsx`

**Line 224** (main wrapper div): Replace `bg-[#1E1E1E]` with `bg-transparent` and add inline transparency.

Change:
```
className="relative bg-[#1E1E1E]"
```
To:
```
className="relative bg-transparent"
style={track ? { height: `calc(100vh + ${track}px)`, backgroundColor: "transparent" } : { height: "100vh", backgroundColor: "transparent" }}
```
(Merge the existing inline style with backgroundColor.)

**Line 227** (inner full-bleed div): Same treatment.

Change:
```
className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen bg-[#1E1E1E]"
```
To:
```
className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-screen bg-transparent"
style={{ backgroundColor: "transparent" }}
```

**Lines 199, 209, 213** (fallback states): Also replace `bg-[#1E1E1E]` with `bg-transparent` in the reduced-motion, error, and frame-missing fallback returns. These are less critical but should be consistent.

#### 2. `src/pages/CaseABB.tsx`

**Line 62** (hero overlay): This is a semi-transparent scrim over the hero video. It is intentional design (darkens the video for text readability), but the scanner flags it because it paints a non-base background.

This one is a judgment call. Two options:
- **Option A (recommended)**: Leave it as-is. It is a legitimate overlay on a video, not a page-level container creating bands. The scanner should skip it. We update the scanner to also skip elements that have a semi-transparent background (alpha < 1) since those are overlays, not bands.
- **Option B**: Keep as-is and accept the scanner will report 1 "expected" offender.

I recommend Option A: add a guard in the Layout.tsx scanner to skip backgrounds with alpha < 1 (they are overlays/scrims, not band-causing containers).

### Technical Details

#### ScrollyVideoSection.tsx changes (5 locations)

```
Line 199: bg-[#1E1E1E] -> bg-transparent
Line 209: bg-[#1E1E1E] -> bg-transparent  
Line 213: bg-[#1E1E1E] -> bg-transparent
Line 224: bg-[#1E1E1E] -> bg-transparent + style={{ backgroundColor: "transparent" }}
Line 227: bg-[#1E1E1E] -> bg-transparent + style={{ backgroundColor: "transparent" }}
```

#### Layout.tsx scanner enhancement (1 addition)

Add after the `position: fixed` guard:

```typescript
// Skip semi-transparent overlays (scrims, tints) — they don't cause bands
if (bg.startsWith("rgba") && !bg.endsWith(", 1)")) return;
```

### Expected Result After Fix

- bgdebug reports **0 offenders**
- No red outlines
- No horizontal gray bands in the scrolly section
- Hero overlay still works visually (just not flagged)
- Canvas still renders frames correctly (canvas itself is already skipped by the scanner)

### Files Modified

| File | Change |
|------|--------|
| `src/components/ScrollyVideoSection.tsx` | Replace all `bg-[#1E1E1E]` with `bg-transparent` + inline transparency |
| `src/components/Layout.tsx` | Add rgba/semi-transparent skip guard to scanner |

