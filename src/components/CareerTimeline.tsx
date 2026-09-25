import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'

const timeline = [
  {
    role: 'UI/UX Designer — Available to Work',
    company: 'Open to Opportunities',
    period: '2026 — Present',
    type: 'OPEN',
    desc: 'Actively seeking roles to apply research-driven design thinking and contribute to real product teams.',
  },
  {
    role: 'EVCare — EV Health Monitoring Platform',
    company: 'Personal Project',
    period: '2025',
    type: 'PROJECT',
    desc: 'Self-initiated product design project — end-to-end UX from user research and IA to high-fidelity prototype and live deployment.',
  },
  {
    role: 'BloodSync — Smart Blood Bank Prediction System',
    company: 'Academic Project · MSEC',
    period: '2026',
    type: 'PROJECT',
    desc: 'Academic UX project — user research, persona development, journey mapping, and complete UI design for an AI-powered healthcare platform.',
  },
  {
    role: 'GenAI for UX Designers',
    company: 'Coursera',
    period: '2026',
    type: 'CERTIFICATION',
    desc: 'Certification covering the application of generative AI tools in UX workflows — ideation, research synthesis, and content generation.',
  },
  {
    role: 'Fundamentals of UI/UX Design',
    company: 'Microsoft',
    period: '2025',
    type: 'CERTIFICATION',
    desc: 'Foundation course covering core UI/UX principles, design thinking, wireframing, and user-centered design methodologies.',
  },
  {
    role: 'B.E. Electronics & Communication Engineering',
    company: 'Meenakshi Sundararajan Engineering College (MSEC)',
    period: '2023 — 2027',
    type: 'EDUCATION',
    desc: 'Final-year student with coursework in human-computer interaction, interface design, and design thinking.',
  },
]

export default function CareerTimeline() {
  const { ref, inView } = useInView()
  const isDark = useTheme()

  const fg = isDark ? '#EEEDF8' : '#0E0F12'
  const muted = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'
  const hoverBg = isDark ? '#13131F' : '#E8E9EE'
  const accent = isDark ? '#A78BFA' : '#7C3AED'

  const typeColor: Record<string, string> = {
    OPEN: accent,
    PROJECT: isDark ? '#63E6FF' : '#0891B2',
    CERTIFICATION: isDark ? '#F5A623' : '#D97706',
    EDUCATION: muted,
  }

  return (
    <section className="border-t" style={{ borderColor: border }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <div className="flex items-center justify-between py-10 border-b" style={{ borderColor: border }}>
          <h2 className="font-display font-black text-[clamp(2.3rem,4.5vw,4.5rem)] leading-none tracking-tighter" style={{ color: fg }}>
            Experience & Education
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] hidden md:block" style={{ color: muted }}>
            CAREER
          </span>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="flex flex-col"
        >
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`reveal ${inView ? 'visible' : ''} reveal-delay-${Math.min(i + 1, 5)} flex flex-col md:flex-row gap-4 md:gap-0 py-8 border-b group transition-colors duration-200 -mx-6 md:-mx-14 px-6 md:px-14`}
              style={{ borderColor: border }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div className="md:w-56 flex-shrink-0 flex md:flex-col gap-3">
                <span className="font-mono text-[11px] tracking-[0.15em]" style={{ color: muted }}>{item.period}</span>
                <span
                  className="font-mono text-[9px] tracking-[0.2em] px-2 py-0.5 border self-start font-medium"
                  style={{ borderColor: typeColor[item.type], color: typeColor[item.type] }}
                >
                  {item.type}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-display font-semibold text-[16px] md:text-[18px] tracking-[-0.01em] mb-0.5" style={{ color: fg }}>
                  {item.role}
                </p>
                <p className="font-mono text-[11px] tracking-[0.1em] mb-3 font-medium" style={{ color: accent }}>{item.company}</p>
                <p className="font-body text-[13px] leading-relaxed max-w-xl" style={{ color: muted }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
