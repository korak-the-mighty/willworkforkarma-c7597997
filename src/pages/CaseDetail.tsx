import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseSection from "@/components/CaseSection";
import CaseFacts from "@/components/CaseFacts";
import CaseHighlights from "@/components/CaseHighlights";
import CaseGallery from "@/components/CaseGallery";
import CasePullQuote from "@/components/CasePullQuote";
import PlaceholderCover from "@/components/PlaceholderCover";
import { cases } from "@/data/cases";

const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseData = cases.find((c) => c.slug === slug);

  if (!caseData) return <Navigate to="/work" replace />;

  const situation = caseData.sections.find((s) => s.heading.toLowerCase() === "situation");
  const approach = caseData.sections.find((s) => s.heading.toLowerCase() === "approach");
  const outcome = caseData.sections.find((s) => s.heading.toLowerCase() === "outcome");

  return (
    <Layout>
      <article>
        {/* Header */}
        <header className="space-y-4 mb-6">
          <div className="flex items-baseline gap-4">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
              {caseData.title}
            </h1>
            <span className="text-sm text-muted-foreground">{caseData.year}</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {caseData.tags.map((tag) => (
              <span key={tag} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {caseData.summary}
          </p>
        </header>

        {/* Full-width cover */}
        <div className="my-12 -mx-6 md:-mx-12 lg:-mx-24">
          <PlaceholderCover aspectRatio="21/9" />
        </div>

        {/* Facts */}
        <CaseFacts facts={caseData.facts} />

        {/* Situation */}
        <div className="space-y-12 mt-16">
          {situation && <CaseSection section={situation} />}
        </div>

        {/* Full-width image slot */}
        <div className="my-12 -mx-6 md:-mx-12 lg:-mx-24">
          <PlaceholderCover aspectRatio="2/1" />
        </div>

        {/* Approach */}
        <div className="space-y-12">
          {approach && <CaseSection section={approach} />}
        </div>

        {/* Pull Quote */}
        <CasePullQuote quote={caseData.pullQuote} />

        {/* Gallery */}
        <div className="my-12 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24">
          <CaseGallery />
        </div>

        {/* Outcome */}
        <div className="space-y-12">
          {outcome && <CaseSection section={outcome} />}
        </div>

        {/* Highlights at end */}
        <div className="mt-16">
          <CaseHighlights highlights={caseData.highlights} />
        </div>
      </article>
    </Layout>
  );
};

export default CaseDetail;
