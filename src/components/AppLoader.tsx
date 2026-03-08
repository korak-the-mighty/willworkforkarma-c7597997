import { useState, useEffect } from "react";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [fontsReady, setFontsReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setFontsReady(true);
      setTimeout(() => setHidden(true), 450);
    };

    const safetyTimer = setTimeout(reveal, 4000);

    document.fonts.ready.then(async () => {
      const heroImg = document.querySelector('img[fetchpriority="high"]');
      if (heroImg) await (heroImg as HTMLImageElement).decode().catch(() => {});
      clearTimeout(safetyTimer);
      reveal();
    });

    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <>
      {children}
      {!hidden && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            backgroundColor: "hsl(220 15% 8%)",
            opacity: fontsReady ? 0 : 1,
            transition: "opacity 400ms ease",
            pointerEvents: "none",
          }}
        />
      )}
    </>
  );
};

export default AppLoader;
