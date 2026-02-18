import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { cases } from "@/data/cases";
import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp";

const ProjectScene = ({
  slug,
  title,
  year,
  role,
}: {
  slug: string;
  title: string;
  year: number;
  role: string;
}) => (
  <Link to={`/work/${slug}`} className="group block w-full">
    <div className="min-h-[70vh] bg-muted flex items-end">
      <div className="p-8 md:p-16">
        <h3 className="font-heading text-4xl md:text-6xl tracking-tight transition-colors duration-300 group-hover:text-muted-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mt-2 transition-opacity duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100">
          {year} · {role}
        </p>
      </div>
    </div>
  </Link>
);

const Index = () => (
  <Layout fullWidth>
    {/* Scene 1 — Hero */}
    <section className="relative min-h-screen w-full">
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[50%_15%] md:object-[50%_20%] lg:object-[50%_25%]"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full min-h-screen flex items-center justify-center px-6">
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white text-center">
          I push vision, clarity
          <br className="hidden md:block" /> and creative confidence.
        </h1>
      </div>
    </section>

    {/* Scene 2 — Context */}
    <section className="py-24 md:py-32 px-6 text-center">
      <p className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[1.15]">
        [CONTEXT STATEMENT — to be written later]
      </p>
      <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground mt-8 leading-relaxed">
        [CONTEXT BODY — 2-4 lines, to be written later]
      </p>
    </section>

    {/* Scene 3 — Project: SHARE */}
    <ProjectScene
      slug={cases[0].slug}
      title={cases[0].title}
      year={cases[0].year}
      role={cases[0].facts.role}
    />

    {/* Scene 4 — Project: MAN */}
    <ProjectScene
      slug={cases[1].slug}
      title={cases[1].title}
      year={cases[1].year}
      role={cases[1].facts.role}
    />

    {/* Scene 5 — Closing Statement */}
    <section className="py-24 md:py-32 px-6 text-center">
      <p className="font-heading text-2xl md:text-4xl tracking-tight">
        [CLOSING STATEMENT — to be written later]
      </p>
    </section>
  </Layout>
);

export default Index;
