import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { cases } from "@/data/cases";
import heroImg from "@/assets/HenrikLehtikangas-hero2026.webp";

const WorkBanner = ({
  slug,
  title,
  year,
  role,
  summary,
}: {
  slug: string;
  title: string;
  year: number;
  role: string;
  summary: string;
}) => (
  <Link to={`/work/${slug}`} className="group block w-full bg-muted py-16 md:py-24 px-8 md:px-16">
    <h2 className="font-heading text-4xl md:text-6xl tracking-tight transition-colors duration-300 group-hover:text-muted-foreground">
      {title}
    </h2>
    <p className="text-sm text-muted-foreground mt-2">
      {year} · {role}
    </p>
    <p className="text-base text-muted-foreground mt-4 max-w-2xl">
      {summary}
    </p>
  </Link>
);

const Statement = ({ children }: { children: React.ReactNode }) => (
  <section className="py-24 md:py-32 px-6 text-center">
    <p className="font-heading text-2xl md:text-4xl tracking-tight">
      {children}
    </p>
  </section>
);

const Index = () => (
  <Layout fullWidth>
    {/* HERO */}
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

    {/* STATEMENT 1 */}
    <Statement>[STATEMENT 1 — to be written later]</Statement>

    {/* WORK BANNER: SHARE */}
    <WorkBanner
      slug={cases[0].slug}
      title={cases[0].title}
      year={cases[0].year}
      role={cases[0].facts.role}
      summary={cases[0].summary}
    />

    {/* STATEMENT 2 */}
    <Statement>[STATEMENT 2 — to be written later]</Statement>

    {/* WORK BANNER: MAN */}
    <WorkBanner
      slug={cases[1].slug}
      title={cases[1].title}
      year={cases[1].year}
      role={cases[1].facts.role}
      summary={cases[1].summary}
    />

    {/* STATEMENT 3 */}
    <Statement>[STATEMENT 3 — to be written later]</Statement>

    {/* ABOUT */}
    <section className="py-16 md:py-24 px-6 text-center">
      <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
        [ABOUT — to be written later]
      </p>
    </section>
  </Layout>
);

export default Index;
