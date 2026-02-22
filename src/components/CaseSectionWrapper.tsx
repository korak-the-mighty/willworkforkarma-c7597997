type SectionTone = "default" | "subtle" | "emphasis";

interface CaseSectionWrapperProps {
  tone?: SectionTone;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const toneMap: Record<SectionTone, string> = {
  default: "",
  subtle: "bg-white/[0.03]",
  emphasis: "bg-white/[0.06]",
};

const CaseSectionWrapper = ({
  tone = "default",
  fullWidth = false,
  className = "",
  children,
}: CaseSectionWrapperProps) => (
  <section
    className={`${fullWidth ? "w-full" : FULL_BLEED} ${toneMap[tone]} ${className}`.trim()}
  >
    {children}
  </section>
);

export default CaseSectionWrapper;
