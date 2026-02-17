import type { CaseSection as CaseSectionType } from "@/data/cases";

interface CaseSectionProps {
  section: CaseSectionType;
}

const CaseSection = ({ section }: CaseSectionProps) => {
  const paragraphs = section.text.split("\n\n");

  return (
    <section className="space-y-6 border-t border-border pt-12">
      <h2 className="font-serif text-2xl md:text-3xl">{section.heading}</h2>
      <div className="space-y-5">
        {paragraphs.map((p, i) => (
          <p key={i} className="leading-relaxed text-muted-foreground">
            {p}
          </p>
        ))}
      </div>
      {section.image && (
        <img
          src={section.image}
          alt={section.heading}
          className="w-full object-cover"
          loading="lazy"
        />
      )}
    </section>
  );
};

export default CaseSection;
