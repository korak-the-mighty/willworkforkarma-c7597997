/**
 * Global lazy-image loader.
 *
 * Watches every `img.lazy-img` element via IntersectionObserver.
 * When an image enters the viewport:
 *   - If already loaded (cached hard-refresh), add "loaded" immediately.
 *   - Otherwise, add "loaded" once the load event fires.
 *   - Always add "loaded" on error so broken images are never invisible.
 *
 * A MutationObserver re-scans the DOM when React adds new nodes (route
 * changes, dynamic content), so every page is covered without per-component
 * wiring.
 */

function markLoaded(img: HTMLImageElement) {
  img.classList.add('loaded');
}

function watchImage(img: HTMLImageElement, io: IntersectionObserver) {
  if (img.dataset.lazyWatched) return;
  img.dataset.lazyWatched = '1';
  io.observe(img);
}

export function initLazyImages(): void {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const img = entry.target as HTMLImageElement;
        io.unobserve(img);

        if (img.complete) {
          markLoaded(img);
        } else {
          img.addEventListener('load', () => markLoaded(img), { once: true });
          img.addEventListener('error', () => markLoaded(img), { once: true });
        }
      });
    },
    { rootMargin: '200px' }
  );

  function scan() {
    document.querySelectorAll<HTMLImageElement>('img.lazy-img').forEach((img) => {
      watchImage(img, io);
    });
  }

  // Pick up images already in the DOM at init time.
  scan();

  // Pick up images added later by React (route changes, dynamic renders).
  const mo = new MutationObserver(scan);
  mo.observe(document.body, { childList: true, subtree: true });
}
