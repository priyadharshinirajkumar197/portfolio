import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'
import profilePhoto from '@/imports/WhatsApp_Image_2026-08-20_at_09.32.58.jpeg'

const stats = [
  { value: '2',  label: 'Years of Experience' },
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

export default function About() {
  const isDark = useTheme()
  const { ref, inView } = useInView()

  const fg     = isDark ? '#F8F7FC' : '#121116'
  const muted  = isDark ? '#9B8DFF' : '#6347D8'
  const border = isDark ? '#17152B' : '#C5C8D0'
  const bg     = isDark ? '#121116' : '#F4F3F9'

  return (
    <section
      id="about"
      style={{ marginTop: '-100vh', position: 'relative', zIndex: 10, background: bg, borderTop: `1px solid ${border}` }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-24">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${inView ? 'visible' : ''} flex flex-col lg:flex-row gap-12 lg:gap-16`}
        >
          {/* Left */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">

            <div>
              <h2
                className="font-display font-black leading-none tracking-tighter mb-5"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', color: fg }}
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
                  <p className="font-display font-black leading-none tracking-tighter text-[#6347D8]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                    {value}
                  </p>
                  <p className="font-body text-[12px] mt-1" style={{ color: muted }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <p className="font-body text-[12px] mb-1" style={{ color: muted }}>Call Today :</p>
                <a href="tel:+919500017718" className="font-body text-[13px] hover:text-[#6347D8] transition-colors" style={{ color: fg }}>
                  +91 95000 17718
                </a>
              </div>
              <div>
                <p className="font-body text-[12px] mb-1" style={{ color: muted }}>Email :</p>
                <a href="mailto:priyadharshinirajkumar87@gmail.com" className="font-body text-[13px] hover:text-[#6347D8] transition-colors" style={{ color: fg }}>
                  priyadharshinirajkumar87@gmail.com
                </a>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: icons.github,   href: 'https://github.com/priyadharshinirajkumar197', label: 'GitHub' },
                { icon: icons.linkedin, href: 'https://www.linkedin.com/in/priyadharshinirajkumar197', label: 'LinkedIn' },
                { icon: icons.behance,  href: 'https://www.behance.net/priyadharshinir22', label: 'Behance' },
                { icon: icons.dribbble, href: 'https://dribbble.com/priyadharshinirajkumar87', label: 'Dribbble' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-[#6347D8] transition-colors duration-200"
                  style={{ color: muted }}
                >
                  {icon}
                </a>
              ))}
            </div>

          </div>

          {/* Right: portrait — static; its "arrival" already happened via
              the traveling wipe in the Services section above */}
          <div className="lg:w-[40%] flex-shrink-0">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ aspectRatio: '3/4', maxHeight: '520px' }}
            >
              <img
                src={profilePhoto}
                alt="Priyadharshini R — UI/UX Designer"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(to top, ${isDark ? 'rgba(18,17,22,0.5)' : 'rgba(244,243,249,0.3)'} 0%, transparent 50%)` }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
