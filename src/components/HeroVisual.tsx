const HeroVisual = () => (
  <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="500" height="500" fill="hsl(40 20% 94%)" />
    {/* Large typographic element */}
    <text x="30" y="350" fontFamily="'Instrument Serif', serif" fontSize="400" fill="hsl(220 15% 10%)" opacity="0.06">W</text>
    {/* Grid overlay */}
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={`g${i}`} x1={62.5 * (i + 1)} y1="0" x2={62.5 * (i + 1)} y2="500" stroke="hsl(220 10% 80%)" strokeWidth="0.5" opacity="0.5" />
    ))}
    {/* Accent elements */}
    <rect x="62.5" y="62.5" width="125" height="2" fill="hsl(220 15% 10%)" opacity="0.2" />
    <rect x="312.5" y="375" width="125" height="2" fill="hsl(220 15% 10%)" opacity="0.2" />
    <circle cx="375" cy="125" r="40" fill="none" stroke="hsl(220 10% 75%)" strokeWidth="0.5" />
  </svg>
);

export default HeroVisual;
