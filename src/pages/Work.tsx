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

  const s: Record<string, React.CSSProperties> = {
    page:       { background: '#0a0a0a', color: '#f5f5f0', minHeight: '100vh', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", WebkitFontSmoothing: 'antialiased', overflowX: 'hidden' },
    header:     { padding: '160px 56px 80px' },
    headline:   { fontSize: 'clamp(40px,6vw,96px)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 32 },
    context:    { fontSize: 'clamp(14px,1.2vw,17px)', fontWeight: 300, lineHeight: 1.7, color: 'rgba(245,245,240,0.45)', maxWidth: 520 },
    label:      { fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', padding: '0 56px', marginBottom: 32 },
    divider:    { padding: '96px 56px 72px', textAlign: 'center' as const },
    divHead:    { fontSize: 'clamp(36px,5vw,80px)', fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1 },
    divSub:     { fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' as const, color: 'rgba(245,245,240,0.28)', marginTop: 18 },
  };

  return (
    <div style={s.page}>
      {/* Fixed hover image — cases list */}
      <div
        ref={hoverWrapRef}
        style={{ position: 'fixed', right: 0, top: 0, width: '38vw', pointerEvents: 'none', zIndex: 50, opacity: 0, transform: 'translateY(0px) translateX(100%)', willChange: 'transform, opacity' }}
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
            }}
            onMouseEnter={() => activateCase(c.slug)}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: activeCase === c.slug ? 'rgba(245,245,240,0.58)' : 'rgba(245,245,240,0.38)', marginBottom: 6, transition: 'color 200ms ease' }}>
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
        <div style={s.divSub}>Quick view — hover to explore</div>
      </div>

      {/* Other work grid */}
      <section style={{ padding: '0 56px 120px', position: 'relative' }}>
        <div style={{ position: 'relative' }}>
          {/* Hover bg — behind grid (z-index 1), grid lines stay on top (z-index 2) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden', opacity: activeGrid ? 1 : 0, transition: 'opacity 200ms ease' }}>
            {activeGrid?.heroImage
              ? <img src={activeGrid.heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, display: 'block' }} />
              : <div style={{ position: 'absolute', inset: 0, background: activeGrid?.color || '#1e1e1e' }} />
            }
          </div>
          {/* Grid — z-index 2 so gap lines sit on top of hover bg */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 3, background: activeGrid ? 'transparent' : '#0a0a0a', position: 'relative', zIndex: 2 }}
            onMouseLeave={() => setActiveGrid(null)}
          >
            {otherWork.map((item, i) => (
              <div
                key={i}
                style={{ aspectRatio: '16/9', overflow: 'hidden', cursor: 'crosshair', position: 'relative', opacity: activeGrid && activeGrid !== item ? 0.28 : 1, transition: 'opacity 200ms ease' }}
                onMouseEnter={() => setActiveGrid(item)}
              >
                {item.heroImage
                  ? <img src={item.heroImage} alt={item.client} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: activeGrid ? 0 : 1, transition: 'opacity 200ms ease' }} />
                  : <div style={{ width: '100%', height: '100%', background: item.color, opacity: activeGrid ? 0 : 1, transition: 'opacity 200ms ease' }} />
                }
              </div>
            ))}
          </div>
        </div>
        {/* Info — fixed to viewport bottom */}
        {activeGrid && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, pointerEvents: 'none' }}>
            <div style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)', padding: '80px 56px 48px', position: 'relative' }}>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.5)', marginBottom: 8 }}>{activeGrid.client}</div>
              <div style={{ fontSize: 'clamp(28px,3.5vw,56px)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#f5f5f0', marginBottom: 10 }}>{activeGrid.title}</div>
              <div style={{ fontSize: 12, letterSpacing: '0.06em', color: 'rgba(245,245,240,0.4)' }}>{activeGrid.what}</div>
              <div style={{ position: 'absolute', bottom: 48, right: 56, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(245,245,240,0.35)' }}>{activeGrid.year}</div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
