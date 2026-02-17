import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { cases } from "@/data/cases";
import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp";

const STATEMENTS = [
  "I help clients and teams see what actually matters.",
  "I turn complexity into clear direction and action.",
  "I inspire and lead creative work with relentless passion.",
];

const ProjectPreview = ({ slug, title, tags, year }: { slug: string; title: string; tags: string[]; year: number }) => (
  <Link to={`/work/${slug}`} className="group block">
    <div className="aspect-[16/9] bg-muted w-full max-h-[50vh]" />
    <div className="mt-4 space-y-2">
      <div className="flex items-baseline justify-between">
        <h3 className="font-heading text-2xl tracking-tight">{title}</h3>
        <span className="text-sm text-muted-foreground">{year}</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {tags.map((tag) => (
          <span key={tag} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{tag}</span>
        ))}
      </div>
    </div>
  </Link>
);

const Index = () => (
  <Layout>
    {/* Section 1 — Hero */}
    <section className="relative left-1/2 -ml-[50vw] w-screen min-h-[85vh]">
      <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative min-h-[85vh] flex items-center justify-center">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white text-center max-w-4xl mx-auto px-6">
          I push vision, clarity and creative confidence.
        </h1>
      </div>
    </section>

    {/* Section 2 — Statement + Work Flow */}
    <section className="space-y-0">
      <div className="py-14 md:py-20">
        <p className="text-4xl md:text-5xl lg:text-6xl font-heading text-center leading-[1.1]">
          {STATEMENTS[0]}
        </p>
      </div>

      <div className="mb-6">
        <ProjectPreview {...cases[0]} />
      </div>

      <div className="py-14 md:py-20">
        <p className="text-4xl md:text-5xl lg:text-6xl font-heading text-center leading-[1.1]">
          {STATEMENTS[1]}
        </p>
      </div>

      <div className="mb-6">
        <ProjectPreview {...cases[1]} />
      </div>

      <div className="py-14 md:py-20">
        <p className="text-4xl md:text-5xl lg:text-6xl font-heading text-center leading-[1.1]">
          {STATEMENTS[2]}
        </p>
      </div>
    </section>

    {/* Section 3 — About */}
    <section className="py-20 md:py-32 space-y-8">
      <div className="w-40 h-40 rounded-full bg-muted mx-auto" />
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground">[ABOUT TEXT — to be written later]</p>
        <p className="text-muted-foreground italic">[KARMA LINE — to be written later]</p>
      </div>
    </section>

    {/* Section 4 — Contact */}
    <section className="py-20 md:py-32 space-y-4">
      <a href="https://wa.me/4915141655661" target="_blank" rel="noopener noreferrer" className="block text-foreground hover:text-muted-foreground transition-colors">WhatsApp</a>
      <span className="block text-muted-foreground">[EMAIL]</span>
      <span className="block text-muted-foreground">[LINKEDIN URL]</span>
    </section>
  </Layout>
);

export default Index;
