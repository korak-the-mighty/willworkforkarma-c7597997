import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import EditorialCase from "@/components/EditorialCase";
import { cases } from "@/data/cases";
import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp";

const abb = cases.find((c) => c.slug === "abb-emobility")!;
const share = cases.find((c) => c.slug === "share")!;
const man = cases.find((c) => c.slug === "man")!;
const bmw = cases.find((c) => c.slug === "bmw")!;
const drivelog = cases.find((c) => c.slug === "drivelog")!;

/* ─── Statement ─── */
const Statement = ({ children }: { children: React.ReactNode }) => (
  <section className="py-24 md:py-32 px-6 text-center">
    <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-tight max-w-3xl mx-auto">
      {children}
    </h2>
  </section>
);

/* ─── About blob ─── */
const Blob = ({ label }: { label: string }) => (
  <span
    className="inline-block rounded-full px-6 py-3 text-sm font-heading bg-[hsl(var(--rose-blob))] text-[hsl(var(--rose-blob-foreground))] transition-all select-none"
    style={{ transitionDuration: "260ms", transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.transform = "translateY(-3px) scale(1.02)";
      el.style.filter = "brightness(1.05)";
      el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.transform = "";
      el.style.filter = "";
      el.style.boxShadow = "";
    }}
  >
    {label}
  </span>
);

const Index = () => (
  <Layout fullWidth>
    {/* ── 1. HERO ── */}
    <section className="relative min-h-screen w-full">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white text-center">
          I push vision, clarity
          <br className="hidden md:block" /> and creative confidence.
        </h1>
        <p className="text-sm md:text-base text-white/60 mt-6 tracking-widest">
          — Henrik Lehtikangas
        </p>
      </div>
    </section>

    {/* ── 2. HERO PROJECT: ABB ── */}
    <Link to={`/work/${abb.slug}`} className="group block relative w-full">
      <div className="relative min-h-[70vh] bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" />
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-16">
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight text-white">
            {abb.title}
          </h2>
          {/* Desktop hover reveal */}
          <div className="hidden md:flex mt-4 gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {abb.subline && <p className="text-sm text-white/70">{abb.subline}</p>}
            {abb.area && <span className="text-sm text-white/50">{abb.area}</span>}
            <span className="text-sm text-white/50">{abb.year}</span>
          </div>
        </div>
      </div>
      {/* Mobile info */}
      <div className="md:hidden px-6 py-6 space-y-1">
        {abb.subline && <p className="text-sm text-muted-foreground">{abb.subline}</p>}
        <p className="text-sm text-muted-foreground">{abb.area} · {abb.year}</p>
      </div>
    </Link>

    {/* ── 3. STATEMENT 1 ── */}
    <Statement>[Statement 1 — to be written]</Statement>

    {/* ── 4. SHARE ── */}
    <EditorialCase slug={share.slug} title={share.title} year={share.year} area={share.area} subline={share.subline} imageAlign="right" />

    {/* ── 5. STATEMENT 2 ── */}
    <Statement>[Statement 2 — to be written]</Statement>

    {/* ── 6. MAN ── */}
    <EditorialCase slug={man.slug} title={man.title} year={man.year} area={man.area} subline={man.subline} imageAlign="left" />

    {/* ── 7. STATEMENT 3 ── */}
    <Statement>[Statement 3 — to be written]</Statement>

    {/* ── 8. BMW ── */}
    <EditorialCase slug={bmw.slug} title={bmw.title} year={bmw.year} area={bmw.area} subline={bmw.subline} imageAlign="right" />

    {/* ── 9. DRIVELOG ── */}
    <EditorialCase slug={drivelog.slug} title={drivelog.title} year={drivelog.year} area={drivelog.area} subline={drivelog.subline} imageAlign="left" />

    {/* ── 10. SEE ALL ── */}
    <section className="py-16 md:py-24 text-center">
      <Link to="/work" className="arrow-link text-sm text-muted-foreground hover:text-foreground transition-colors">
        See all of my work
      </Link>
    </section>

    {/* ── 11. ABOUT ── */}
    <section className="py-24 md:py-32 px-6 text-center space-y-8">
      <div className="w-32 h-32 rounded-full bg-muted mx-auto" />
      <h2 className="font-heading text-2xl md:text-3xl tracking-tight">About</h2>
      <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
        [Creative-led about copy — to be written]
      </p>
      <div className="flex justify-center gap-4 flex-wrap pt-4">
        <Blob label="Brand" />
        <Blob label="Product" />
        <Blob label="Campaign" />
      </div>
    </section>

    {/* ── 12. KARMA ── */}
    <section className="py-16 md:py-24 px-6 text-center">
      <p className="text-sm text-muted-foreground">Good work comes back around.</p>
    </section>
  </Layout>
);

export default Index;
