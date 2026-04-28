import { useState } from "react";
import Layout from "@/components/Layout";
import { CaseSection } from "@/components/CaseSection";
import { getCaseData } from "@/lib/caseRegistry";
import CaseLoader from "@/components/CaseLoader";

const CaseMAN = () => {
  const caseData = getCaseData('man');
  const [loaderDone, setLoaderDone] = useState(false);

  if (!caseData) {
    return (
      <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
        <div className="text-white p-8">Case not found.</div>
      </Layout>
    );
  }

  return (
    <>
      <CaseLoader bg="#0f0c0c" role="New Category Launch" onDone={() => setLoaderDone(true)} />
      <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
        <div className="text-white">
          {caseData.sections.map((section) => (
            <CaseSection key={section.id} section={section} loaderDone={loaderDone} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export default CaseMAN;
