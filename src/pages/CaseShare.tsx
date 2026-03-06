import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import CaseSectionWrapper from "@/components/CaseSectionWrapper";

/* ── Helpers (mirrored from CaseABB) ── */
const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);

const FULL_BLEED =
  "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const BODY_TEXT = "text-[1.25rem] leading-[1.65]";

/* ── Placeholder ── */
const MediaPlaceholder = ({ className = "" }: { className?: string }) => (
  <div className={`bg-white/5 aspect-[3/2] ${className}`} />
);

/* ── Page ── */
const CaseShare = () => {
  const [activeSpot, setActiveSpot] = useState(1);
  const spotIds = ['KC7KfRSPcyU', 'nu574NTekfQ', '_2CzwJwLd40'];

  return (
    <Layout fullWidth theme={{ bg: "#0f0c0c" }}>
      <div className="text-white">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative h-screen w-full overflow-hidden">
          <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/share1.webp" alt="Share bar product shot" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <p className="text-sm tracking-[0.02em] text-white">
              Share
            </p>
            <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">
              Branding · Brand System · Consumer Goods
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
              Do good. And enjoy it. Making helping something people choose again.
            </h1>
          </div>
        </section>

        {/* ═══════════════ CONTEXT ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Context</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>Share stood for real impact. The product was good. The mission was clear.</p>
                <p>But the brand believed helping was enough.</p>
                <p className="pb-16 md:pb-24">
                  In a market driven by desire, that belief was a ceiling.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
              <div className="md:ml-auto md:w-[50vw] overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/share-media-2nd.webp" alt="Share context" className="w-full h-full object-cover" />
                </div>
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
                <div className="aspect-[3/2] overflow-hidden">
                  <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/share-media-3rd.webp" alt="Share tension" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8 px-6 md:px-0 order-1 md:order-2">
              <div className="hidden md:block">
                <MicroLabel>Tension</MicroLabel>
              </div>
              <div className={`max-w-[72ch] space-y-6 ${BODY_TEXT}`}>
                <div className="space-y-1">
                  <p>Helping was the hero.</p>
                  <p>You bought it once. You didn't need it again.</p>
                </div>
                <div className="space-y-1 pb-16 md:pb-24">
                  <p>In a repeat category, that's goodbye.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ BAM STATEMENT ═══════════════ */}
        <section className="py-20 md:py-28 px-6 md:px-8 max-w-4xl mx-auto">
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
            If it doesn't win on shelf,<br />it doesn't help anyone.
          </p>
        </section>

        {/* ═══════════════ DECISION ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Decision</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>We changed the hierarchy.</p>
                <p>Not a good deed only. A good product with impact.</p>
                <p className="pb-16 md:pb-24">We made helping a joy.</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
              <div className="md:ml-auto md:w-[50vw] overflow-hidden">
                <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/share5.webp" alt="Share chocolate product" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ EXECUTION ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Execution</MicroLabel>
            <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Bolder product presence.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Bright, confident color.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">Less explaining.</p>
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-white">More feeling.</p>
              <p className="mt-6">One clear joyful identity across the range.</p>
              <p>Helping stepped back. The product stepped forward.</p>
            </div>
          </div>

          <div className="w-full mt-12">
            <img src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/share2.webp" alt="Share full product range system" className="w-full object-cover" />
          </div>

          <section className="py-64 flex flex-col items-center justify-center text-center bg-[#0a0a0a]">
            <p className="font-heading text-3xl md:text-4xl text-white tracking-tight leading-[1.3]">The idea showed its energy early. It pointed the way forward.</p>
          </section>

          <section className="py-24 px-6 md:px-16">
            <div className="mb-12">
              <p className="text-[#C8A0A0] uppercase tracking-widest text-xs mb-2">TV campaign</p>
              <p className="font-heading text-2xl text-white">"So einfach kann Teilen sein"</p>
              <p className="text-white/50 text-sm mt-3">An early expression of the idea before the full brand system was built.</p>
            </div>
            <div className="aspect-video w-[90%] mx-auto mb-6">
              <iframe id="campaign-player" className="w-full h-full" src="https://www.youtube.com/embed/KC7KfRSPcyU" title="Spot 1" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="flex gap-8 justify-center mt-4">
              {[1,2,3].map((n) => (
                <button
                  key={n}
                  onClick={() => {
                    setActiveSpot(n);
                    const player = document.getElementById('campaign-player') as HTMLIFrameElement;
                    if (player) player.src = `https://www.youtube.com/embed/${spotIds[n-1]}`;
                  }}
                  className={`text-sm pb-1 transition-colors ${activeSpot === n ? 'text-white border-b border-white' : 'text-white/40'}`}
                >
                  Spot {n}
                </button>
              ))}
            </div>
          </section>
        </section>

        {/* ═══════════════ IMPACT ═══════════════ */}
        <CaseSectionWrapper tone="emphasis" fullWidth>
          <section className="py-24 md:py-32">
            <div className="px-6 md:px-8 max-w-4xl mx-auto">
              <MicroLabel>Impact</MicroLabel>
            </div>

            <div className={`max-w-[46rem] mx-auto text-center px-6 space-y-2 py-12 break-keep ${BODY_TEXT}`}>
              <p>From one-time approval to repeat choice.</p>
              <p>From 'I helped.' to 'I like this.'</p>
            </div>

            <div className="py-20 md:py-28 text-center px-6">
              <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
                Doing good was not enough.<br />It had to feel good too.
              </p>
            </div>

            <div className="text-center py-8 mt-8">
              <p className="text-sm text-[#ECA9CC] tracking-wide">
                Product redesign · Joyful brand system · Portfolio alignment · Repeat behavior activation
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

export default CaseShare;
