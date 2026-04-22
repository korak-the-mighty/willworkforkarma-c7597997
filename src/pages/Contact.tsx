import Layout from "@/components/Layout";
import { useContactContent } from "@/hooks/useContactContent";

const Contact = () => {
  const { title, intro, email, linkedin_url, linkedin_label } = useContactContent();

  return (
    <Layout>
      <article className="space-y-8 max-w-2xl">
        <h1 className="font-serif text-4xl tracking-tight">{title}</h1>
        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>{intro}</p>
          <p>
            <a
              href={`mailto:${email}`}
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              {email}
            </a>
          </p>
          <p className="text-sm">
            <a
              href={linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              {linkedin_label}
            </a>
          </p>
        </div>
      </article>
    </Layout>
  );
};

export default Contact;
