import {
  CaseData,
  MediaItem,
  Section,
  HeroSection,
  TextSection,
  TextMediaSection,
  MediaSection,
  ScrollySection,
  GallerySection,
  CustomComponentSection,
  MobileFallback,
} from '../types/case';
// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function resolveMedia(id: string, inventory: MediaItem[]): MediaItem {
  const item = inventory.find((m) => m.id === id);
  if (!item) throw new Error(`Media id "${id}" not found in inventory`);
  return item;
}
function parseFields(block: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const lines = block.split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (match) fields[match[1].trim()] = match[2].trim();
  }
  return fields;
}
function stripQuotes(value: string): string {
  return value.replace(/^["']|["']$/g, '');
}
function cleanBody(value: string): string {
  return value.replace(/^---\s*$/gm, '').trim();
}
function parseImageList(value: string): string[] {
  // Parses "[editorial-01, editorial-02]" into ["editorial-01", "editorial-02"]
  return value
    .replace(/[\[\]]/g, '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const kv = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (kv) data[kv[1].trim()] = kv[2].trim();
  }
  return { data, content: match[2] };
}
// ------------------------------------------------------------
// Media inventory parser
// ------------------------------------------------------------
function parseMediaInventory(block: string): MediaItem[] {
  const items: MediaItem[] = [];
  // Each item starts with "- id:"
  const chunks = block.split(/\n(?=- id:)/);
  for (const chunk of chunks) {
    const fields = parseFields(chunk.replace(/^-\s*/, ''));
    if (!fields.id || !fields.type) continue;
    const item: MediaItem = {
      id: fields.id,
      type: fields.type as MediaItem['type'],
    };
    if (fields.url) item.url = fields.url;
    if (fields.poster) item.poster = fields.poster;
    if (fields.ref) item.ref = fields.ref;
    if (fields.frames) item.frames = parseInt(fields.frames, 10);
    items.push(item);
  }
  return items;
}
// ------------------------------------------------------------
// Section parser
// ------------------------------------------------------------
// Parses "BUILT::The modular foundation||ESTABLISHED::A scalable system" into array
function parseList(value: string): Array<{ tag: string; item: string }> | undefined {
  if (!value || !value.includes('::')) return undefined;
  return value.split('||').map(pair => {
    const [tag, ...rest] = pair.split('::');
    return { tag: (tag ?? '').trim(), item: rest.join('::').trim() };
  }).filter(e => e.tag);
}

function parseMobileFallback(
  block: string,
  inventory: MediaItem[]
): MobileFallback | undefined {
  // Looks for indented mobile: block inside a section
  const mobileMatch = block.match(/^mobile:\s*\n((?:[ \t]+.+\n?)+)/m);
  if (!mobileMatch) return undefined;
  const fields = parseFields(mobileMatch[1]);
  if (!fields.ref) return undefined;
  const media = resolveMedia(fields.ref, inventory);
  if (!media.url) return undefined;
  return { type: 'image', url: media.url };
}
function parseSection(
  id: string,
  block: string,
  inventory: MediaItem[]
): Section {
  const fields = parseFields(block);
  const type = (fields.type ?? '').trim() as Section['type'];
  // Extract body text — lines that are not field definitions and not the mobile: block
  const bodyLines = block
    .split('\n')
    .filter((line) => {
      if (/^[a-zA-Z0-9_-]+:\s*.+$/.test(line)) return false;
      if (/^mobile:\s*$/.test(line)) return false;
      if (/^[ \t]+type:|^[ \t]+ref:/.test(line)) return false;
      if (line.trim() === '---') return false;
      return true;
    })
    .join('\n')
    .trim();
  const base = { id, body: bodyLines ? cleanBody(bodyLines) : undefined };
  switch (type) {
    case 'hero': {
      const bgMedia = resolveMedia(fields['background-image'], inventory);
      return {
        ...base,
        type: 'hero',
        headline: stripQuotes(fields.headline ?? ''),
        backgroundImage: bgMedia.url ?? '',
        isVideo: bgMedia.type === 'video',
        title: fields.title ? stripQuotes(fields.title) : undefined,
        subtitle: fields.subtitle ? stripQuotes(fields.subtitle) : undefined,
      } as HeroSection;
    }
    case 'text': {
      return {
        ...base,
        type: 'text',
        label: fields.label ? cleanBody(stripQuotes(fields.label)) : undefined,
        statement: fields.statement ? cleanBody(stripQuotes(fields.statement)) : undefined,
        tone: (fields.tone as TextSection['tone']) ?? undefined,
        centered: fields.centered === 'true',
        tagline: fields.tagline ? cleanBody(stripQuotes(fields.tagline)) : undefined,
        subhead: fields.subhead ? cleanBody(stripQuotes(fields.subhead)) : undefined,
        body2: fields.body2 ? cleanBody(stripQuotes(fields.body2)) : undefined,
        list: fields.list ? parseList(fields.list) : undefined,
      } as TextSection;
    }
    case 'scrolly': {
      const scrollMedia = resolveMedia(fields.ref, inventory);
      const mobileFallback = parseMobileFallback(block, inventory);
      const section: ScrollySection = {
        ...base,
        type: 'scrolly',
        folderRef: scrollMedia.ref ?? '',
        frames: Number(scrollMedia.frames ?? 0),
        mobileFallback,
      };
      if (fields.mobileRef) {
        const mobileMedia = resolveMedia(fields.mobileRef, inventory);
        if (mobileMedia.ref) section.mobileRef = mobileMedia.ref;
        if (mobileMedia.frames != null) section.mobileFrames = Number(mobileMedia.frames);
      }
      return section;
    }
    case 'text-media': {
      const imgMedia = fields.image ? resolveMedia(fields.image, inventory) : null;
      const vidMedia = fields.video ? resolveMedia(fields.video, inventory) : null;
      if (imgMedia && vidMedia) {
        console.warn(`Section "${id}": both image and video provided for text-media — video will be used`);
      }
      return {
        ...base,
        type: 'text-media',
        mediaPosition: (fields.mediaPosition as 'left' | 'right') ?? 'right',
        label: fields.label ? stripQuotes(fields.label) : undefined,
        imageUrl: imgMedia?.url,
        videoUrl: vidMedia?.url,
        imageAlt: imgMedia ? (fields['image-alt'] ?? '') : undefined,
      } as TextMediaSection;
    }
    case 'media': {
      const imgM = fields.image ? resolveMedia(fields.image, inventory) : null;
      const vidM = fields.video ? resolveMedia(fields.video, inventory) : null;
      return {
        ...base,
        type: 'media',
        variant: (fields.variant as 'full-bleed' | 'contained') ?? 'full-bleed',
        imageUrl: imgM?.url,
        videoUrl: vidM?.url,
        alt: fields.alt !== undefined ? fields.alt : (imgM || vidM ? '' : undefined),
      } as MediaSection;
    }
    case 'gallery': {
      const imageIds = parseImageList(fields.images ?? '');
      const urls = imageIds.map((imgId) => {
        const media = resolveMedia(imgId, inventory);
        return media.url ?? '';
      });
      return { ...base, type: 'gallery', images: urls } as GallerySection;
    }
    case 'custom-component': {
      return {
        ...base,
        type: 'custom-component',
        component: fields.component ?? '',
      } as CustomComponentSection;
    }
    default:
      console.warn(`[parseCaseContent] Unknown section type "${type}" in section "${id}" — section skipped`);
      throw new Error(`Unknown section type "${type}" in section "${id}"`);
  }
}
// ------------------------------------------------------------
// Main export
// ------------------------------------------------------------
export function parseCaseContent(raw: string): CaseData {
  // Step 1: Parse top frontmatter
  const { data: frontmatter, content } = parseFrontmatter(raw);
  // Step 2: Split content into named blocks on ## headings
  const blocks = content.split(/^## /m).filter(Boolean);
  let mediaInventory: MediaItem[] = [];
  const sections: Section[] = [];
  for (const block of blocks) {
    const newlineIndex = block.indexOf('\n');
    const heading = block.slice(0, newlineIndex).trim();
    const body = block.slice(newlineIndex + 1).trim();
    if (heading === 'Media Inventory') {
      // Strip any trailing --- separator
      const inventoryBody = body.split(/^---\s*$/m)[0].trim();
      mediaInventory = parseMediaInventory(inventoryBody);
      continue;
    }
    if (heading.startsWith('section-')) {
      const sectionId = heading; // e.g. "section-hero"
      try {
        sections.push(parseSection(sectionId, body, mediaInventory));
      } catch (err) {
        const msg = `[parseCaseContent] Failed to parse section "${sectionId}": ${String(err)}`;
        console.error(msg);
        if (typeof window !== 'undefined') {
          (window as any).__parseErrors = (window as any).__parseErrors ?? [];
          (window as any).__parseErrors.push(msg);
        }
      }
      continue;
    }
  }
  return {
    slug: frontmatter.slug ?? '',
    route: frontmatter.route ?? '',
    status: frontmatter.status ?? 'draft',
    mediaInventory,
    sections,
  };
}
