import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_CASES = [
  {
    client: "ABB E‑mobility",
    tagline: "Building the digital brand foundation of a global e‑mobility leader.",
    route: "/work/abb-emobility",
    heroImage: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/ABB-hero.webp",
  },
  {
    client: "MAN",
    tagline: "Entering a new category without losing the core.",
    route: "/work/man",
    heroImage: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/MAN-image-3.webp",
  },
  {
    client: "Share",
    tagline: "Do good. And enjoy it. Making helping something people choose again.",
    route: "/work/share",
    heroImage: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/share1.webp",
  },
  {
    client: "BMW",
    tagline: "Creative leadership across BMW's global digital ecosystem.",
    route: "/work/bmw",
    heroImage: "https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/BMW-hero.webp",
  },
];

const OverlayMenu = ({ isOpen, onClose }: OverlayMenuProps) => {
  const [hoveredCase, setHoveredCase] = useState<number | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("henrik.lehtikangas@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-transparent animate-in fade-in duration-300 overflow-hidden">
      {/* Background images — one per case, crossfade on hover */}
      {MENU_CASES.map((c, i) =>
        c.heroImage ? (
          <img
            key={i}
            src={c.heroImage}
            alt=""
            loading="lazy"
            className="fixed inset-0 z-0 w-full h-full object-cover transition-opacity duration-300 lazy-img"
            style={{ opacity: hoveredCase === i ? 1 : 0 }}
          />
        ) : null
      )}

      {/* Semi-transparent overlay — sits below case images (z-auto < z-0), lets hero bleed through */}
      <div className="fixed inset-0 bg-black/85" />

      {/* ── MOBILE LAYOUT ── */}
      <div
        className="md:hidden relative z-20 h-full flex flex-col overflow-y-auto overscroll-contain"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Portrait header */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 flex-shrink-0">
          <img
            src="/HenrikLehtikangas-profilepicture.webp"
            alt="Henrik Lehtikangas"
            className="w-12 h-12 rounded-full object-cover object-top grayscale opacity-75"
          />
          <span className="text-white/60 text-xs tracking-wide uppercase font-sans">Henrik Lehtikangas</span>
        </div>

        {/* Case list */}
        <div className="px-6 pt-6 pb-4 w-full">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-6 font-sans">Selected case studies</p>
          {MENU_CASES.map((c, i) => (
            <div key={c.route}>
              <Link to={c.route} onClick={onClose} className="block">
                <p className="text-xs tracking-widest uppercase text-white/40 mb-2">{c.client}</p>
                <p className="font-heading text-2xl leading-tight text-white/60">{c.tagline}</p>
              </Link>
              {i < MENU_CASES.length - 1 && (
                <div className="border-t border-white/10 my-6" />
              )}
            </div>
          ))}
        </div>

        {/* Secondary nav */}
        <div className="flex flex-row gap-8 px-6 py-5 border-t border-white/10 flex-shrink-0">
          {[
            { to: "/about", label: "About" },
            { to: "/work", label: "All Work" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-auto px-6 pb-8 pt-4 flex-shrink-0 flex flex-row gap-3">
          <a
            href="https://wa.me/4915141655661"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-4 rounded-full border border-white/20 bg-white/5 text-white/80 font-heading tracking-wide"
          >
            WhatsApp →
          </a>
          <button
            onClick={handleCopyEmail}
            className="flex-1 text-center py-4 rounded-full border border-white/20 bg-white/5 text-white/80 font-heading tracking-wide"
          >
            {emailCopied ? "Copied!" : "Copy email"}
          </button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex relative z-20 h-full flex-row px-16 md:px-24 py-8 md:py-12">

        {/* Left column — case list */}
        <div className="w-[70%] flex flex-col justify-center">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-6 font-sans">Selected case studies</p>
          {MENU_CASES.map((c, i) => (
            <div key={c.route}>
              <Link
                to={c.route}
                onClick={onClose}
                className="block"
                onMouseEnter={() => setHoveredCase(i)}
                onMouseLeave={() => setHoveredCase(null)}
              >
                <p className="text-xs tracking-widest uppercase text-white/40 mb-2">{c.client}</p>
                <p
                  className={`font-heading text-3xl md:text-4xl lg:text-5xl leading-tight transition-colors duration-150 ${
                    hoveredCase === null
                      ? "text-white/60"
                      : hoveredCase === i
                      ? ""
                      : "text-white/30"
                  }`}
                  style={{ color: hoveredCase === i ? '#FFFFFF' : undefined }}
                >
                  {c.tagline}
                </p>
              </Link>
              {i < MENU_CASES.length - 1 && (
                <div className="border-t border-white/10 my-8" />
              )}
            </div>
          ))}
          <a href="/work" className="text-white/40 text-xs tracking-widest uppercase font-sans mt-8 block hover:text-white/70 transition-colors">All work →</a>
        </div>

        {/* Right column — profile image + nav links */}
        <div className="w-[30%] flex flex-col justify-center h-full">
          {/* Top: profile image + WhatsApp blob overlapping bottom */}
          <div style={{ position: 'relative', display: 'inline-block', marginLeft: 'auto', marginRight: '40px', marginTop: '-40px' }}>
            <img
              src="/HenrikLehtikangas-profilepicture.webp"
              style={{ width: '360px', display: 'block' }}
              alt="Henrik Lehtikangas"
            />
            <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{ position: 'relative', width: '160px' }}>
                <img
                  src="https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev/Blob4.svg"
                  style={{ width: '160px', display: 'block' }}
                  alt=""
                />
                <a
                  href="https://wa.me/4915141655661"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  className="font-heading text-sm text-black"
                >
                  Whatsapp →
                </a>
              </div>
            </div>
          </div>
          {/* Bottom: nav links */}
          <div className="flex flex-col items-end gap-6 mt-16">
            {[
              { to: "/about", label: "About" },
              { to: "/work", label: "All Work" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={onClose}
                className="text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors text-right"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverlayMenu;
