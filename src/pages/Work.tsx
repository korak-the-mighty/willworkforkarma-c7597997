import Layout from "@/components/Layout";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/data/cases";

const Work = () => (
  <Layout>
    <div className="space-y-32">
      {cases.map((c) => (
        <CaseCard key={c.slug} caseData={c} />
      ))}
    </div>
  </Layout>
);

export default Work;
