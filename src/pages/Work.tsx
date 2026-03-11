import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { otherWork } from '../data/otherWork';

const R2 = 'https://pub-d695aab3039745849234fbcc82eb82bb.r2.dev';
const selectedCases = [
  { slug: 'abb-emobility', client: 'ABB E-mobility',         image: `${R2}/ABB-hero.webp`,      summary: 'Shaping the brand presence for a global leader in electric vehicle charging infrastructure.',                                                                 year: 2024 },
  { slug: 'share',         client: 'Share',                  image: `${R2}/share1.webp`,        summary: 'Rethinking how a global team communicates its value — from scattered updates to a single, coherent narrative that leadership actually reads.',                   year: 2023 },
  { slug: 'wtr',           client: 'Wörner Traxler Richter', image: `${R2}/WTR-hero.webp`,      summary: "Building a digital presence for one of Germany's leading architecture practices — precise, thoughtful and earned through trust.",                              year: 2022 },
  { slug: 'man',           client: 'MAN',                    image: '',                         summary: 'Designing a brand identity for a craft workshop that needed to feel serious without being corporate, and personal without being precious.',                        year: 2022 },
  { slug: 'bmw',           client: 'BMW',                    image: `${R2}/BMW-hero.webp`,      summary: 'A campaign that cut through automotive advertising noise by saying less and showing only what matters.',                                                         year: 2021 },
  { slug: 'drivelog',      client: 'Bosch / Drivelog',       image: `${R2}/drivelog-hero.webp`, summary: 'Building a product experience that turned routine car maintenance into something drivers actually looked forward to opening.',                                   year: 2020 },
];

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

export default function Work() {
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

  const cols = isMobile ? 2 : 4;

  const hp = isMobile ? '16px' : '56px';

  const s: Record<string, React.CSSProperties> = {
    page:       { background: '#0a0a0a', color: '#f5f5f0', minHeight: '100vh', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' },
    header:     { padding: isMobile ? `80px ${hp} 40px` : `160px ${hp} 80px` },
    headline:   { fontSize: 'clamp(40px,6vw,96px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 32 },
    context:    { fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,245,240,0.45)', maxWidth: 520 },
    label:      { fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', padding: `0 ${hp}`, marginBottom: 32 },
    divider:    { padding: `96px ${hp} 72px`, textAlign: 'center' as const },
    divHead:    { fontSize: 'clamp(36px,5vw,80px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1 },
    divSub:     { fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', marginTop: 18 },
  };

  return (
    <Layout fullWidth theme={{ bg: '#0a0a0a' }}>
    <div style={{ color: '#f5f5f0', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' }}>
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
        <h1 style={s.headline}>All Work.</h1>
        <p style={s.context}>These cases were chosen because they each represent a structural decision — not just creative output. Every project here required clarity before execution could begin.</p>
      </div>

      {/* Cases list */}
      <section style={{ padding: '0 0 80px', position: 'relative' }} onMouseLeave={deactivateCase}>
        <div style={s.label}>Selected Cases</div>
        {selectedCases.map(c => (
          <Link
            key={c.slug}
            to={`/work/${c.slug}`}
            style={{
              display: 'flex', alignItems: 'center',
              padding: isMobile ? '20px 16px' : (activeCase === c.slug ? '22px 56px 22px 72px' : '22px 56px'),
              borderTop: '1px solid rgba(245,245,240,0.1)',
              textDecoration: 'none',
              opacity: activeCase && activeCase !== c.slug ? 0.14 : 1,
              transition: 'opacity 220ms ease, padding-left 220ms ease',
              position: 'relative',
            }}
            onMouseEnter={() => activateCase(c.slug)}
          >
            {isMobile && c.image && (
              <img
                src={c.image}
                alt={c.client}
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 4, flexShrink: 0, marginRight: 16 }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 30 }} className="md:max-w-[70%]">
              <div style={{ fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: activeCase === c.slug ? 'rgba(245,245,240,0.58)' : 'rgba(245,245,240,0.38)', marginBottom: 6, transition: 'color 200ms ease' }}>
                {c.client}
              </div>
              <div style={{ fontSize: 'clamp(18px,2vw,34px)', fontWeight: 300, lineHeight: 1.15, letterSpacing: '-0.015em', color: activeCase === c.slug ? '#fff' : '#f5f5f0', transition: 'color 200ms ease' }}>
                {c.summary}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0, paddingLeft: 40 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(245,245,240,0.2)' }}>{c.year}</span>
              <span style={{ fontSize: 18, color: '#f5f5f0', opacity: activeCase === c.slug ? 1 : 0, transform: activeCase === c.slug ? 'translateX(0)' : 'translateX(-8px)', transition: 'opacity 200ms ease, transform 200ms ease' }}>→</span>
            </div>
          </Link>
        ))}
        <div style={{ borderBottom: '1px solid rgba(245,245,240,0.1)' }} />
      </section>

      {/* Divider */}
      <div style={s.divider}>
        <div style={s.divHead}>Other Cases in Short</div>
        <div style={s.divSub} className="hidden md:block">Quick view — hover to explore</div>
      </div>

      {/* Other work grid */}
      <section style={{ paddingLeft: isMobile ? 16 : 56, paddingRight: isMobile ? 16 : 56, paddingBottom: 120, position: 'relative' }}>
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 3, background: '#0a0a0a', position: 'relative' }}
          onMouseLeave={() => { setActiveGrid(null); setHoveredIndex(null); }}
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
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  cursor: 'crosshair',
                  position: 'relative',
                  background: '#1e1e1e',
                  opacity: activeGrid && activeGrid !== item ? 0.35 : 1,
                  transition: 'opacity 200ms ease',
                }}
                onMouseEnter={() => { setActiveGrid(item); setHoveredIndex(i); }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Cell's own content — fades out on any hover */}
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
                {/* Hover image — spans full grid, clipped by this cell's overflow:hidden */}
                {activeGrid && (
                  <div
                    style={{
                      position: 'absolute',
                      width: `${cols * 100}%`,
                      height: `${totalRows * 100}%`,
                      left: `${-col * 100}%`,
                      top: `${-row * 100}%`,
                      pointerEvents: 'none',
                      ...(activeGrid.heroImage
                        ? { backgroundImage: `url(${activeGrid.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { background: activeGrid.color }),
                    }}
                  />
                )}
                {/* Per-item text overlay — inside this cell */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 200ms',
                    pointerEvents: 'none',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                    padding: '16px',
                  }}
                >
                  <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(245,245,240,0.6)', marginBottom: '8px', textTransform: 'uppercase', fontFamily: "'Clash Display', sans-serif", fontWeight: 300 }}>
                    {item.client}
                  </div>
                  <div style={{ fontSize: 'clamp(18px, 2vw, 28px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: 'rgb(245,245,240)', textAlign: 'center', fontFamily: "'Clash Display', sans-serif" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(245,245,240,0.4)', marginTop: '8px', letterSpacing: '0.05em' }}>
                    {item.what} · {item.year}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ LET'S TALK CTA ═══════════════ */}
      <section className="py-24 md:py-32">
        <div className="text-center">
          <Link
            to="/contact"
            className="font-heading text-2xl md:text-4xl tracking-tight text-white hover:opacity-60 transition-opacity"
          >
            Let's talk.
          </Link>
        </div>
      </section>
    </div>
    </Layout>
  );
}
