import { useState, useEffect } from "react";

const AppLoader = ({ children }: { children: React.ReactNode }) => {
  const [fontsReady, setFontsReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontsReady(true);
      setTimeout(() => setHidden(true), 450);
    });
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
