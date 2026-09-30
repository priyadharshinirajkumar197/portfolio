import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'

const steps = [
  {
    num: '01',
    title: 'Discover',
    body: 'Understand users, context, and the problem space through research, interviews, and competitive analysis.',
  },
  {
    num: '02',
    title: 'Define',
    body: "Synthesize findings into a clear problem statement. Identify the real problem and align on goals.",
  },
  {
    num: '03',
    title: 'Design',
    body: 'Explore IA, wireframes, and high-fidelity interfaces. Iterate rapidly from sketch to prototype.',
  },
  {
    num: '04',
    title: 'Validate',
    body: 'Test with real users. Gather qualitative feedback and refine until the experience is right.',
  },
]

export default function Process() {
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
            My Process
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] hidden md:block" style={{ color: muted }}>
            HOW I WORK
          </span>
        </div>

        {/* Steps */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal ${inView ? 'visible' : ''} reveal-delay-${i + 1} py-10 px-0 sm:px-8 first:pl-0 last:pr-0 border-b sm:border-b-0 ${i < steps.length - 1 ? 'sm:border-r' : ''}`}
              style={{ borderColor: border }}
            >
              <span className="font-mono text-[11px] tracking-[0.2em] block mb-6 font-semibold" style={{ color: accent }}>
                {step.num}
              </span>
              <h3 className="font-display font-semibold text-[16px] tracking-[-0.01em] mb-3" style={{ color: fg }}>
                {step.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: muted }}>{step.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
