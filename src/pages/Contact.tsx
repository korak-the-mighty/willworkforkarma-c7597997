import Layout from "@/components/Layout";

const Contact = () => (
  <Layout>
    <article className="space-y-8 max-w-2xl">
      <h1 className="font-serif text-4xl tracking-tight">Contact</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          If you have a project that could use clear thinking and honest creative work, I'd like to hear about it.
        </p>
        <p>
          <a
            href="mailto:hello@willworkforkarma.com"
            className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            hello@willworkforkarma.com
          </a>
        </p>
        <p className="text-sm">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </article>
  </Layout>
);

export default Contact;
