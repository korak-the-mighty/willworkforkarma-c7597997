const modules = import.meta.glob('/content/cases/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

interface CaseHero {
  headline: string;
  subtitle: string;
}

type CaseHeroMap = Record<string, CaseHero>;

function parseCaseHero(raw: string): CaseHero {
  // Extract the section-hero block (up to the next ## section or end of file)
  const blockMatch = raw.match(/##\s+section-hero\s*\n([\s\S]*?)(?=\n##\s|$)/);
  const block = blockMatch?.[1] ?? "";

  // Match each field independently within the block
  const headlineMatch = block.match(/^headline:\s*"?([^\n"]+)"?\s*$/m);
  const subtitleMatch = block.match(/^subtitle:\s*"?([^\n"]+)"?\s*$/m);

  return {
    headline: headlineMatch?.[1]?.trim() ?? "",
    subtitle: subtitleMatch?.[1]?.trim() ?? "",
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
