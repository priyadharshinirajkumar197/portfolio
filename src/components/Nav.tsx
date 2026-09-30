import { useState, useEffect } from 'react'
import { useTheme } from '../ThemeContext'
import profilePhoto from '@/imports/WhatsApp_Image_2026-08-20_at_09.32.58.jpeg'

interface NavProps {
  onNavigate: (page: string | null) => void
}

const SPY_IDS = ['work', 'resume', 'contact'] as const

export default function Nav({ onNavigate }: NavProps) {
  const isDark = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])

  // Scroll-spy: mark the last section whose top has crossed a line 40% down the
  // viewport. Uses a rAF-throttled scroll listener (same approach as Work.tsx)
  // rather than IntersectionObserver, because IntroFlow's #about anchor is a
  // zero-height marker inside a pinned sequence and reports unusable overlap.
  useEffect(() => {
    let frame = 0

    const update = () => {
      const line = window.innerHeight * 0.4
      let current = 'home'
      for (const id of SPY_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActiveSection(current)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const goHome = () => { onNavigate(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  const links = [
    { id: 'home', label: 'Home', action: goHome },
    { id: 'about', label: 'About', action: () => scrollTo('about') },
    { id: 'work', label: 'Projects', action: () => scrollTo('work') },
    { id: 'resume', label: 'Resume', action: () => scrollTo('resume') },
  ]

  const pillBg     = isDark ? 'rgba(13,13,13,0.94)' : 'rgba(244,243,249,0.95)'
  const borderCol  = isDark ? '#17152B' : '#C5C8D0'
  const linkFg     = isDark ? '#F8F7FC' : '#6347D8'
  const fg         = isDark ? '#F8F7FC' : '#121116'
  const contactBg  = isDark ? '#F8F7FC' : '#121116'
  const contactFg  = isDark ? '#121116' : '#F8F7FC'
  const mobileBg   = isDark ? 'rgba(18,17,22,0.95)' : 'rgba(244,243,249,0.97)'
  const hamburgerC = isDark ? '#F8F7FC' : '#121116'
  const accent     = isDark ? '#6347D8' : '#6347D8'

  return (
    <>
      {/* Desktop nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center pt-5 pointer-events-none">

        {/* Full pill */}
        <div
          className="flex items-center gap-1 backdrop-blur-xl rounded-full px-2 py-1.5 pointer-events-auto transition-all duration-500"
          style={{
            background: pillBg,
            border: `1px solid ${borderCol}`,
            opacity: scrolled ? 0 : 1,
            transform: scrolled ? 'translateY(-8px) scale(0.97)' : 'translateY(0) scale(1)',
            pointerEvents: scrolled ? 'none' : 'auto',
          }}
        >
          <button
            onClick={() => { onNavigate(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 mr-1.5 hover:opacity-80 transition-opacity"
            style={{ border: `1px solid ${borderCol}` }}
          >
            <img src={profilePhoto} alt="Priyadharshini R" className="w-full h-full object-cover object-top" />
          </button>
          {links.map(({ id, label, action }) => (
            <button
              key={id}
              onClick={action}
              className="font-body text-[13px] transition-colors duration-200 px-4 py-2 rounded-full hover:text-[#6347D8]"
              style={{ color: activeSection === id ? accent : linkFg }}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="font-body text-[13px] font-medium hover:bg-[#6347D8] transition-colors duration-200 px-5 py-2 rounded-full ml-1"
            style={{
              background: contactBg,
              color: contactFg,
              outline: activeSection === 'contact' ? `1px solid ${accent}` : 'none',
              outlineOffset: '2px',
            }}
            aria-current={activeSection === 'contact' ? 'page' : undefined}
          >
            Contact
          </button>
        </div>

        {/* Compact badge */}
        <div
          className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 backdrop-blur-xl rounded-full px-3 py-2 pointer-events-auto transition-all duration-500 cursor-pointer"
          style={{
            background: pillBg,
            border: `1px solid ${borderCol}`,
            opacity: scrolled ? 1 : 0,
            transform: scrolled ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
            pointerEvents: scrolled ? 'auto' : 'none',
          }}
          onClick={() => { onNavigate(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          role="button"
          tabIndex={0}
        >
          <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0" style={{ border: `1px solid ${borderCol}` }}>
            <img src={profilePhoto} alt="Priyadharshini R" className="w-full h-full object-cover object-top" />
          </div>
          <span className="font-body text-[12px]" style={{ color: fg }}>Available for work</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#6347D8] animate-pulse flex-shrink-0" />
        </div>

      </nav>

      {/* Mobile nav */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div
          className="flex items-center justify-between px-5 py-4 transition-all duration-300"
          style={scrolled ? { background: mobileBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${borderCol}` } : {}}
        >
          <button
            onClick={() => { onNavigate(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="w-8 h-8 rounded-full overflow-hidden"
            style={{ border: `1px solid ${borderCol}` }}
          >
            <img src={profilePhoto} alt="Priyadharshini R" className="w-full h-full object-cover object-top" />
          </button>
          <button className="flex flex-col justify-center gap-[5px] w-8 h-8" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'}`} style={{ background: hamburgerC }} />
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-3.5'}`} style={{ background: hamburgerC }} />
            <span className={`block h-px transition-all duration-300 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-5'}`} style={{ background: hamburgerC }} />
          </button>
        </div>
        <div
          className="transition-all duration-300 overflow-hidden backdrop-blur-xl"
          style={{
            maxHeight: menuOpen ? '352px' : '0px',
            padding: menuOpen ? '20px 0' : '0',
            background: mobileBg,
            borderBottom: menuOpen ? `1px solid ${borderCol}` : 'none',
          }}
        >
          <div className="px-5 flex flex-col gap-4">
            {links.map(({ id, label, action }) => (
              <button
                key={id}
                onClick={action}
                className="font-body text-[15px] text-left hover:text-[#6347D8] transition-colors"
                style={{ color: activeSection === id ? accent : linkFg }}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="font-body text-[15px] font-medium self-start hover:bg-[#6347D8] transition-colors duration-200 px-5 py-2 rounded-full"
              style={{ background: contactBg, color: contactFg }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
