import {
  CaseData,
  MediaItem,
  Section,
  HeroSection,
  TextSection,
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
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.+)$/);
    if (match) fields[match[1].trim()] = match[2].trim();
  }
  return fields;
}
function stripQuotes(value: string): string {
  return value.replace(/^["']|["']$/g, '');
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
  const type = fields.type as Section['type'];
  // Extract body text — lines that are not field definitions and not the mobile: block
  const bodyLines = block
    .split('\n')
    .filter((line) => {
      if (/^[a-zA-Z0-9_-]+:\s*.+$/.test(line)) return false;
      if (/^mobile:\s*$/.test(line)) return false;
      if (/^[ \t]+type:|^[ \t]+ref:/.test(line)) return false;
      return true;
    })
    .join('\n')
    .trim();
  const base = { id, body: bodyLines || undefined };
  switch (type) {
    case 'hero': {
      const bgMedia = resolveMedia(fields['background-image'], inventory);
      return {
        ...base,
        type: 'hero',
        headline: stripQuotes(fields.headline ?? ''),
        backgroundImage: bgMedia.url ?? '',
      } as HeroSection;
    }
    case 'text': {
      return { ...base, type: 'text' } as TextSection;
    }
    case 'scrolly': {
      const scrollMedia = resolveMedia(fields.ref, inventory);
      const mobileFallback = parseMobileFallback(block, inventory);
      const section: ScrollySection = {
        ...base,
        type: 'scrolly',
        ref: scrollMedia.ref ?? '',
        frames: scrollMedia.frames ?? 0,
        mobileFallback,
      };
      if (fields.mobileRef) {
        const mobileMedia = resolveMedia(fields.mobileRef, inventory);
        if (mobileMedia.ref) section.mobileRef = mobileMedia.ref;
        if (mobileMedia.frames != null) section.mobileFrames = mobileMedia.frames;
      }
      return section;
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
      sections.push(parseSection(sectionId, body, mediaInventory));
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
