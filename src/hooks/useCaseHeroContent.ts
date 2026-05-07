import { useState, useEffect } from "react";

interface CaseHero {
  headline: string;
  subtitle: string;
}

type CaseHeroMap = Record<string, CaseHero>;

const CASE_SLUGS = ["abb-emobility", "share", "man", "bmw", "drivelog", "wtr"];

function parseCaseHero(raw: string): CaseHero {
  const heroRegex = /##\s+section-hero[\s\S]*?headline:\s*"?([^\n"]+)"?[\s\S]*?subtitle:\s*"?([^\n"]+)"?/;
  const match = raw.match(heroRegex);
  return {
    headline: match?.[1]?.trim() ?? "",
    subtitle: match?.[2]?.trim() ?? "",
  };
}

export function useCaseHeroContent(): CaseHeroMap {
  const [map, setMap] = useState<CaseHeroMap>({});

  useEffect(() => {
    Promise.all(
      CASE_SLUGS.map((slug) =>
        fetch(`/content/cases/${slug}.md`)
          .then((r) => r.text())
          .then((raw) => ({ slug, hero: parseCaseHero(raw) }))
          .catch(() => ({ slug, hero: { headline: "", subtitle: "" } }))
      )
    ).then((results) => {
      const next: CaseHeroMap = {};
      results.forEach(({ slug, hero }) => { next[slug] = hero; });
      setMap(next);
    });
  }, []);

  return map;
}
