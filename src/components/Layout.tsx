import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

const Header = () => (
  <header className="border-b border-border">
    <div className="mx-auto flex max-w-3xl items-baseline justify-between px-6 py-6">
      <Link to="/" className="font-serif text-lg tracking-tight">
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
  <footer className="border-t border-border">
    <div className="mx-auto max-w-3xl px-6 py-8">
      <p className="text-sm text-muted-foreground">
        Good work comes back around.
      </p>
    </div>
  </footer>
);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="flex min-h-screen flex-col">
    <Header />
    <main className="flex-1">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        {children}
      </div>
    </main>
    <Footer />
  </div>
);

export default Layout;
