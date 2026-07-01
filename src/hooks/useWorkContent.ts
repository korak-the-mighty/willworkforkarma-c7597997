const modules = import.meta.glob('/content/work.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

interface WorkContent {
  headline: string;
  body: string[];
}

const DEFAULTS: WorkContent = {
  headline: "Selected Work.",
  body: [
    "These projects come from different industries, different clients and different challenges. Over the years, I've found that good ideas only work when everyone understands what matters and why.",
    "This is just a handful of projects from over 25 years of work. If you're curious about something closer to your business or industry, let's talk. I'd love to show you more.",
  ],
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

  return result;
}

export function useWorkContent(): WorkContent {
  const raw = modules['/content/work.md'] as string ?? '';
  if (!raw) return DEFAULTS;

  const intro = parseSection(raw, "intro");

  const bodyRaw = intro.body ?? "";
  const bodyParagraphs = bodyRaw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    headline: intro.headline ?? DEFAULTS.headline,
    body: bodyParagraphs.length ? bodyParagraphs : DEFAULTS.body,
  };
}
