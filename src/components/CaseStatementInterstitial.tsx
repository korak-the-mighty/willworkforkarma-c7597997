import type { StatementInterstitialSection } from '../types/case';

export default function CaseStatementInterstitial({ section }: { section: StatementInterstitialSection }) {
  return (
    <section className="py-64 flex flex-col items-center justify-center text-center bg-[#0a0a0a]">
      <p className="font-heading text-3xl md:text-4xl text-white tracking-tight leading-[1.3] px-6 max-w-3xl">
        {section.text}
      </p>
    </section>
  );
}
