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
  const heroRegex = /##\s+section-hero[\s\S]*?headline:\s*"?([^\n"]+)"?[\s\S]*?subtitle:\s*"?([^\n"]+)"?/;
  const match = raw.match(heroRegex);
  return {
    headline: match?.[1]?.trim() ?? "",
    subtitle: match?.[2]?.trim() ?? "",
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
