import type { CaseModule as CaseModuleType } from "@/data/cases";
import CaseMediaGrid from "@/components/CaseMediaGrid";

interface CaseModuleProps {
  module: CaseModuleType;
  index: number;
}

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const CaseModule = ({ module, index }: CaseModuleProps) => {
  if (module.type === "break") {
    return (
      <div className={`${FULL_BLEED} h-[40vh] md:h-[60vh] bg-muted my-12`} />
    );
  }

  const flip = index % 2 === 1;
  const paragraphs = module.text?.split(/\n+/).filter(Boolean) || [];
  const hasMedia = module.media.length > 0;

  return (
    <div className="py-12 space-y-8">
      {module.title && (
        <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {module.title}
        </h3>
      )}
      <div className={`grid gap-8 md:grid-cols-2 md:gap-12 ${flip ? "direction-rtl" : ""}`}>
        <div className={`space-y-4 ${flip ? "md:order-2" : ""}`}>
          {paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed">{p}</p>
          ))}
        </div>
        {hasMedia ? (
          <div className={flip ? "md:order-1" : ""}>
            <CaseMediaGrid items={module.media.map((src) => ({ src }))} count={module.media.length} />
          </div>
        ) : (
          <div className={`aspect-[4/3] bg-muted ${flip ? "md:order-1" : ""}`} />
        )}
      </div>
    </div>
  );
};

export default CaseModule;
