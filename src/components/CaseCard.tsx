import { Link } from "react-router-dom";
import type { Case } from "@/data/cases";

interface CaseCardProps {
  caseData: Case;
}

const CaseCard = ({ caseData }: CaseCardProps) => (
  <Link
    to={`/work/${caseData.slug}`}
    className="group block"
  >
    <article className="space-y-4">
      <div className="overflow-hidden">
        <img
          src={caseData.coverImage}
          alt={caseData.title}
          className="aspect-[16/9] w-full object-cover transition-opacity group-hover:opacity-80"
          loading="lazy"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl tracking-tight">{caseData.title}</h3>
          <span className="text-sm text-muted-foreground">{caseData.year}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {caseData.summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {caseData.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-widest text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  </Link>
);

export default CaseCard;
