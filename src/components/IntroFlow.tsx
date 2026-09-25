import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../ThemeContext'
import profilePhoto from '@/imports/WhatsApp_Image_2026-08-20_at_09.32.58.jpeg'
import { WORK_IMG } from '../lib/media'

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

const NAV_H = 72
const CHAR_W = 0.68
const SIDE_PAD = 20

const services = [
  {
    num: '1',
    title: 'UI/UX DESIGN',
    body: 'High-fidelity mockups, visual hierarchy, responsive layouts, and accessibility-first digital experiences.',
  },
  {
    num: '2',
    title: 'GRAPHIC DESIGN',
    body: 'Brand identities, print materials, marketing collateral, and visual communication that resonates.',
  },
  {
    num: '3',
    title: 'WEB DESIGN',
    body: 'Pixel-perfect web interfaces, landing pages, and design systems built for the modern web.',
  },
  {
    num: '4',
    title: 'BRANDING',
    body: 'Logo design, brand guidelines, typography systems, and cohesive visual identities from scratch.',
  },
]

const stats = [
  { value: '2', label: 'Years of Experience' },
  { value: '2+', label: 'Completed Projects' },
]

const icons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  behance: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M7.8 10.5c.8 0 1.4-.6 1.4-1.4S8.6 7.8 7.8 7.8H4v2.7h3.8zm.3 2.7H4V16h4.1c.9 0 1.6-.7 1.6-1.6 0-.8-.7-1.2-1.6-1.2zM22 9.5h-5v1.2h5V9.5zM0 18V6h8.3c2 0 3.5 1.4 3.5 3.2 0 1-.5 1.9-1.3 2.4 1.1.4 1.9 1.5 1.9 2.7C12.4 16.3 11 18 9 18H0zm15.5-1.1c-2.2 0-3.5-1.4-3.5-3.4s1.3-3.4 3.5-3.4 3.5 1.3 3.5 3.1v.7h-5.1c.1.8.8 1.5 1.6 1.5.6 0 1.1-.3 1.3-.7h2c-.5 1.3-1.7 2.2-3.3 2.2z" />
    </svg>
  ),
  dribbble: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
      <circle cx="12" cy="12" r="10" />
      <path d="M6 4.7c2.7 3.4 4.3 7.8 4.3 12.5M18.1 6.8a10 10 0 0 0-12.8 3.7M21.8 11.5a10 10 0 0 0-8.1 8.3" />
    </svg>
  ),
}

interface IntroFlowProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function IntroFlow({ isDark, onToggleTheme }: IntroFlowProps) {
  const isDarkContext = useTheme()
  const dark = isDark ?? isDarkContext

  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [openService, setOpenService] = useState<number | null>(null)

