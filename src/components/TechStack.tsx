import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'

const tools = [
  {
    name: 'Figma',
    desc: 'Primary design tool for wireframes, high-fidelity UI, components, and prototyping.',
    tag: 'Design',
  },
  {
    name: 'Framer',
    desc: 'Interactive prototyping and web publishing for portfolio and project demos.',
    tag: 'Prototyping',
  },
  {
    name: 'Adobe XD',
    desc: 'UI design and prototyping for cross-platform digital experiences.',
    tag: 'Design',
  },
  {
    name: 'Photoshop',
    desc: 'Image editing, visual compositing, and asset preparation for UI work.',
    tag: 'Visual',
  },
  {
    name: 'Illustrator',
    desc: 'Vector illustration, icon design, and brand asset creation.',
    tag: 'Visual',
  },
  {
    name: 'HTML / CSS',
    desc: 'Frontend fundamentals enabling design-to-development handoff fluency.',
    tag: 'Code',
  },
]

export default function TechStack() {
  const { ref, inView } = useInView()
  const isDark = useTheme()

  const fg = isDark ? '#F8F7FC' : '#121116'
  const muted = isDark ? '#9B8DFF' : '#6347D8'
  const border = isDark ? '#17152B' : '#C5C8D0'
  const hoverBg = isDark ? '#17152B' : '#F8F7FC'
  const accent = isDark ? '#6347D8' : '#6347D8'

  return (
    <section className="border-t" style={{ borderColor: border }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <div className="flex items-center justify-between py-10 border-b" style={{ borderColor: border }}>
          <h2 className="font-display font-black text-[clamp(2.3rem,4.5vw,4.5rem)] leading-none tracking-tighter" style={{ color: fg }}>
            Tools & Tech Stack
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] hidden md:block" style={{ color: muted }}>
            TOOLING
          </span>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {tools.map((tool, i) => {
            const col = i % 3
            const row = Math.floor(i / 3)
            const isLastRow = row === Math.floor((tools.length - 1) / 3)
            return (
              <div
                key={tool.name}
                className={`reveal ${inView ? 'visible' : ''} reveal-delay-${Math.min(i + 1, 5)} group p-8 border-b transition-colors duration-200 ${
                  col < 2 ? 'sm:border-r' : ''
                } ${isLastRow ? 'lg:border-b-0' : ''}`}
                style={{ borderColor: border }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-display font-bold text-[17px] tracking-[-0.01em]" style={{ color: fg }}>
                    {tool.name}
                  </h3>
                  <span
                    className="font-mono text-[9px] tracking-[0.18em] px-2 py-0.5 flex-shrink-0 font-medium border"
                    style={{ borderColor: accent, color: accent }}
                  >
                    {tool.tag.toUpperCase()}
                  </span>
                </div>
                <p className="font-body text-[13px] leading-relaxed" style={{ color: muted }}>{tool.desc}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
