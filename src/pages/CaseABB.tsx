import Layout from "@/components/Layout";
import CaseWhyMe from "@/components/CaseWhyMe";
import { cases } from "@/data/cases";

const MicroLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-light mb-8">
    {children}
  </p>
);

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const CaseABB = () => {
  const caseData = cases.find((c) => c.slug === "abb-emobility")!;
  const caseIndex = cases.findIndex((c) => c.slug === "abb-emobility");
  const nextCase = cases[caseIndex + 1] || cases[0];
  const nextCaseLink =
    nextCase && nextCase.slug !== caseData.slug
      ? { slug: nextCase.slug, title: nextCase.title }
      : null;

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
        className="bg-[#01031A] text-[hsl(210,15%,90%)]"
      >
        {/* HERO */}
        <section className="px-6 md:px-8 pt-32 md:pt-40 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl tracking-tight">
              ABB E-mobility
            </h1>
            <h2 className="text-xl md:text-2xl text-white/50 mt-4 max-w-2xl leading-relaxed">
              Defining the digital brand foundation of ABB E-mobility.
            </h2>
          </div>
        </section>

        {/* Hero Media */}
        <div className={`${FULL_BLEED} aspect-[16/9] bg-[hsl(220,15%,12%)]`} />

        {/* CONTEXT */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Context</MicroLabel>
          </div>
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-5 px-6 md:pl-[max(2rem,calc((100vw-56rem)/2))] md:pr-0">
              <div className="max-w-[65ch] space-y-4 text-white/70 leading-relaxed">
                <p>E-mobility operated inside ABB corporate.</p>
                <p>
                  A new generation of chargers was ready to launch — redesigned
                  industrially, digitally, and strategically.
                </p>
                <p>
                  But there was no independent brand or digital system capable of
                  expressing that shift.
                </p>
                <p>A future-facing product line had no independent brand container.</p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 md:col-start-7 md:mt-20">
              <div className="md:ml-auto md:w-[50vw] aspect-[3/2] bg-[hsl(220,15%,12%)]" />
            </div>
          </div>
        </section>

        {/* TENSION */}
        <section className="py-24 md:py-32 overflow-hidden">
          <div className="px-6 md:px-8 max-w-4xl mx-auto md:hidden">
            <MicroLabel>Tension</MicroLabel>
          </div>
          <div className="grid grid-cols-12 gap-8 items-start">
            <div className="col-span-12 md:col-span-6 md:mt-20 order-2 md:order-1">
              <div className="md:mr-auto md:w-[50vw] aspect-[3/2] bg-[hsl(220,15%,12%)]" />
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-8 px-6 md:px-0 order-1 md:order-2">
              <div className="hidden md:block">
                <MicroLabel>Tension</MicroLabel>
              </div>
              <div className="max-w-[65ch] space-y-6 text-white/70 leading-relaxed">
                <div className="space-y-1">
                  <p>The products had evolved.</p>
                  <p>The brand container had not.</p>
                </div>
                <div className="space-y-1">
                  <p>There was no architecture capable of staging innovation.</p>
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

        {/* DECISION */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Decision</MicroLabel>
            <div className="max-w-[65ch] text-white/70 leading-relaxed">
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
            <div className="max-w-[65ch] text-white/70 leading-relaxed">
              <p>
                One that could express the positioning, scale globally, and extend
                beyond corporate constraints.
              </p>
            </div>
          </div>

          <div className={`${FULL_BLEED} mt-16 aspect-[16/9] bg-[hsl(220,15%,12%)]`} />
        </section>

        {/* EXECUTION */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Execution</MicroLabel>
            <div className="max-w-[65ch] space-y-4 text-white/70 leading-relaxed">
              <p>
                The first new charger generation — A400 — became the proving ground.
              </p>
              <p>
                It was the first product built under the new positioning, with a
                redesigned interface and industrial language. We used it to validate
                the new visual and interaction principles before scaling them
                globally.
              </p>

              <div className="space-y-2 pt-4">
                <p>– Built a modular digital architecture</p>
                <p>– Created a reusable component library</p>
                <p>
                  – Defined visual and interaction logic aligned with the positioning
                </p>
                <p>
                  – Defined and enforced guidelines for product and use-case imagery
                  to ensure visual consistency across markets
                </p>
                <p>– Recruited and led the core creative team</p>
                <p>
                  – Served as the constant bridge between leadership and production
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

          {/* Stacked media */}
          <div className="mt-16 px-6 md:px-8 max-w-4xl mx-auto space-y-8">
            <div className="aspect-[16/9] bg-[hsl(220,15%,12%)]" />
            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-[3/2] bg-[hsl(220,15%,12%)]" />
              <div className="aspect-[3/2] bg-[hsl(220,15%,12%)]" />
            </div>
          </div>
          <div className="mt-8 overflow-hidden">
            <div className="md:ml-auto md:w-[50vw] aspect-[3/2] bg-[hsl(220,15%,12%)]" />
          </div>
        </section>

        {/* OUTCOME */}
        <section className="py-24 md:py-32">
          <div className="px-6 md:px-8 max-w-4xl mx-auto">
            <MicroLabel>Outcome</MicroLabel>
            <div className="max-w-[65ch] space-y-4 text-white/70 leading-relaxed">
              <p>
                ABB E-mobility gained a system capable of expressing its ambition.
              </p>
              <p>
                The architecture extended beyond marketing into product dashboards
                and infrastructure tools.
              </p>
              <p>The positioning became tangible.</p>
            </div>
          </div>

          <div className="text-center py-8 mt-8">
            <p className="text-sm text-white/40 tracking-wide">
              Modular digital design system · Global brand website · Scalable
              component library · Product interface adoption
            </p>
          </div>

          <div className="py-20 md:py-28 text-center px-6">
            <p className="font-heading text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto leading-[1.15]">
              For the first time, product, platform and brand moved as one.
            </p>
          </div>
        </section>

        {/* WHY ME + NEXT */}
        <CaseWhyMe text={caseData.whyMe} nextCase={nextCaseLink} />
      </div>
    </Layout>
  );
};

export default CaseABB;
