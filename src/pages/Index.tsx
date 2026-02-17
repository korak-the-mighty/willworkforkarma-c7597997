import Layout from "@/components/Layout";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/data/cases";

const Index = () => (
  <Layout>
    <section className="py-24 md:py-36 space-y-10">
      <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-3xl">
        I help teams find the story their work is already telling.
      </h1>
      <ul className="space-y-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
        <li>Strategy</li>
        <li>Narrative</li>
        <li>Brand</li>
      </ul>
      <p className="text-sm text-muted-foreground italic pt-4">
        No decks about decks. No frameworks for frameworks.
      </p>
    </section>

    <section className="space-y-24">
      {cases.map((c) => (
        <CaseCard key={c.slug} caseData={c} />
      ))}
    </section>
  </Layout>
);

export default Index;
