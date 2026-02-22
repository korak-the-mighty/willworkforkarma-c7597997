import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import ScrollyVideoSection from "@/components/ScrollyVideoSection";

import heroVideo from "@/assets/abb-e-mobility-mcs-hero.mp4";
import contextImg from "@/assets/ABB-emobility-context.webp";
import tensionVideo from "@/assets/ABB-c50-launch.mp4";
import galleryImg11 from "@/assets/ABB_E-mobility_11.png";
import galleryImg3 from "@/assets/ABB_E-mobility_3.png";
import galleryImg13 from "@/assets/ABB_E-mobility_13.png";
import wideDash from "@/assets/ABB-media_11.png";
import decisionImg from "@/assets/ABB-media_4.webp";

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

const BODY_TEXT = "text-[1.25rem] leading-[1.65]";

/* ── Gallery data ── */
import galleryImg11b from "@/assets/ABB-media_11.png";
import galleryImg4b from "@/assets/ABB-media_4-2.webp";

const galleryItems = [
  { src: galleryImg11, alt: "ABB E-mobility interface", span: "md:col-span-2 md:row-span-2" },
  { src: galleryImg3, alt: "ABB E-mobility charger" },
  { src: galleryImg13, alt: "ABB E-mobility components" },
  { src: galleryImg11b, alt: "ABB E-mobility configurator" },
  { src: galleryImg4b, alt: "ABB E-mobility detail" },
];

