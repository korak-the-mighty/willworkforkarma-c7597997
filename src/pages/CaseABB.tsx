import { useState } from "react";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import CaseWhyMe from "@/components/CaseWhyMe";
import { cases } from "@/data/cases";

import contextImg from "@/assets/ABB-emobility-context.webp";
import tensionVideo from "@/assets/ABB-c50-launch.mp4";
import galleryImg11 from "@/assets/ABB_E-mobility_11.png";
import galleryImg3 from "@/assets/ABB_E-mobility_3.png";
import galleryImg13 from "@/assets/ABB_E-mobility_13.png";
import wideDash from "@/assets/ABB-visuals-wide-dash.avif";

/* ── Swap this to a local import when ready ── */
const HERO_VIDEO_SRC =
  "https://e-mobility.abb.com/content/dam/abb-em/global/hero/abb-e-mobility-hero-video.mp4";

/* ── Helpers ── */
const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">
    {children}
  </p>
);

const FULL_BLEED =
  "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const MEDIA_HOVER =
  "brightness-[0.85] hover:brightness-100 transition-[filter] duration-300";

/* ── Page ── */
const CaseABB = () => {
  const caseData = cases.find((c) => c.slug === "abb-emobility")!;
  const caseIndex = cases.findIndex((c) => c.slug === "abb-emobility");
  const nextCase = cases[caseIndex + 1] || cases[0];
  const nextCaseLink =
    nextCase && nextCase.slug !== caseData.slug
      ? { slug: nextCase.slug, title: nextCase.title }
      : null;

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <Layout fullWidth>
      <div
        style={
          {
            "--background": "220 20% 5%",
            "--foreground": "210 15% 90%",
            "--muted": "220 15% 12%",
          } as React.CSSProperties
        }
        className="bg-[#01031A] text-white"
      >
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative h-screen w-full overflow-hidden">
          <video
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <p className="text-sm tracking-[0.02em] text-white">
              ABB E-mobility
            </p>
            <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">
              Branding · UI/UX · 2024–2025
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
              Defining the digital brand foundation of ABB&nbsp;E-mobility.
            </h1>
          </div>
        </section>

        {/* ═══════════════ CONTEXT ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Context</MicroLabel>
          </div>
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-5 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-0">
              <div className="max-w-[72ch] space-y-4 leading-relaxed">
                <p>E-mobility operated inside ABB corporate.</p>
                <p>
                  A new generation of chargers was ready to launch — redesigned
                  industrially, digitally, and strategically.
                </p>
                <p>
                  But there was no independent brand or digital system capable of
                  expressing that shift.
                </p>
                <p>
                  A future-facing product line had no independent brand
                  container.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-20">
              <div className="md:ml-auto md:w-[50vw] aspect-[3/2] overflow-hidden">
                <img
                  src={contextImg}
                  alt="ABB E-mobility context"
                  className={`h-full w-full object-cover ${MEDIA_HOVER}`}
                />
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
            <div className="col-span-12 md:col-span-6 md:mt-20 order-2 md:order-1">
              <div className="md:mr-auto md:w-[50vw] aspect-[3/2] overflow-hidden">
                <video
                  src={tensionVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`h-full w-full object-cover ${MEDIA_HOVER}`}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-8 px-6 md:px-0 order-1 md:order-2">
              <div className="hidden md:block">
                <MicroLabel>Tension</MicroLabel>
              </div>
              <div className="max-w-[72ch] space-y-6 leading-relaxed">
                <div className="space-y-1">
                  <p>The products had evolved.</p>
                  <p>The brand container had not.</p>
                </div>
                <div className="space-y-1">
                  <p>
                    There was no architecture capable of staging innovation.
                  </p>
                  <p>No modular foundation.</p>
                  <p>No independent digital presence.</p>
                </div>
                <div className="space-y-1">
                  <p>Innovation existed.</p>
                  <p>The system to show it didn't.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ DECISION ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Decision</MicroLabel>
            <div className="max-w-[72ch] leading-relaxed">
              <p>
                Build a standalone modular E-mobility brand system — aligned with
                ABB heritage, but structurally independent.
              </p>
              <p className="mt-4">Not a redesign.</p>
            </div>
          </div>

          <div className="py-20 md:py-28 text-center px-6">
            <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
              A new system.
            </p>
          </div>

          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <div className="max-w-[72ch] leading-relaxed">
              <p>
                One that could express the positioning, scale globally, and
                extend beyond corporate constraints.
              </p>
            </div>
          </div>

          <div
            className={`${FULL_BLEED} mt-16 aspect-[16/9] bg-[hsl(220,15%,12%)]`}
          />
        </section>

        {/* ═══════════════ EXECUTION ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Execution</MicroLabel>
            <div className="max-w-[72ch] space-y-4 leading-relaxed">
              <p>
                The first new charger generation — A400 — became the proving
                ground.
              </p>
              <p>
                It was the first product built under the new positioning, with a
                redesigned interface and industrial language. We used it to
                validate the new visual and interaction principles before scaling
                them globally.
              </p>

              <div className="space-y-2 pt-4">
                <p>– Built a modular digital architecture</p>
                <p>– Created a reusable component library</p>
                <p>
                  – Defined visual and interaction logic aligned with the
                  positioning
                </p>
                <p>
                  – Defined and enforced guidelines for product and use-case
                  imagery to ensure visual consistency across markets
                </p>
                <p>– Recruited and led the core creative team</p>
                <p>
                  – Served as the constant bridge between leadership and
                  production
                </p>
              </div>

              <p className="pt-4">
                Over two years, teams evolved and roles shifted.
              </p>
              <p>
                I remained responsible for maintaining strategic and structural
                continuity.
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="mt-16 px-6 md:px-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-12 gap-4">
              <div
                className="col-span-12 md:col-span-7 aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => setLightboxSrc(galleryImg11)}
              >
                <img
                  src={galleryImg11}
                  alt="ABB E-mobility interface"
                  className={`h-full w-full object-cover ${MEDIA_HOVER}`}
                />
              </div>
              <div className="col-span-12 md:col-span-5 space-y-4 md:mt-12">
                <div
                  className="aspect-[3/2] overflow-hidden cursor-pointer"
                  onClick={() => setLightboxSrc(galleryImg3)}
                >
                  <img
                    src={galleryImg3}
                    alt="ABB E-mobility charger"
                    className={`h-full w-full object-cover ${MEDIA_HOVER}`}
                  />
                </div>
                <div
                  className="aspect-[3/2] overflow-hidden cursor-pointer"
                  onClick={() => setLightboxSrc(galleryImg13)}
                >
                  <img
                    src={galleryImg13}
                    alt="ABB E-mobility components"
                    className={`h-full w-full object-cover ${MEDIA_HOVER}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Full-width wide dash */}
          <div className={`${FULL_BLEED} mt-16 overflow-hidden`}>
            <img
              src={wideDash}
              alt="ABB E-mobility dashboard"
              className={`h-full w-full object-cover ${MEDIA_HOVER}`}
            />
          </div>
        </section>

        {/* ═══════════════ OUTCOME ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Outcome</MicroLabel>
          </div>

          <div className="py-20 md:py-28 text-center px-6">
            <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
              For the first time, product, platform and brand moved as one.
            </p>
          </div>

          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <div className="max-w-[72ch] space-y-4 leading-relaxed">
              <p>
                ABB E-mobility gained a system capable of expressing its
                ambition.
              </p>
              <p>
                The architecture extended beyond marketing into product
                dashboards and infrastructure tools.
              </p>
              <p>The positioning became tangible.</p>
            </div>
          </div>

          <div className="text-center py-8 mt-8">
            <p className="text-sm text-[#ECA9CC] tracking-wide">
              Modular digital design system · Global brand website · Scalable
              component library · Product interface adoption
            </p>
          </div>
        </section>

        {/* ═══════════════ WHY ME + NEXT ═══════════════ */}
        <CaseWhyMe text={caseData.whyMe} nextCase={nextCaseLink} />

        {/* ═══════════════ LIGHTBOX ═══════════════ */}
        {lightboxSrc && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer animate-in fade-in duration-300"
            onClick={() => setLightboxSrc(null)}
          >
            <img
              src={lightboxSrc}
              alt=""
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity"
              onClick={() => setLightboxSrc(null)}
            >
              <X size={32} />
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CaseABB;
