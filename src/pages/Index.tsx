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
  <section style={{ paddingTop: 200, paddingBottom: 200, backgroundColor: "#05060A" }} className="px-6 text-center">
    <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-tight max-w-3xl mx-auto text-white">
      {children}
    </h2>
  </section>
);

/* ─── About blob ─── */
const Blob = ({ label, src, className = "" }: { label: string; src: string; className?: string }) => (
  <div
    className={`absolute select-none cursor-default transition-all ${className}`}
    style={{ transitionDuration: "260ms", transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.transform = "translateY(-3px) scale(1.02)";
      el.style.filter = "brightness(1.05)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.transform = "";
      el.style.filter = "";
    }}
  >
    <img src={src} alt="" className="w-full h-full" />
    <span className="absolute inset-0 flex items-center justify-center text-sm font-heading text-[hsl(var(--rose-blob-foreground))]">
      {label}
    </span>
  </div>
);

const Index = () => (
  <Layout fullWidth theme={{ bg: "#06070D" }}>
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
      </div>
    </section>

    {/* ── 2. HERO PROJECT: ABB ── */}
    <Link to={`/work/${abb.slug}`} className="group block relative w-full overflow-hidden">
      <div className="relative min-h-[70vh] overflow-hidden">
      {abb.coverImage && (
          <img
            src={abb.coverImage}
            alt={abb.title}
            className="absolute inset-0 w-full h-full object-cover brightness-[0.6] md:group-hover:brightness-100 transition-[filter] duration-600 ease-in-out"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <div className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-600 ease-in-out flex flex-col items-center max-w-2xl">
            <h2 className="font-heading text-2xl md:text-4xl tracking-tight text-white font-light">
              Building the digital brand foundation of a global e&#8209;mobility leader.
            </h2>
            <p className="mt-4 text-[13px] uppercase tracking-[0.12em] font-heading text-white/60">
              ABB E&#8209;mobility · Brand &amp; Digital
            </p>
          </div>
        </div>
      </div>
      {/* Mobile info */}
      <div className="md:hidden px-6 py-6 space-y-1">
        <p className="font-heading text-xl tracking-tight text-white font-light">Building the digital brand foundation of a global e&#8209;mobility leader.</p>
        <p className="text-[13px] uppercase tracking-[0.12em] font-heading text-muted-foreground mt-3">ABB E&#8209;mobility · Brand &amp; Digital</p>
      </div>
    </Link>

    {/* ── 3. STATEMENT 1 ── */}
    <Statement>I help clients and teams see what actually matters.</Statement>

    {/* ── 4. SHARE ── */}
    <EditorialCase slug={share.slug} title={share.title} heroHeadline="Making &quot;helping&quot; the most desirable product on the shelf." year={share.year} area={share.area} subline={share.subline} imageAlign="right" />

    {/* ── 5. STATEMENT 2 ── */}
    <Statement>I turn complexity into clear direction and action.</Statement>

    {/* ── 6. MAN ── */}
    <EditorialCase slug={man.slug} title={man.title} heroHeadline="A complete digital launch for the first MAN van." year={man.year} area={man.area} subline={man.subline} imageAlign="left" />

    {/* ── 7. STATEMENT 3 ── */}
    <Statement>I inspire and lead creative work with relentless passion.</Statement>

    {/* ── 8. BMW ── */}
    <EditorialCase slug={bmw.slug} title={bmw.title} heroHeadline="Staying ahead, globally." year={bmw.year} area={bmw.area} subline={bmw.subline} imageAlign="right" />

    {/* ── 9. DRIVELOG ── */}
    <EditorialCase slug={drivelog.slug} title={drivelog.title} heroHeadline="Making your car talk to you." year={drivelog.year} area={drivelog.area} subline={drivelog.subline} imageAlign="left" />

    {/* ── 10. SEE ALL ── */}
    <section className="py-16 md:py-24 text-center">
      <Link to="/work" className="arrow-link text-sm text-white/50 hover:text-[#ECA9CC] transition-colors">
        See all of my work
      </Link>
    </section>

    {/* ── 11. ABOUT ── */}
    <section className="py-24 md:py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Left — Portrait + Blobs */}
        <div className="relative flex flex-col items-center md:items-start">
          <div className="relative w-64 md:w-80">
            <img src="/HenrikLehtikangas-profilepicture.webp" alt="Henrik Lehtikangas" className="w-full h-auto" />
            {/* Blobs clustered at bottom-left of portrait */}
            <Blob label="Brand" src="/blob-brand.svg" className="w-24 md:w-28 bottom-2 -left-4 md:-left-6" />
            <Blob label="Product" src="/blob-product.svg" className="w-28 md:w-32 bottom-16 left-12 md:left-14" />
            <Blob label="Campaign" src="/blob-campaign.svg" className="w-26 md:w-30 -bottom-4 left-6 md:left-8" />
          </div>
        </div>
        {/* Right — Copy */}
        <div className="space-y-6">
          <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-white">Henrik</h2>
          <p className="text-base text-white/70 leading-relaxed max-w-lg">
            I'm a creative director working through vision, taste, and clarity.
            I help teams see what actually matters.
          </p>
          <div className="flex gap-8 pt-2">
            <Link to="/about" className="arrow-link text-sm text-white/50 hover:text-[#ECA9CC] transition-colors">More about me</Link>
            <Link to="/contact" className="arrow-link text-sm text-white/50 hover:text-[#ECA9CC] transition-colors">Contact me</Link>
          </div>
        </div>
      </div>
    </section>

    {/* ── 12. KARMA ── */}
    <section className="py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-4xl mx-auto space-y-1 text-base md:text-lg text-white leading-relaxed">
        <p>I try to be decent, curious, and honest.</p>
        <p>I care deeply about the work — and the people doing it.</p>
        <p>Somehow, that keeps coming back.</p>
        <p className="py-4">———</p>
        <p>That's why I work for karma.</p>
      </div>
    </section>
  </Layout>
);

export default Index;

