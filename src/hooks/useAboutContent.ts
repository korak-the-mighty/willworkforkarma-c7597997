const modules = import.meta.glob('/content/about.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

interface AboutMain {
  headline: string;
  intro: string[];
}

interface AboutSection {
  headline: string;
  body: string[];
}

interface AboutContent {
  title: string;
  main: AboutMain;
  sections: AboutSection[];
  final: AboutSection;
}

const DEFAULTS: AboutContent = {
  title: "About",
  main: {
    headline: "I help people see what actually matters.",
    intro: ["I've spent more than twenty years helping brands, products and teams find clarity."],
  },
  sections: [],
  final: {
    headline: "I like creating with humans.",
    body: ["That's the kind of work I enjoy most."],
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

function toParagraphs(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function getTitle(raw: string): string {
  const titleMatch = raw.match(/^---[\s\S]*?title:\s*(.+?)\s*\n[\s\S]*?---/);
  return titleMatch ? titleMatch[1] : DEFAULTS.title;
}

export function useAboutContent(): AboutContent {
  const raw = modules['/content/about.md'] as string ?? '';
  if (!raw) return DEFAULTS;

  const title = getTitle(raw);

  const mainRaw = parseSection(raw, "main");
  const mainIntro = toParagraphs(mainRaw.intro);
  const main: AboutMain = {
    headline: mainRaw.headline ?? DEFAULTS.main.headline,
    intro: mainIntro.length ? mainIntro : DEFAULTS.main.intro,
  };

  const sections: AboutSection[] = [];
  let i = 1;
  while (true) {
    const sectionRaw = parseSection(raw, `section${i}`);
    if (!sectionRaw.headline) break;
    sections.push({
      headline: sectionRaw.headline,
      body: toParagraphs(sectionRaw.body),
    });
    i++;
  }

  const finalRaw = parseSection(raw, "final");
  const finalBody = toParagraphs(finalRaw.body);
  const final: AboutSection = {
    headline: finalRaw.headline ?? DEFAULTS.final.headline,
    body: finalBody.length ? finalBody : DEFAULTS.final.body,
  };

  return {
    title,
    main,
    sections: sections.length ? sections : DEFAULTS.sections,
    final,
  };
}
