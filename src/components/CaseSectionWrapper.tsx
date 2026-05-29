type SectionTone = "default" | "subtle" | "emphasis";

interface CaseSectionWrapperProps {
  tone?: SectionTone;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FULL_BLEED = "relative w-screen left-1/2 -translate-x-1/2";

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
    className={`${fullWidth ? "w-full" : ""} ${toneMap[tone]} ${className}`.trim()}
  >
    {children}
  </section>
);

export default CaseSectionWrapper;
