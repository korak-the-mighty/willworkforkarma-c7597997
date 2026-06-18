const modules = import.meta.glob('/content/homepage.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

interface HeroVariant {
  headline: string;
  subheadline?: string;
}

interface HomepageAbout {
  headline1: string;
  headline2: string;
  headline3: string;
  body: string[];
  cta: string;
  ctaSecondary: string;
}

interface HomepageContent {
  heroVariants: HeroVariant[];
  statements: { s1: string; s2: string; s3: string };
  about: HomepageAbout;
}

const DEFAULTS: HomepageContent = {
  heroVariants: [
    { headline: "I push vision, clarity and creative confidence.", subheadline: undefined },
  ],
  statements: {
    s1: "I help clients and teams see what actually matters.",
    s2: "I turn complexity into clear direction and action.",
    s3: "I inspire and lead creative work with relentless passion.",
  },
  about: {
    headline1: "A brand from scratch?",
    headline2: "A campaign platform?",
    headline3: "That app idea you've been sitting on?",
    body: [
      "I've been shaping visions into real brands for over twenty years.",
      "I'm ready to get excited about yours.",
    ],
    cta: "Let's talk.",
    ctaSecondary: "How I work →",
  },
};

function parseSection(raw: string, sectionName: string): Record<string, string> {
  const result: Record<string, string> = {};
  const sectionRegex = new RegExp(`##\\s+${sectionName}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`);
  const sectionMatch = raw.match(sectionRegex);
  if (!sectionMatch) return result;

  const block = sectionMatch[1];

  const literalRegex = /^(\w+):\s*\|\s*\n((?:[ \t]+[^\n]*\n|\n)*)/gm;
  let match;
  while ((match = literalRegex.exec(block)) !== null) {
    const rawLines = match[2].split('\n');
    while (rawLines.length && rawLines[rawLines.length - 1] === '') rawLines.pop();
    const indentedLines = rawLines.filter((l) => l.trim() !== '');
    const minIndent = Math.min(...indentedLines.map((l) => l.match(/^[ \t]*/)?.[0].length ?? 0));
    const dedented = rawLines.map((l) => (l.trim() === '' ? '' : l.slice(minIndent)));
    result[match[1]] = dedented.join('\n').trimEnd();
  }

  const simpleRegex = /^(\w+):\s*"?([^"\n]+)"?\s*$/gm;
  while ((match = simpleRegex.exec(block)) !== null) {
    if (!result[match[1]]) result[match[1]] = match[2].trim();
  }

  return result;
}

function extractHeroVariants(hero: Record<string, string>): HeroVariant[] {
  const variants: HeroVariant[] = [];
  let i = 1;
  while (hero[`headline${i}`]) {
    variants.push({
      headline: hero[`headline${i}`],
      subheadline: hero[`subheadline${i}`] || undefined,
    });
    i++;
  }
  return variants;
}

export function useHomepageContent(): HomepageContent {
  const raw = modules['/content/homepage.md'] as string ?? '';
  if (!raw) return DEFAULTS;

  const hero = parseSection(raw, "hero");
  const statements = parseSection(raw, "statements");
  const about = parseSection(raw, "about");

  const bodyRaw = about.body ?? "";
  const bodyParagraphs = bodyRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const heroVariants = extractHeroVariants(hero);

  return {
    heroVariants: heroVariants.length ? heroVariants : DEFAULTS.heroVariants,
    statements: {
      s1: statements.s1 ?? DEFAULTS.statements.s1,
      s2: statements.s2 ?? DEFAULTS.statements.s2,
      s3: statements.s3 ?? DEFAULTS.statements.s3,
    },
    about: {
      headline1: about.headline1 ?? DEFAULTS.about.headline1,
      headline2: about.headline2 ?? DEFAULTS.about.headline2,
      headline3: about.headline3 ?? DEFAULTS.about.headline3,
      body: bodyParagraphs.length ? bodyParagraphs : DEFAULTS.about.body,
      cta: about.cta ?? DEFAULTS.about.cta,
      ctaSecondary: about.ctaSecondary ?? DEFAULTS.about.ctaSecondary,
    },
  };
}
