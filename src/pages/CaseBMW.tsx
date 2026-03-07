import { useEffect } from "react";
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
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">
          <p className="text-sm tracking-widest text-white/50 uppercase mb-2">BMW</p>
          <p className="text-sm tracking-widest text-white/40 uppercase mb-10">Digital · Creative Direction · Global Platform</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-4xl">
            Creative leadership across BMW's global digital ecosystem.
          </h1>
          <p className="mt-8 text-lg text-white/60 max-w-xl">
            Global platform direction, market launches, and a continuous stream of new digital ideas.
          </p>
        </section>

        {/* HERO IMAGE */}
        <section className="w-full">
          <img
            src={`${R2}/BMW1.webp`}
            alt="Global BMW website platform across devices"
            className="w-full object-cover"
          />
        </section>

        {/* CONTEXT */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Context</p>
          <p className="text-white/80 mb-3">BMW's digital presence was expanding globally.</p>
          <p className="text-white/80 mb-3">New platforms were being built.<br />Markets were launching campaigns.<br />Electric mobility was emerging.</p>
          <p className="text-white/80">At Hi-ReS! we worked closely with BMW to guide and evolve this ecosystem.</p>
        </section>

        {/* CONTEXT IMAGE */}
        <section className="w-full">
          <img
            src={`${R2}/BMW5.webp`}
            alt="Global BMW site video mosaic and platform capabilities"
            className="w-full object-cover"
          />
        </section>

        {/* ROLE */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Role</p>
          <p className="text-white/80 mb-4">As Creative Director I led the global design team and oversaw the quality and direction of BMW's digital platforms across markets.</p>
          <p className="text-white/80">At the same time our team continuously developed new concepts, interactive formats and campaign ideas — pushing fresh thinking into the organization.</p>
        </section>

        {/* ROLE IMAGE */}
        <section className="w-full">
          <img
            src={`${R2}/BMW2.webp`}
            alt="Campaign and storytelling concept exploration"
            className="w-full object-cover"
          />
        </section>

        {/* WORK */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Work</p>
          <p className="text-white/80 mb-6">My work spanned several layers of BMW's digital ecosystem:</p>
          <ul className="space-y-3 text-white/70">
            <li>Creative direction for the global BMW website platform (bmw.com and international markets)</li>
            <li>Content and campaign work for BMW.de</li>
            <li>Digital experience concepts for BMW i3 and electric mobility</li>
            <li>Continuous concept development — pushing new digital ideas into the organization</li>
            <li>Internal communication tools used by BMW to introduce new website modules to global markets</li>
          </ul>
        </section>

        {/* WORK IMAGE */}
        <section className="w-full">
          <img
            src={`${R2}/BMW4.webp`}
            alt="Internal BMW communication film introducing website modules to global markets"
            className="w-full object-cover"
          />
        </section>

        {/* OUTCOME */}
        <section className="max-w-2xl mx-auto px-6 py-24">
          <p className="text-xs tracking-widest text-white/40 uppercase mb-8">Outcome</p>
          <p className="text-white/80 mb-3">Some concepts became projects.<br />Others pushed the conversation forward.</p>
          <p className="text-white/80">The result was a digital ecosystem that continued to evolve while maintaining the quality and clarity expected from BMW.</p>
        </section>

        {/* OUTCOME IMAGE */}
        <section className="w-full">
          <img
            src={`${R2}/BMW3.webp`}
            alt="Concept exploration and interactive storytelling ideas"
            className="w-full object-cover"
          />
        </section>

        {/* CLOSING */}
        <section className="max-w-2xl mx-auto px-6 py-24 text-center">
          <p className="text-2xl md:text-3xl text-white/80 mb-2">Large platforms need both discipline and imagination.</p>
          <p className="text-2xl md:text-3xl text-white/80">My role was to guide the system — while constantly pushing new creative possibilities into it.</p>
        </section>

        {/* CTA */}
        <section className="flex justify-center pb-32">
          <a
            href="/contact"
            className="text-white text-lg border-b border-white/40 pb-1 hover:border-white transition-colors"
          >
            Let's talk.
          </a>
        </section>
      </div>
    </Layout>
  );
};

export default CaseBMW;
