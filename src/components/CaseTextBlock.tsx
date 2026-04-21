import type { TextSection } from '../types/case';
import CaseSectionWrapper from './CaseSectionWrapper';
const BODY_TEXT = 'text-[1.25rem] leading-[1.65]';
const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);
function Inner({ section }: { section: TextSection }) {
  const isCentered = !!section.centered;
  const outerClass = isCentered
    ? 'max-w-[46rem] mx-auto text-center px-6'
    : 'px-6 md:px-8 max-w-4xl mx-auto';
  return (
    <section className="py-24 md:py-32">
      <div className={outerClass}>
        {section.label && <MicroLabel>{section.label}</MicroLabel>}
        {(section.headings?.length || section.body) && (
          <div className={`max-w-[72ch] ${BODY_TEXT} ${isCentered ? 'space-y-2 mx-auto' : 'space-y-4'}`}>
            {section.headings?.map((h, i) => (
              <p key={`h-${i}`} className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">{h}</p>
            ))}
            {(section.body ?? '').split('\n').filter(l => l.trim()).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
        {section.subhead && (
          <p className={`text-lg text-white font-normal tracking-normal mt-16 ${BODY_TEXT}`}>
            {section.subhead}
          </p>
        )}
        {section.body2 && (
          <div className={`max-w-[72ch] ${BODY_TEXT} mt-6 ${isCentered ? 'space-y-2 mx-auto' : 'space-y-4'}`}>
            {section.body2.split('\n').filter(l => l.trim()).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
      </div>
      {section.list && section.list.length > 0 && (
        <div className="px-6 md:px-8 max-w-4xl mx-auto mt-20">
          <div className="border-l border-[#ECA9CC]/50 pl-6 md:pl-8 space-y-12 md:space-y-16 max-w-[72ch]">
            {section.list.map((entry, i) => (
              <div key={i} className="space-y-2">
                <p className="font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-[#ECA9CC]">
                  {entry.tag}
                </p>
                <p className={BODY_TEXT}>{entry.item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {section.statement && (
        <div className={`py-20 md:py-28 px-6 ${isCentered ? 'text-center' : 'md:px-8 max-w-4xl mx-auto'}`}>
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
            {section.statement}
          </p>
        </div>
      )}
      {section.tagline && (
        <div className="text-center py-8 mt-8">
          <p className="text-sm text-[#ECA9CC] tracking-wide">{section.tagline}</p>
        </div>
      )}
    </section>
  );
}
export default function CaseTextBlock({ section }: { section: TextSection }) {
  if (section.tone === 'emphasis') {
    return (
      <CaseSectionWrapper tone="emphasis" fullWidth>
        <Inner section={section} />
      </CaseSectionWrapper>
    );
  }
  return <Inner section={section} />;
}
