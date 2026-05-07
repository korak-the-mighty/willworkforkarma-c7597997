import { useState, useEffect } from "react";

interface HomepageAbout {
  headline1: string;
  headline2: string;
  headline3: string;
  body: string[];
  cta: string;
}

interface HomepageContent {
  hero: { headline: string };
  statements: { s1: string; s2: string; s3: string };
  about: HomepageAbout;
}

const DEFAULTS: HomepageContent = {
  hero: { headline: "I push vision, clarity and creative confidence." },
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
  },
};

function parseSection(raw: string, sectionName: string): Record<string, string> {
  const result: Record<string, string> = {};
  const sectionRegex = new RegExp(`##\\s+${sectionName}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`);
  const sectionMatch = raw.match(sectionRegex);
  if (!sectionMatch) return result;

  const block = sectionMatch[1];

  // Handle YAML literal block scalars (body: | ...)
  const literalRegex = /^(\w+):\s*\|\s*\n([\s\S]*?)(?=^\w+:|$)/gm;
  let match;
  while ((match = literalRegex.exec(block)) !== null) {
    result[match[1]] = match[2].trimEnd();
  }

  // Handle simple key: "value" or key: value lines
  const simpleRegex = /^(\w+):\s*"?([^"\n]+)"?\s*$/gm;
  while ((match = simpleRegex.exec(block)) !== null) {
    if (!result[match[1]]) result[match[1]] = match[2].trim();
  }

  return result;
}

export function useHomepageContent(): HomepageContent {
  const [content, setContent] = useState<HomepageContent>(DEFAULTS);

  useEffect(() => {
    fetch("/content/homepage.md")
      .then((r) => r.text())
      .then((raw) => {
        const hero = parseSection(raw, "hero");
        const statements = parseSection(raw, "statements");
        const about = parseSection(raw, "about");

        const bodyRaw = about.body ?? "";
        const bodyParagraphs = bodyRaw
          .split(/\n\n+/)
          .map((p) => p.trim())
          .filter(Boolean);

        setContent({
          hero: {
            headline: hero.headline ?? DEFAULTS.hero.headline,
          },
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
          },
        });
      })
      .catch(() => setContent(DEFAULTS));
  }, []);

  return content;
}
