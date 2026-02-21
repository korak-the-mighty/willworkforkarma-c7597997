
# Editorial Stagger — Tension + Decision Spacing

Three edits in `src/pages/CaseABB.tsx`. No other files.

---

## 1. Tension Section — Stagger Video Down

Mirror the Context approach: push the video (left column) much further down so text is read first.

- **Line 116**: Change `md:mt-20` to `md:mt-48` on the video column, matching the Context image offset.
- **Line 128**: Widen the text column from `md:col-span-4 md:col-start-8` to `md:col-span-5 md:col-start-8` for more breathing room.
- Add `pb-16 md:pb-24` to the last text group ("Innovation existed. / The system to show it didn't.") so the text block has generous trailing space before the video catches up.

This creates the same "read first, then discover the media" editorial stagger used in Context.

---

## 2. Decision Section — Space After "Beyond Corporate Constraints"

- **Line 181**: Increase the gap between "beyond corporate constraints." and the full-bleed image from `mt-16` to `mt-32 md:mt-40`.

This gives that final Decision sentence room to breathe before the image arrives.

---

## Summary

| Edit | Line | Change |
|------|------|--------|
| Tension video offset | 116 | `md:mt-20` to `md:mt-48` |
| Tension text width | 128 | `md:col-span-4` to `md:col-span-5` |
| Tension trailing space | 144-147 | Add `pb-16 md:pb-24` to last text group |
| Decision image gap | 181 | `mt-16` to `mt-32 md:mt-40` |
