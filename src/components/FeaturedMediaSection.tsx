interface FeaturedMediaSectionProps {
  src: string;
  alt: string;
  className?: string;
}

const FeaturedMediaSection = ({ src, alt, className }: FeaturedMediaSectionProps) => {
  return (
    <section className={className ?? ""}>
      {/* Desktop: full-bleed cover image */}
      <div className="hidden md:block w-full overflow-hidden">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Mobile: full-height native horizontal scroll */}
      <div className="md:hidden h-screen w-full">
        <div
          className="h-full w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <img
            src={src}
            alt={alt}
            className="h-full w-auto max-w-none block"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedMediaSection;
