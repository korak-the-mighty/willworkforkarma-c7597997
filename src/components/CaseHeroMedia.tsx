import { useState } from "react";
import type { CaseHeroMedia as CaseHeroMediaType } from "@/data/cases";

interface CaseHeroMediaProps {
  // Legacy prop
  heroMedia?: CaseHeroMediaType;
  // Content-system props — used instead of heroMedia when provided
  headline?: string;
  backgroundImage?: string;
}

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const CaseHeroMedia = ({ heroMedia, headline: _headline, backgroundImage }: CaseHeroMediaProps) => {
  // Synthesise a CaseHeroMediaType object when content-system props are provided
  const effectiveHeroMedia: CaseHeroMediaType = backgroundImage
    ? { type: "image", src: backgroundImage }
    : (heroMedia ?? { type: "image", src: "" });
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className={`${FULL_BLEED} h-[55vh] md:h-[80vh] border border-white/[0.06] overflow-hidden`}>
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
            className="h-full w-full object-cover"
            style={{ opacity: videoReady ? 1 : 0, transition: "opacity 400ms ease" }}
          />
        ) : (
          <img
            src={effectiveHeroMedia.src}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        )
      ) : null}
    </div>
  );
};

export default CaseHeroMedia;
