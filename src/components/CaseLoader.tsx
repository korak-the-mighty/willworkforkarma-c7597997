import { useState, useEffect } from "react";

interface CaseLoaderProps {
  role: string;
  bg: string;
}

const CaseLoader = ({ role, bg }: CaseLoaderProps) => {
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 3000);
    return () => clearTimeout(exitTimer);
  }, []);

  if (done) return null;

  const dismiss = () => setExiting(true);

  const handleTransitionEnd = () => {
    if (exiting) setDone(true);
  };

  return (
    <div
      onClick={dismiss}
      onTransitionEnd={handleTransitionEnd}
      style={{
        backgroundColor: bg,
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 700ms ease" : "none",
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-2 cursor-pointer"
    >
      <p
        className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-center"
        style={{ color: "#ECA9CC" }}
      >
        Creative Director
      </p>
      <p className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-center text-white">
        {role}
      </p>
    </div>
  );
};

export default CaseLoader;
