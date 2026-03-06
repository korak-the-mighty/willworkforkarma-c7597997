import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseSectionWrapper from "@/components/CaseSectionWrapper";
import ScrollyVideoSection from "@/components/ScrollyVideoSection";

/* ── Helpers (mirrored from CaseShare) ── */
const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);

const BODY_TEXT = "text-[1.25rem] leading-[1.65]";

/* ── Placeholder ── */
const MediaPlaceholder = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white/5 aspect-[3/2] ${className}`} />
);

/* ── Page ── */
const CaseMAN = () => {
  return (
    <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
      <div className="text-white">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative min-h-screen w-full">
          <div className="absolute inset-0 bg-white/5" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
            <p className="text-sm tracking-[0.02em] text-white">
              MAN
            </p>
            <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">
              Digital · UX · Product Launch
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
              Entering a new category<br />
              without losing the core.
            </h1>
          </div>
        </section>

        {/* ═══════════════ CONTEXT ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Context</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>MAN was known for trucks.</p>
                <p>The TGE was something new.</p>
                <p>A modular van platform entering a category the brand had never been part of.</p>
                <p>Different buyers.</p>
                <p>Different expectations.</p>
                <p className="pb-16 md:pb-24">The ambition was big.</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
              <div className="md:ml-auto md:w-[50vw] overflow-hidden">
                <MediaPlaceholder />
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
                <video
                  ref={(el) => {
                    if (!el) return;
                    const observer = new IntersectionObserver(
                      ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                      { threshold: 0.3 }
                    );
                    observer.observe(el);
                  }}
                  src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/MAN-video-1.webm"
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 px-6 md:px-0 order-1 md:order-2">
              <div className="hidden md:block">
                <MicroLabel>Tension</MicroLabel>
              </div>
              <div className={`max-w-[72ch] space-y-6 ${BODY_TEXT}`}>
                <div className="space-y-1">
                  <p>Versatility creates complexity.</p>
                  <p>When a product can do almost everything,</p>
                  <p>communication becomes fragile.</p>
                  <p>Show too little</p>
                  <p>and the capability disappears.</p>
                  <p>Show everything</p>
                  <p>and the story collapses.</p>
                </div>
                <div className="space-y-1 pb-16 md:pb-24">
                  <p>The strategy defined three key worlds.</p>
                  <p>But turning that into a coherent experience</p>
                  <p>required discipline.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ BAM STATEMENT ═══════════════ */}
        <section className="py-20 md:py-28 px-6 md:px-8 max-w-4xl mx-auto">
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
            A first van.<br />
            A global stage.<br />
            No room for confusion.
          </p>
        </section>

        {/* ═══════════════ DECISION ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Decision</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>Translate the strategy into a clear digital structure.</p>
                <p>Three entry points frame the story. Tools help users define their needs.</p>
                <p className="pb-16 md:pb-24">
                  The product's versatility becomes understandable without overwhelming the audience.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
              <div className="md:ml-auto md:w-[50vw] overflow-hidden">
                <video
                  ref={(el) => {
                    if (!el) return;
                    const observer = new IntersectionObserver(
                      ([entry]) => { entry.isIntersecting ? el.play() : el.pause(); },
                      { threshold: 0.3 }
                    );
                    observer.observe(el);
                  }}
                  src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/MAN-video-2.webm"
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
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
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Creative direction across the platform.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">UI and UX for the experience.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Interactive tools connecting needs to configurations.</p>
              <p className="mt-6">Close collaboration with development teams and internal stakeholders.</p>
              <p>A year of work leading to the public launch.</p>
            </div>
          </div>

          <div className="mt-16 hidden md:block">
            <ScrollyVideoSection
              manifestUrl="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/man-scrolly-frames/manifest.json"
              basePath="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/man-scrolly-frames/"
            />
          </div>

          <div className="w-full mt-12">
            <MediaPlaceholder />
          </div>

          <div className="w-full mt-12 aspect-video bg-white/5" />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="aspect-video bg-white/5" />
            <div className="aspect-video bg-white/5" />
          </div>

          {/* Gallery placeholders — staggered layout mirroring Share */}
          <div className="mt-40 md:mt-56 px-6 md:px-8 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-start">
              <div className="p-3 overflow-hidden" style={{ width: "55%", marginLeft: 0, marginRight: "auto" }}>
                <MediaPlaceholder />
              </div>
              <div className="p-3 overflow-hidden" style={{ width: "38%", marginTop: "2rem", marginLeft: "auto", marginRight: 0 }}>
                <MediaPlaceholder />
              </div>
              <div className="p-3 overflow-hidden" style={{ width: "42%", marginTop: "3rem", marginLeft: "1rem", marginRight: "auto" }}>
                <MediaPlaceholder />
              </div>
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
              <p>The TGE didn't feel like an experiment.</p>
              <p>It felt like a natural extension of MAN.</p>
            </div>

            <div className="py-20 md:py-28 text-center px-6">
              <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
                A new category.<br />But still the same brand.
              </p>
            </div>

            <div className="text-center py-8 mt-8">
              <p className="text-sm text-[#ECA9CC] tracking-wide">
                Creative direction · UI/UX design · Interactive product tools · IAA product launch
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

export default CaseMAN;
