import Layout from "@/components/Layout";
import { CaseSection } from "@/components/CaseSection";
import { getCaseData } from "@/lib/caseRegistry";
import CaseLoader from "@/components/CaseLoader";

const CaseDrivelogV2 = () => {
  const caseData = getCaseData('drivelog');

  if (!caseData) {
    return (
      <Layout fullWidth theme={{ bg: "#0D0D0D" }}>
        <div className="text-white p-8">Case not found.</div>
      </Layout>
    );
  }

  return (
    <>
      <CaseLoader bg="#0D0D0D" role="Brand Creation" />
      <Layout fullWidth theme={{ bg: "#0D0D0D" }}>
        <div className="text-white">
          {caseData.sections.map((section) => (
            <CaseSection key={section.id} section={section} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default CaseDrivelogV2;
