import Layout from "@/components/Layout";
import CaseCard from "@/components/CaseCard";
import HeroVisual from "@/components/HeroVisual";
import { cases } from "@/data/cases";

const Index = () => (
  <Layout>
    <section className="mb-24 grid gap-12 md:grid-cols-[1fr,280px] md:items-center">
      <div className="space-y-5">
        <h1 className="font-serif text-4xl md:text-5xl leading-[1.1] tracking-tight">
          I help teams find the story their work is already telling.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          Senior creative leader focused on strategy, narrative, and brand — making complex work clear and compelling.
        </p>
        <p className="text-sm text-muted-foreground italic">
          No decks about decks. No frameworks for frameworks.
        </p>
      </div>
      <div className="hidden md:block aspect-square overflow-hidden">
        <HeroVisual />
      </div>
    </section>

    <section className="space-y-16">
      <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Selected work</h2>
      {cases.map((c) => (
        <CaseCard key={c.slug} caseData={c} />
      ))}
    </section>
  </Layout>
);

export default Index;
