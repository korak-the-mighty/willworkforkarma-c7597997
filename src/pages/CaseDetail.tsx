import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseSection from "@/components/CaseSection";
import CaseFacts from "@/components/CaseFacts";
import CaseHighlights from "@/components/CaseHighlights";
import CaseGallery from "@/components/CaseGallery";
import PlaceholderCover from "@/components/PlaceholderCover";
import { cases } from "@/data/cases";

const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseData = cases.find((c) => c.slug === slug);

  if (!caseData) return <Navigate to="/work" replace />;

  // Split sections: gallery goes between Approach and Outcome
  const approachIndex = caseData.sections.findIndex(
    (s) => s.heading.toLowerCase() === "approach"
  );
  const beforeGallery = caseData.sections.slice(0, approachIndex + 1);
  const afterGallery = caseData.sections.slice(approachIndex + 1);

  return (
    <Layout>
      <article>
        <header className="space-y-4 mb-6">
          <div className="flex items-baseline gap-4">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
              {caseData.title}
            </h1>
            <span className="text-sm text-muted-foreground">{caseData.year}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {caseData.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-[0.15em] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {caseData.summary}
          </p>
        </header>

        <CaseHighlights highlights={caseData.highlights} />
        <CaseFacts facts={caseData.facts} />

        <div className="my-12">
          <PlaceholderCover variant={caseData.coverVariant} />
        </div>

        <div className="space-y-12">
          {beforeGallery.map((section) => (
            <CaseSection key={section.heading} section={section} />
          ))}
        </div>

        <div className="my-12">
          <CaseGallery variant={caseData.coverVariant} />
        </div>

        <div className="space-y-12">
          {afterGallery.map((section) => (
            <CaseSection key={section.heading} section={section} />
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default CaseDetail;
