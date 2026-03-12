import React from 'react';
import { Section, HeroSection, TextSection, ScrollySection as ScrollySectionType, GallerySection, CustomComponentSection } from '../types/case';
// Real component imports go here — only from Step 1 findings
// ScrollyVideoSection exists at ./ScrollyVideoSection but props (manifestUrl, basePath)
// do not match ScrollySectionType (ref, frames) — wiring deferred.
// CaseHeroMedia exists at ./CaseHeroMedia but expects CaseHeroMediaType from @/data/cases
// not HeroSection from ../types/case — wiring deferred.
// CaseGallery exists at ./CaseGallery but accepts no props — wiring deferred.
// No LetsTalk component found in Step 1 grep.
const CUSTOM_COMPONENTS: Record<string, React.ComponentType> = {
  // No LetsTalk component found in codebase — populate when component is added.
};

interface CaseSectionProps {
  section: Section;
}

export function CaseSection({ section }: CaseSectionProps) {
  switch (section.type) {
    case 'hero': {
      // TODO: wire to real hero component — confirm props first
      return null;
    }
    case 'text': {
      // TODO: wire to real text section component — confirm props first
      return null;
    }
    case 'scrolly': {
      // TODO: wire to real ScrollySection — confirm props first
      return null;
    }
    case 'gallery': {
      // TODO: wire to real gallery component — confirm props first
      return null;
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
