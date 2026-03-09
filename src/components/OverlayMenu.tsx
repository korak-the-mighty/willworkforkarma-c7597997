import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_CASES = [
  {
    client: "ABB E\u2011mobility",
    tagline: "Building the digital brand foundation of a global e\u2011mobility leader.",
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#01031A] animate-in fade-in duration-300 overflow-hidden">
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

      {/* Dark overlay sits above images, below content */}
      <div className="fixed inset-0 z-10 bg-black/85 pointer-events-none" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-30"
        aria-label="Close menu"
      >
        <X size={40} />
      </button>

      {/* Content — two columns */}
      <div className="relative z-20 h-full flex flex-row px-16 md:px-24 py-8 md:py-12">

        {/* Left column — case list */}
        <div className="w-[70%] flex flex-col justify-center">
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
        </div>

        {/* Right column — profile image + nav links */}
        <div className="w-[30%] flex flex-col justify-center h-full">
          {/* Top: profile image + WhatsApp blob overlapping bottom */}
          <div style={{ position: 'relative', display: 'inline-block', marginLeft: 'auto', marginRight: '40px' }}>
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
