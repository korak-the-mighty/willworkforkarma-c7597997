import { useState } from "react";
import type { CaseHeroMedia as CaseHeroMediaType } from "@/data/cases";

interface CaseHeroMediaProps {
  // Legacy prop
  heroMedia?: CaseHeroMediaType;
  // Content-system props — used instead of heroMedia when provided
  headline?: string;
  backgroundImage?: string;
  isVideo?: boolean;
  title?: string;
  subtitle?: string;
}

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const CaseHeroMedia = ({ heroMedia, headline, backgroundImage, isVideo, title, subtitle }: CaseHeroMediaProps) => {
  // Synthesise a CaseHeroMediaType object when content-system props are provided
  const effectiveHeroMedia: CaseHeroMediaType = backgroundImage
    ? { type: isVideo ? "video" : "image", src: backgroundImage }
    : (heroMedia ?? { type: "image", src: "" });
  const [videoReady, setVideoReady] = useState(false);

  const hasOverlay = !!(headline || title || subtitle);

  return (
    <div className={`${FULL_BLEED} ${hasOverlay ? 'h-screen' : 'h-[55vh] md:h-[80vh] border border-white/[0.06]'} overflow-hidden relative`}>
      {effectiveHeroMedia.src ? (
        effectiveHeroMedia.type === "video" ? (
          <video
            src={effectiveHeroMedia.src}
            poster={effectiveHeroMedia.poster}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: videoReady ? 1 : 0, transition: "opacity 400ms ease" }}
          />
        ) : (
          <img
            src={effectiveHeroMedia.src}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      ) : null}
      {hasOverlay && (
        <>
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
            {title && <p className="text-sm tracking-[0.02em] text-white">{title}</p>}
            {subtitle && <p className="text-sm tracking-[0.02em] text-[#ECA9CC] mt-2">{subtitle}</p>}
            {headline && (
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl leading-[1.1] mt-6">
                {headline}
              </h1>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CaseHeroMedia;
