import { useState } from "react";
import Layout from "@/components/Layout";
import { useAboutContent } from "@/hooks/useAboutContent";
import { useContactContent } from "@/hooks/useContactContent";

const Divider = () => (
  <hr className="border-0 border-t border-white/[0.18]" />
);

const About = () => {
  const { main, sections, final } = useAboutContent();
  const contact = useContactContent();
  const whatsappHref = `https://wa.me/${contact.phone.replace(/[^\d]/g, '')}`;
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const toggleSection = (i: number) => {
    setActiveSection(prev => prev === i ? null : i);
  };

  return (
    <Layout fullWidth theme={{ bg: "#08060E" }}>

      {/* ── MOBILE ── */}
      <div className="md:hidden">

        {/* Hero: portrait + headline */}
        <div className="relative">
          <img
            src="/HenrikLehtikangas-profilepicture.webp"
            alt="Henrik Lehtikangas"
            loading="lazy"
            className="w-full h-auto lazy-img"
            onLoad={(e) => e.currentTarget.classList.add('loaded')}
          />
          <div
            className="absolute bottom-0 left-0 right-0 px-6 pt-32 pb-8"
            style={{ background: 'linear-gradient(to top, #08060E 55%, transparent)' }}
          >
            <p className="font-heading text-4xl font-medium tracking-tight text-foreground leading-[1.1]">
              {main.headline}
            </p>
          </div>
        </div>

        {/* Intro */}
        <div className="px-6 pt-6 pb-10 space-y-4">
          {main.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Accordion sections */}
        <div className="px-6">
          {sections.map((section, i) => (
            <div key={i}>
              <Divider />
              <button
                onClick={() => toggleSection(i)}
                className="w-full flex items-center justify-between py-6 text-left gap-4"
              >
                <p className="font-heading text-[1.6rem] leading-[1.35] tracking-tight text-foreground">
                  {section.headline}
                </p>
                <span
                  className={`flex-shrink-0 text-lg text-muted-foreground transition-transform duration-300 ${activeSection === i ? 'rotate-180' : ''}`}
                >
                  ↓
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeSection === i ? 'max-h-[600px] pb-8' : 'max-h-0'}`}
              >
                <div className="space-y-4">
                  {section.body.map((para, j) => (
                    <p key={j}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final section — always visible */}
        <div className="px-6">
          <Divider />
          <section className="py-12 space-y-6">
            <p className="font-heading text-4xl font-medium tracking-tight text-foreground leading-[1.1]">
              {final.headline}
            </p>
            <div className="space-y-4">
              {final.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>

        {/* Contact block */}
        <div className="px-6 pb-16">
          <Divider />
          <div className="pt-10 space-y-6">
            <div className="space-y-1">
              <p className="font-heading text-xl tracking-tight text-foreground">Henrik Lehtikangas</p>
              <p className="text-sm text-muted-foreground">Creative Director</p>
            </div>
            <div className="space-y-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-heading text-xl tracking-tight text-foreground hover:text-muted-foreground transition-colors"
              >
                WhatsApp
              </a>
              <a
                href={contact.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-heading text-xl tracking-tight text-foreground hover:text-muted-foreground transition-colors"
              >
                {contact.linkedin_label}
              </a>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {contact.email}
            </a>
            <a
              href="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/HenrikLehtikangas_CV2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-32 grid md:grid-cols-[minmax(260px,38%)_1fr] gap-20 items-start">

          <aside className="md:sticky md:top-28 space-y-8">
            <div className="relative">
              <img
                src="/HenrikLehtikangas-profilepicture.webp"
                alt="Henrik Lehtikangas"
                loading="lazy"
                className="w-full h-auto lazy-img"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
              <div className="absolute bottom-6 left-0 right-0 pl-[60px]">
                <p className="font-heading text-3xl tracking-tight text-foreground">Henrik Lehtikangas</p>
                <p className="text-sm text-muted-foreground mt-0.5">Creative Director</p>
              </div>
            </div>
            <div className="pl-[60px] space-y-6">
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
                <a
                  href={`mailto:${contact.email}`}
                  className="block text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
                >
                  {contact.email}
                </a>
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="block text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {contact.phone}
                  </a>
                )}
              </div>
              <a
                href="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/HenrikLehtikangas_CV2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
              >
                Download CV
              </a>
            </div>
          </aside>

          <div>
            <section className="pt-16 md:pt-20 pb-12 md:pb-16 space-y-10">
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
              <div key={i}>
                <Divider />
                <section className="py-16 md:py-20 space-y-6">
                  <p className="font-heading text-[2rem] leading-[1.4] tracking-tight text-foreground max-w-2xl">
                    {section.headline}
                  </p>
                  <div className="space-y-4 max-w-2xl">
                    {section.body.map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </section>
              </div>
            ))}

            <Divider />
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
      </div>

    </Layout>
  );
};

export default About;
