interface CaseGalleryProps {
  images?: string[];
}

const CaseGallery = ({ images }: CaseGalleryProps = {}) => {
  if (images && images.length > 0) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className={`${i === images.length - 1 && images.length % 2 !== 0 ? "col-span-2" : ""} border border-white/[0.06] overflow-hidden`}
          >
            <img src={src} alt="" loading="lazy" className="w-full h-auto block lazy-img" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="aspect-[3/2] border border-white/[0.06]" />
      <div className="aspect-[3/2] border border-white/[0.06]" />
      <div className="col-span-2 aspect-[2/1] border border-white/[0.06]" />
    </div>
  );
};

export default CaseGallery;
