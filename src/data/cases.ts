export interface CaseFacts {
  role: string;
  scope: string;
  team: string;
  timeline: string;
  output: string;
}

export interface CaseSection {
  heading: string;
  text: string;
  image?: string;
}

export interface Case {
  slug: string;
  title: string;
  year: number;
  summary: string;
  tags: string[];
  coverImage: string;
  coverVariant: "grid" | "texture";
  facts: CaseFacts;
  highlights: string[];
  gallery: string[];
  pullQuote: string;
  sections: CaseSection[];
}

export const cases: Case[] = [
  {
    slug: "share",
    title: "SHARE",
    year: 2023,
    summary:
      "Rethinking how a global team communicates its value — from scattered updates to a single, coherent narrative that leadership actually reads.",
    tags: ["Strategy", "Narrative", "Internal"],
    coverImage: "/placeholder.svg",
    coverVariant: "grid",
    facts: {
      role: "Strategy Lead",
      scope: "Internal Communications",
      team: "3 writers, 1 designer",
      timeline: "8 weeks",
      output: "Quarterly narrative format",
    },
    highlights: [
      "Replaced five competing slide decks with a single one-page narrative",
      "Format adopted company-wide and cited in board materials within one quarter",
      "Survived three years with minimal changes — outlasted two reorgs",
    ],
    gallery: [],
    pullQuote: "Five decks. Five stories. Zero conviction.",
    sections: [
      {
        heading: "Situation",
        text: "The team had grown from twelve to sixty in under two years. Every quarter, leadership asked what they did and why it mattered.\n\nThe answers were fragmented — slide decks from five different leads, each with a different story. Nobody was wrong, but nobody was convincing either.\n\nThe real problem wasn't communication; it was that the team had never articulated a shared point of view about its own work.",
      },
      {
        heading: "Approach",
        text: "Instead of building another deck, we started by listening. Interviews with every lead, their teams, and the stakeholders who kept asking the same questions.\n\nWhat emerged wasn't a messaging framework — it was a simple, honest statement of what this team believed about its craft and why that belief produced results.\n\nWe wrote it down in plain language. Then we built a lightweight format — one page, updated quarterly — that let the work speak through that lens.",
      },
      {
        heading: "Outcome",
        text: "Leadership stopped asking what the team did. The quarterly page became a reference point — cited in board materials, shared with new hires, used by the team itself to make decisions about what to take on.\n\nThe format lasted three years with minimal changes.\n\nThe real outcome wasn't a document; it was clarity.",
      },
    ],
  },
  {
    slug: "man",
    title: "MAN",
    year: 2022,
    summary:
      "Designing a brand identity for a craft workshop that needed to feel serious without being corporate, and personal without being precious.",
    tags: ["Brand", "Identity", "Craft"],
    coverImage: "/placeholder.svg",
    coverVariant: "texture",
    facts: {
      role: "Creative Director",
      scope: "Brand Identity",
      team: "1 designer, 1 developer",
      timeline: "6 weeks",
      output: "Identity system + website",
    },
    highlights: [
      "No logo mark, no tagline — just a name presented with craft-level care",
      "Two architecture firms reached out within the first month of launch",
      "The client said it felt like him — not a costume, not an aspiration",
    ],
    gallery: [],
    pullQuote: "He didn't need a brand. He needed to be seen.",
    sections: [
      {
        heading: "Situation",
        text: "A master craftsman with thirty years of experience wanted to formalize his workshop into something that could take on bigger commissions.\n\nHe had the skills, the reputation, and a waiting list — but no visual identity, no website, and no way to present himself to architects and developers who expected a certain level of professionalism.\n\nHe didn't want to look like a corporation. He wanted to look like exactly what he was: one person who does exceptional work.",
      },
      {
        heading: "Approach",
        text: "We spent time in the workshop before touching a screen. Watched how he worked, how he talked about materials, how he organized his tools.\n\nThe identity came from that observation — a wordmark set in a typeface with visible weight, a material palette drawn from his actual workshop, and a set of principles rather than brand guidelines.\n\nNo logo mark. No tagline. Just his name, presented with the same care he brings to a joint or a finish.",
      },
      {
        heading: "Outcome",
        text: "The identity opened doors he'd been knocking on for years. Two architecture firms reached out within the first month of the site going live.\n\nMore importantly, he said it felt like him — not a costume, not an aspiration, just an honest representation.\n\nThat's the only metric that matters for work like this.",
      },
    ],
  },
];
