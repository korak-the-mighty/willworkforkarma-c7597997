import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseHeroMedia from "@/components/CaseHeroMedia";
import CaseSpecSheet from "@/components/CaseSpecSheet";
import CaseHook from "@/components/CaseHook";
import CaseBamStatement from "@/components/CaseBamStatement";
import CaseModule from "@/components/CaseModule";
import CaseMediaGrid from "@/components/CaseMediaGrid";
import CaseOutcome from "@/components/CaseOutcome";
import CaseWhyMe from "@/components/CaseWhyMe";
import { cases } from "@/data/cases";

const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseIndex = cases.findIndex((c) => c.slug === slug);
  const caseData = cases[caseIndex];

  if (!caseData) return <Navigate to="/work" replace />;

  const nextCase = cases[caseIndex + 1] || cases[0];
  const nextCaseLink = nextCase && nextCase.slug !== caseData.slug
    ? { slug: nextCase.slug, title: nextCase.title }
    : null;

  return (
    <Layout>
      <article>
        {/* Header */}
        <header className="space-y-4 mb-8">
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
        </header>

        {/* Hero */}
        <CaseHeroMedia heroMedia={caseData.heroMedia} />

        {/* Spec Sheet */}
        <div className="mt-12">
          <CaseSpecSheet
            client={caseData.client}
            year={caseData.year}
            role={caseData.facts.role}
            team={caseData.facts.team}
            timeline={caseData.facts.timeline}
            output={caseData.facts.output}
          />
        </div>

        {/* Hook */}
        <CaseHook problem={caseData.problem} />

        {/* BAM */}
        <CaseBamStatement statement={caseData.decision} />

        {/* Modules */}
        {caseData.modules.map((mod, i) => (
          <CaseModule key={i} module={mod} index={i} />
        ))}

        {/* Output Gallery */}
        <div className="py-12">
          <CaseMediaGrid count={4} />
        </div>

        {/* Outcomes */}
        <CaseOutcome outcomes={caseData.outcomes} />

        {/* Why Me */}
        <div className="mt-8">
          <CaseWhyMe text={caseData.whyMe} nextCase={nextCaseLink} />
        </div>
      </article>
    </Layout>
  );
};

export default CaseDetail;
