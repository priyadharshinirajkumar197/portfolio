import { useEffect, useRef, useState } from 'react'
import profilePhoto from '@/imports/profile.png'
import { WORK_IMG } from '../lib/media'

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function clamp01(v: number) { return Math.max(0, Math.min(1, v)) }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

const NAV_H    = 72
const CHAR_W   = 0.64   // Outfit Black uppercase width factor
const SIDE_PAD = 20     // px padding between panel edge and word

interface HeroProps {
  isDark: boolean
  onToggleTheme: () => void
}

export default function Hero({ isDark, onToggleTheme }: HeroProps) {
  const sectionRef  = useRef<HTMLElement>(null)
  const rafRef      = useRef(0)
  const [progress, setProgress]   = useState(0)
  const [mounted, setMounted]     = useState(false)
  const [vp, setVp] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth  : 1440,
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

  // Progress is measured directly from the section's live position every
  // frame (getBoundingClientRect), never cached — a cached "sectionTop"
  // measured once can drift out of sync with the sticky pin's actual
  // release point (e.g. after fonts/images finish loading and shift
  // layout), which desyncs the crossfade from how long the section stays
  // pinned and leaves a blank gap once the crossfade finishes early.
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

  const raw      = reducedMotion ? 0 : progress
  const p        = easeInOut(raw)
  const scrolling = raw > 0.003
  const isMobile  = vp.w < 680

  // ── Card geometry ───────────────────────────────────────────────────
  const photoW    = Math.max(130, vp.w * (isMobile ? 0.55 : 0.24))
  const photoH    = Math.max(200, vp.h * (isMobile ? 0.50 : 0.63))
  const photoLeft = (vp.w - photoW) / 2
  const photoTop  = Math.max(NAV_H + 20, (vp.h - photoH) / 2)
  const midY      = photoTop + photoH / 2

  // ── Hero word font size (both words guaranteed to fit their panel) ───
  const rPanel = (vp.w - photoW) / 2 - 2 - SIDE_PAD
  const lPanel = photoLeft         - 2 - SIDE_PAD
  const wordPx = Math.min(
    rPanel / (8   * CHAR_W),   // "DESIGNER" — 8 chars
    lPanel / (5.2 * CHAR_W),   // "UI/UX"    — ~5.2 effective chars
    photoH * 0.50,
    176
  )

  // ── Scroll-driven image: travels from the hero's centered position
  //    toward the right (matching where the work image sits in the
  //    "What I Can Do" section) and drifts down slightly; the swap from
  //    portrait to work photo is a genuine 3D card flip (rotateY through
  //    edge-on at the midpoint) — matching the reference exactly, not a
  //    wipe or a crossfade blend ─────────────────────────────────────────
  //
  //  p = 0.00 → 0.75  image travels right + down; the card flips through
  //                   its edge exactly at the movement's midpoint,
  //                   revealing the work photo on its "back face"
  //  p = 0.75 → 1.00  everything fades out together → Services shows through
  //
  const MOVE_X = Math.min(320, vp.w * 0.24)          // rightward travel
  const MOVE_Y = Math.min(110, photoH * 0.24)        // secondary downward drift
  const moveT  = clamp01(p / 0.75)
  const moveX  = moveT * MOVE_X
  const moveY  = moveT * MOVE_Y

  const flipT   = easeInOut(clamp01((p - 0.30) / 0.15)) // flip centered at the movement's midpoint
  const fadeOut = clamp01((p - 0.75) / 0.25)

  const TILT_REST = 15 // resting lean in degrees, matching the reference's persistent 3D tilt
  const flipAngle = TILT_REST + flipT * 180 // sweeps through ~90deg (edge-on) at the midpoint

  const cardOpacity = (mounted ? 1 : 0) * (1 - fadeOut)

  // Text scrolls upward
  const textTY = lerp(0, -(photoTop + photoH + 100), p)
  const textStyle: React.CSSProperties = {
    transform:  `translateY(${textTY}px)`,
    opacity:    scrolling ? 1 : (mounted ? 1 : 0),
    transition: scrolling ? 'none' : 'opacity 0.85s ease 0.15s',
  }

  // ── Theme ──────────────────────────────────────────────────────────
  const fg     = isDark ? '#EEEDF8' : '#0E0F12'
  const muted  = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'
  const bg     = isDark ? '#0B0B12' : '#F0F1F3'

  // Outer positioned card — travels via translateX/Y, fades only at the
  // very end for the Services handoff. The flip itself happens inside.
  const card = (opacity: number, transition = 'none'): React.CSSProperties => ({
    position:     'absolute',
    top:          photoTop,
    left:         photoLeft,
    width:        photoW,
    height:       photoH,
    zIndex:       20,
    opacity,
    transform:    `translate3d(${moveX}px, ${moveY}px, 0)`,
    willChange:   'opacity, transform',
    transition,
  })

  return (
    // z-index: 30 ensures this section stays above Services (z:10) during the
    // overlap created by Services' marginTop: -100vh. Under reduced-motion
    // the pin is skipped entirely (auto height, no negative-margin overlap)
    // z-index: 30 ensures this section stays above Services (z:10) during the
    // overlap created by Services' marginTop: -100vh. Under reduced-motion
    // the pin is skipped entirely (auto height, no negative-margin overlap)
    // so everything just renders as one normal, fully-visible static section.
    <section
      ref={sectionRef}
      id="hero"
      style={reducedMotion
        ? { position: 'relative' }
        : { height: '200vh', position: 'relative', zIndex: 30 }
      }
    >
      {/*
        sticky inner — no background of its own; a separate layer below
        carries the background color and fades out together with the
        images, so once the crossfade completes the whole sticky box turns
        transparent and Services (rendered underneath via its own negative
        margin) becomes visible instead of staying hidden behind an opaque
        layer for the rest of the overlap zone. Under reduced-motion this is
        just a plain relatively-positioned block (no sticky) so all of its
        text content — headline, name, description — stays visible.
      */}
      <div
        className={reducedMotion ? 'relative overflow-hidden' : 'sticky top-0 overflow-hidden'}
        style={{ height: '100vh', zIndex: 30 }}
      >
        {/* Background layer — fades out in sync with fadeOut, revealing
            Services underneath instead of permanently covering it */}
        <div
          className="absolute inset-0"
          style={{ background: bg, opacity: 1 - fadeOut, zIndex: 0 }}
        />

        {/* ── NAME label ─────────────────────────────────────────── */}
        {!isMobile && (
          <div
            className="absolute font-display font-bold tracking-[0.2em] pointer-events-none select-none"
            style={{
              top:        midY - photoH * 0.15,
              left:       48,
              fontSize:   '11px',
              zIndex:     26,
              color:      muted,
              opacity:    (scrolling ? 1 : (mounted ? 1 : 0)) * cardOpacity,
              transform:  `translateY(${textTY}px)`,
              transition: scrolling ? 'none' : 'opacity 0.85s ease 0.15s',
            }}
          >
            PRIYADHARSHINI R
          </div>
        )}

        {/* ── LEFT: UI/UX ────────────────────────────────────────── */}
        {!isMobile && (
          <div
            className="absolute flex items-center pointer-events-none select-none"
            style={{
              top: photoTop, left: 0,
              width: photoLeft - 2, height: photoH,
              justifyContent: 'flex-end',
              overflow: 'hidden',
              zIndex: 26,
              ...textStyle,
            }}
          >
            <span
              className="font-display font-black leading-none tracking-tighter"
              style={{ fontSize: wordPx, whiteSpace: 'nowrap', paddingRight: SIDE_PAD, color: fg }}
            >
              UI/UX
            </span>
          </div>
        )}

        {/* ── RIGHT: DESIGNER ────────────────────────────────────── */}
        {!isMobile && (
          <div
            className="absolute flex items-center pointer-events-none select-none"
            style={{
              top: photoTop,
              left: photoLeft + photoW + 2,
              right: 0,
              height: photoH,
              justifyContent: 'flex-start',
              overflow: 'hidden',
              zIndex: 26,
              ...textStyle,
            }}
          >
            <span
              className="font-display font-black leading-none tracking-tighter"
              style={{ fontSize: wordPx, whiteSpace: 'nowrap', paddingLeft: SIDE_PAD, color: fg }}
            >
              DESIGNER
            </span>
          </div>
        )}

        {/* ── DESCRIPTION ────────────────────────────────────────── */}
        {!isMobile && (
          <div
            className="absolute pointer-events-none select-none"
            style={{ top: midY + photoH * 0.13, right: 48, maxWidth: 210, textAlign: 'right', zIndex: 26, ...textStyle }}
          >
            <p className="font-body text-[12px] leading-relaxed" style={{ color: muted }}>
              {"I'm a Chennai-based UI/UX designer crafting intuitive, visually refined digital experiences."}
            </p>
          </div>
        )}

        {/* ── SCROLL HINT + THEME TOGGLE ─────────────────────────── */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3"
          style={{ zIndex: 30, ...textStyle }}
        >
          <span className="font-mono text-[9px] tracking-[0.22em] hidden md:block" style={{ color: muted }}>
            SCROLL TO EXPLORE
          </span>
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark/light mode"
            className="flex items-center rounded-full border transition-all duration-300 cursor-pointer flex-shrink-0"
            style={{
              width: 44, height: 24, padding: '2px',
              background:   isDark ? '#181827' : '#C8CBD4',
              borderColor:  border,
              justifyContent: isDark ? 'flex-start' : 'flex-end',
            }}
          >
            <div className="rounded-full flex-shrink-0" style={{ width: 20, height: 20, background: '#6347D8' }} />
          </button>
        </div>

        {/* ── MOBILE stacked text ────────────────────────────────── */}
        {isMobile && (
          <div
            className="absolute bottom-20 left-0 right-0 flex flex-col items-center text-center pointer-events-none select-none"
            style={{ zIndex: 26, ...textStyle }}
          >
            <h1 className="font-display font-black leading-none tracking-tighter" style={{ fontSize: 'clamp(3rem,16vw,6rem)', color: fg }}>
              UI/UX<br />DESIGNER
            </h1>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
            The image — a genuine 3D card flip. The card holds a
            persistent resting tilt (matching the reference); as the user
            scrolls, it rotates through edge-on exactly at the movement's
            midpoint, revealing the work photo on its back face at that
            same resting tilt. Only fades as a whole at the very end, for
            the handoff to Services.
        ═══════════════════════════════════════════════════════════ */}
        <div style={card(cardOpacity, scrolling ? 'none' : 'opacity 1s ease 0.1s')}>
          <div style={{ width: '100%', height: '100%', perspective: '1400px' }}>
            <div
              style={{
                width: '100%', height: '100%', position: 'relative',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${flipAngle}deg)`,
              }}
            >
              {/* Front face — portrait */}
              <div
                style={{
                  position: 'absolute', inset: 0, borderRadius: 10, overflow: 'hidden',
                  backfaceVisibility: 'hidden', transform: 'rotateY(0deg)',
                }}
              >
                <img
                  src={profilePhoto}
                  alt="Priyadharshini R"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 8%', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(11,11,18,0.45) 100%)', pointerEvents: 'none' }} />
              </div>

              {/* Back face — UI/UX work image, revealed once the flip passes edge-on */}
              <div
                style={{
                  position: 'absolute', inset: 0, borderRadius: 10, overflow: 'hidden',
                  backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                }}
              >
                <img
                  src={WORK_IMG}
                  alt="UI/UX design work"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(11,11,18,0.5) 100%)', pointerEvents: 'none' }} />
                <div
                  className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em]"
                  style={{ color: 'rgba(255,255,255,0.55)', opacity: clamp01((flipT - 0.5) * 2) }}
                >
                  DESIGN WORK
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── HI BUTTON ──────────────────────────────────────────── */}
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          className="group flex items-center justify-center rounded-full bg-[#A78BFA] hover:scale-105 transition-transform duration-200 cursor-pointer"
          style={{
            position: 'absolute',
            top:   photoTop + photoH - 54,
            left:  photoLeft - 38,
            zIndex: 25,
            width: 76, height: 76,
            boxShadow:  '0 8px 32px rgba(167,139,250,0.25)',
            opacity:    cardOpacity,
            transform:  `translate3d(${moveX}px, ${moveY}px, 0)`,
            transition: scrolling ? 'none' : 'opacity 0.8s ease 0.45s',
          }}
        >
          <span className="font-display font-black text-[#0B0B12] text-[22px] leading-none">Hi</span>
        </a>

      </div>
    </section>
  )
}
