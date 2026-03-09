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

export interface CaseModule {
  type: "strategy" | "execution" | "break";
  title?: string;
  text?: string;
  media: string[];
}

export interface CaseHeroMedia {
  type: "image" | "video";
  src: string;
  poster?: string;
}

export interface CaseTheme {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
}

export interface Case {
  slug: string;
  title: string;
  year: number;
  summary: string;
  tags: string[];
  coverImage: string;
  coverVariant: "grid" | "texture";
  subline?: string;
  area?: string;
  facts: CaseFacts;
  highlights: string[];
  gallery: string[];
  pullQuote: string;
  sections: CaseSection[];
  client: string;
  problem: string;
  decision: string;
  whyMe: string;
  heroMedia: CaseHeroMedia;
  modules: CaseModule[];
  outcomes: string[];
  theme: CaseTheme;
}

export const cases: Case[] = [
  {
    slug: "abb-emobility",
    title: "ABB E-mobility",
    year: 2024,
    summary: "Shaping the brand presence for a global leader in electric vehicle charging infrastructure.",
    tags: ["Brand", "Digital", "Product"],
    coverImage: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/ABB-hero.webp",
    coverVariant: "grid",
    subline: "Charging infrastructure reimagined for scale and clarity.",
    area: "Brand & Digital Product",
    client: "ABB",
    problem: "A technology giant entering the consumer space needed to feel approachable without losing authority. The existing brand language was engineered for engineers — not for the people who'd actually plug in every morning.",
    decision: "We repositioned the entire visual and verbal identity around the moment of use — not the technology behind it.",
    whyMe: "I understand the gap between engineering culture and consumer expectation. This project needed someone who could translate complexity into simplicity without dumbing it down.",
    heroMedia: { type: "image", src: "" },
    modules: [
      { type: "strategy", title: "From specs to stories", text: "We audited every touchpoint — from trade show booths to app onboarding — and found the same pattern: feature lists where stories should be. We rewrote the hierarchy.", media: [] },
      { type: "break", media: [] },
      { type: "execution", title: "A system, not a campaign", text: "The deliverable wasn't a campaign. It was a design and narrative system that could flex across 40+ markets, from Instagram to installer manuals, without losing its voice.", media: [] },
    ],
    outcomes: [
      "Unified brand presence across 40+ markets",
      "Consumer brand awareness increased 35% in first year",
      "Design system adopted by internal and agency teams globally",
    ],
    facts: { role: "Creative Lead", scope: "Brand & Digital", team: "4 designers, 2 strategists", timeline: "14 weeks", output: "Brand system + digital platform" },
    highlights: ["Unified presence across 40+ markets", "Consumer awareness up 35%", "System adopted globally"],
    gallery: [],
    pullQuote: "Technology is invisible when the experience is right.",
    sections: [
      { heading: "Situation", text: "ABB's e-mobility division was scaling fast but communicating like an engineering department. Consumer-facing touchpoints felt technical and cold." },
      { heading: "Approach", text: "We shifted the brand lens from technology to experience — starting every piece of communication from the user's moment, not the product's spec sheet." },
      { heading: "Outcome", text: "A coherent brand system that works from billboards to app interfaces, adopted across all markets within six months." },
    ],
    theme: { bg: "210 30% 10%", fg: "210 15% 90%", muted: "210 20% 16%", accent: "200 60% 50%" },
  },
  {
    slug: "share",
    title: "SHARE",
    year: 2023,
    summary: "Rethinking how a global team communicates its value — from scattered updates to a single, coherent narrative that leadership actually reads.",
    tags: ["Strategy", "Narrative", "Internal"],
    coverImage: "/share-1.webp",
    coverVariant: "grid",
    subline: "A platform designed to simplify mobility experiences.",
    area: "Digital Product",
    client: "Global Technology Company",
    problem: "Sixty people. Five leads. Five slide decks. Every quarter, leadership asked what the team actually did — and got five different answers.",
    decision: "We killed five decks and wrote one page.",
    whyMe: "This is the work I do best — finding the single thread that holds a complex story together.",
    heroMedia: { type: "image", src: "" },
    modules: [
      { type: "strategy", title: "Listening, not messaging", text: "We interviewed every lead, their teams, and the stakeholders who kept asking the same questions. What emerged wasn't a messaging framework. It was a simple, honest statement of what this team believed about its craft.", media: [] },
      { type: "break", media: [] },
      { type: "execution", title: "One page. Updated quarterly.", text: "We rejected the deck format entirely. Instead, we wrote a single page in plain language. One narrative arc, updated quarterly, owned by one person. No committee.", media: [] },
    ],
    outcomes: ["Replaced five competing slide decks with a single one-page narrative", "Format adopted company-wide within one quarter", "Cited in board materials by Q2", "Survived three years and two reorganizations"],
    facts: { role: "Strategy Lead", scope: "Internal Communications", team: "3 writers, 1 designer", timeline: "8 weeks", output: "Quarterly narrative format" },
    highlights: ["Replaced five decks with one narrative", "Adopted company-wide", "Outlasted two reorgs"],
    gallery: [],
    pullQuote: "Five decks. Five stories. Zero conviction.",
    sections: [
      { heading: "Situation", text: "The team had grown from twelve to sixty in under two years. Every quarter, leadership asked what they did and why it mattered. The answers were fragmented." },
      { heading: "Approach", text: "Instead of building another deck, we started by listening. What emerged was a simple statement of what this team believed about its craft." },
      { heading: "Outcome", text: "Leadership stopped asking what the team did. The quarterly page became a reference point — cited in board materials, shared with new hires." },
    ],
    theme: { bg: "215 25% 10%", fg: "210 15% 88%", muted: "215 15% 18%", accent: "210 20% 50%" },
  },
  {
    slug: "wtr",
    title: "Wörner Traxler Richter",
    year: 2022,
    summary: "Building a digital presence for one of Germany's leading architecture practices — precise, thoughtful and earned through trust.",
    tags: ["Digital Platform", "Creative Direction"],
    coverImage: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/WTR-hero.webp",
    coverVariant: "grid",
    subline: "Digital Platform · Creative Direction · 2022",
    area: "Digital Platform",
    client: "Wörner Traxler Richter",
    problem: "Architecture offices rarely believe in websites. Their work lives in buildings, competitions and printed documentation. Digital presence is often an afterthought — or a necessary compromise.",
    decision: "Before any design decision, the practice had to be understood. How architects present work. How they structure information. What actually matters in a project.",
    whyMe: "Digital discipline that follows architectural discipline. Understanding what the work demands before deciding how it should appear.",
    heroMedia: { type: "image", src: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/WTR-hero.webp" },
    modules: [
      { type: "strategy", title: "Earn the trust", text: "Architecture offices rarely believe in websites. The challenge was not to modernize them. It was to earn their trust.", media: [] },
      { type: "break", media: [] },
      { type: "execution", title: "Built around the work", text: "A modular platform built around the work, not around the medium. Clear hierarchy. Strong imagery. Calm typography. Precise project data.", media: [] },
    ],
    outcomes: [
      "The practice recognized itself in the work",
      "A digital presence they trust and stand behind",
    ],
    facts: { role: "Creative Director", scope: "Digital Platform", team: "1 designer, 1 developer", timeline: "12 weeks", output: "Digital platform" },
    highlights: ["Digital discipline following architectural discipline", "No formal redesign — evolved from the foundation", "Practice recognized itself in the result"],
    gallery: [],
    pullQuote: "They trusted the work. That was the only brief that mattered.",
    sections: [
      { heading: "Situation", text: "Wörner Traxler Richter are one of Germany's leading architecture practices. Their buildings are precise, thoughtful and long-lasting. Their digital presence did not reflect that." },
      { heading: "Approach", text: "Before any design decision, the practice had to be understood. How architects present work. How they structure information. What actually matters in a project." },
      { heading: "Outcome", text: "The practice recognized itself in the work. A digital presence they trust and stand behind." },
    ],
    theme: { bg: "220 15% 10%", fg: "220 10% 90%", muted: "220 12% 16%", accent: "220 25% 50%" },
  },
  {
    slug: "man",
    title: "MAN",
    year: 2022,
    summary: "Designing a brand identity for a craft workshop that needed to feel serious without being corporate, and personal without being precious.",
    tags: ["Brand", "Identity", "Craft"],
    coverImage: "/MAN-1.webp",
    coverVariant: "texture",
    subline: "A focused digital presence for a global transport brand.",
    area: "Brand & Digital",
    client: "Independent Craft Workshop",
    problem: "Thirty years of craft. Zero visual identity. Architects expected polish; he wanted honesty.",
    decision: "No logo. No tagline. Just his name, presented with craft-level care.",
    whyMe: "Identity work like this requires restraint — knowing what to leave out matters more than what you put in.",
    heroMedia: { type: "image", src: "" },
    modules: [
      { type: "strategy", title: "Observation before design", text: "We spent time in the workshop before touching a screen. Watched how he worked, how he talked about materials, how he organized his tools.", media: [] },
      { type: "break", media: [] },
      { type: "execution", title: "A wordmark with weight", text: "The identity came from that observation — a wordmark set in a typeface with visible weight, a material palette drawn from his actual workshop.", media: [] },
    ],
    outcomes: ["Two architecture firms reached out within the first month", "The client said it felt like him", "Zero revisions after initial presentation", "Website drove 40% of new inquiries within six months"],
    facts: { role: "Creative Director", scope: "Brand Identity", team: "1 designer, 1 developer", timeline: "6 weeks", output: "Identity system + website" },
    highlights: ["No logo mark, no tagline", "Two firms reached out in month one", "Felt like him — not a costume"],
    gallery: [],
    pullQuote: "He didn't need a brand. He needed to be seen.",
    sections: [
      { heading: "Situation", text: "A master craftsman with thirty years of experience wanted to formalize his workshop into something that could take on bigger commissions." },
      { heading: "Approach", text: "We spent time in the workshop before touching a screen. The identity came from observation." },
      { heading: "Outcome", text: "The identity opened doors he'd been knocking on for years. Two architecture firms reached out within the first month." },
    ],
    theme: { bg: "30 15% 10%", fg: "35 15% 88%", muted: "30 10% 18%", accent: "30 20% 50%" },
  },
  {
    slug: "bmw",
    title: "BMW",
    year: 2021,
    summary: "A campaign that cut through automotive advertising noise by saying less and showing only what matters.",
    tags: ["Campaign", "Automotive", "Film"],
    coverImage: "/bmw-1.webp",
    coverVariant: "grid",
    subline: "Campaign thinking grounded in clarity and craft.",
    area: "Campaign",
    client: "BMW",
    problem: "Every car brand shouts. Every campaign promises freedom, performance, precision — the same words in the same order. BMW needed to be heard by going quiet.",
    decision: "We stripped the campaign to its skeleton: one car, one road, no voiceover.",
    whyMe: "I've spent years studying what makes automotive communication feel generic — and how to avoid it. This brief needed someone willing to subtract.",
    heroMedia: { type: "image", src: "" },
    modules: [
      { type: "strategy", title: "The subtraction principle", text: "We audited two years of competitor campaigns and found the same patterns everywhere. Our strategy was simple: remove everything they all do.", media: [] },
      { type: "break", media: [] },
      { type: "execution", title: "Silence as a statement", text: "The hero film ran 90 seconds with no voiceover, no text overlay, no soundtrack — just engine sound and road texture. The silence became the message.", media: [] },
    ],
    outcomes: ["Campaign earned 2.4M organic views in first week", "Most-shared BMW social content of the quarter", "Dealer inquiries up 18% in campaign markets", "Format extended to three follow-up films"],
    facts: { role: "Creative Director", scope: "Campaign", team: "2 creatives, 1 producer, 1 director", timeline: "10 weeks", output: "Campaign film + social suite" },
    highlights: ["2.4M organic views in week one", "Most-shared BMW content that quarter", "Silence as a statement"],
    gallery: [],
    pullQuote: "When everyone shouts, whisper.",
    sections: [
      { heading: "Situation", text: "BMW's campaign calendar was full but nothing was breaking through. The brief was to create something that felt unmistakably BMW without relying on the usual playbook." },
      { heading: "Approach", text: "We stripped everything back. One car, one road, no voiceover. Let the product speak through experience, not explanation." },
      { heading: "Outcome", text: "The campaign outperformed every paid effort that quarter through organic reach alone. The format was extended to three additional films." },
    ],
    theme: { bg: "220 20% 10%", fg: "220 10% 90%", muted: "220 15% 16%", accent: "220 40% 55%" },
  },
  {
    slug: "drivelog",
    title: "DRIVELOG",
    year: 2020,
    summary: "Building a product experience that turned routine car maintenance into something drivers actually looked forward to opening.",
    tags: ["Product", "UX", "Digital"],
    coverImage: "/dongle1_001.webp",
    coverVariant: "texture",
    subline: "From idea to product — a pragmatic mobility solution.",
    area: "Product",
    client: "Bosch / DRIVELOG",
    problem: "Car maintenance apps are universally dreaded — functional but joyless. DRIVELOG had the data and the partnerships but no emotional connection with its users.",
    decision: "We redesigned the entire experience around the feeling of a car that's taken care of — not a list of tasks overdue.",
    whyMe: "Product work in unsexy categories is where I thrive. The constraint of 'make maintenance interesting' is exactly the kind of creative problem I seek out.",
    heroMedia: { type: "image", src: "" },
    modules: [
      { type: "strategy", title: "From task list to timeline", text: "We reframed the core UX from a checklist of maintenance tasks to a timeline of care — each entry a moment of attention, not a chore completed.", media: [] },
      { type: "break", media: [] },
      { type: "execution", title: "Micro-rewards for boring things", text: "Every completed service generated a subtle moment of satisfaction — a progress ring, a mileage milestone, a 'your car thanks you' moment. Small, earnest, never gamified.", media: [] },
    ],
    outcomes: ["App engagement up 60% after redesign", "User retention doubled over six months", "NPS score moved from 22 to 51", "Featured in Google Play's 'Apps We Love'"],
    facts: { role: "Product Lead", scope: "Product & UX", team: "2 designers, 3 engineers", timeline: "12 weeks", output: "App redesign + design system" },
    highlights: ["Engagement up 60%", "Retention doubled", "NPS from 22 to 51"],
    gallery: [],
    pullQuote: "Nobody loves car maintenance. We made them love the app.",
    sections: [
      { heading: "Situation", text: "DRIVELOG had strong partnerships with workshops and parts suppliers but users treated the app as a necessary evil. Engagement was declining." },
      { heading: "Approach", text: "We shifted the product metaphor from task management to car care — reframing every interaction as an act of attention rather than obligation." },
      { heading: "Outcome", text: "Engagement and retention metrics transformed. The app went from a utility to something users genuinely opened voluntarily." },
    ],
    theme: { bg: "160 15% 10%", fg: "160 10% 88%", muted: "160 10% 16%", accent: "160 30% 45%" },
  },
];
