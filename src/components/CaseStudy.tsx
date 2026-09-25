import { useTheme } from '../ThemeContext'
import type { Project } from '../App'

interface CaseStudyProps {
  project: Project
  onBack: () => void
}

export default function CaseStudy({ project, onBack }: CaseStudyProps) {
  const isDark = useTheme()
  const accent = project.accentColor

  const fg = isDark ? '#EEEDF8' : '#0E0F12'
  const muted = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'
  const bg = isDark ? '#0B0B12' : '#F0F1F3'
  const navBg = isDark ? 'rgba(11,11,18,0.90)' : 'rgba(240,241,243,0.95)'
  const cardBg = isDark ? '#13131F' : '#E8E9EE'
  const gradientEnd = isDark ? '#0B0B12' : '#F0F1F3'

  return (
    <div style={{ background: bg, color: fg }} className="min-h-screen overflow-x-hidden">

      {/* ── Nav bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b"
        style={{ background: navBg, borderColor: border }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 h-[68px] flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] transition-colors hover:text-[#A78BFA]"
            style={{ color: muted }}
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 14 10">
              <path d="M13 5H1M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            BACK TO WORK
          </button>
          <span className="font-mono text-[11px] tracking-[0.15em] hidden md:block" style={{ color: muted }}>
            {project.title.toUpperCase()} — OVERVIEW
          </span>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="pt-[68px]">
        <div className="relative" style={{ height: 'clamp(300px, 50vh, 660px)', background: cardBg }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, transparent 0%, ${gradientEnd} 100%)` }}
          />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 py-16 md:py-24">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span
            className="font-mono text-[10px] tracking-[0.2em] px-3 py-1.5 border"
            style={{ borderColor: accent, color: accent }}
          >
            {project.platform.toUpperCase()} PLATFORM
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.2em] px-3 py-1.5 border"
            style={{ borderColor: border, color: muted }}
          >
            UX CASE STUDY
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.2em] px-3 py-1.5 border"
            style={{ borderColor: border, color: muted }}
          >
            {project.year}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-black leading-[0.88] tracking-[-0.03em] mb-5"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)', color: fg }}
        >
          {project.title.toUpperCase()}
        </h1>

        <p className="font-body text-[16px] md:text-[18px] max-w-2xl leading-relaxed mb-10" style={{ color: muted }}>
          {project.subtitle}
        </p>

        {/* ── CTA buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-16">
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 border font-mono text-[11px] tracking-[0.2em] px-7 py-4 transition-all duration-200"
            style={{ borderColor: accent, color: accent }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = accent
              el.style.color = isDark ? '#0B0B12' : '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'transparent'
              el.style.color = accent
            }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 16 16">
              <path d="M3 2h7l3 3v9H3V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M10 2v3h3M6 8h4M6 11h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            UX CASE STUDY
          </a>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2.5 font-mono text-[11px] tracking-[0.2em] px-7 py-4 transition-all duration-200 hover:opacity-90"
            style={{ background: accent, color: '#0B0B12' }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 16 16">
              <path d="M8 3H3v10h10V8M9 3h4v4M13 3L7 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            LIVE PROJECT
          </a>
        </div>

        {/* Meta strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 border mb-16" style={{ borderColor: border }}>
          {[
            { label: 'ROLE', value: project.role },
            { label: 'DURATION', value: project.duration },
            { label: 'PLATFORM', value: project.platform },
            { label: 'YEAR', value: project.year },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`p-5 md:p-6 border-b md:border-b-0 ${i < 3 ? 'md:border-r' : ''}`}
              style={{ borderColor: border }}
            >
              <p className="font-mono text-[9px] tracking-[0.22em] mb-2" style={{ color: muted }}>{item.label}</p>
              <p className="font-body text-[13px]" style={{ color: fg }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Overview + Problem/Solution */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x border mb-16"
          style={{ borderColor: border, ['--tw-divide-color' as string]: border }}
        >
          {/* Left */}
          <div className="p-8 md:p-10" style={{ borderColor: border }}>
            <p
              className="font-mono text-[10px] tracking-[0.22em] mb-5"
              style={{ color: accent }}
            >
              OVERVIEW
            </p>
            <p className="font-body text-[14px] leading-relaxed" style={{ color: muted }}>
              {project.description}
            </p>
          </div>

          {/* Right: Problem + Solution */}
          <div className="divide-y" style={{ ['--tw-divide-color' as string]: border }}>
            <div className="p-8 md:p-10" style={{ borderBottom: `1px solid ${border}` }}>
              <p className="font-mono text-[10px] tracking-[0.22em] mb-4" style={{ color: isDark ? '#E53935' : '#C62828' }}>PROBLEM</p>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: muted }}>{project.problem}</p>
            </div>
            <div className="p-8 md:p-10">
              <p
                className="font-mono text-[10px] tracking-[0.22em] mb-4"
                style={{ color: accent }}
              >
                SOLUTION
              </p>
              <p className="font-body text-[13px] leading-relaxed" style={{ color: muted }}>{project.solution}</p>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="mb-20">
          <p className="font-mono text-[10px] tracking-[0.22em] mb-4" style={{ color: muted }}>TOOLS USED</p>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="font-mono text-[11px] tracking-[0.15em] border px-4 py-2 transition-all duration-200 cursor-default hover:text-[#A78BFA]"
                style={{ borderColor: border, color: muted }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#A78BFA')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── Bottom nav ── */}
      <div className="border-t py-12" style={{ borderColor: border }}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-14 flex items-center justify-between">
          <p className="font-mono text-[11px] tracking-[0.18em]" style={{ color: muted }}>
            PRIYADHARSHINI R · {project.year}
          </p>
          <button
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] hover:text-[#A78BFA] transition-colors"
            style={{ color: muted }}
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 14 10">
              <path d="M13 5H1M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            BACK TO ALL WORK
          </button>
        </div>
      </div>

    </div>
  )
}
