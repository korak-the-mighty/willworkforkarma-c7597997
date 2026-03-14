import React from 'react';
import { Section, HeroSection, TextSection, TextMediaSection, MediaSection, ScrollySection as ScrollySectionType, GallerySection, CustomComponentSection } from '../types/case';
import CaseHeroMedia from './CaseHeroMedia';
import CaseTextBlock from './CaseTextBlock';
import CaseTextMedia from './CaseTextMedia';
import CaseMedia from './CaseMedia';
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
          isVideo={s.isVideo}
          title={s.title}
          subtitle={s.subtitle}
        />
      );
    }
    case 'text': {
      return <CaseTextBlock section={section as TextSection} />;
    }
    case 'text-media': {
      return <CaseTextMedia section={section as TextMediaSection} />;
    }
    case 'media': {
      return <CaseMedia section={section as MediaSection} />;
    }
    case 'scrolly': {
      const s = section as ScrollySectionType;
      return (
        <ScrollyVideoSection
          folderRef={s.ref}
          frames={s.frames}
          mobileRef={s.mobileRef}
          mobileFrames={s.mobileFrames}
        />
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
