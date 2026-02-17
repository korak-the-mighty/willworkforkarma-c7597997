interface PlaceholderCoverProps {
  variant?: "grid" | "texture";
  className?: string;
  aspectRatio?: string;
}

const PlaceholderCover = ({ className = "", aspectRatio = "21/9" }: PlaceholderCoverProps) => (
  <div
    className={`w-full overflow-hidden bg-muted ${className}`}
    style={{ aspectRatio }}
  />
);

export default PlaceholderCover;
