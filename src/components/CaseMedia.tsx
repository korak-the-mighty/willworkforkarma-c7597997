import type { MediaSection } from '../types/case';
import FeaturedMediaSection from './FeaturedMediaSection';
const FULL_BLEED = 'relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen';
export default function CaseMedia({ section }: { section: MediaSection }) {
  const src = section.imageUrl || section.videoUrl;
  if (!src) return null;
  if (section.variant === 'full-bleed') {
    return (
      <FeaturedMediaSection
        src={src}
        alt={section.alt ?? ''}
        className={`${FULL_BLEED} mt-32 md:mt-40`}
      />
    );
  }
  if (section.variant === 'play-once') {
    return (
      <section className="w-full">
        <div className="relative w-full">
          <video
            ref={(el) => {
              if (!el) return;
              const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) el.play(); },
                { threshold: 0.3 }
              );
              observer.observe(el);
              el.addEventListener('ended', () => {
                const overlay = el.nextSibling as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              });
            }}
            src={src}
            muted
            playsInline
            className="w-full block"
          />
          <div
            style={{ opacity: 0, transition: 'opacity 0.8s ease' }}
            className="absolute inset-0 bg-black/80 flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              const overlay = e.currentTarget as HTMLElement;
              const video = overlay.previousSibling as HTMLVideoElement;
              overlay.style.opacity = '0';
              video.currentTime = 0;
              video.play();
            }}
          >
            <span className="text-[13px] uppercase tracking-[0.12em] text-white/50 hover:text-white transition-colors font-heading font-light">
              Replay
            </span>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="px-6 md:px-8 max-w-5xl mx-auto mt-16">
      <img
        src={src}
        alt={section.alt ?? ''}
        className="w-full object-cover lazy-img"
        onLoad={(e) => e.currentTarget.classList.add('loaded')}
      />
    </div>
  );
}
