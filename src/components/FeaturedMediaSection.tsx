interface FeaturedMediaSectionProps {
  src: string;
  alt: string;
  className?: string;
}

const FeaturedMediaSection = ({ src, alt, className }: FeaturedMediaSectionProps) => {
  return (
    <section className={className ?? ""}>
      {/* Desktop: full-bleed cover image */}
      <div className="hidden md:block w-full h-[900px] overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Mobile: full-height native horizontal scroll */}
      <div className="md:hidden h-screen w-full">
        <div
          className="h-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-auto max-w-none block"
            style={{ minWidth: 'max-content' }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedMediaSection;
