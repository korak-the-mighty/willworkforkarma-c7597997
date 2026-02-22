NUKE TEST: Eliminate All Background Banding Sources

Temporary diagnostic to confirm perfectly uniform #101010 background. Minimize moving parts.

1) src/components/CaseSectionWrapper.tsx — disable all tone backgrounds

Set all tone classes to empty strings:

- default: ""

- subtle: ""

- emphasis: ""

Result: wrapper never paints any background.

2) src/components/CaseHeroMedia.tsx — remove ALL brightness/filter behavior for test

On both <video> and <img>:

- Remove brightness-75

- Remove hover:brightness-* (for the test)

- Keep only: transition-[filter] duration-300 IF needed, otherwise remove transition too.

Goal: media does not alter perceived background via default dimming or hover.

3) src/pages/CaseABB.tsx — remove ALL brightness/filter behavior for test

Update MEDIA_HOVER constant to empty string ("") or remove it from media elements.

Goal: no default dimming, no hover brighten on ABB page media during test.

Acceptance:

- Scrolling ABB case shows a perfectly uniform background (#101010) with no horizontal bands, even when moving the mouse around.

Next:

- If bands disappear → reintroduce features one-by-one (tones first, then hover).

- If bands persist → a stray bg exists elsewhere; locate via DevTools computed background-color on the band area.