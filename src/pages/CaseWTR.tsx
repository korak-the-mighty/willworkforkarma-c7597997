import Layout from "@/components/Layout";
import { CaseSection } from "@/components/CaseSection";
import { getCaseData } from "@/lib/caseRegistry";
import CaseLoader from "@/components/CaseLoader";

const CaseWTR = () => {
  const caseData = getCaseData('wtr');

  if (!caseData) {
    return (
      <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
        <div className="text-white p-8">Case not found.</div>
      </Layout>
    );
  }

  return (
    <>
      <CaseLoader bg="#0f0c0c" role="Wörner Traxler Richter" />
      <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
        <div className="text-white">
          {caseData.sections.map((section) => (
            <CaseSection key={section.id} section={section} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default CaseWTR;
