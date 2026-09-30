import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../ThemeContext'
import { WORK_IMG } from '../lib/media'
import profilePhoto from '@/imports/WhatsApp_Image_2026-08-20_at_09.32.58.jpeg'

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function clamp01(v: number) { return Math.max(0, Math.min(1, v)) }

const NAV_H = 72

const services = [
  { num: '1', title: 'UI/UX DESIGN',   body: 'High-fidelity mockups, visual hierarchy, responsive layouts, and accessibility-first digital experiences.' },
  { num: '2', title: 'GRAPHIC DESIGN', body: 'Brand identities, print materials, marketing collateral, and visual communication that resonates.' },
  { num: '3', title: 'WEB DESIGN',     body: 'Pixel-perfect web interfaces, landing pages, and design systems built for the modern web.' },
  { num: '4', title: 'BRANDING',       body: 'Logo design, brand guidelines, typography systems, and cohesive visual identities from scratch.' },
]

export default function Services() {
  const isDark = useTheme()
  const [open, setOpen] = useState<number | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const rafRef      = useRef(0)
  const [progress, setProgress] = useState(0)
  const [vp, setVp] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth  : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  })

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Same live-measurement pattern as Hero — never a cached position, so
  // the pin's release point and the animation's progress never drift
  // out of sync with each other.
  useEffect(() => {
    const tick = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      setProgress(clamp01(-rect.top / scrollable))
    }
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('scroll', onScroll, { passive: true })
    tick()
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const reducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

  const raw = reducedMotion ? 0 : progress
  const p   = easeInOut(raw)
  const isMobile = vp.w < 680

  // ── Image geometry — right side of the viewport, matching where the
  //    work image landed coming in from Hero ───────────────────────────
  const photoW    = Math.max(220, vp.w * (isMobile ? 0.55 : 0.26))
  const photoH    = Math.max(260, vp.h * (isMobile ? 0.45 : 0.58))
  const photoLeft = vp.w * (isMobile ? 0.5 - 0.275 : 0.66) - (isMobile ? photoW / 2 : 0)
  const photoTop  = Math.max(NAV_H + 40, (vp.h - photoH) / 2)

  // ── Same animation as Hero: work image travels a little further down
  //    and flips back into the portrait (genuine 3D rotateY through
  //    edge-on, not a wipe), then everything fades together to reveal
  //    About — matching Hero's exact mechanism ─────────────────────────
  const MOVE_Y = Math.min(100, photoH * 0.22)
  const moveT  = clamp01(p / 0.75)
  const moveY  = moveT * MOVE_Y

  const flipT     = easeInOut(clamp01((p - 0.30) / 0.15))
  const fadeOut   = clamp01((p - 0.75) / 0.25)
  const layerOpacity = reducedMotion ? 1 : (1 - fadeOut)

  const TILT_REST = 15
  const flipAngle = TILT_REST + flipT * 180

  const bg      = isDark ? '#121116' : '#F4F3F9'
  const fg      = isDark ? '#F8F7FC' : '#121116'
  const muted   = isDark ? '#9B8DFF' : '#6347D8'
  const border  = isDark ? '#17152B' : '#C5C8D0'
  const chevron = isDark ? '#9B8DFF' : '#9B8DFF'

  const card = (opacity: number): React.CSSProperties => ({
    position: 'absolute',
    top: photoTop, left: photoLeft, width: photoW, height: photoH,
    zIndex: 20,
    opacity,
    transform: `translate3d(0, ${moveY}px, 0)`,
    willChange: 'opacity, transform',
  })

  return (
    <section
      ref={sectionRef}
      id="services"
      style={reducedMotion
        ? { position: 'relative' }
        : { height: '200vh', marginTop: '-100vh', position: 'relative', zIndex: 30 }
      }
    >
      <div
        className={reducedMotion ? 'relative overflow-hidden' : 'sticky top-0 overflow-hidden'}
        style={{ height: '100vh', borderTop: `1px solid ${border}`, zIndex: 30 }}
      >
        {/* Background layer — fades out in sync with fadeOut, revealing
            About underneath instead of permanently covering it */}
        <div className="absolute inset-0" style={{ background: bg, opacity: layerOpacity, zIndex: 0 }} />
        <div
          className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-24 h-full"
          style={{ opacity: layerOpacity }}
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 h-full">

            {/* Left: heading + accordion — static, unanimated */}
            <div className="flex-1 min-w-0">
              <h2
                className="font-display font-black leading-none tracking-tighter mb-5"
                style={{ fontSize: 'clamp(2.2rem, 5.5vw, 5rem)', color: fg }}
              >
                WHAT I CAN DO FOR YOU
              </h2>
              <p className="font-body text-[13px] leading-relaxed mb-10 max-w-md" style={{ color: muted }}>
                {"As a UI/UX designer, I am a visual problem-solver, crafting experiences that connect deeply and spark creativity."}
              </p>

              <div style={{ borderTop: `1px solid ${border}` }}>
                {services.map((svc, i) => (
                  <div key={svc.num} style={{ borderBottom: `1px solid ${border}` }}>
                    <button
                      className="w-full flex items-center justify-between py-5 text-left group"
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span
                        className="font-display font-black text-[17px] md:text-[20px] tracking-tight transition-colors duration-200 group-hover:text-[#6347D8]"
                        style={{ color: fg }}
                      >
                        {svc.num}. {svc.title}
                      </span>
                      <svg
                        className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 16 16"
                        style={{ color: chevron }}
                      >
                        <path d="M3 10l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open === i ? '120px' : '0px' }}>
                      <p className="font-body text-[13px] leading-relaxed pb-5 pr-8" style={{ color: muted }}>{svc.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: reserved width so the list column doesn't expand
                full-bleed — the actual traveling image is absolutely
                positioned over this area */}
            {!isMobile && <div className="lg:w-[42%] flex-shrink-0" />}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            The image — same genuine 3D card flip as Hero, reversed: the
            work image sits on the front face at rest, and the flip
            reveals the portrait on the back face at the same tilt once
            it rotates through edge-on at the movement's midpoint.
        ═══════════════════════════════════════════════════════════ */}
        <div style={card(layerOpacity)}>
          <div style={{ width: '100%', height: '100%', perspective: '1400px' }}>
            <div
              style={{
                width: '100%', height: '100%', position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${flipAngle}deg)`,
              }}
            >
              {/* Front face — work image */}
              <div
                style={{
                  position: 'absolute', inset: 0, borderRadius: 10, overflow: 'hidden',
                  backfaceVisibility: 'hidden', transform: 'rotateY(0deg)',
                }}
              >
                <img
                  src={WORK_IMG}
                  alt="UI/UX design work"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(18,17,22,0.35) 0%, transparent 60%)' }} />
              </div>

              {/* Back face — portrait, revealed once the flip passes edge-on */}
              <div
                style={{
                  position: 'absolute', inset: 0, borderRadius: 10, overflow: 'hidden',
                  backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Priyadharshini R"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block' }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(18,17,22,0.4) 0%, transparent 55%)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
