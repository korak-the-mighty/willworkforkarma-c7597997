import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import OverlayMenu from "@/components/OverlayMenu";

const Header = ({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <header className="absolute top-0 left-0 right-0 z-40">
    <div className="flex items-center justify-between px-6 py-6">
      <Link to="/" className="font-heading text-lg tracking-tight">
        Henrik Lehtikangas
      </Link>
      <button
        onClick={onMenuOpen}
        className="p-2 text-foreground hover:text-muted-foreground transition-colors"
        aria-label="Open menu"
      >
        <Menu size={40} />
      </button>
    </div>
  </header>
);

const Footer = ({ theme }: { theme?: { bg: string } }) => (
  <footer>
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start py-8 gap-6">
        <p className={`font-heading text-lg md:text-xl tracking-tight ${theme ? "text-white" : ""}`}>
          {theme ? "I'm available for work." : "I'm available for work. Let's talk."}
        </p>
        <div className="flex gap-8 text-sm">
          <Link to="/work" className={`arrow-link transition-colors ${theme ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}>Work</Link>
          <Link to="/about" className={`arrow-link transition-colors ${theme ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}>About</Link>
          <Link to="/contact" className={`arrow-link transition-colors ${theme ? "text-white/50 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}>Contact</Link>
        </div>
      </div>
      <div className="pb-8">
        <p className={`text-sm ${theme ? "text-white/30" : "text-muted-foreground"}`}>Privacy Policy</p>
      </div>
    </div>
  </footer>
);

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  theme?: { bg: string };
}

const Layout = ({ children, fullWidth = false, theme }: LayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!theme) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.backgroundColor = theme.bg;
    body.style.backgroundColor = theme.bg;
    return () => {
      html.style.backgroundColor = "";
      body.style.backgroundColor = "";
    };
  }, [theme]);

  return (
    <div className={`flex min-h-screen flex-col${theme ? " theme-dark-bg" : ""}`}>
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="flex-1">
        {fullWidth ? children : (
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            {children}
          </div>
        )}
      </main>
      <Footer theme={theme} />
    </div>
  );
};

export default Layout;
