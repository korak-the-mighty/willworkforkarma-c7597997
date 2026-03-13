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
