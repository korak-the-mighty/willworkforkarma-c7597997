import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/Layout";
import { CaseSection } from "@/components/CaseSection";
import CaseSnapshot from "@/components/CaseSnapshot";
import { getCaseData } from "@/lib/caseRegistry";
import CaseLoader from "@/components/CaseLoader";

const CaseShare = () => {
  const caseData = getCaseData('share');
  const [isSnapshot, setIsSnapshot] = useState(false);
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
      <CaseLoader bg="#0f0c0c" role="Brand Desirability" onDone={() => setLoaderDone(true)} />
    <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
      <motion.div
        className="text-white"
        animate={{ opacity: isSnapshot ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {caseData.sections.map((section) => (
          <CaseSection key={section.id} section={section} loaderDone={loaderDone} />
        ))}
      </motion.div>

      <AnimatePresence>
        {isSnapshot && caseData.snapshot && (
          <CaseSnapshot
            {...caseData.snapshot}
            onClose={() => setIsSnapshot(false)}
          />
        )}
      </AnimatePresence>

      {/* One View button disabled — implementation pending */}
    </Layout>
    </>
  );
};

export default CaseShare;
