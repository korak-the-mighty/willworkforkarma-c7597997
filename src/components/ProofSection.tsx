import { useRef, useEffect, useState, useCallback } from 'react';
import { ProofSection as ProofSectionType, ProofItem } from '../types/case';

const PLACEHOLDER_STYLE = { background: '#1a1a1a' };

// Shared gray box — respects the same layout slot as the real asset
function GrayBox({ isLeft, fullWidth }: { isLeft: boolean; fullWidth?: boolean }) {
  if (fullWidth) {
    return <div className="w-full aspect-video block" style={PLACEHOLDER_STYLE} />;
  }
  return (
    <div className={`hidden md:flex md:px-16 lg:px-24 ${isLeft ? 'justify-start' : 'justify-end'}`}>
      <div className="w-[60%] aspect-video" style={PLACEHOLDER_STYLE} />
    </div>
  );
}

// ------------------------------------------------------------
// Video item — lazy loads src via IntersectionObserver
// ------------------------------------------------------------
function ProofVideo({ item, isLeft }: { item: ProofItem; isLeft: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(!item.src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    const onError = () => setFailed(true);
    video.addEventListener('error', onError);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!video.getAttribute('src')) {
              video.src = video.dataset.src as string;
            }
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener('error', onError);
    };
  }, [failed]);

  if (failed) {
    return (
      <div className="w-full">
        <GrayBox isLeft={isLeft} />
        <div className="md:hidden">
          <GrayBox isLeft={isLeft} fullWidth />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className={`hidden md:flex md:px-16 lg:px-24 ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <div className="w-[60%]">
          <video
            ref={videoRef}
            data-src={item.src}
            aria-label={item.alt}
            muted
            loop
            playsInline
            className="w-full block"
          />
        </div>
      </div>
      {/* Mobile — full width */}
      <div className="md:hidden w-full">
        <video
          data-src={item.src}
          aria-label={item.alt}
          muted
          loop
          playsInline
          className="w-full block"
          ref={(el) => {
            if (!el) return;
            el.addEventListener('error', () => setFailed(true));
            const obs = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    if (!el.getAttribute('src')) el.src = el.dataset.src as string;
                    el.play().catch(() => {});
                  } else {
                    el.pause();
                  }
                });
              },
              { rootMargin: '200px' }
            );
            obs.observe(el);
          }}
        />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Image with pan-x on mobile
// ------------------------------------------------------------
function ProofPanX({ item, isLeft }: { item: ProofItem; isLeft: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [failed, setFailed] = useState(false);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;
    const rect = container.getBoundingClientRect();
    const scrollTravel = container.offsetHeight - window.innerHeight;
    if (scrollTravel <= 0) return;
    const progress = Math.min(1, Math.max(0, -rect.top / scrollTravel));
    const maxShift = img.offsetWidth - window.innerWidth;
    if (maxShift <= 0) return;
    setTranslateX(-progress * maxShift);
  }, []);

  useEffect(() => {
    if (failed) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, failed]);

  if (failed) {
    return (
      <>
        <GrayBox isLeft={isLeft} />
        <div className="md:hidden">
          <GrayBox isLeft={isLeft} fullWidth />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Desktop: static in alternating layout */}
      <div className={`hidden md:flex md:px-16 lg:px-24 ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <div className="w-[60%]">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-full block"
            onError={() => setFailed(true)}
          />
        </div>
      </div>
      {/* Mobile: scroll-driven horizontal pan — full bleed */}
      <div ref={containerRef} className="md:hidden h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <img
            ref={imgRef}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="h-full w-auto max-w-none block"
            style={{ transform: `translateX(${translateX}px)` }}
            draggable={false}
            onError={() => setFailed(true)}
          />
        </div>
      </div>
    </>
  );
}

// ------------------------------------------------------------
// Static image
// ------------------------------------------------------------
function ProofImage({ item, isLeft }: { item: ProofItem; isLeft: boolean }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full">
        <GrayBox isLeft={isLeft} />
        <div className="md:hidden">
          <GrayBox isLeft={isLeft} fullWidth />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className={`hidden md:flex md:px-16 lg:px-24 ${isLeft ? 'justify-start' : 'justify-end'}`}>
        <div className="w-[60%]">
          <img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className="w-full block"
            onError={() => setFailed(true)}
          />
        </div>
      </div>
      {/* Mobile: full width */}
      <div className="md:hidden w-full">
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          className="w-full block"
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Main export
// ------------------------------------------------------------
export function ProofSection({ section }: { section: ProofSectionType }) {
  if (section.variant !== 'drift-images') {
    console.warn(`[ProofSection] Unknown variant "${section.variant}" — rendering nothing`);
    return null;
  }

  return (
    <section className="w-full py-24 md:py-40">
      {section.items.map((item, index) => (
        <div key={index} className={index > 0 ? 'mt-[120px] md:mt-[200px]' : ''}>
          {item.isVideo ? (
            <ProofVideo item={item} isLeft={index % 2 === 0} />
          ) : item.mobile === 'pan-x' ? (
            <ProofPanX item={item} isLeft={index % 2 === 0} />
          ) : (
            <ProofImage item={item} isLeft={index % 2 === 0} />
          )}
        </div>
      ))}
    </section>
  );
}
