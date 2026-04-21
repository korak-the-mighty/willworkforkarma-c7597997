import { useState } from 'react';
import type { CampaignSection } from '../types/case';

const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-2">
    {children}
  </p>
);

export default function CaseCampaign({ section }: { section: CampaignSection }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = section.media[activeIndex];

  if (!activeItem) return null;

  return (
    <section className="py-24 px-6 md:px-16">
      <div className="mb-12">
        {section.label && <MicroLabel>{section.label}</MicroLabel>}
        {section.title && (
          <p className="font-heading text-2xl text-white">{section.title}</p>
        )}
        {section.description && (
          <p className="text-white/50 text-sm mt-3">{section.description}</p>
        )}
      </div>

      <div className="aspect-video w-[90%] mx-auto mb-6">
        {activeItem.type === 'youtube' && (
          <iframe
            key={activeItem.id}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeItem.id}`}
            title={activeItem.label ?? ''}
            frameBorder="0"
            allowFullScreen
          />
        )}
        {activeItem.type === 'video' && (
          <video
            key={activeItem.src}
            src={activeItem.src}
            controls
            className="w-full h-full object-cover"
          />
        )}
        {activeItem.type === 'image' && (
          <img
            key={activeItem.src}
            src={activeItem.src}
            alt={activeItem.label ?? ''}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {section.media.length > 1 && (
        <div className="flex gap-8 justify-center mt-4">
          {section.media.map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`text-sm pb-1 transition-colors ${
                activeIndex === i
                  ? 'text-white border-b border-white'
                  : 'text-white/40'
              }`}
            >
              {item.label ?? `Item ${i + 1}`}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
