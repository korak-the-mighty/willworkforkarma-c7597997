import type { CaseSection as CaseSectionType } from "@/data/cases";

interface CaseSectionProps {
  section: CaseSectionType;
}

const CaseSection = ({ section }: CaseSectionProps) => (
  <section className="space-y-4 border-t border-border pt-8">
    <h2 className="font-serif text-xl">{section.heading}</h2>
    <p className="leading-relaxed text-muted-foreground whitespace-pre-line">
      {section.text}
    </p>
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

export default CaseSection;
