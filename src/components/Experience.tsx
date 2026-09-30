import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'

const items = [
  {
    q: 'Where are you currently studying?',
    a: "B.E. Electronics & Communication Engineering at Meenakshi Sundararajan Engineering College (MSEC). Final year (2023–2027). My coursework includes human-computer interaction, interface design, and design thinking.",
  },
  {
    q: 'What certifications do you hold?',
    a: "GenAI for UX Designers (Coursera, 2026) — covering the application of generative AI tools in UX workflows. Fundamentals of UI/UX Design (Microsoft, 2025) — core UI/UX principles, design thinking, wireframing, and user-centered design.",
  },
  {
    q: 'What tools do you use?',
    a: "Primary: Figma, Framer, Adobe XD. Supporting: Photoshop, Illustrator, Miro, Notion. Development familiarity: HTML, CSS, Git/GitHub.",
  },
  {
    q: 'What kind of projects have you worked on?',
    a: "Personal and academic product design projects — EVCare (personal, 2025): an EV health monitoring platform built end-to-end. BloodSync (academic, 2026): an AI-powered blood bank prediction system designed as part of my engineering programme.",
  },
  {
    q: 'Are you open to work?',
    a: "Yes — actively seeking UI/UX roles, internships, and freelance projects. Open to remote and on-site opportunities. Available immediately.",
  },
  {
    q: 'How do you approach a new design project?',
    a: "I always start with research before opening Figma. Understanding users, context, and constraints ensures I'm solving the right problem. From there: define → wireframe → iterate → test → refine.",
  },
]

export default function Experience() {
  const [open, setOpen] = useState<number | null>(null)
  const { ref, inView } = useInView()
  const isDark = useTheme()

  const fg = isDark ? '#F8F7FC' : '#121116'
  const muted = isDark ? '#9B8DFF' : '#6347D8'
  const border = isDark ? '#17152B' : '#C5C8D0'
  const accent = isDark ? '#6347D8' : '#6347D8'

  return (
    <section className="border-t" style={{ borderColor: border }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        {/* Heading row */}
        <div className="flex items-center justify-between py-10 border-b" style={{ borderColor: border }}>
          <h2 className="font-display font-black text-[clamp(2.3rem,4.5vw,4.5rem)] leading-none tracking-tighter" style={{ color: fg }}>
            Background & FAQs
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] hidden md:block" style={{ color: muted }}>
            EDUCATION & INFO
          </span>
        </div>

        {/* Accordion */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col">
          {items.map((item, i) => (
            <div
              key={i}
              className={`reveal ${inView ? 'visible' : ''} reveal-delay-${Math.min(i + 1, 5)} border-b`}
              style={{ borderColor: border }}
            >
              <button
                className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[11px] tracking-[0.15em] flex-shrink-0 mt-0.5 font-semibold" style={{ color: accent }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="font-display font-medium text-[16px] md:text-[18px] tracking-[-0.01em] transition-colors"
                    style={{ color: fg }}
                  >
                    {item.q}
                  </span>
                </div>
                <svg
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}
                  style={{ color: muted }}
                  fill="none" viewBox="0 0 16 16"
                >
                  <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? 'max-h-48 pb-6' : 'max-h-0'
                }`}
              >
                <p className="font-body text-[14px] leading-relaxed pl-10 max-w-2xl" style={{ color: muted }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
