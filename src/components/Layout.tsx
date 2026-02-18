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
  <footer>
    <div className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <p className="text-sm text-muted-foreground">
          Good work comes back around.
        </p>
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
