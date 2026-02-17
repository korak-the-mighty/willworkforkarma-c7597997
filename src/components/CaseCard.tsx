import { Link } from "react-router-dom";
import PlaceholderCover from "@/components/PlaceholderCover";
import type { Case } from "@/data/cases";

interface CaseCardProps {
  caseData: Case;
}

const CaseCard = ({ caseData }: CaseCardProps) => (
  <Link to={`/work/${caseData.slug}`} className="group block">
    <article className="space-y-5">
      <div className="overflow-hidden transition-opacity duration-300 group-hover:opacity-85">
        <PlaceholderCover variant={caseData.coverVariant} />
      </div>
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <h3 className="font-serif text-2xl tracking-tight transition-colors duration-300 group-hover:text-muted-foreground">
            {caseData.title}
          </h3>
          <span className="text-sm text-muted-foreground">{caseData.year}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{caseData.summary}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          {caseData.tags.map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  </Link>
);

export default CaseCard;
