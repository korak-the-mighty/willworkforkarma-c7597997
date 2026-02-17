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
      <div className={`${FULL_BLEED} my-12`}>
        <div className="aspect-[16/9] bg-muted w-full" />
      </div>
    );
  }

  const paragraphs = module.text?.split(/\n+/).filter(Boolean) || [];
  const hasMedia = module.media.length > 0;
  const imageFirst = index % 2 === 0;

  const textBlock = (
    <div className="space-y-4 pt-4 mb-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-base md:text-lg leading-relaxed">{p}</p>
      ))}
    </div>
  );

  const mediaBlock = hasMedia ? (
    <CaseMediaGrid items={module.media.map((src) => ({ src }))} count={module.media.length} />
  ) : (
    <div className="aspect-[16/9] bg-muted w-full" />
  );

  return (
    <div className="py-16 md:py-20 space-y-12 md:space-y-16">
      {module.title && (
        <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {module.title}
        </h3>
      )}
      {imageFirst ? (
        <>
          {mediaBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {mediaBlock}
        </>
      )}
    </div>
  );
};

export default CaseModule;
