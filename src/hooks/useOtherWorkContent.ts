import type { OtherWorkItem } from '@/data/otherWork';

const R2 = 'https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev';

const files = import.meta.glob('/content/otherwork.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseOtherWork(raw: string): OtherWorkItem[] {
  const items: OtherWorkItem[] = [];
  const blocks = raw.split(/^---$/m).map(b => b.trim()).filter(Boolean);

  for (const block of blocks) {
    if (block.startsWith('#') || block.startsWith('<!--')) continue;

    const get = (key: string): string => {
      const match = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
      return match ? match[1].trim() : '';
    };

    const client = get('client');
    if (!client) continue;

    const imagesRaw = get('images');
    const imageNames = imagesRaw ? imagesRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
    const images = imageNames.map(name => `${R2}/otherwork/${name}.webp`);

    items.push({
      client,
      title: get('title'),
      what: get('what'),
      year: get('year'),
      color: get('color') || '#1a1a1a',
      heroImage: images.length > 0 ? images[0] : undefined,
      images: images.length > 1 ? images : undefined,
    });
  }

  return items;
}

let cached: OtherWorkItem[] | null = null;

export function useOtherWorkContent(): OtherWorkItem[] {
  if (cached) return cached;
  const raw = Object.values(files)[0] as string;
  if (!raw) return [];
  cached = parseOtherWork(raw);
  return cached;
}
