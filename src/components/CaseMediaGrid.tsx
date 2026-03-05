interface CaseMediaGridProps {
  items?: { src?: string; caption?: string }[];
  count?: number;
}

const CaseMediaGrid = ({ items, count = 4 }: CaseMediaGridProps) => {
  const cells = items && items.length > 0
    ? items
    : Array.from({ length: count }, () => ({ src: undefined, caption: undefined }));

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {cells.map((cell, i) => (
        <div key={i}>
          <div className={`aspect-[3/2] overflow-hidden bg-muted ${!cell.src ? "border border-white/[0.06]" : ""}`}>
            {cell.src && (
              <img
                src={cell.src}
                alt={cell.caption || ""}
                loading="lazy"
                className="h-full w-full object-cover lazy-img"
                onLoad={(e) => e.currentTarget.classList.add('loaded')}
              />
            )}
          </div>
          {cell.caption && (
            <p className="mt-2 text-xs text-muted-foreground">{cell.caption}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default CaseMediaGrid;
