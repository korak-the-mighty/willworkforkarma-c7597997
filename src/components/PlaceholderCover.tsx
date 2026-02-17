interface PlaceholderCoverProps {
  variant: "grid" | "texture";
  className?: string;
}

const GridCover = () => (
  <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="800" height="450" fill="hsl(40 20% 93%)" />
    {/* Grid lines */}
    {Array.from({ length: 12 }).map((_, i) => (
      <line key={`v${i}`} x1={66 * (i + 1)} y1="0" x2={66 * (i + 1)} y2="450" stroke="hsl(220 10% 80%)" strokeWidth="0.5" />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`h${i}`} x1="0" y1={75 * (i + 1)} x2="800" y2={75 * (i + 1)} stroke="hsl(220 10% 80%)" strokeWidth="0.5" />
    ))}
    {/* Overlapping letterforms */}
    <text x="120" y="280" fontFamily="'Instrument Serif', serif" fontSize="220" fill="hsl(220 10% 75%)" opacity="0.4">S</text>
    <text x="280" y="320" fontFamily="'Instrument Serif', serif" fontSize="220" fill="hsl(220 10% 70%)" opacity="0.3">H</text>
    <text x="440" y="260" fontFamily="'Instrument Serif', serif" fontSize="220" fill="hsl(220 10% 65%)" opacity="0.25">A</text>
    {/* Accent rectangles */}
    <rect x="60" y="40" width="140" height="4" fill="hsl(220 15% 10%)" opacity="0.15" />
    <rect x="600" y="400" width="140" height="4" fill="hsl(220 15% 10%)" opacity="0.15" />
  </svg>
);

const TextureCover = () => (
  <svg viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="800" height="450" fill="hsl(35 15% 90%)" />
    {/* Diagonal cut */}
    <polygon points="0,0 800,0 800,300" fill="hsl(30 10% 85%)" />
    {/* Grain dots */}
    {Array.from({ length: 80 }).map((_, i) => (
      <circle
        key={i}
        cx={((i * 97) % 780) + 10}
        cy={((i * 53) % 430) + 10}
        r={((i * 7) % 3) + 0.5}
        fill="hsl(220 15% 10%)"
        opacity={0.04 + (i % 5) * 0.01}
      />
    ))}
    {/* Material lines */}
    <line x1="0" y1="300" x2="800" y2="300" stroke="hsl(220 10% 75%)" strokeWidth="0.5" />
    <line x1="100" y1="0" x2="100" y2="450" stroke="hsl(220 10% 80%)" strokeWidth="0.5" />
    {/* Workshop-inspired shapes */}
    <rect x="120" y="320" width="200" height="100" fill="none" stroke="hsl(220 15% 10%)" strokeWidth="1" opacity="0.1" />
    <rect x="500" y="80" width="160" height="160" fill="hsl(220 15% 10%)" opacity="0.04" />
  </svg>
);

const PlaceholderCover = ({ variant, className = "" }: PlaceholderCoverProps) => (
  <div className={`aspect-[16/9] w-full overflow-hidden bg-muted ${className}`}>
    {variant === "grid" ? <GridCover /> : <TextureCover />}
  </div>
);

export default PlaceholderCover;
