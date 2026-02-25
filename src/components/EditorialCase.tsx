import { Link } from "react-router-dom";
import { cases } from "@/data/cases";

interface EditorialCaseProps {
  slug: string;
  title: string;
  year: number;
  area?: string;
  subline?: string;
  imageAlign: "left" | "right";
  heroHeadline?: string;
  supportingText?: string;
}

const EditorialCase = ({ slug, title, year, area, subline, imageAlign, heroHeadline, supportingText }: EditorialCaseProps) => {
  const caseData = cases.find((c) => c.slug === slug);
  const coverImage = caseData?.coverImage;

  const textHalf = imageAlign === "right" ? "left-0" : "right-0";

  return (
    <Link to={`/work/${slug}`} className="group block relative overflow-hidden">
      {/* Desktop layout */}
      <div className="hidden md:block relative min-h-[70vh] overflow-hidden">
        {/* Image half */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 overflow-hidden ${
            imageAlign === "right" ? "right-0" : "left-0"
          }`}
        >
          {coverImage && (
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-100 transition-[filter] duration-[400ms] ease-in-out"
            />
          )}
        </div>
        {/* Text half */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 ${textHalf} z-10 flex flex-col items-center justify-center px-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-in-out`}
        >
          {heroHeadline ? (
            <>
              <h2 className="font-heading text-xl md:text-2xl tracking-tight text-foreground font-light max-w-md text-center">
                {heroHeadline}
              </h2>
              {supportingText && (
                <p className="mt-4 text-xs uppercase tracking-widest" style={{ color: '#ECA9CC' }}>
                  {supportingText}
                </p>
              )}
            </>
          ) : (
            <>
              <h2 className="font-heading text-6xl lg:text-8xl tracking-tight text-foreground">
                {title}
              </h2>
              {subline && <p className="mt-4 text-sm text-muted-foreground">{subline}</p>}
              <div className="mt-1 flex items-center gap-4">
                {area && <span className="text-sm text-muted-foreground">{area}</span>}
                <span className="text-sm text-muted-foreground">{year}</span>
              </div>
            </>
          )}
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
