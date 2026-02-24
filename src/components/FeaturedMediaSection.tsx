import { useRef, useEffect, useState, useCallback } from "react";

interface FeaturedMediaSectionProps {
  src: string;
  alt: string;
  className?: string;
}

const FeaturedMediaSection = ({ src, alt, className }: FeaturedMediaSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [translateX, setTranslateX] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const rect = container.getBoundingClientRect();
    const scrollTravel = container.offsetHeight - window.innerHeight;
    if (scrollTravel <= 0) return;

    const progress = Math.min(1, Math.max(0, -rect.top / scrollTravel));
    const maxShift = img.offsetWidth - window.innerWidth;
    if (maxShift <= 0) return;

    setTranslateX(-progress * maxShift);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className={className ?? ""}>
      {/* Desktop: full-bleed cover image */}
      <div className="hidden md:block w-full h-[900px] overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Mobile: scroll-driven horizontal pan */}
      <div ref={containerRef} className="md:hidden h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="h-full w-auto max-w-none block"
            style={{ transform: `translateX(${translateX}px)` }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedMediaSection;