  const [vp, setVp] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1440,
    h: typeof window !== 'undefined' ? window.innerHeight : 900,
  })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const tick = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) {
        setProgress(0)
        return
      }
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

  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // Colors
  const fg = dark ? '#EEEDF8' : '#0E0F12'
  const muted = dark ? '#B9B7D1' : '#5E6170'
  const border = dark ? '#212136' : '#C5C8D0'
  const bg = dark ? '#0B0B12' : '#F0F1F3'
  const chevron = dark ? '#B9B7D1' : '#5E6170'
  const accent = dark ? '#A78BFA' : '#7C3AED'

  const isMobile = vp.w < 768

  // ── Card dimensions ──────────────────────────────────────────────────────────
  const photoW = Math.max(170, Math.min(425, vp.w * (isMobile ? 0.66 : 0.255)))
  const photoH = Math.max(250, Math.min(600, vp.h * (isMobile ? 0.47 : 0.66)))

  // ── Hero card position (centered) ───────────────────────────────────────────
  const photoLeftHero = (vp.w - photoW) / 2
  const photoTopHero = Math.max(NAV_H + 16, (vp.h - photoH) / 2)
  const midY = photoTopHero + photoH / 2

  // ── Services & About card position (right column aligned with 1440px container) ──
  const containerW = Math.min(vp.w, 1440)
  const padX = isMobile ? 24 : vp.w >= 768 ? 56 : 24
  const containerRight = (vp.w + containerW) / 2 - padX
  const photoLeftServices = isMobile ? (vp.w - photoW) / 2 : containerRight - photoW
  const photoTopServices = isMobile ? 86 : Math.max(NAV_H + 24, (vp.h - photoH) / 2)

  // ── Hero Typography sizing ──────────────────────────────────────────────────
  const rPanel = (vp.w - photoW) / 2 - 2 - SIDE_PAD
  const lPanel = photoLeftHero - 2 - SIDE_PAD
  const wordPx = Math.min(
    rPanel / (8 * CHAR_W),
    lPanel / (5.2 * CHAR_W),
    photoH * 0.48,
    188
  )

  // ── Timeline calculations ───────────────────────────────────────────────────
  // Total progress is 0.0 -> 1.0
  // Stage 1 (Hero): 0.00 -> 0.12 (at rest)
  // Transition 1 (Hero -> Services): 0.12 -> 0.46
  //   - Card glides right across screen & flips 3D from portrait -> work image.
  //   - ZERO FADING!
  // Stage 2 (Services): 0.46 -> 0.58 (at rest with WORK_IMG)
  // Transition 2 (Services -> About Me): 0.58 -> 0.90
  //   - Card flips 3D back from work image -> portrait photo.
  //   - ZERO FADING!
  // Stage 3 (About Me): 0.90 -> 1.00 (at rest with portrait)
  // > 1.00: Naturally unpins and scrolls to Work section
  const p = reducedMotion ? 0 : progress

  // Transition 1: Hero to Services
  const t1 = easeInOut(clamp01((p - 0.12) / 0.34))
  // Transition 2: Services to About
  const t2 = easeInOut(clamp01((p - 0.58) / 0.32))

  // ── 3D Card transforms (Continuous, NEVER FADING!) ────────────────────────────
  // Rotation:
  // Starts at 15deg (tilt).
  // t1: sweeps from 15deg -> 195deg (reveals back face: WORK_IMG).
  // t2: sweeps from 195deg -> 375deg (reveals front face: portraitPhoto).
  const cardAngle = 15 + t1 * 180 + t2 * 180

  // Position:
  // Starts at Hero (centered).
  // Transitions to Services (right side).
  // Stays on right side through About Me.
  const currentCardX = lerp(photoLeftHero, photoLeftServices, t1)
  const currentCardY = lerp(photoTopHero, photoTopServices, t1)

  // ── Stage Opacities and Translations ─────────────────────────────────────────
  // Hero texts
  const heroTranslateY = -t1 * 100
  const heroOpacity = clamp01(1 - t1 * 1.5)

  // Services texts
  const servicesTranslateY = lerp(80, 0, t1) - t2 * 100
  const servicesOpacity =
    p < 0.12 ? 0 : p < 0.58 ? clamp01((p - 0.14) / 0.20) : clamp01(1 - (p - 0.60) / 0.20)

  // About texts
  const aboutTranslateY = lerp(80, 0, t2)
  const aboutOpacity = p < 0.58 ? 0 : clamp01((p - 0.62) / 0.22)

  // "Hi" button in Hero fades out cleanly as transition begins
  const hiButtonOpacity = clamp01(1 - t1 * 2.5) * (mounted ? 1 : 0)

  if (reducedMotion) {
    // Accessible fallback: sequential static sections
    return (
      <div style={{ background: bg }}>
        {/* Hero Static */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 md:px-14 py-24">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col items-center text-center">
            <span className="font-display font-bold tracking-[0.2em] text-[11px] mb-4" style={{ color: muted }}>
              PRIYADHARSHINI R
            </span>
            <h1 className="font-display font-black text-5xl md:text-8xl tracking-tighter mb-8" style={{ color: fg }}>
              UI/UX DESIGNER
            </h1>
            <div className="w-64 h-80 rounded-xl overflow-hidden mb-8 shadow-2xl">
              <img src={profilePhoto} alt="Priyadharshini R" className="w-full h-full object-cover" />
            </div>
            <p className="font-body text-sm max-w-md mb-8" style={{ color: muted }}>
              {"I'm a Chennai-based UI/UX designer crafting intuitive, visually refined digital experiences."}
            </p>
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark/light mode"
              className="flex items-center rounded-full border cursor-pointer"
              style={{ width: 44, height: 24, padding: '2px', background: dark ? '#181827' : '#C8CBD4', borderColor: border }}
            >
              <div className="rounded-full" style={{ width: 20, height: 20, background: '#A78BFA' }} />
            </button>
          </div>
        </section>

        {/* Services Static */}
        <section id="services" className="relative border-t py-24 px-6 md:px-14" style={{ borderColor: border }}>
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter mb-4" style={{ color: fg }}>
                WHAT I CAN DO FOR YOU
              </h2>
              <div style={{ borderTop: `1px solid ${border}` }} className="mt-8">
                {services.map((svc, i) => (
                  <div key={svc.num} style={{ borderBottom: `1px solid ${border}` }}>
                    <button
                      className="w-full flex items-center justify-between py-5 text-left group"
                      onClick={() => setOpenService(openService === i ? null : i)}
                    >
                      <span className="font-display font-black text-lg md:text-xl" style={{ color: fg }}>
                        {svc.num}. {svc.title}
                      </span>
                    </button>
                    {openService === i && <p className="font-body text-sm pb-5" style={{ color: muted }}>{svc.body}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-72 h-96 rounded-xl overflow-hidden shadow-2xl">
              <img src={WORK_IMG} alt="Design Work" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* About Static */}
        <section id="about" className="relative border-t py-24 px-6 md:px-14" style={{ borderColor: border }}>
          <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 flex flex-col gap-6">
              <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter" style={{ color: fg }}>
                ABOUT ME
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: muted }}>
                {"Hi, I'm Priyadharshini — a Chennai-based UI/UX designer passionate about crafting meaningful and impactful digital experiences that connect deeply with users."}
              </p>
            </div>
            <div className="w-72 h-96 rounded-xl overflow-hidden shadow-2xl">
              <img src={profilePhoto} alt="Priyadharshini R" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '330vh', background: bg }}>
      {/* ── Hidden Nav Anchors at accurate scroll milestones ─────────────────── */}
      <div id="hero" className="absolute top-0 pointer-events-none" />
      <div id="services" className="absolute pointer-events-none" style={{ top: '48%' }} />
      <div id="about" className="absolute pointer-events-none" style={{ top: '63%' }} />

      {/* ── Sticky Viewport (100vh) ──────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ zIndex: 20 }}>
        {/* Background base */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: bg }} />

        {/* ═════════════════════════════════════════════════════════════════════
            STAGE 1: HERO CONTENT
        ═════════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none select-none transition-opacity duration-300"
          style={{
            opacity: heroOpacity,
            transform: `translate3d(0, ${heroTranslateY}px, 0)`,
            pointerEvents: p < 0.25 ? 'auto' : 'none',
            zIndex: 10,
          }}
        >
          {/* Subtitle Name */}
          <div
            className="hero-name absolute"
            style={{
              top: isMobile ? '5.5rem' : midY - photoH * 0.15,
              left: isMobile ? '50%' : 48,
              transform: isMobile ? 'translateX(-50%)' : undefined,
              fontSize: 'clamp(0.95rem, 1.45vw, 1.1rem)',
              color: fg,
            }}
          >
            PRIYADHARSHINI R
          </div>

          {/* LEFT: editorial display */}
          {!isMobile && (
            <div
              className="absolute flex items-center"
              style={{
                top: photoTopHero,
                left: 0,
                width: photoLeftHero - 2,
                height: photoH,
                justifyContent: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <span
                className="hero-display leading-[0.78]"
                style={{ fontSize: wordPx, whiteSpace: 'nowrap', paddingRight: SIDE_PAD, color: fg }}
              >
                UI/UX
              </span>
            </div>
          )}

          {/* RIGHT: editorial display */}
          {!isMobile && (
            <div
              className="absolute flex items-center"
              style={{
                top: photoTopHero,
                left: photoLeftHero + photoW + 2,
                right: 0,
                height: photoH,
                justifyContent: 'flex-start',
                overflow: 'hidden',
              }}
            >
              <span
                className="hero-display leading-[0.78]"
                style={{ fontSize: wordPx, whiteSpace: 'nowrap', paddingLeft: SIDE_PAD, color: fg }}
              >
                DESIGNER
              </span>
            </div>
          )}

          {/* DESCRIPTION */}
          {!isMobile && (
            <div
              className="absolute"
              style={{
                top: midY + photoH * 0.13,
                right: 48,
                maxWidth: 210,
                textAlign: 'right',
              }}
            >
              <p className="font-body text-[14px] leading-relaxed" style={{ color: fg }}>
                {"I'm a Chennai-based UI/UX designer crafting intuitive, visually refined digital experiences."}
              </p>
            </div>
          )}

          {/* MOBILE stacked title */}
          {isMobile && (
            <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center text-center">
              <h1
                className="hero-display leading-none"
                style={{ fontSize: 'clamp(2.8rem, 15vw, 5.5rem)', color: fg }}
              >
                UI/UX<br />DESIGNER
              </h1>
            </div>
          )}

          {/* SCROLL HINT + THEME TOGGLE */}
          <div
            className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-300"
            style={{ opacity: clamp01(1 - p * 8) }}
          >
            <span className="font-mono text-[9px] tracking-[0.22em] hidden md:block" style={{ color: muted }}>
              SCROLL TO EXPLORE
            </span>
            <button
              onClick={onToggleTheme}
              aria-label="Toggle dark/light mode"
              className="flex items-center rounded-full border transition-all duration-300 cursor-pointer flex-shrink-0"
              style={{
                width: 44,
                height: 24,
                padding: '2px',
                background: dark ? '#181827' : '#C8CBD4',
                borderColor: border,
                justifyContent: dark ? 'flex-start' : 'flex-end',
              }}
            >
              <div className="rounded-full flex-shrink-0" style={{ width: 20, height: 20, background: '#A78BFA' }} />
            </button>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            STAGE 2: SERVICES ("WHAT I CAN DO FOR YOU")
        ═════════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            opacity: servicesOpacity,
            transform: `translate3d(0, ${servicesTranslateY}px, 0)`,
            pointerEvents: p >= 0.32 && p <= 0.72 ? 'auto' : 'none',
            zIndex: 12,
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-14 w-full">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Left Column: Heading + Accordion */}
              <div className="flex-1 min-w-0 w-full">
                <h2
                  className="font-display font-black leading-none tracking-tighter mb-4"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 4.8rem)', color: fg }}
                >
                  WHAT I CAN DO FOR YOU
                </h2>
                <p className="font-body text-[13px] leading-relaxed mb-8 max-w-md" style={{ color: muted }}>
                  {"As a UI/UX designer, I am a visual problem-solver, crafting experiences that connect deeply and spark creativity."}
                </p>

                <div style={{ borderTop: `1px solid ${border}` }}>
                  {services.map((svc, i) => (
                    <div key={svc.num} style={{ borderBottom: `1px solid ${border}` }}>
                      <button
                        className="w-full flex items-center justify-between py-4 md:py-5 text-left group cursor-pointer"
                        onClick={() => setOpenService(openService === i ? null : i)}
                      >
                        <span
                          className="font-display font-black text-[16px] md:text-[19px] tracking-tight transition-colors duration-200 group-hover:text-[#A78BFA]"
                          style={{ color: fg }}
                        >
                          {svc.num}. {svc.title}
                        </span>
                        <svg
                          className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform duration-300 ${openService === i ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 16 16"
                          style={{ color: chevron }}
                        >
                          <path
                            d="M3 10l5-5 5 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: openService === i ? '120px' : '0px' }}
                      >
                        <p className="font-body text-[13px] leading-relaxed pb-4 pr-6" style={{ color: muted }}>
                          {svc.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Reserved space for the traveling 3D card */}
              {!isMobile && <div style={{ width: photoW, flexShrink: 0 }} />}
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            STAGE 3: ABOUT ME
        ═════════════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            opacity: aboutOpacity,
            transform: `translate3d(0, ${aboutTranslateY}px, 0)`,
            pointerEvents: p >= 0.70 ? 'auto' : 'none',
            zIndex: 14,
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 md:px-14 w-full">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Left Column: Heading, Bio, Stats, Contact, Socials */}
              <div className="flex-1 min-w-0 flex flex-col gap-6 md:gap-8">
                <div>
                  <h2
                    className="font-display font-black leading-none tracking-tighter mb-4"
                    style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.2rem)', color: fg }}
                  >
                    ABOUT ME
                  </h2>
                  <p className="font-body text-[14px] leading-relaxed max-w-lg" style={{ color: muted }}>
                    {"Hi, I'm Priyadharshini — a Chennai-based UI/UX designer passionate about crafting meaningful and impactful digital experiences that connect deeply with users."}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex gap-10 flex-wrap">
                  {stats.map(({ value, label }) => (
                    <div key={label}>
                      <p
                        className="font-display font-black leading-none tracking-tighter"
                        style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: accent }}
                      >
                        {value}
                      </p>
                      <p className="font-body text-[12px] mt-1" style={{ color: muted }}>
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                  <div>
                    <p className="font-body text-[12px] mb-1" style={{ color: muted }}>Call Today :</p>
                    <a
                      href="tel:+919500017718"
                      className="font-body text-[13px] hover:text-[#A78BFA] transition-colors"
                      style={{ color: fg }}
                    >
                      +91 95000 17718
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-[12px] mb-1" style={{ color: muted }}>Email :</p>
                    <a
                      href="mailto:priyadharshinirajkumar87@gmail.com"
                      className="font-body text-[13px] hover:text-[#A78BFA] transition-colors"
                      style={{ color: fg }}
                    >
                      priyadharshinirajkumar87@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-4">
                  {[
                    { icon: icons.github, href: 'https://github.com/priyadharshinirajkumar197', label: 'GitHub' },
                    { icon: icons.linkedin, href: 'https://www.linkedin.com/in/priyadharshinirajkumar197', label: 'LinkedIn' },
                    { icon: icons.behance, href: 'https://www.behance.net/priyadharshinir22', label: 'Behance' },
                    { icon: icons.dribbble, href: 'https://dribbble.com/priyadharshinirajkumar87', label: 'Dribbble' },
                  ].map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="hover:text-[#A78BFA] transition-colors duration-200"
                      style={{ color: muted }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right Column: Reserved space for the traveling 3D card */}
              {!isMobile && <div style={{ width: photoW, flexShrink: 0 }} />}
            </div>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════════
            THE CONTINUOUS 3D PERSISTENT CARD (NEVER FADES!)
            - Hero: Centered with portrait photo facing forward.
            - Scroll into Services: Glides right across screen & rotates 3D
              to reveal WORK_IMG on the back face.
            - Scroll into About Me: Rotates 3D back from WORK_IMG to portraitPhoto.
            - ZERO opacity fading in between!
        ═════════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: photoW,
            height: photoH,
            transform: `translate3d(${currentCardX}px, ${currentCardY}px, 0)`,
            zIndex: 30,
            opacity: mounted ? 1 : 0,
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        >
          <div style={{ width: '100%', height: '100%', perspective: '1400px' }}>
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${cardAngle}deg)`,
                boxShadow: dark
                  ? '0 24px 60px -12px rgba(0,0,0,0.7), 0 0 30px rgba(167,139,250,0.12)'
                  : '0 24px 60px -12px rgba(0,0,0,0.18)',
                borderRadius: 12,
              }}
            >
              {/* Front Face: Portrait Photo ("my img") */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 12,
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(0deg)',
                  background: dark ? '#13131F' : '#E2DFF5',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Priyadharshini R"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 10%',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: dark
                      ? 'linear-gradient(to bottom, transparent 55%, rgba(11,11,18,0.45) 100%)'
                      : 'linear-gradient(to bottom, transparent 55%, rgba(240,241,243,0.30) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Back Face: Work Image (Revealed in "What I can do for you") */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 12,
                  overflow: 'hidden',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: dark ? '#13131F' : '#E2DFF5',
                }}
              >
                <img
                  src={WORK_IMG}
                  alt="UI/UX design work"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    display: 'block',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: dark
                      ? 'linear-gradient(to bottom, transparent 40%, rgba(11,11,18,0.5) 100%)'
                      : 'linear-gradient(to bottom, transparent 40%, rgba(240,241,243,0.35) 100%)',
                    pointerEvents: 'none',
                  }}
                />
                <div
                  className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em]"
                  style={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  DESIGN WORK
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HI BUTTON (Accompanying the card in Hero) ────────────────────── */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
            className="group flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer select-none"
          style={{
            position: 'absolute',
            top: currentCardY + photoH - 54,
            left: currentCardX - 38,
            zIndex: 32,
            width: 112,
            height: 112,
            background: accent,
            boxShadow: '0 12px 34px rgba(0,0,0,0.28)',
            opacity: hiButtonOpacity,
            pointerEvents: hiButtonOpacity > 0.3 ? 'auto' : 'none',
          }}
        >
          <span className="font-display font-bold text-[#151515] text-[30px] leading-none" aria-hidden="true">Hi</span>
        </a>
      </div>
    </div>
  )
}
