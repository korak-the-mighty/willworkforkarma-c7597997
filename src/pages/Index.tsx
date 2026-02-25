import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  <section style={{ paddingTop: 200, paddingBottom: 200, backgroundColor: '#06040B' }} className="px-6 text-center">
    <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl tracking-tight max-w-3xl mx-auto">
      {children}
    </h2>
  </section>
);



const Index = () => {
  const [blobHovered, setBlobHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout fullWidth theme={{ bg: "#08060E" }}>
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
              className="absolute inset-0 w-full h-full object-cover brightness-[0.6] md:group-hover:brightness-100 transition-[filter] duration-[400ms] ease-in-out"
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-8">
            <div className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-[600ms] ease-in-out flex flex-col items-center max-w-2xl">
              <h2 className="font-heading text-2xl md:text-3xl tracking-tight text-white font-light">
                Building the digital brand foundation of a global e-mobility leader.
              </h2>
              <p className="mt-4 text-xs uppercase tracking-widest" style={{ color: '#ECA9CC' }}>
                ABB E-mobility · Brand &amp; Digital
              </p>
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
      <Statement>I help clients and teams see what actually matters.</Statement>

      {/* ── 4. SHARE ── */}
      <EditorialCase
        slug={share.slug} title={share.title} year={share.year} area={share.area} subline={share.subline} imageAlign="right"
        heroHeadline="Making 'helping' the most desirable product on the shelf."
        supportingText="SHARE · Brand"
      />

      {/* ── 5. STATEMENT 2 ── */}
      <Statement>I turn complexity into clear direction and action.</Statement>

      {/* ── 6. MAN ── */}
      <EditorialCase
        slug={man.slug} title={man.title} year={man.year} area={man.area} subline={man.subline} imageAlign="left"
        heroHeadline="A focused digital presence for a global transport brand."
        supportingText="MAN · Brand & Digital"
      />

      {/* ── 7. STATEMENT 3 ── */}
      <Statement>I inspire and lead creative work with relentless passion.</Statement>

      {/* ── 8. BMW ── */}
      <EditorialCase
        slug={bmw.slug} title={bmw.title} year={bmw.year} area={bmw.area} subline={bmw.subline} imageAlign="right"
        heroHeadline="Staying ahead, globally."
        supportingText="BMW · Campaign"
      />

      {/* ── 9. DRIVELOG ── */}
      <EditorialCase
        slug={drivelog.slug} title={drivelog.title} year={drivelog.year} area={drivelog.area} subline={drivelog.subline} imageAlign="left"
        heroHeadline="From idea to product — a pragmatic mobility solution."
        supportingText="DRIVELOG · Product"
      />

      {/* ── 10. SEE ALL ── */}
      <section className="py-16 md:py-24 text-center">
        <Link to="/work" className="arrow-link hover:text-foreground transition-colors" style={{ fontSize: '1.25rem', opacity: 1, color: 'inherit' }}>
          See all of my work
        </Link>
      </section>

      {/* ── 11. ABOUT ── */}
      <section className="py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left — Portrait + Blobs */}
          <div className="relative">
            <div className="w-64 md:w-80">
              <img src="/HenrikLehtikangas-profilepicture.webp" alt="Henrik Lehtikangas" className="w-full h-auto" />
            </div>
            <div className="flex flex-row items-end gap-4 mt-6">
              <div className="relative cursor-pointer" onClick={() => navigate('/contact')}>
                <img src="/blob-brand.svg" alt="" className="w-40 h-auto" />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-800">Brand</span>
              </div>
              <div className="relative cursor-pointer" onClick={() => navigate('/contact')}>
                <img src="/blob-campaign.svg" alt="" className="w-44 h-auto" />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-800">Campaign</span>
              </div>
              <div className="relative cursor-pointer" onClick={() => navigate('/contact')}>
                <img src="/blob-product.svg" alt="" className="w-40 h-auto" />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-800">Product</span>
              </div>
            </div>
          </div>
          {/* Right — Copy */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ fontSize: '1.25rem', lineHeight: '1.65' }}>
              A brand from scratch? A campaign platform? That app idea you've been sitting on?
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ fontSize: '1.25rem', lineHeight: '1.65' }}>
              I've been shaping visions into real brands for over twenty years.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg" style={{ fontSize: '1.25rem', lineHeight: '1.65' }}>
              I'm ready to get excited about yours.
            </p>
            <p className="text-lg leading-relaxed max-w-lg" style={{ fontSize: '1.25rem', lineHeight: '1.65' }}>
              <Link to="/contact" className="text-foreground hover:text-muted-foreground transition-colors">Let's talk.</Link>
            </p>
            <div className="flex gap-8 pt-2">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">More about me</Link>
              <Link
                to="/contact"
                className="arrow-link text-sm transition-colors"
                style={{ color: blobHovered ? "#ECA9CC" : undefined }}
              >
                Contact me
              </Link>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index;
