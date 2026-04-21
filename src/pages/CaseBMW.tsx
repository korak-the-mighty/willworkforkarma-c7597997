import Layout from "@/components/Layout";
import { CaseSection } from "@/components/CaseSection";
import { getCaseData } from "@/lib/caseRegistry";

const CaseBMW = () => {
  const caseData = getCaseData('bmw');

  if (!caseData) {
    return (
      <Layout fullWidth theme={{ bg: "#0D0D0D" }}>
        <div className="text-white p-8">Case not found.</div>
      </Layout>
    );
  }

  return (
    <Layout fullWidth theme={{ bg: "#0D0D0D" }}>
      <div className="text-white">
        {caseData.sections.map((section) => (
          <CaseSection key={section.id} section={section} />
        ))}
      </div>
    </Layout>
  );
};

export default CaseBMW;
