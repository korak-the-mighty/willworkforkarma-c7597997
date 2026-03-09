import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseSectionWrapper from "@/components/CaseSectionWrapper";

/* ── Helpers (mirrored from CaseShare) ── */
const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);

const BODY_TEXT = "text-[1.25rem] leading-[1.65]";

/* ── Page ── */
const CaseWTR = () => {
  return (
    <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
      <div className="text-white">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative min-h-screen w-full">
          <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/WTR-hero.webp" loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
            <p className="text-sm tracking-[0.02em] text-white">
              Wörner Traxler Richter
            </p>
            <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">
              Digital Platform · Creative Direction · 2022
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
              Setting a stage for clarity and design.
            </h1>
          </div>
        </section>

        {/* ═══════════════ CONTEXT ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Context</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>Wörner Traxler Richter are one of Germany's leading architecture practices.</p>
                <p>Their buildings are precise, thoughtful and long-lasting.</p>
                <p className="pb-16 md:pb-24">Their digital presence did not reflect that.</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
              <div className="md:ml-auto md:w-[50vw] overflow-hidden">
                <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/WTR-hero.webp" loading="lazy" className="w-full h-full object-cover lazy-img" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ TENSION ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="px-6 md:px-8 max-w-4xl mx-auto md:hidden">
            <MicroLabel>Tension</MicroLabel>
          </div>
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 md:mt-48 order-2 md:order-1">
              <div className="md:mr-auto md:w-[50vw] overflow-hidden">
                <img
                  src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/WTR-hero.webp"
                  loading="lazy"
                  className="w-full h-full object-cover lazy-img"
                  alt=""
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 px-6 md:px-0 order-1 md:order-2">
              <div className="hidden md:block">
                <MicroLabel>Tension</MicroLabel>
              </div>
              <div className={`max-w-[72ch] space-y-6 ${BODY_TEXT}`}>
                <div className="space-y-1">
                  <p>Architecture offices rarely believe in websites.</p>
                  <p>Their work lives in buildings, competitions and printed documentation.</p>
                  <p>Digital presence is often an afterthought — or a necessary compromise.</p>
                </div>
                <div className="space-y-1 pb-16 md:pb-24">
                  <p>The challenge was not to modernize them.</p>
                  <p>It was to earn their trust.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ BAM STATEMENT ═══════════════ */}
        <section className="py-20 md:py-28 px-6 md:px-8 max-w-4xl mx-auto">
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
            Before any design decision,<br />
            the practice had to be understood.
          </p>
        </section>

        {/* ═══════════════ DECISION ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Decision</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>How architects present work.</p>
                <p>How they structure information.</p>
                <p>What actually matters in a project.</p>
                <p className="pb-16 md:pb-24">
                  Only then could digital discipline follow architectural discipline.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
              <div className="md:ml-auto md:w-[50vw] overflow-hidden">
                <img
                  src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/WTR-hero.webp"
                  loading="lazy"
                  className="w-full h-full object-cover lazy-img"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ EXECUTION ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Execution</MicroLabel>
            <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">A modular platform built around the work, not around the medium.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Clear hierarchy. Strong imagery. Calm typography. Precise project data.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Each project follows a deliberate rhythm: context → idea → space → detail → data.</p>
              <p className="mt-6">Every interaction — loaders, transitions, navigation — refined until invisible.</p>
              <p>No formal redesign. A visual language that quietly evolved from the foundation already there.</p>
            </div>
          </div>
        </section>

        {/* ═══════════════ IMPACT ═══════════════ */}
        <CaseSectionWrapper tone="emphasis" fullWidth>
          <section className="py-24 md:py-32">
            <div className="px-6 md:px-8 max-w-4xl mx-auto">
              <MicroLabel>Impact</MicroLabel>
            </div>

            <div className={`max-w-[46rem] mx-auto text-center px-6 space-y-2 py-12 break-keep ${BODY_TEXT}`}>
              <p>The practice recognized itself in the work.</p>
              <p>A digital presence they trust and stand behind.</p>
            </div>

            <div className="py-20 md:py-28 text-center px-6">
              <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
                Architecture for architecture.
              </p>
            </div>

            <div className="text-center py-8 mt-8">
              <p className="text-sm text-[#ECA9CC] tracking-wide">
                Digital Platform · Creative Direction · 2022
              </p>
            </div>
          </section>
        </CaseSectionWrapper>

        {/* ═══════════════ LET'S TALK CTA ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="text-center">
            <Link
              to="/contact"
              className="font-heading text-2xl md:text-4xl tracking-tight text-white hover:opacity-60 transition-opacity"
            >
              Let's talk.
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CaseWTR;
