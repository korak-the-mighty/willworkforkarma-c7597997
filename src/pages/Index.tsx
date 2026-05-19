import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMenu } from "@/context/MenuContext";
import Layout from "@/components/Layout";

const HeroHeadline = ({ text, subheadline }: { text: string; subheadline?: string }) => {
  const { menuOpen } = useMenu();
  return (
    <div className={`flex flex-col items-center gap-6 transition-opacity duration-200 ${menuOpen ? "opacity-0" : "opacity-100"}`}>
      <div className="w-[85vw] md:w-[50vw] mx-auto flex flex-col items-center gap-6">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white text-center whitespace-pre-line">
          {text}
        </h1>
        {subheadline && (
          <p className="font-heading text-base md:text-xl lg:text-2xl font-light text-white/50 text-center leading-relaxed whitespace-pre-line">
            {subheadline}
          </p>
        )}
      </div>
    </div>
  );
};
import EditorialCase from "@/components/EditorialCase";
import { cases } from "@/data/cases";
import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp";
import { useHomepageContent } from "@/hooks/useHomepageContent";
import { useCaseHeroContent } from "@/hooks/useCaseHeroContent";

const abb = cases.find((c) => c.slug === "abb-emobility")!;
const share = cases.find((c) => c.slug === "share")!;
const man = cases.find((c) => c.slug === "man")!;
const bmw = cases.find((c) => c.slug === "bmw")!;
const drivelog = cases.find((c) => c.slug === "drivelog")!;

/* ─── Statement ─── */
const Statement = ({ children }: { children: React.ReactNode }) => (
  <section style={{ paddingTop: 200, paddingBottom: 200, backgroundColor: '#06040B' }} className="px-6 text-center">
    <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-tight max-w-3xl mx-auto">
      {children}
    </h2>
  </section>
);

