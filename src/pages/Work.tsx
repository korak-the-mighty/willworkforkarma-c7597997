import Layout from "@/components/Layout";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/data/cases";

const Work = () => (
  <Layout>
    <section className="mb-12">
      <h1 className="font-serif text-4xl tracking-tight">Work</h1>
    </section>
    <div className="space-y-16">
      {cases.map((c) => (
        <CaseCard key={c.slug} caseData={c} />
      ))}
    </div>
  </Layout>
);

export default Work;
