import type { CaseHeroMedia as CaseHeroMediaType } from "@/data/cases";

interface CaseHeroMediaProps {
  heroMedia: CaseHeroMediaType;
}

const FULL_BLEED = "relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen";

const CaseHeroMedia = ({ heroMedia }: CaseHeroMediaProps) => (
  <div className={`${FULL_BLEED} h-[55vh] md:h-[80vh] border border-white/[0.06] overflow-hidden`}>
    {heroMedia.src ? (
      heroMedia.type === "video" ? (
        <video
          src={heroMedia.src}
          poster={heroMedia.poster}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <img
          src={heroMedia.src}
          alt=""
          className="h-full w-full object-cover"
        />
      )
    ) : null}
  </div>
);

export default CaseHeroMedia;
