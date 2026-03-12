// ------------------------------------------------------------
// Media types
// ------------------------------------------------------------
export type MediaType = 'image' | 'video' | 'scrolly';
export interface MediaItem {
  id: string;
  type: MediaType;
  url?: string;          // image and video
  poster?: string;       // video only
  ref?: string;          // scrolly only — points to R2 folder
  frames?: number;       // scrolly only — frame count
}
// ------------------------------------------------------------
// Section types
// ------------------------------------------------------------
export type SectionType =
  | 'hero'
  | 'text'
  | 'scrolly'
  | 'gallery'
  | 'custom-component';
export interface MobileFallback {
  type: 'image';
  url: string;
}
export interface BaseSection {
  id: string;
  type: SectionType;
  body?: string;         // markdown body text, text sections only
}
export interface HeroSection extends BaseSection {
  type: 'hero';
  headline: string;
  backgroundImage: string; // resolved URL
}
export interface TextSection extends BaseSection {
  type: 'text';
}
export interface ScrollySection extends BaseSection {
  type: 'scrolly';
  ref: string;           // resolved R2 folder URL
  frames: number;
  mobileFallback?: MobileFallback;
}
export interface GallerySection extends BaseSection {
  type: 'gallery';
  images: string[];      // resolved URLs
}
export interface CustomComponentSection extends BaseSection {
  type: 'custom-component';
  component: string;     // e.g. "LetsTalk"
}
export type Section =
  | HeroSection
  | TextSection
  | ScrollySection
  | GallerySection
  | CustomComponentSection;
// ------------------------------------------------------------
// Top-level case data
// ------------------------------------------------------------
export interface CaseData {
  slug: string;
  route: string;
  status: 'live' | 'placeholder' | 'draft';
  mediaInventory: MediaItem[];
  sections: Section[];
}
