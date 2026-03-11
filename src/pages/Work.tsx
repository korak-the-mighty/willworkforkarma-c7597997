import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { cases } from '../data/cases';
import { otherWork } from '../data/otherWork';

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

  const s: Record<string, React.CSSProperties> = {
    page:       { background: '#0a0a0a', color: '#f5f5f0', minHeight: '100vh', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' },
    header:     { padding: '160px 56px 80px' },
    headline:   { fontSize: 'clamp(40px,6vw,96px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 32 },
    context:    { fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,245,240,0.45)', maxWidth: 520 },
    label:      { fontFamily: "'Clash Display', sans-serif", fontSize: 13, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', padding: '0 56px', marginBottom: 32 },
    divider:    { padding: '96px 56px 72px', textAlign: 'center' as const },
    divHead:    { fontSize: 'clamp(36px,5vw,80px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1 },
    divSub:     { fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', marginTop: 18 },
  };

  return (
    <div style={s.page}>
      {/* Fixed hover image — cases list (hidden on mobile) */}
      {!isMobile && (
        <div
          ref={hoverWrapRef}
          style={{ position: 'fixed', right: 0, top: 0, width: '38vw', pointerEvents: 'none', zIndex: 20, opacity: 0, transform: 'translateY(0px) translateX(100%)', willChange: 'transform, opacity' }}
        >
          <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
            {cases.map(c => (
              <div key={c.slug} style={{ position: 'absolute', inset: 0, opacity: activeCase === c.slug ? 1 : 0, transition: 'opacity 160ms ease' }}>
                {c.heroMedia.src
                  ? <img src={c.heroMedia.src} alt={c.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
        {cases.map(c => (
          <Link
            key={c.slug}
            to={`/work/${c.slug}`}
            style={{
              display: 'flex', alignItems: 'center',
              padding: activeCase === c.slug ? '22px 56px 22px 72px' : '22px 56px',
              borderTop: '1px solid rgba(245,245,240,0.1)',
              textDecoration: 'none',
              opacity: activeCase && activeCase !== c.slug ? 0.14 : 1,
              transition: 'opacity 220ms ease, padding-left 220ms ease',
              position: 'relative',
            }}
            onMouseEnter={() => activateCase(c.slug)}
          >
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
      <section style={{ padding: '0 56px 120px', position: 'relative' }}>
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
    </div>
  );
}
