import type { VisitCtaSection } from '../types/case';

export default function CaseVisitCta({ section }: { section: VisitCtaSection }) {
  return (
    <div className="text-center pb-8 md:pb-12">
      <a
        href={section.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-block font-heading text-2xl md:text-4xl tracking-tight text-white hover:text-[#ECA9CC] transition-colors"
      >
        <span className="hidden md:inline absolute right-full pr-2 opacity-0 group-hover:opacity-100 animate-bounce-x transition-opacity duration-200" aria-hidden="true">→</span>
        {section.label}
      </a>
    </div>
  );
}
