import Layout from "@/components/Layout";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/data/cases";

const Index = () => (
  <Layout>
    <section className="space-y-4 mb-20">
      <h1 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight">
        I help teams find the story their work is already telling.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
        Senior creative leader focused on strategy, narrative, and brand — making complex work clear and compelling.
      </p>
    </section>

    <section className="space-y-16">
      <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Selected work</h2>
      {cases.map((c) => (
        <CaseCard key={c.slug} caseData={c} />
      ))}
    </section>
  </Layout>
);

export default Index;
