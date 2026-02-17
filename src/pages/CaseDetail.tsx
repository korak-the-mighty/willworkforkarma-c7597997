import { useParams, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseSection from "@/components/CaseSection";
import { cases } from "@/data/cases";

const CaseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseData = cases.find((c) => c.slug === slug);

  if (!caseData) return <Navigate to="/work" replace />;

  return (
    <Layout>
      <article>
        <header className="space-y-4 mb-10">
          <div className="flex items-baseline gap-4">
            <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
              {caseData.title}
            </h1>
            <span className="text-sm text-muted-foreground">{caseData.year}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {caseData.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {caseData.summary}
          </p>
        </header>

        <img
          src={caseData.coverImage}
          alt={caseData.title}
          className="aspect-[16/9] w-full object-cover mb-12"
        />

        <div className="space-y-12">
          {caseData.sections.map((section) => (
            <CaseSection key={section.heading} section={section} />
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default CaseDetail;