const Index = () => {
  const [blobHovered, setBlobHovered] = useState(false);
  const navigate = useNavigate();

  const hp = useHomepageContent();
  const caseHeroes = useCaseHeroContent();

  const abbHero = caseHeroes["abb-emobility"];
  const shareHero = caseHeroes["share"];
  const manHero = caseHeroes["man"];
  const bmwHero = caseHeroes["bmw"];
  const drivelogHero = caseHeroes["drivelog"];

  return (
    <Layout fullWidth theme={{ bg: "#08060E" }}>
      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen w-full">
        <img
          src={heroImg}
          alt=""
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative h-full min-h-screen flex flex-col items-center justify-center px-6">
          <HeroHeadline text={hp.hero.headline} subheadline={hp.hero.subheadline} />
        </div>
      </section>

      {/* ── HIGHLIGHT SEQUENCE: ABB → DRIVELOG ── */}
      <div>

        {/* ── 2. HERO PROJECT: ABB ── */}
        <Link to={`/work/${abb.slug}`} className="group block relative w-full overflow-hidden">
          <div className="relative h-[80vh] overflow-hidden">
            {abb.coverImage && (
              <>
                <img
                  src={abb.coverImage}
                  alt={abb.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover lazy-img"
                  onLoad={(e) => e.currentTarget.classList.add('loaded')}
                />
                <div className="absolute inset-0 bg-black opacity-50 md:opacity-60 md:group-hover:opacity-30 transition-opacity duration-500 delay-75" />
              </>
            )}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
              <div className="flex flex-col items-center max-w-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-[600ms] ease-in-out">
                <h2 className="font-heading text-3xl md:text-4xl tracking-tight text-white font-light">
                  {abbHero?.headline || "Building the digital brand foundation of a global e-mobility leader."}
                </h2>
                <p className="mt-4 text-xs uppercase tracking-widest text-[#ECA9CC] md:transition-colors md:duration-500 md:group-hover:text-[#1E1128]">
                  {abbHero?.subtitle || "ABB E-mobility · Brand & Digital"}
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* ── 3. STATEMENT 1 ── */}
        <Statement>{hp.statements.s1}</Statement>

        {/* ── 4. SHARE ── */}
        <div>
          <EditorialCase
            slug={share.slug} title={share.title} year={share.year} area={share.area} subline={share.subline} imageAlign="right"
            heroHeadline={shareHero?.headline || "Making 'helping' the most desirable product on the shelf."}
            supportingText={shareHero?.subtitle || "SHARE · Brand"}
          />
        </div>

        {/* ── 5. STATEMENT 2 ── */}
        <Statement>{hp.statements.s2}</Statement>

        {/* ── 6. MAN ── */}
        <div>
          <EditorialCase
            slug={man.slug} title={man.title} year={man.year} area={man.area} subline={man.subline} imageAlign="left"
            heroHeadline={manHero?.headline || "A focused digital presence for a global transport brand."}
            supportingText={manHero?.subtitle || "MAN · Brand & Digital"}
          />
        </div>

        {/* ── 7. STATEMENT 3 ── */}
        <Statement>{hp.statements.s3}</Statement>

        {/* ── 8. BMW ── */}
        <div>
          <EditorialCase
            slug={bmw.slug} title={bmw.title} year={bmw.year} area={bmw.area} subline={bmw.subline} imageAlign="right"
            heroHeadline={bmwHero?.headline || "Staying ahead, globally."}
            supportingText={bmwHero?.subtitle || "BMW · Campaign"}
          />
        </div>

        {/* ── 9. DRIVELOG ── */}
        <div>
          <EditorialCase
            slug={drivelog.slug} title={drivelog.title} year={drivelog.year} area={drivelog.area} subline={drivelog.subline} imageAlign="left"
            heroHeadline={drivelogHero?.headline || "From idea to product — a pragmatic mobility solution."}
            supportingText={drivelogHero?.subtitle || "DRIVELOG · Product"}
          />
        </div>

      </div>
      {/* ── END HIGHLIGHT SEQUENCE ── */}

      {/* ── 10. SEE ALL ── */}
      <section className="py-16 md:py-24 text-center">
        <Link
          to="/work"
          className="group relative inline-block hover:text-foreground transition-colors"
          style={{ fontSize: '2rem', opacity: 1, color: 'inherit' }}
        >
          <span className="hidden md:inline absolute right-full pr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">→</span>
          See all of my work
        </Link>
      </section>

      {/* ── 11. ABOUT ── */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left — Portrait + Blobs */}
          <div className="relative md:mr-16">
            <div className="w-[80vw] md:w-[28vw]">
              <img src="/HenrikLehtikangas-profilepicture.webp" alt="Henrik Lehtikangas" loading="lazy" className="w-full h-auto lazy-img" onLoad={(e) => e.currentTarget.classList.add('loaded')} />
            </div>
            <div className="flex flex-row items-end gap-4 -mt-14 ml-8 pb-10">
              <div className="relative cursor-pointer -translate-y-5" onClick={() => navigate('/contact')}>
                <img src="/blob-brand.svg" alt="" loading="lazy" className="w-40 h-auto" />
                <span className="absolute inset-0 flex items-center justify-center text-base font-heading font-semibold tracking-wide text-gray-800">Brand</span>
              </div>
              <div className="relative cursor-pointer translate-y-11" onClick={() => navigate('/contact')}>
                <img src="/blob-campaign.svg" alt="" loading="lazy" className="w-44 h-auto" />
                <span className="absolute inset-0 flex items-center justify-center text-base font-heading font-semibold tracking-wide text-gray-800">Campaign</span>
              </div>
              <div className="relative cursor-pointer -translate-y-10 -ml-2" onClick={() => navigate('/contact')}>
                <img src="/blob-product.svg" alt="" loading="lazy" className="w-40 h-auto" />
                <span className="absolute inset-0 flex items-center justify-center text-base font-heading font-semibold tracking-wide text-gray-800">Product</span>
              </div>
            </div>
          </div>
          {/* Right — Copy */}
          <div className="space-y-6">
            <div className="max-w-lg">
              <p className="font-heading text-3xl md:text-4xl tracking-tight text-foreground">{hp.about.headline1}</p>
              <p className="font-heading text-3xl md:text-4xl tracking-tight text-foreground">{hp.about.headline2}</p>
              <p className="font-heading text-3xl md:text-4xl tracking-tight text-foreground">{hp.about.headline3}</p>
            </div>
            {hp.about.body.map((para, i) => (
              <p key={i} className="text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ fontSize: '1.25rem', lineHeight: '1.65' }}>
                {para}
              </p>
            ))}
            <Link to="/contact" className="group relative inline-flex items-center gap-3 font-heading text-2xl md:text-5xl tracking-tight text-foreground hover:text-muted-foreground transition-colors">
              <span className="opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all duration-500 ease-in-out" aria-hidden="true">→</span>
              <span>{hp.about.cta}</span>
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
