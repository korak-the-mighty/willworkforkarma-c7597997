interface CaseGalleryProps {
  images?: string[];
  variant?: 'grid' | 'airy';
}

const CaseGallery = ({ images, variant = 'airy' }: CaseGalleryProps = {}) => {
  if (!images || images.length === 0) return null;

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className={`${i === images.length - 1 && images.length % 2 !== 0 ? 'col-span-2' : ''} overflow-hidden`}
          >
            <img src={src} alt="" loading="lazy" className="w-full h-auto block lazy-img" />
          </div>
        ))}
      </div>
    );
  }

  // airy layout — each image on its own row, alternating left/right
  return (
    <div className="py-8">
      {images.map((src, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={i}
            className={`flex py-12 ${isEven ? 'justify-start pl-[8%]' : 'justify-end pr-[8%]'}`}
          >
            <div className="w-[62%] overflow-hidden">
              <img src={src} alt="" loading="lazy" className="w-full h-auto block lazy-img" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CaseGallery;
