import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useGate } from '@/context/GateContext';
import { useOtherWorkContent } from '@/hooks/useOtherWorkContent';
import { useCaseHeroContent } from '@/hooks/useCaseHeroContent';
import { parseBreaks } from '@/lib/textBreaks';
import { useWorkContent } from '@/hooks/useWorkContent';

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

const SHOW_YEAR = false;

export default function Work() {
  const { requestAccess } = useGate();
  const caseHeroes = useCaseHeroContent();
  const otherWork = useOtherWorkContent();
  const workContent = useWorkContent();

  const CASE_ORDER = ['abb-emobility', 'share', 'wtr', 'man', 'bmw', 'drivelog'];
  const CLIENT_OVERRIDES: Record<string, string> = { drivelog: 'Bosch / Drivelog' };
  const selectedCases = CASE_ORDER.map((slug) => {
    const hero = caseHeroes[slug];
    return {
      slug,
      client: CLIENT_OVERRIDES[slug] || hero?.title || slug,
      image: hero?.thumbnail || '',
      summary: hero?.summary || '',
      year: hero?.year || '',
    };
  });
  const hoverWrapRef = useRef<HTMLDivElement>(null);
  const activeKeyRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgtX = useRef(0);
  const tgtY = useRef(0);
  const mouseYRef = useRef(0);
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [activeGrid, setActiveGrid] = useState<typeof otherWork[0] | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tappedIndex, setTappedIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);
  const slideIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [panMap, setPanMap] = useState<Record<number, number>>({});
  const dragStartXRef = useRef<number | null>(null);
  const dragStartPanRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const [activeMobileCase, setActiveMobileCase] = useState<string | null>(null);
  const mobileRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileImgRef = useRef<HTMLDivElement>(null);
  const mobileRafRef = useRef<number | null>(null);
  const mobileCurY = useRef(0);
  const mobileTgtY = useRef(0);
  const casesSectionRef = useRef<HTMLDivElement>(null);
  const mobileImgVisibleRef = useRef(true);
  const mobileImgExitedRef = useRef(false);
  const activeMobileCaseRef = useRef<string | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload all other work hero images on mount
  useEffect(() => {
    otherWork.forEach(item => {
      const imgs = item.images && item.images.length > 0 ? item.images : item.heroImage ? [item.heroImage] : [];
      imgs.forEach(src => { const img = new Image(); img.src = src; });
    });
  }, [otherWork]);

  // Mobile drag-to-pan handlers
  function handleTouchStart(e: React.TouchEvent) {
    if (!isMobile || tappedIndex === null) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartPanRef.current = panMap[tappedIndex] ?? 0;
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (!isMobile || tappedIndex === null || dragStartXRef.current === null) return;
    const delta = e.touches[0].clientX - dragStartXRef.current;
    const gridW = window.innerWidth - 32;
    const maxPan = (gridW * (cols - 1)) / 2;
    const clamped = Math.min(maxPan, Math.max(-maxPan, dragStartPanRef.current + delta));
    setPanMap(prev => ({ ...prev, [tappedIndex]: clamped }));
  }

  function handleTouchEnd() {
    isDraggingRef.current = false;
    dragStartXRef.current = null;
    // Restart slideshow at 2500ms after pan release
    if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
    if (!activeGrid) return;
    const imgs = activeGrid.images && activeGrid.images.length > 0 ? activeGrid.images : activeGrid.heroImage ? [activeGrid.heroImage] : [];
    if (imgs.length <= 1) return;
    slideIntervalRef.current = setInterval(() => {
      if (!isDraggingRef.current) setSlideIdx(prev => (prev + 1) % imgs.length);
    }, 2500);
  }

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseYRef.current = e.clientY;
      if (activeKeyRef.current && hoverWrapRef.current) {
        const h = hoverWrapRef.current.offsetHeight || (window.innerWidth * 0.38 * 9 / 16);
        tgtY.current = Math.max(0, Math.min(e.clientY - h / 2, window.innerHeight - h));
        tgtX.current = 0;
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  const snapSectionRef = useRef<HTMLDivElement>(null);
  const hasSnappedRef = useRef(false);
  const isInSnapZoneRef = useRef(false);

  useEffect(() => {
    const section = snapSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4 && !hasSnappedRef.current) {
            hasSnappedRef.current = true;
            isInSnapZoneRef.current = true;
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          if (!entry.isIntersecting) {
            hasSnappedRef.current = false;
            isInSnapZoneRef.current = false;
          }
        });
      },
      { threshold: [0, 0.4, 1.0] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    // Set initial position to first row vertical center if available
    const firstEl = mobileRowRefs.current[0];
    if (firstEl) {
      const rect = firstEl.getBoundingClientRect();
      const rowCenter = rect.top + rect.height / 2;
      const imgH = mobileImgRef.current?.offsetHeight || 180;
      const startY = Math.max(80, Math.min(rowCenter - imgH / 2, window.innerHeight - imgH - 80));
      mobileCurY.current = startY;
      mobileTgtY.current = startY;
    }

    const tick = () => {
      mobileCurY.current = mobileCurY.current + (mobileTgtY.current - mobileCurY.current) * 0.045;
      if (mobileImgRef.current) {
        if (mobileImgExitedRef.current) {
          mobileImgRef.current.style.transform = `translateY(${mobileCurY.current}px) translateX(80px)`;
        } else {
          mobileImgRef.current.style.transform = `translateY(${mobileCurY.current}px) translateX(0px)`;
        }
      }
      mobileRafRef.current = requestAnimationFrame(tick);
    };
    mobileRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (mobileRafRef.current) cancelAnimationFrame(mobileRafRef.current);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const onScroll = () => {
      let closestSlug: string | null = null;
      let closestDist = Infinity;
      let closestEl: HTMLDivElement | null = null;

      mobileRowRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const dist = Math.abs(rowCenter - window.innerHeight / 2);
        if (dist < closestDist) {
          closestDist = dist;
          closestSlug = selectedCases[i].slug;
          closestEl = el;
        }
      });

      // Only update state when slug actually changes
      if (closestSlug && closestSlug !== activeMobileCaseRef.current) {
        activeMobileCaseRef.current = closestSlug;
        setActiveMobileCase(closestSlug);
      }

      // Always update lerp target Y
      if (closestEl) {
        const rect = (closestEl as HTMLDivElement).getBoundingClientRect();
        const rowCenter = rect.top + rect.height / 2;
        const imgH = mobileImgRef.current?.offsetHeight || 0;
        const effectiveImgH = imgH > 0 ? imgH : window.innerWidth * 0.52 * 0.75; // 4:3 ratio of 52vw
        mobileTgtY.current = Math.max(80, Math.min(rowCenter - effectiveImgH / 2, window.innerHeight - effectiveImgH - 80));
      }
    };

    // Run once on mount to set initial state
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const el = casesSectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          mobileImgVisibleRef.current = entry.isIntersecting;
          mobileImgExitedRef.current = !entry.isIntersecting;
          if (mobileImgRef.current) {
            mobileImgRef.current.style.opacity = entry.isIntersecting ? '1' : '0';
          }
        });
      },
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile]);

  function getImages(item: typeof otherWork[0]): string[] {
    if (item.images && item.images.length > 0) return item.images;
    if (item.heroImage) return [item.heroImage];
    return [];
  }

  useEffect(() => {
    if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; }
    setSlideIdx(0);
    if (!activeGrid) return;
    const imgs = getImages(activeGrid);
    if (imgs.length <= 1) return;
    slideIntervalRef.current = setInterval(() => {
      if (!isDraggingRef.current) setSlideIdx(prev => (prev + 1) % imgs.length);
    }, 2000);
    return () => { if (slideIntervalRef.current) { clearInterval(slideIntervalRef.current); slideIntervalRef.current = null; } };
  }, [activeGrid]);

  function startRaf() {
    if (rafRef.current) return;
    const tick = () => {
      curX.current = lerp(curX.current, tgtX.current, 0.12);
      curY.current = lerp(curY.current, tgtY.current, 0.10);
      if (hoverWrapRef.current) {
        hoverWrapRef.current.style.transform = `translateY(${curY.current}px) translateX(${curX.current}px)`;
        hoverWrapRef.current.style.opacity = tgtX.current > 80 ? '0' : '1';
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopRaf() {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
  }

  function activateCase(key: string) {
    if (activeKeyRef.current === key) return;
    const isFirst = !activeKeyRef.current;
    activeKeyRef.current = key;
    setActiveCase(key);
    const wrap = hoverWrapRef.current;
    if (!wrap) return;
    const imgW = wrap.offsetWidth || window.innerWidth * 0.38;
    const imgH = wrap.offsetHeight || imgW * 9 / 16;
    const destY = Math.max(0, Math.min(mouseYRef.current - imgH / 2, window.innerHeight - imgH));
    if (isFirst) { curX.current = imgW; curY.current = destY; }
    tgtX.current = 0;
    tgtY.current = destY;
    startRaf();
  }

  function deactivateCase() {
    if (!activeKeyRef.current) return;
    activeKeyRef.current = null;
    setActiveCase(null);
    const imgW = hoverWrapRef.current?.offsetWidth || window.innerWidth * 0.38;
    tgtX.current = imgW;
    setTimeout(() => { stopRaf(); }, 320);
  }

  function handleCellTap(item: typeof otherWork[0], i: number) {
    if (!isMobile) return;
    if (tappedIndex === i) {
      setTappedIndex(null);
      setActiveGrid(null);
      setHoveredIndex(null);
    } else {
      setTappedIndex(i);
      setActiveGrid(item);
      setHoveredIndex(i);
    }
  }

  const cols = isMobile ? 2 : (window.innerWidth < 1024 ? 3 : 4);

  const hp = isMobile ? '16px' : '56px';

  const s: Record<string, React.CSSProperties> = {
    page:       { background: '#0a0a0a', color: '#f5f5f0', minHeight: '100vh', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' },
    header:     { padding: isMobile ? `80px ${hp} 40px` : `160px ${hp} 80px` },
    headline:   { fontSize: 'clamp(40px,6vw,96px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 32 },
    context:    { fontSize: 'clamp(17px,1.6vw,24px)', fontWeight: 400, lineHeight: 1.625, color: 'rgba(245,245,240,0.78)', maxWidth: 640 },
    label:      { fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', padding: `0 ${hp}`, marginBottom: 32 },
    divider:    { padding: `96px ${hp} 72px`, textAlign: 'center' as const },
    divHead:    { fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(36px,5vw,80px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1 },
    divSub:     { fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', marginTop: 18 },
  };

  return (
    <Layout fullWidth theme={{ bg: '#0a0a0a' }}>
    <div style={{ color: '#f5f5f0', fontFamily: "'Inter', sans-serif", WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
      {/* Fixed floating image — mobile cases list */}
      {isMobile && (
        <div
          ref={mobileImgRef}
          style={{
            position: 'fixed',
            right: '-6vw',
            top: 0,
            width: '75vw',
            aspectRatio: '4/3',
            zIndex: 2,
            pointerEvents: 'none',
            willChange: 'transform, opacity',
            transform: 'translateY(0px)',
            opacity: 1,
            transition: 'opacity 500ms ease',
          }}
        >
          {selectedCases.map(c => (
            <div
              key={c.slug}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: activeMobileCase === c.slug ? 1 : 0,
                transition: 'opacity 700ms ease',
              }}
            >
              {c.image ? (
                <>
                  <img
                    src={c.image}
                    alt={c.client}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: '#0a0a0a',
                      opacity: 0.45,
                      pointerEvents: 'none',
                    }}
                  />
                </>
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#1e1e1e' }} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Fixed hover image — cases list (hidden on mobile) */}
      {!isMobile && (
        <div
          ref={hoverWrapRef}
          style={{ position: 'fixed', right: 0, top: 0, width: '38vw', pointerEvents: 'none', zIndex: 20, opacity: 0, transform: 'translateY(0px) translateX(100%)', willChange: 'transform, opacity' }}
        >
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
            {selectedCases.map(c => (
              <div key={c.slug} style={{ position: 'absolute', inset: 0, opacity: activeCase === c.slug ? 1 : 0, transition: 'opacity 160ms ease' }}>
                {c.image
                  ? <img src={c.image} alt={c.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  : <div style={{ width: '100%', height: '100%', background: '#1e1e1e' }} />
                }
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page header */}
      <div style={s.header}>
        <h1 style={s.headline}>{workContent.headline}</h1>
        {workContent.body.map((para, i) => (
          <p key={i} style={i === 0 ? s.context : { ...s.context, marginTop: 16 }}>{para}</p>
        ))}
      </div>

      {/* Cases list */}
      <section ref={casesSectionRef} style={{ padding: '0 0 80px', position: 'relative' }} onMouseLeave={deactivateCase}>
        <div style={s.label}>Case Studies</div>
        {selectedCases.map((c, i) => {
          const isActive = activeMobileCase === c.slug;
          const headline = caseHeroes[c.slug]?.headline || c.summary;
          const summaryForDesktop = parseBreaks(headline, 'desktop');
          const summaryForMobile = parseBreaks(headline, 'mobile');

          // ── MOBILE RENDER ──────────────────────────────────
          if (isMobile) {
            const mobileContent = (
              <div
                ref={el => { mobileRowRefs.current[i] = el; }}
                style={{
                  borderTop: '1px solid rgba(245,245,240,0.1)',
                  position: 'relative',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: '75%',
                    padding: '40px 0 40px 20px',
                    opacity: isActive ? 1 : 0.28,
                    transition: 'opacity 500ms ease',
                    position: 'relative',
                    zIndex: 10,
                  }}
                >
                  <div style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 11,
                    fontWeight: 300,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(245,245,240,0.5)',
                    marginBottom: 14,
                  }}>
                    {c.client}
                  </div>
                  <div style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: 'clamp(24px, 6vw, 34px)',
                    fontWeight: 300,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: '#f5f5f0',
                  }}>
                    {summaryForMobile}
                  </div>
                  {SHOW_YEAR && (
                    <div style={{
                      marginTop: 20,
                      fontSize: 11,
                      letterSpacing: '0.08em',
                      color: 'rgba(245,245,240,0.2)',
                    }}>
                      {c.year}
                    </div>
                  )}
                </div>
              </div>
            );

            return c.slug === 'abb-emobility' ? (
              <Link
                key={c.slug}
                to="/work/abb-emobility"
                style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
                onClick={(e) => {
                  if (sessionStorage.getItem('gate_auth_abb-emobility') !== 'true') {
                    e.preventDefault();
                    requestAccess('abb-emobility', '/work/abb-emobility');
                  }
                }}
              >
                {mobileContent}
              </Link>
            ) : (
              <Link key={c.slug} to={`/work/${c.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                {mobileContent}
              </Link>
            );
          }

          // ── DESKTOP RENDER (UNCHANGED) ─────────────────────
          const rowStyle = {
            display: 'flex', alignItems: 'center',
            padding: activeCase === c.slug ? '22px 56px 22px 72px' : '22px 56px',
            borderTop: '1px solid rgba(245,245,240,0.1)',
            textDecoration: 'none',
            opacity: activeCase && activeCase !== c.slug ? 0.14 : 1,
            transition: 'opacity 220ms ease, padding-left 220ms ease',
            position: 'relative' as const,
            zIndex: 30,
          };
          const rowInner = (
            <>
              <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 30 }} className="md:max-w-[70%]">
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 15, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeCase === c.slug ? 'rgba(245,245,240,0.7)' : 'rgba(245,245,240,0.5)', marginBottom: 6, transition: 'color 200ms ease' }}>
                  {c.client}
                </div>
                <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 'clamp(30px,3.4vw,57px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.015em', color: activeCase === c.slug ? '#fff' : '#f5f5f0', transition: 'color 200ms ease' }}>
                  {summaryForDesktop}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0, paddingLeft: 40 }}>
                {SHOW_YEAR && (
                  <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(245,245,240,0.2)' }}>{c.year}</span>
                )}
                <span style={{ fontSize: 18, color: '#f5f5f0', opacity: activeCase === c.slug ? 1 : 0, transform: activeCase === c.slug ? 'translateX(0)' : 'translateX(-8px)', transition: 'opacity 200ms ease, transform 200ms ease' }}>→</span>
              </div>
            </>
          );
          return c.slug === 'abb-emobility' ? (
            <Link
              key={c.slug}
              to="/work/abb-emobility"
              style={{ ...rowStyle, cursor: 'pointer' }}
              onMouseEnter={() => activateCase(c.slug)}
              onClick={(e) => {
                if (sessionStorage.getItem('gate_auth_abb-emobility') !== 'true') {
                  e.preventDefault();
                  requestAccess('abb-emobility', '/work/abb-emobility');
                }
              }}
            >
              {rowInner}
            </Link>
          ) : (
            <Link
              key={c.slug}
              to={`/work/${c.slug}`}
              style={rowStyle}
              onMouseEnter={() => activateCase(c.slug)}
            >
              {rowInner}
            </Link>
          );
        })}
        <div style={{ borderBottom: '1px solid rgba(245,245,240,0.1)' }} />
      </section>
      <div style={{ height: isMobile ? '18vh' : (window.innerWidth < 1024 ? '12vh' : '25vh') }} />

      {/* Other Cases snap wrapper */}
      <div
        id="other-cases-snap"
        ref={snapSectionRef}
        style={{
          height: '100svh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
      {/* Divider */}
      <div style={s.divider}>
        <div style={s.divHead}>Other Cases in Short</div>
        <div style={s.divSub} className="hidden md:block">Quick view — hover to explore</div>
      </div>

      {/* Drag to pan hint — lives outside the overflow:hidden section so it can breathe */}
      {isMobile && tappedIndex !== null && (
        <div style={{ fontSize: 13, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,245,240,1)', textAlign: 'center', paddingBottom: 10 }}>
          DRAG TO PAN, CLICK TILE TO VIEW
        </div>
      )}

      {/* Other work grid */}
      <section style={{ paddingLeft: isMobile ? 16 : 56, paddingRight: isMobile ? 16 : 56, paddingBottom: 0, position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={{ gap: 3, background: '#0a0a0a', position: 'relative', flex: 1, gridTemplateRows: `repeat(${Math.ceil(otherWork.length / cols)}, 1fr)` }}
          onMouseLeave={() => { if (!isMobile) { setActiveGrid(null); setHoveredIndex(null); } }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {otherWork.map((item, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const totalRows = Math.ceil(otherWork.length / cols);
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={i}
                style={{
                  overflow: 'hidden',
                  cursor: isMobile ? 'pointer' : 'crosshair',
                  position: 'relative',
                  background: '#1e1e1e',
                  minHeight: 0,
                }}
                onMouseEnter={() => { if (!isMobile) { setActiveGrid(item); setHoveredIndex(i); } }}
                onMouseLeave={() => { if (!isMobile) { setHoveredIndex(null); } }}
                onClick={() => handleCellTap(item, i)}
              >
                {/* Cell's own content — thumbnail, always rendered */}
                {!activeGrid && (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      ...(item.heroImage
                        ? { backgroundImage: `url(${item.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { background: item.color }),
                    }}
                  />
                )}
                {/* Dim overlay — mobile only, visible at rest, gone during tap */}
                {isMobile && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.6)',
                      zIndex: 5,
                      transition: 'opacity 200ms ease',
                      opacity: tappedIndex !== null ? 0 : 1,
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {/* Hover slideshow — spans full grid, clipped by this cell's overflow:hidden */}
                {activeGrid && (() => {
                  const imgs = getImages(activeGrid);
                  if (imgs.length === 0) return (
                    <div style={{ position: 'absolute', width: `${cols * 100}%`, height: `${totalRows * 100}%`, left: `${-col * 100}%`, top: `${-row * 100}%`, pointerEvents: 'none', background: activeGrid.color }} />
                  );
                  return imgs.map((src, imgIdx) => (
                    <div
                      key={imgIdx}
                      style={{
                        position: 'absolute',
                        width: `${cols * 100}%`,
                        height: `${totalRows * 100}%`,
                        left: `${-col * 100}%`,
                        top: `${-row * 100}%`,
                        pointerEvents: 'none',
                        backgroundImage: `url(${src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: isMobile && tappedIndex !== null
                          ? `calc(50% + ${panMap[tappedIndex] ?? 0}px) center`
                          : 'center',
                        opacity: imgIdx === slideIdx ? 1 : 0,
                        transition: 'opacity 600ms ease',
                      }}
                    />
                  ));
                })()}
                {/* Client name — mobile only, inside the tapped cell, no gradient/meta */}
                {isMobile && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: tappedIndex === i ? 1 : 0,
                      transition: 'opacity 200ms',
                      pointerEvents: 'none',
                      padding: '16px',
                    }}
                  >
                    <div style={{ fontSize: 'clamp(20px, 5vw, 32px)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: 'rgb(245,245,240)', textAlign: 'center', fontFamily: "'Clash Display', sans-serif" }}>
                      {item.client}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {/* Client name — desktop only, fixed position over the whole grid, not tied to any tile */}
          {!isMobile && activeGrid && (
            <div
              style={{
                position: 'absolute',
                left: 40,
                bottom: 40,
                zIndex: 50,
                pointerEvents: 'none',
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(48px, 6vw, 120px)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                color: 'rgb(250,250,248)',
              }}
            >
              {activeGrid.client}
            </div>
          )}
        </div>
      </section>
      </div>

      {/* ═══════════════ LET'S TALK CTA ═══════════════ */}
      <section className="py-24 md:py-32">
        <div className="text-center">
          <Link
            to="/about"
            className="group relative inline-block font-heading text-2xl md:text-4xl tracking-tight text-white hover:text-[#ECA9CC] transition-colors"
          >
            <span className="hidden md:inline absolute right-full pr-2 opacity-0 group-hover:opacity-100 animate-bounce-x transition-opacity duration-200" aria-hidden="true">→</span>
            Let's talk.
          </Link>
        </div>
      </section>
    </div>
    </Layout>
  );
}
