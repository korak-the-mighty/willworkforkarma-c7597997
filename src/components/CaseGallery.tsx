interface CaseGalleryProps {
  variant: "grid" | "texture";
}

const GalleryPlaceholder = ({ seed, variant }: { seed: number; variant: string }) => {
  const hue = variant === "grid" ? 40 : 35;
  const lightness = 88 + (seed % 5);
  
  return (
    <svg viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="600" height="400" fill={`hsl(${hue} 15% ${lightness}%)`} />
      {/* Geometric shapes */}
      <rect
        x={40 + seed * 30}
        y={40 + seed * 20}
        width={120 + seed * 15}
        height={120 + seed * 15}
        fill="hsl(220 15% 10%)"
        opacity={0.03 + seed * 0.01}
      />
      <circle
        cx={400 - seed * 40}
        cy={200 + seed * 30}
        r={60 + seed * 10}
        fill="none"
        stroke="hsl(220 10% 75%)"
        strokeWidth="0.5"
      />
      {/* Subtle lines */}
      <line x1="0" y1={200 + seed * 25} x2="600" y2={200 + seed * 25} stroke="hsl(220 10% 82%)" strokeWidth="0.5" />
    </svg>
  );
};

const CaseGallery = ({ variant }: CaseGalleryProps) => (
  <div className="grid grid-cols-2 gap-3">
    <div className="aspect-[3/2] overflow-hidden bg-muted">
      <GalleryPlaceholder seed={0} variant={variant} />
    </div>
    <div className="aspect-[3/2] overflow-hidden bg-muted">
      <GalleryPlaceholder seed={1} variant={variant} />
    </div>
    <div className="col-span-2 aspect-[2/1] overflow-hidden bg-muted">
      <GalleryPlaceholder seed={2} variant={variant} />
    </div>
  </div>
);

export default CaseGallery;
