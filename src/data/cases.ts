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
    sections: [
      {
        heading: "Situation",
        text: "The team had grown from twelve to sixty in under two years. Every quarter, leadership asked what they did and why it mattered. The answers were fragmented — slide decks from five different leads, each with a different story. Nobody was wrong, but nobody was convincing either. The real problem wasn't communication; it was that the team had never articulated a shared point of view about its own work.",
      },
      {
        heading: "Approach",
        text: "Instead of building another deck, we started by listening. Interviews with every lead, their teams, and the stakeholders who kept asking the same questions. What emerged wasn't a messaging framework — it was a simple, honest statement of what this team believed about its craft and why that belief produced results. We wrote it down in plain language. Then we built a lightweight format — one page, updated quarterly — that let the work speak through that lens.",
      },
      {
        heading: "Outcome",
        text: "Leadership stopped asking what the team did. The quarterly page became a reference point — cited in board materials, shared with new hires, used by the team itself to make decisions about what to take on. The format lasted three years with minimal changes. The real outcome wasn't a document; it was clarity.",
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
    sections: [
      {
        heading: "Situation",
        text: "A master craftsman with thirty years of experience wanted to formalize his workshop into something that could take on bigger commissions. He had the skills, the reputation, and a waiting list — but no visual identity, no website, and no way to present himself to architects and developers who expected a certain level of professionalism. He didn't want to look like a corporation. He wanted to look like exactly what he was: one person who does exceptional work.",
      },
      {
        heading: "Approach",
        text: "We spent time in the workshop before touching a screen. Watched how he worked, how he talked about materials, how he organized his tools. The identity came from that observation — a wordmark set in a typeface with visible weight, a material palette drawn from his actual workshop, and a set of principles rather than brand guidelines. No logo mark. No tagline. Just his name, presented with the same care he brings to a joint or a finish.",
      },
      {
        heading: "Outcome",
        text: "The identity opened doors he'd been knocking on for years. Two architecture firms reached out within the first month of the site going live. More importantly, he said it felt like him — not a costume, not an aspiration, just an honest representation. That's the only metric that matters for work like this.",
      },
    ],
  },
];
