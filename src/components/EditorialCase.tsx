import { Link } from "react-router-dom";
import { cases } from "@/data/cases";

interface EditorialCaseProps {
  slug: string;
  title: string;
  year: number;
  area?: string;
  subline?: string;
  imageAlign: "left" | "right";
}

const EditorialCase = ({ slug, title, year, area, subline, imageAlign }: EditorialCaseProps) => {
  const caseData = cases.find((c) => c.slug === slug);
  const coverImage = caseData?.coverImage;

  return (
    <Link to={`/work/${slug}`} className="group block relative">
      {/* Desktop layout */}
      <div className="hidden md:block relative min-h-[70vh] overflow-hidden">
        {/* Image half — flush to viewport edge */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 overflow-hidden ${
            imageAlign === "right" ? "right-0" : "left-0"
          }`}
        >
          {coverImage && (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover brightness-75 md:group-hover:brightness-100 transition-[filter] duration-[400ms]"
            />
          )}
        </div>
        {/* Title — centered across full viewport, overlapping image */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          <h2 className="font-heading text-6xl lg:text-8xl tracking-tight text-foreground">
            {title}
          </h2>
          <div className="mt-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {subline && <p className="text-sm text-muted-foreground">{subline}</p>}
            {area && <span className="text-sm text-muted-foreground">{area}</span>}
            <span className="text-sm text-muted-foreground">{year}</span>
          </div>
        </div>
      </div>

      {/* Mobile layout — stacked */}
      <div className="md:hidden">
        <div className="w-full aspect-[16/10] overflow-hidden">
          {coverImage && (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="px-6 py-8">
          <h2 className="font-heading text-4xl tracking-tight text-foreground">{title}</h2>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {subline && <p>{subline}</p>}
            {area && <span>{area}</span>}
            <span>{year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EditorialCase;
