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
  | 'text-media'
  | 'media'
  | 'scrolly'
  | 'gallery'
  | 'proof'
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
  isVideo?: boolean;
  title?: string;    // client name line
  subtitle?: string; // discipline · year line
}
export interface TextSection extends BaseSection {
  type: 'text';
  label?: string;
  statement?: string;
  tone?: 'default' | 'emphasis';
  centered?: boolean;
  tagline?: string;
  subhead?: string;
  body2?: string;
  list?: Array<{ tag: string; item: string }>;
}
export interface TextMediaSection extends BaseSection {
  type: 'text-media';
  mediaPosition: 'left' | 'right';
  label?: string;
  imageUrl?: string;
  videoUrl?: string;
  imageAlt?: string;
}

export interface MediaSection extends BaseSection {
  type: 'media';
  variant: 'full-bleed' | 'contained';
  imageUrl?: string;
  videoUrl?: string;
  alt?: string;
}

export interface ScrollySection extends BaseSection {
  type: 'scrolly';
  folderRef: string;     // resolved R2 folder path (e.g. "abb-mobilefly-frames/")
  frames: number;
  mobileFallback?: MobileFallback;
  mobileRef?: string;    // resolved R2 folder path for mobile scrolly frames
  mobileFrames?: number;
}
export interface GallerySection extends BaseSection {
  type: 'gallery';
  images: string[];      // resolved URLs
}
export interface ProofItem {
  src: string;
  alt: string;
  mobile: 'static' | 'pan-x'; // images only — videos are always static
  isVideo: boolean;
}
export interface ProofSection extends BaseSection {
  type: 'proof';
  variant: string;       // 'drift-images' is the only supported variant
  items: ProofItem[];
}
export interface CustomComponentSection extends BaseSection {
  type: 'custom-component';
  component: string;     // e.g. "LetsTalk"
}
export type Section =
  | HeroSection
  | TextSection
  | TextMediaSection
  | MediaSection
  | ScrollySection
  | GallerySection
  | ProofSection
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
