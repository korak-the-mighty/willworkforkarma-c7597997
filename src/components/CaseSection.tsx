import React from 'react';
import { Section, HeroSection, ScrollySection as ScrollySectionType, GallerySection, CustomComponentSection } from '../types/case';
import CaseHeroMedia from './CaseHeroMedia';
import ScrollyVideoSection from './ScrollyVideoSection';
import CaseGallery from './CaseGallery';
import { LetsTalk } from './LetsTalk';

const CUSTOM_COMPONENTS: Record<string, React.ComponentType> = {
  LetsTalk,
};

interface CaseSectionProps {
  section: Section;
}

export function CaseSection({ section }: CaseSectionProps) {
  switch (section.type) {
    case 'hero': {
      const s = section as HeroSection;
      return (
        <CaseHeroMedia
          headline={s.headline}
          backgroundImage={s.backgroundImage}
        />
      );
    }
    case 'text': {
      if (!section.body) return null;
      return (
        <p className="text-[1.25rem] leading-[1.65]">{section.body}</p>
      );
    }
    case 'scrolly': {
      const s = section as ScrollySectionType;
      return (
        <>
          <div className="hidden md:block">
            <ScrollyVideoSection folderRef={s.ref} frames={s.frames} mobileRef={undefined} mobileFrames={undefined} />
          </div>
          {s.mobileFallback && (
            <div className="block md:hidden">
              <img src={s.mobileFallback.url} alt="" className="w-full" />
            </div>
          )}
        </>
      );
    }
    case 'gallery': {
      const s = section as GallerySection;
      return <CaseGallery images={s.images} />;
    }
    case 'custom-component': {
      const s = section as CustomComponentSection;
      const Component = CUSTOM_COMPONENTS[s.component];
      if (!Component) return null;
      return <Component />;
    }
    default:
      return null;
  }
}
