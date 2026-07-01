import { GalleryItem } from '../types/case';

interface CaseGalleryProps {
  items?: GalleryItem[];
  variant?: 'grid' | 'airy';
}

function MediaEl({ item }: { item: GalleryItem }) {
  if (item.type === 'video') {
    return (
      <video autoPlay muted loop playsInline className="w-full h-auto block">
        <source src={item.url} type="video/webm" />
        {item.urlFallback && <source src={item.urlFallback} type="video/mp4" />}
      </video>
    );
  }
  return <img src={item.url} alt="" loading="lazy" className="w-full h-auto block lazy-img" />;
}

const CaseGallery = ({ items, variant = 'airy' }: CaseGalleryProps = {}) => {
  if (!items || items.length === 0) return null;

  if (variant === 'grid') {
    // For alternation purposes, full items don't count
    let altIndex = 0;
    return (
      <div className="grid grid-cols-2 gap-3">
        {items.map((item, i) => {
          if (item.full) {
            return (
              <div key={i} className="col-span-2 overflow-hidden">
                <MediaEl item={item} />
              </div>
            );
          }
          const isLast = !items.slice(i + 1).some((it) => !it.full);
          const nonFullCount = items.filter((it) => !it.full).length;
          const isOddLast = isLast && nonFullCount % 2 !== 0;
          altIndex++;
          return (
            <div key={i} className={`${isOddLast ? 'col-span-2' : ''} overflow-hidden`}>
              <MediaEl item={item} />
            </div>
          );
        })}
      </div>
    );
  }

  // airy layout — alternating left/right, full items span full width
  let altIndex = 0;
  return (
    <div className="py-8">
      {items.map((item, i) => {
        if (item.full) {
          return (
            <div key={i} className="w-full mt-12 overflow-hidden">
              <MediaEl item={item} />
            </div>
          );
        }
        const isEven = altIndex % 2 === 0;
        altIndex++;
        return (
          <div
            key={i}
            className={`flex py-12 ${isEven ? 'justify-start pl-[8%]' : 'justify-end pr-[8%]'}`}
          >
            <div className="w-[62%] overflow-hidden">
              <MediaEl item={item} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CaseGallery;
