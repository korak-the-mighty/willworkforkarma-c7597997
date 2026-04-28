import { useState } from "react";
import Layout from "@/components/Layout";
import { CaseSection } from "@/components/CaseSection";
import { getCaseData } from "@/lib/caseRegistry";
import CaseLoader from "@/components/CaseLoader";

const CaseDrivelogV2 = () => {
  const caseData = getCaseData('drivelog');
  const [loaderDone, setLoaderDone] = useState(false);

  if (!caseData) {
    return (
      <Layout fullWidth theme={{ bg: "#0D0D0D" }}>
        <div className="text-white p-8">Case not found.</div>
      </Layout>
    );
  }

  return (
    <>
      <CaseLoader bg="#0D0D0D" role="Brand Creation" onDone={() => setLoaderDone(true)} />
      <Layout fullWidth theme={{ bg: "#0D0D0D" }}>
        <div className="text-white">
          {caseData.sections.map((section) => (
            <CaseSection key={section.id} section={section} loaderDone={loaderDone} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default CaseDrivelogV2;