/* ── Page ── */
const CaseABB = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <Layout fullWidth theme={{ bg: "#101010" }}>
      <div
        style={
          {
            "--background": "220 20% 5%",
            "--foreground": "210 15% 90%",
            "--muted": "220 15% 12%",
          } as React.CSSProperties
        }
        className="bg-[#101010] text-white"
      >
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative h-screen w-full overflow-hidden">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            <p className="text-sm tracking-[0.02em] text-white">
              ABB E&#8209;mobility
            </p>
            <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">
              Branding · UI/UX · 2024–2025
            </p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
              Building the digital brand foundation of a global e&#8209;mobility leader.
            </h1>
          </div>
        </section>

        {/* ═══════════════ CONTEXT ═══════════════ */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-4">
              <MicroLabel>Context</MicroLabel>
              <div className={`max-w-[72ch] space-y-4 ${BODY_TEXT}`}>
                <p>ABB E&#8209;mobility operated inside ABB corporate.</p>
                <p>
                  A new generation of chargers was ready to launch — redesigned
                  industrially, digitally, and strategically.
                </p>
                <p>
                  But there was no independent brand or digital system capable of
                  expressing that shift.
                </p>
                <p className="pb-16 md:pb-24">
                  A future-facing product line had no independent brand
                  container.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-48">
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
            <div className="col-span-12 md:col-span-6 md:mt-48 order-2 md:order-1">
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
            <div className="col-span-12 md:col-span-5 md:col-start-8 px-6 md:px-0 order-1 md:order-2">
              <div className="hidden md:block">
                <MicroLabel>Tension</MicroLabel>
              </div>
              <div className={`max-w-[72ch] space-y-6 ${BODY_TEXT}`}>
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
                <div className="space-y-1 pb-16 md:pb-24">
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
            <div className={`max-w-[72ch] ${BODY_TEXT}`}>
              <p>
                Build a standalone modular E&#8209;mobility brand system — aligned with
                ABB heritage, but structurally independent.
              </p>
              <p className="mt-4">Not a redesign.</p>
            </div>
          </div>

          <div className="py-20 md:py-28 px-6 md:px-8 max-w-4xl mx-auto">
            <p className="font-heading text-3xl md:text-5xl tracking-tight text-white">
              A new flexible, future proof brand system.
            </p>
          </div>

          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <div className={`max-w-[72ch] ${BODY_TEXT}`}>
              <p>
                One that could express the positioning, scale globally, and
                extend beyond corporate constraints.
              </p>
            </div>
          </div>

          <div className={`${FULL_BLEED} mt-32 md:mt-40 overflow-hidden`}>
            <img
              src={decisionImg}
              alt="ABB E-mobility brand system"
              className={`h-full w-full object-cover ${MEDIA_HOVER}`}
            />
          </div>
        </section>

        {/* ═══════════════ EXECUTION ═══════════════ */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Execution</MicroLabel>
            <div className={`max-w-[72ch] ${BODY_TEXT}`}>
              <p>
                The first new charger generation — A400 — became the proving
                ground.
              </p>

              <p className="text-lg text-white font-normal tracking-normal mt-16">
                System in practice
              </p>

              <p className="mt-6">
                It was the first product built under the new positioning, with a
                redesigned interface and industrial language. We used it to
                validate the new visual and interaction principles before scaling
                them globally.
              </p>

              <div className="border-l border-[#ECA9CC]/50 pl-6 md:pl-8 space-y-12 md:space-y-16 mt-20">
                <div className="space-y-2">
                  <p className="font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-[#ECA9CC]">BUILT</p>
                  <p>The modular digital foundation</p>
                </div>
                <div className="space-y-2">
                  <p className="font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-[#ECA9CC]">ESTABLISHED</p>
                  <p>A scalable component system</p>
                </div>
                <div className="space-y-2">
                  <p className="font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-[#ECA9CC]">ALIGNED</p>
                  <p>Product, interface and visual language under one logic</p>
                </div>
                <div className="space-y-2">
                  <p className="font-heading text-lg md:text-xl uppercase tracking-[0.04em] text-[#ECA9CC]">SET</p>
                  <p>Global standards for imagery and expression</p>
                </div>
              </div>

              <p className="mt-24">
                Over two years, teams evolved and roles shifted.
              </p>
              <p className="mt-4">
                I remained responsible for maintaining strategic and structural
                continuity.
              </p>
            </div>
          </div>

          {/* Scrolly Video Highlight */}
          <div className="mt-24 md:mt-36">
            <ScrollyVideoSection
              manifestUrl="/videos/abb-mobilefly-frames/manifest.json"
              basePath="/videos/abb-mobilefly-frames/"
            />
          </div>

          {/* Gallery */}
          <div className="mt-40 md:mt-56 px-6 md:px-8 max-w-5xl mx-auto">
            <div className="flex flex-wrap items-start">
              {galleryItems.map((item, i) => {
                const styles: React.CSSProperties[] = [
                  { width: "85%", marginTop: 0, marginLeft: 0, marginRight: "auto" },
                  { width: "70%", marginTop: "1.5rem", marginLeft: "auto", marginRight: 0 },
                  { width: "75%", marginTop: "1rem", marginLeft: "5%", marginRight: "auto" },
                  { width: "80%", marginTop: "2rem", marginLeft: "auto", marginRight: 0 },
                  { width: "65%", marginTop: "1rem", marginLeft: "10%", marginRight: "auto" },
                ];
                const desktopStyles: React.CSSProperties[] = [
                  { width: "55%", marginTop: 0, marginLeft: 0, marginRight: "auto" },
                  { width: "38%", marginTop: "2rem", marginLeft: "auto", marginRight: 0, paddingLeft: "3rem" },
                  { width: "42%", marginTop: "3rem", marginLeft: "1rem", marginRight: "auto" },
                  { width: "48%", marginTop: "4rem", marginLeft: "auto", marginRight: 0 },
                  { width: "36%", marginTop: "-2rem", marginLeft: "8%", marginRight: "auto" },
                ];
                const isMd = typeof window !== "undefined" && window.innerWidth >= 768;
                const s = (isMd ? desktopStyles : styles)[i] || styles[0];
                return (
                  <div
                    key={i}
                    className="p-3 overflow-hidden cursor-pointer"
                    style={s}
                    onClick={() => setLightboxSrc(item.src)}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-full object-contain ${MEDIA_HOVER}`}
                    />
                  </div>
                );
              })}
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

          <div className={`max-w-[46rem] mx-auto text-center px-6 space-y-2 py-12 break-keep ${BODY_TEXT}`}>
            <p>
              ABB E&#8209;mobility gained a system capable of expressing its{"\u00A0"}ambition.
            </p>
            <p>
              The architecture extended beyond marketing into product
              dashboards and infrastructure tools.
            </p>
            <p>The positioning became tangible.</p>
          </div>

          <div className="text-center py-8 mt-8">
            <p className="text-sm text-[#ECA9CC] tracking-wide">
              Modular digital design system · Global brand website · Scalable
              component library · Product interface adoption
            </p>
          </div>
        </section>

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
