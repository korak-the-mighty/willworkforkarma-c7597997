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
  subtle: "",
  emphasis: "",
};

const CaseSectionWrapper = ({
  tone = "default",
  fullWidth = false,
  className = "",
  children,
}: CaseSectionWrapperProps) => (
  <section
    className={`${fullWidth ? FULL_BLEED : ""} ${toneMap[tone]} ${className}`.trim()}
  >
    {children}
  </section>
);

export default CaseSectionWrapper;
