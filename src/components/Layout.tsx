import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import OverlayMenu from "@/components/OverlayMenu";

const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <header className="absolute top-0 left-0 right-0 z-40">
    <div className="flex items-center justify-between px-6 py-6">
      <Link to="/" className="font-heading text-lg tracking-tight">
        Willworkforkarma
      </Link>
      <button
        onClick={onMenuOpen}
        className="text-foreground hover:text-muted-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>
    </div>
  </header>
);

const Footer = () => (
  <footer className="border-t border-border">
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start py-8 gap-6">
        <p className="font-heading text-lg md:text-xl tracking-tight">
          I'm available for work. Let's talk.
        </p>
        <div className="flex gap-8 text-sm">
          <Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">Work</Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>
      </div>
      <div className="pb-8">
        <p className="text-sm text-muted-foreground">Privacy Policy</p>
      </div>
    </div>
  </footer>
);

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout = ({ children, fullWidth = false }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1">
        {fullWidth ? children : (
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
