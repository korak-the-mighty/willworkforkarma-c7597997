const modules = import.meta.glob('/content/cases/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

interface CaseHero {
  title: string;
  headline: string;
  subtitle: string;
  summary: string;
  year: string;
  thumbnail: string;
}

type CaseHeroMap = Record<string, CaseHero>;

function parseCaseHero(raw: string): CaseHero {
  // Extract frontmatter block (between leading --- delimiters)
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
  const frontmatter = frontmatterMatch?.[1] ?? "";

  // Extract the section-hero block (up to the next ## section or end of file)
  const blockMatch = raw.match(/##\s+section-hero\s*\n([\s\S]*?)(?=\n##\s|$)/);
  const block = blockMatch?.[1] ?? "";

  // Match each field independently within the block
  const titleMatch = block.match(/^title:\s*"?([^\n"]+)"?\s*$/m);
  const headlineMatch = block.match(/^headline:\s*"?([^\n"]+)"?\s*$/m);
  const subtitleMatch = block.match(/^subtitle:\s*"?([^\n"]+)"?\s*$/m);

  // summary and year live in frontmatter
  const summaryMatch = frontmatter.match(/^summary:\s*"?([^\n"]+)"?\s*$/m);
  const yearMatch = frontmatter.match(/^year:\s*"?([^\n"]+)"?\s*$/m);

  // Extract Media Inventory block and resolve thumb-img's url
  const inventoryMatch = raw.match(/##\s+Media Inventory\s*\n([\s\S]*?)(?=\n##\s|$)/);
  const inventoryBlock = inventoryMatch?.[1] ?? "";
  const thumbMatch = inventoryBlock.match(/-\s*id:\s*thumb-img[\s\S]*?url:\s*(\S+)/);

  return {
    title: titleMatch?.[1]?.trim() ?? "",
    headline: headlineMatch?.[1]?.trim() ?? "",
    subtitle: subtitleMatch?.[1]?.trim() ?? "",
    summary: summaryMatch?.[1]?.trim() ?? "",
    year: yearMatch?.[1]?.trim() ?? "",
    thumbnail: thumbMatch?.[1]?.trim() ?? "",
  };
}

export function useCaseHeroContent(): CaseHeroMap {
  const map: CaseHeroMap = {};

  for (const path in modules) {
    const raw = modules[path] as string ?? '';
    // Extract slug from path: /content/cases/abb-emobility.md -> abb-emobility
    const slug = path.replace('/content/cases/', '').replace('.md', '');
    map[slug] = parseCaseHero(raw);
  }

  return map;
}
