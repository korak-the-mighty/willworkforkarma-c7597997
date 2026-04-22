import Layout from "@/components/Layout";
import { useAboutContent } from "@/hooks/useAboutContent";

const About = () => {
  const { title, paragraphs } = useAboutContent();

  return (
    <Layout>
      <article className="space-y-8 max-w-2xl">
        <h1 className="font-serif text-4xl tracking-tight">{title}</h1>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </article>
    </Layout>
  );
};

export default About;
