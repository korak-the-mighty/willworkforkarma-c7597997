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
  <footer className="bg-transparent">
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
    if (!theme?.bg) return;

    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById("root");

    const prevHtmlBg = html.style.backgroundColor;
    const prevBodyBg = body.style.backgroundColor;
    const prevRootBg = root?.style.backgroundColor ?? "";
    const prevColorScheme = html.style.colorScheme;

    html.style.backgroundColor = theme.bg;
    body.style.backgroundColor = theme.bg;
    if (root) root.style.backgroundColor = theme.bg;
    html.style.colorScheme = "dark";

    const params = new URLSearchParams(window.location.search);
    const bgDebug = params.get("bgdebug") === "1";

    let debugTimer: number | undefined;
    if (bgDebug) {
      debugTimer = window.setTimeout(() => {
        const offenders: Element[] = [];
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;

        document.querySelectorAll("body *").forEach((el) => {
          const htmlEl = el as HTMLElement;
          const cs = window.getComputedStyle(htmlEl);
          const bg = cs.backgroundColor;

          if (bg === "rgba(0, 0, 0, 0)" || bg === "transparent") return;
          if (bg === bodyBg) return;

          const tag = htmlEl.tagName.toLowerCase();
          if (["img", "video", "picture", "svg", "canvas"].includes(tag)) return;
          if (cs.position === "fixed") return;

          const rect = htmlEl.getBoundingClientRect();
          if (rect.width < 8 || rect.height < 8) return;

          offenders.push(el);
          htmlEl.style.outline = "2px solid red";
          htmlEl.setAttribute("data-bgdebug", bg);
          console.log("[bgdebug] offender:", el, "bg:", bg);
        });

        console.log(`[bgdebug] offenders found: ${offenders.length}`);
      }, 500);
    }

    return () => {
      html.style.backgroundColor = prevHtmlBg;
      body.style.backgroundColor = prevBodyBg;
      if (root) root.style.backgroundColor = prevRootBg;
      html.style.colorScheme = prevColorScheme;
      if (debugTimer) clearTimeout(debugTimer);
    };
  }, [theme]);

  return (
    <div className="flex min-h-screen flex-col" style={theme ? { backgroundColor: theme.bg } : undefined}>
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
