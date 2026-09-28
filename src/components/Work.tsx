import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'
import { placeholderImage } from '../lib/media'
import type { Project } from '../App'

interface WorkProps {
  projects: Project[]
  onOpenProject: (id: string) => void
}

function ProjectCard({
  project,
  large,
  onOpen,
  delay,
}: {
  project: Project
  large?: boolean
  onOpen: () => void
  delay: number
}) {
  const { ref, inView } = useInView()
  const [hovered, setHovered] = useState(false)
  const [parallax, setParallax] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)
  const cardRef = useRef<HTMLElement | null>(null)
  const isDark = useTheme()

  const fg = isDark ? '#EEEDF8' : '#0E0F12'
  const muted = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'
  const cardBg = isDark ? '#13131F' : '#FFFFFF'
  const accent = isDark ? '#A78BFA' : '#7C3AED'

  useEffect(() => {
    let frame = 0

    const updateParallax = () => {
      const card = cardRef.current
      if (!card) return

      const bounds = card.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const cardCenter = bounds.top + bounds.height / 2
      const distance = Math.max(-1, Math.min(1, (cardCenter - viewportCenter) / (window.innerHeight / 2)))
      setParallax(distance)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <article
      ref={(node) => {
        cardRef.current = node
        ;(ref as React.MutableRefObject<HTMLElement | null>).current = node
      }}
      className={`reveal ${inView ? 'visible' : ''} reveal-delay-${delay} relative overflow-hidden cursor-pointer group rounded-2xl`}
      style={{
        border: `1px solid ${border}`,
        background: cardBg,
        minHeight: large ? 'clamp(440px, 74vh, 760px)' : 'clamp(360px, 60vh, 620px)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          background: isDark ? '#13131F' : '#E8E9EE',
        }}
      >
        <img
          src={imageFailed ? placeholderImage(project.accentColor, project.id) : project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="absolute -inset-y-[10%] w-full h-[120%] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{ transform: `translateY(${parallax * -7}%) scale(${hovered ? 1.04 : 1})` }}
        />
      </div>

      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(7,7,12,0.18) 0%, rgba(7,7,12,0.54) 100%)' }} />

      <div className="relative z-10 flex min-h-[inherit] h-full items-center justify-center px-6 py-12 text-center">
        <div className="max-w-3xl flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-[0.18em] rounded-full px-3 py-1.5 mb-5" style={{ color: '#16131f', background: accent }}>
            {project.category.toUpperCase()}
          </span>
          <h3 className="font-display font-black text-[clamp(1.9rem,5vw,4.8rem)] leading-[0.92] tracking-[-0.045em] text-white">
            {project.title}
          </h3>
          <p className="font-body text-[12px] md:text-[13px] leading-relaxed text-white/80 max-w-lg mt-4">
            {project.subtitle}
          </p>
          <div className="mt-7 flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.16em] text-white/65">{project.year}</span>
            <span className="flex items-center justify-center w-11 h-11 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ background: accent, color: '#16131f' }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Work({ projects, onOpenProject }: WorkProps) {
  const { ref: headRef, inView: headInView } = useInView()
  const isDark = useTheme()

  const fg = isDark ? '#EEEDF8' : '#0E0F12'
  const muted = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'

  return (
    <section id="work" className="border-t" style={{ borderColor: border }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        {/* Heading row */}
        <div
          ref={headRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${headInView ? 'visible' : ''} flex items-center justify-between py-10 border-b`}
          style={{ borderColor: border }}
        >
          <h2 className="font-display font-black text-[clamp(2.3rem,4.5vw,4.5rem)] leading-none tracking-tighter" style={{ color: fg }}>
            Selected Work
          </h2>
          <span className="font-mono text-[11px] tracking-[0.2em] hidden md:block" style={{ color: muted }}>
            FEATURED PROJECTS
          </span>
        </div>

        {/* Project grid — full-width cards */}
        <div className="py-10 md:py-14 flex flex-col gap-[14vh]">
          {projects[0] && (
            <ProjectCard
              project={projects[0]}
              large
              onOpen={() => onOpenProject(projects[0].id)}
              delay={1}
            />
          )}

          {projects.slice(1).map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              large
              onOpen={() => onOpenProject(p.id)}
              delay={i + 2}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
