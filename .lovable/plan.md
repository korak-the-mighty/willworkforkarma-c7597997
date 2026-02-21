

# Simplify `reducedMotion` to a plain const

**File**: `src/components/ScrollyVideoSection.tsx`

## Change

Replace lines 19-21:

```typescript
const [reducedMotion] = useState(
  () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
);
```

With:

```typescript
const reducedMotion = typeof window !== "undefined"
  && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

Nothing else changes. The `useState` import stays (used by `track`, `fallback`, `seekableReady`).

