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
    heroImage: "", // TODO: add hero image URL — hero uses a local video asset, no R2 URL
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
    <div className="fixed inset-0 z-50 bg-[#01031A] animate-in fade-in duration-300">
      {/* Background images — one per case, crossfade on hover */}
      {MENU_CASES.map((c, i) =>
        c.heroImage ? (
          <img
            key={i}
            src={c.heroImage}
            alt=""
            className="fixed inset-0 z-0 w-full h-full object-cover transition-opacity duration-300"
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
        <X size={28} />
      </button>

      {/* Content — two columns */}
      <div className="relative z-20 h-full flex flex-row px-16 md:px-24 py-16 md:py-20">

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
                  className={`font-heading text-5xl md:text-6xl lg:text-7xl leading-tight transition-colors duration-150 ${
                    hoveredCase === null
                      ? "text-white/60"
                      : hoveredCase === i
                      ? "text-white"
                      : "text-white/30"
                  }`}
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

        {/* Right column — nav links */}
        <div className="w-[30%] flex flex-col justify-center items-end gap-6">
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
  );
};

export default OverlayMenu;
