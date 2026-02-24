import { Link } from "react-router-dom";
import { cases } from "@/data/cases";

interface EditorialCaseProps {
  slug: string;
  title: string;
  heroHeadline: string;
  year: number;
  area?: string;
  subline?: string;
  imageAlign: "left" | "right";
}

const EditorialCase = ({ slug, title, heroHeadline, year, area, subline, imageAlign }: EditorialCaseProps) => {
  const caseData = cases.find((c) => c.slug === slug);
  const coverImage = caseData?.coverImage;

  const textHalf = imageAlign === "right" ? "left-0" : "right-0";

  return (
    <Link to={`/work/${slug}`} className="group block relative overflow-hidden">
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
              className="w-full h-full object-cover brightness-[0.6] group-hover:brightness-100 transition-[filter] duration-[600ms] ease-in-out"
            />
          )}
        </div>
        {/* Text half — centered in the empty side */}
        <div
          className={`absolute top-0 bottom-0 w-1/2 ${textHalf} z-10 flex flex-col items-center justify-center px-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-in-out`}
        >
          <h2 className="font-heading text-3xl lg:text-5xl tracking-tight text-foreground font-light text-center max-w-md">
            {heroHeadline}
          </h2>
          <p className="mt-4 text-[13px] uppercase tracking-[0.12em] font-heading text-muted-foreground">
            {title} · {area}
          </p>
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
          <h2 className="font-heading text-2xl tracking-tight text-foreground font-light">{heroHeadline}</h2>
          <p className="mt-3 text-[13px] uppercase tracking-[0.12em] font-heading text-muted-foreground">
            {title} · {area}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EditorialCase;
