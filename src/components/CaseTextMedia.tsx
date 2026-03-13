import { useState } from 'react';
import type { TextMediaSection } from '../types/case';
const BODY_TEXT = 'text-[1.25rem] leading-[1.65]';
const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);
export default function CaseTextMedia({ section }: { section: TextMediaSection }) {
  const [videoReady, setVideoReady] = useState(false);
  const isLeft = section.mediaPosition === 'left';
  const hasMedia = !!(section.imageUrl || section.videoUrl);
  const textCol = (
    <div className={`col-span-12 md:col-span-6 px-6 ${
      isLeft
        ? 'md:col-start-7 md:px-0 order-1 md:order-2'
        : 'md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4'
    }`}>
      {section.label && (
        <div className={isLeft ? 'hidden md:block' : ''}>
          <MicroLabel>{section.label}</MicroLabel>
        </div>
      )}
      <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
        {(section.body ?? '').split('\n').filter(l => l.trim()).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
  const mediaCol = hasMedia ? (
    <div className={`col-span-12 md:col-span-6 md:mt-48 ${
      isLeft ? 'order-2 md:order-1' : 'md:col-start-7'
    }`}>
      <div className={`${
        isLeft ? 'md:mr-auto md:w-[50vw]' : 'md:ml-auto md:w-[50vw]'
      } aspect-[3/2] overflow-hidden bg-muted`}>
        {section.videoUrl ? (
          <video
            src={section.videoUrl}
            autoPlay muted loop playsInline
            onCanPlay={() => setVideoReady(true)}
            className="h-full w-full object-cover"
            style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 400ms ease' }}
          />
        ) : (
          <img
            src={section.imageUrl}
            alt={section.imageAlt ?? ''}
            loading="eager"
            className="h-full w-full object-cover lazy-img"
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
          />
        )}
      </div>
    </div>
  ) : null;
  return (
    <section className="py-24 md:py-32 overflow-hidden">
      {isLeft && section.label && (
        <div className="px-6 md:hidden mb-6">
          <MicroLabel>{section.label}</MicroLabel>
        </div>
      )}
      <div className="grid grid-cols-12 gap-8 items-start">
        {isLeft ? <>{mediaCol}{textCol}</> : <>{textCol}{mediaCol}</>}
      </div>
    </section>
  );
}
