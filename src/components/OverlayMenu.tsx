import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface OverlayMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuLinks = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const OverlayMenu = ({ isOpen, onClose }: OverlayMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#01031A] animate-in fade-in duration-300">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Close menu"
      >
        <X size={28} />
      </button>

      <div className="h-full flex flex-col md:flex-row md:items-center px-8 md:px-16 py-24 md:py-0">
        {/* Left — Links */}
        <div className="flex-1 flex flex-col justify-center gap-8 md:gap-10">
          {menuLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={onClose}
              className="arrow-link font-heading text-5xl md:text-7xl text-white tracking-tight hover:text-white/80 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right — Portrait + Contact */}
        <div className="mt-16 md:mt-0 md:w-72 flex flex-col items-start md:items-end gap-6">
          <div className="w-24 h-24 rounded-full bg-white/10" />
          <div className="space-y-2 text-sm text-white/50">
            <p>hello@willworkforkarma.com</p>
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayMenu;
