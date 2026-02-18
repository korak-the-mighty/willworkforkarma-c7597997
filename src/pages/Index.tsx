import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { cases } from "@/data/cases";
import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp";

const STATEMENTS = [
  "I help clients and teams see what actually matters.",
  "I turn complexity into clear direction and action.",
  "I inspire and lead creative work with relentless passion.",
];

const ProjectEvidence = ({
  slug,
  title,
  year,
  role,
  align,
}: {
  slug: string;
  title: string;
  year: number;
  role: string;
  align: "left" | "right";
}) => (
  <Link to={`/work/${slug}`} className="group block relative">
    <div className="aspect-[16/9] bg-muted w-full relative overflow-hidden">
      {/* Image placeholder — replace bg-muted with <img> when assets arrive */}
      <div
        className={`absolute bottom-0 ${align === "left" ? "left-0" : "right-0"} p-6 md:p-10`}
      >
        <h3 className="font-heading text-3xl md:text-4xl tracking-tight text-white">
          {title}
        </h3>
        <p
          className={`text-sm text-white/70 mt-2 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100`}
        >
          {year} · {role}
        </p>
      </div>
    </div>
  </Link>
);

const Index = () => (
  <Layout fullWidth>
    {/* Section 1 — Hero (Stage) */}
    <section className="relative h-screen w-full">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full flex items-center justify-center px-6">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white text-center">
          I push vision, clarity
          <br className="hidden md:block" /> and creative confidence.
        </h1>
      </div>
    </section>

    {/* Section 2 — Act + Evidence Flow */}
    <section>
      {/* Act 1 */}
      <div className="py-24 md:py-32 lg:py-40 px-6 text-center">
        <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
          {STATEMENTS[0]}
        </p>
      </div>

      {/* Evidence: SHARE */}
      <ProjectEvidence
        slug={cases[0].slug}
        title={cases[0].title}
        year={cases[0].year}
        role={cases[0].facts.role}
        align="left"
      />

      {/* Act 2 */}
      <div className="py-24 md:py-32 lg:py-40 px-6 text-center">
        <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
          {STATEMENTS[1]}
        </p>
      </div>

      {/* Evidence: MAN */}
      <ProjectEvidence
        slug={cases[1].slug}
        title={cases[1].title}
        year={cases[1].year}
        role={cases[1].facts.role}
        align="right"
      />

      {/* Act 3 */}
      <div className="py-24 md:py-32 lg:py-40 px-6 text-center">
        <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
          {STATEMENTS[2]}
        </p>
      </div>
    </section>

    {/* Section 3 — Henrik Moment */}
    <section className="py-20 md:py-28 text-center px-6">
      <div className="w-24 h-24 rounded-full bg-muted mx-auto" />
      <p className="text-muted-foreground mt-6">
        [HENRIK MOMENT — to be written later]
      </p>
    </section>

    {/* Section 4 — Karma Module */}
    <section className="py-20 md:py-28 text-center px-6">
      <p className="text-muted-foreground">
        [WHY KARMA — to be written later]
      </p>
    </section>
  </Layout>
);

export default Index;
