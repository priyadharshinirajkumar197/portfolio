import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'
import resumePdf from '@/imports/resume.pdf?url'

export default function ResumeCTA() {
  const { ref, inView } = useInView()
  const isDark = useTheme()

  const fg = isDark ? '#F8F7FC' : '#121116'
  const muted = isDark ? '#9B8DFF' : '#6347D8'
  const border = isDark ? '#17152B' : '#C5C8D0'
  const ctaBg = isDark ? '#17152B' : '#EDEDF9'
  const accent = isDark ? '#6347D8' : '#6347D8'
  const btnFg = isDark ? '#121116' : '#F8F7FC'

  return (
    <section
      id="resume"
      className="border-t"
      style={{ borderColor: border, background: ctaBg }}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`reveal ${inView ? 'visible' : ''} max-w-[1440px] mx-auto px-6 md:px-14 py-24 md:py-32`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] block mb-6 font-semibold" style={{ color: accent }}>
              RESUME
            </span>
            <h2
              className="font-display font-black leading-[0.88] tracking-[-0.03em]"
              style={{ fontSize: 'clamp(2.3rem, 4.5vw, 4.5rem)', color: fg }}
            >
              Let's work together.
            </h2>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <p className="font-body text-[14px] max-w-xs leading-relaxed md:text-right" style={{ color: muted }}>
              Looking for an opportunity to learn, contribute, and grow as a UI/UX designer.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 font-body text-[13px] font-medium px-6 py-3 transition-colors duration-200 cursor-pointer shadow-md"
                style={{ background: accent, color: btnFg }}
              >
                View Resume
                <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 12 10">
                  <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-body text-[13px] border px-6 py-3 transition-all duration-200 cursor-pointer"
                style={{ color: fg, borderColor: border }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
              >
                Contact me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
