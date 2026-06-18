import Layout from "@/components/Layout";
import { useAboutContent } from "@/hooks/useAboutContent";
import { useContactContent } from "@/hooks/useContactContent";

const About = () => {
  const { main, sections, final } = useAboutContent();
  const contact = useContactContent();
  const whatsappHref = `https://wa.me/${contact.phone.replace(/[^\d]/g, '')}`;

  return (
    <Layout fullWidth theme={{ bg: "#08060E" }}>
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 grid grid-cols-1 md:grid-cols-[minmax(260px,38%)_1fr] gap-12 md:gap-20 items-start">

        <aside className="md:sticky md:top-28 space-y-8">

          {/* Portrait with name overlay */}
          <div className="relative">
            <img
              src="/HenrikLehtikangas-profilepicture.webp"
              alt="Henrik Lehtikangas"
              loading="lazy"
              className="w-full h-auto lazy-img"
              onLoad={(e) => e.currentTarget.classList.add('loaded')}
            />
            <div className="absolute bottom-6 left-0 right-0 px-4">
              <p className="font-heading text-2xl tracking-tight text-foreground">Henrik Lehtikangas</p>
              <p className="text-sm text-muted-foreground mt-0.5">Creative Director</p>
            </div>
          </div>

          {/* Contact hierarchy */}
          <div className="pl-2 space-y-6">
            <div className="space-y-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-heading text-xl md:text-2xl tracking-tight text-foreground hover:text-muted-foreground transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={contact.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-heading text-xl md:text-2xl tracking-tight text-foreground hover:text-muted-foreground transition-colors"
              >
                {contact.linkedin_label}
              </a>
            </div>

            <div className="space-y-1">
              <a href={`mailto:${contact.email}`} className="block text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">
                {contact.email}
              </a>
              {contact.phone && (
                <a href={`tel:${contact.phone}`} className="block text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors">
                  {contact.phone}
                </a>
              )}
            </div>

            <p className="text-sm md:text-base text-muted-foreground/50 cursor-default">
              Download CV
            </p>
          </div>
        </aside>

        <div>
          <section className="py-12 md:py-16 space-y-10">
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1] max-w-3xl">
              {main.headline}
            </p>
            <div className="space-y-4 max-w-2xl">
              {main.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {sections.map((section, i) => (
            <section key={i} className="py-16 md:py-20 space-y-6">
              <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-foreground max-w-2xl">
                {section.headline}
              </p>
              <div className="space-y-4 max-w-2xl">
                {section.body.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="py-16 md:py-20 space-y-10">
            <p className="font-heading text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.1] max-w-3xl">
              {final.headline}
            </p>
            <div className="space-y-4 max-w-2xl">
              {final.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>

      </div>
    </Layout>
  );
};

export default About;
