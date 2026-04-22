import { useState, useEffect } from "react";

interface CaseLoaderProps {
  role: string;
  bg: string;
}

type Phase = "entering" | "visible" | "exiting" | "done";

const CaseLoader = ({ role, bg }: CaseLoaderProps) => {
  const [phase, setPhase] = useState<Phase>("entering");

  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });

    const exitTimer = setTimeout(() => setPhase("exiting"), 3400);

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(exitTimer);
    };
  }, []);

  if (phase === "done") return null;

  const dismiss = () => {
    if (phase === "visible") setPhase("exiting");
  };

  const handleTransitionEnd = () => {
    if (phase === "exiting") setPhase("done");
  };

  return (
    <div
      onClick={dismiss}
      onTransitionEnd={handleTransitionEnd}
      style={{
        backgroundColor: bg,
        opacity: phase === "visible" ? 1 : 0,
        transition: phase === "exiting" ? "opacity 700ms ease" : "opacity 400ms ease",
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
