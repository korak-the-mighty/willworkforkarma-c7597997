import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const CaseBMW = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const R2 = "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev";

  return (
    <Layout fullWidth theme={{ bg: "#0a0a0a" }}>
      <div className="text-white">
        {/* HERO */}
        <section className="relative min-h-screen w-full">
          <img src={`${R2}/BMW-hero.webp`} loading="eager" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-24">
            <p className="text-sm tracking-[0.02em] text-white">BMW</p>
            <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">Digital · Creative Direction · Global Platform</p>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
              Creative leadership across BMW's global digital ecosystem.
            </h1>
          </div>
        </section>

        {/* HERO IMAGE 2 */}
        <section className="w-full py-16">
          <img
            src={`${R2}/BMW1.webp`}
            alt="Global BMW website platform across devices"
            loading="lazy"
            className="w-full object-cover lazy-img"
          />
        </section>

        {/* CONTEXT */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">Context</p>
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white mb-8">BMW's digital presence was expanding globally.</p>
          <p className="text-[1.25rem] leading-[1.65] mb-3">New platforms were being built.<br />Markets were launching campaigns.<br />Electric mobility was emerging.</p>
          <p className="text-[1.25rem] leading-[1.65]">Together with my team, I worked closely with BMW to guide an evolving digital landscape.</p>
        </section>

        {/* CONTEXT IMAGE */}
        <section className="w-full py-16">
          <img
            src={`${R2}/BMW5.webp`}
            alt="Global BMW site video mosaic and platform capabilities"
            loading="lazy"
            className="w-full object-cover lazy-img"
          />
        </section>

        {/* ROLE */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">Role</p>
          <p className="text-[1.25rem] leading-[1.65] mb-4">As Creative Director I led the global design team and oversaw the quality and direction of BMW's digital platforms across markets.</p>
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white py-6">Inspire the work. Keep it worthy of BMW.</p>
          <p className="text-[1.25rem] leading-[1.65]">At the same time our team continuously developed new concepts, interactive formats and campaign ideas — pushing fresh thinking into the organization.</p>
        </section>

        {/* ROLE IMAGE */}
        <section className="w-full py-16">
          <img
            src={`${R2}/BMW2.webp`}
            alt="Campaign and storytelling concept exploration"
            loading="lazy"
            className="w-full object-cover lazy-img"
          />
        </section>

        {/* WORK */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">Work</p>
          <p className="text-[1.25rem] leading-[1.65] mb-6">My work spanned several layers of BMW's digital ecosystem:</p>
          <ul className="space-y-3 text-[1.25rem] leading-[1.65]">
            <li>Creative direction for the global BMW website platform (bmw.com and international markets)</li>
            <li>Content and campaign work for BMW.de</li>
            <li>Digital experience concepts for BMW i3 and electric mobility</li>
            <li>Continuous concept development — pushing new digital ideas into the organization</li>
            <li>Internal communication tools used by BMW to introduce new website modules to global markets</li>
          </ul>
        </section>

        {/* WORK IMAGE */}
        <section className="w-full py-16">
          <img
            src={`${R2}/BMW4.webp`}
            alt="Internal BMW communication film introducing website modules to global markets"
            loading="lazy"
            className="w-full object-cover lazy-img"
          />
        </section>

        {/* INTERSTITIAL */}
        <section className="py-24 text-center">
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
            Discipline. Premium standards. Creativity.<br />They can live together.
          </p>
        </section>

        {/* OUTCOME */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-[13px] uppercase tracking-[0.12em] text-[#ECA9CC] font-heading font-light mb-8">Outcome</p>
          <p className="text-[1.25rem] leading-[1.65] mb-3">Some concepts became projects.<br />Others pushed the conversation forward.</p>
          <p className="text-[1.25rem] leading-[1.65]">The result was a digital ecosystem that continued to evolve while maintaining the quality and clarity expected from BMW.</p>
        </section>

        {/* OUTCOME IMAGE */}
        <section className="w-full py-16">
          <img
            src={`${R2}/BMW3.webp`}
            alt="Concept exploration and interactive storytelling ideas"
            loading="lazy"
            className="w-full object-cover lazy-img"
          />
        </section>

        {/* CLOSING */}
        <section className="py-24 px-6 text-center">
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">Large platforms need both discipline and imagination.</p>
          <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">My role was to guide the system — while constantly pushing new creative possibilities into it.</p>
        </section>

        {/* CTA */}
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

export default CaseBMW;
