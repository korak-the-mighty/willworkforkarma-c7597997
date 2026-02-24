import { Link } from "react-router-dom";
import PlaceholderCover from "@/components/PlaceholderCover";
import type { Case } from "@/data/cases";

interface CaseCardProps {
  caseData: Case;
}

const CaseCard = ({ caseData }: CaseCardProps) => (
  <Link to={`/work/${caseData.slug}`} className="group block">
    <article className="space-y-5">
      <div className="overflow-hidden">
        {caseData.coverImage && caseData.coverImage !== "/placeholder.svg" ? (
          <img
            src={caseData.coverImage}
            alt={caseData.title}
            className="w-full object-cover brightness-75 md:group-hover:brightness-100 transition-[filter] duration-[400ms]"
            style={{ aspectRatio: "3/2" }}
          />
        ) : (
          <PlaceholderCover aspectRatio="3/2" />
        )}
      </div>
      <div className="space-y-2 transition-transform duration-300 group-hover:-translate-y-0.5">
        <div className="flex items-baseline justify-between">
          <h3 className="font-heading text-3xl tracking-tight transition-colors duration-300 group-hover:text-muted-foreground">
            {caseData.title}
          </h3>
          <span className="text-sm text-muted-foreground">{caseData.year}</span>
        </div>
        <p className="text-muted-foreground leading-relaxed line-clamp-2">{caseData.summary}</p>
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
