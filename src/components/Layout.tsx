import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

const Header = () => (
  <header className="border-b border-border">
    <div className="mx-auto flex max-w-4xl items-baseline justify-between px-6 py-6">
      <Link to="/" className="font-heading text-lg tracking-tight">
        Willworkforkarma
      </Link>
      <nav className="flex gap-8 text-sm">
        <NavLink
          to="/work"
          className="text-muted-foreground transition-colors hover:text-foreground"
          activeClassName="text-foreground"
        >
          Work
        </NavLink>
        <NavLink
          to="/about"
          className="text-muted-foreground transition-colors hover:text-foreground"
          activeClassName="text-foreground"
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className="text-muted-foreground transition-colors hover:text-foreground"
          activeClassName="text-foreground"
        >
          Contact
        </NavLink>
      </nav>
    </div>
  </header>
);

const Footer = () => (
  <footer>
    <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why Karma</p>
      <p className="text-muted-foreground mt-4">[WHY KARMA TEXT — to be written later]</p>
      <Link to="/contact" className="inline-block mt-6 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors">
        Get in touch
      </Link>
    </div>
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

const Layout = ({ children, fullWidth = false }: LayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Header />
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

export default Layout;
