import { useTheme } from '../ThemeContext'

export default function Footer() {
  const isDark = useTheme()

  const fg = isDark ? '#EEEDF8' : '#0E0F12'
  const muted = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'
  const bg = isDark ? '#0B0B12' : '#E8E6F5'

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ borderTop: `1px solid ${border}`, background: bg }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        {/* Main row */}
        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-10 border-b"
          style={{ borderColor: border }}
        >
          <div>
            <p
              className="font-display font-semibold text-[15px] tracking-[-0.01em] mb-0.5"
              style={{ color: fg }}
            >
              Priyadharshini R
            </p>
            <p className="font-body text-[12px]" style={{ color: muted }}>UI/UX Designer</p>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            {[
              { label: 'About', id: 'about' },
              { label: 'Work', id: 'work' },
              { label: 'Resume', id: 'resume' },
              { label: 'Contact', id: 'contact' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-body text-[13px] hover:text-[#A78BFA] transition-colors duration-200"
                style={{ color: muted }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyadharshinirajkumar197' },
              { label: 'GitHub', href: 'https://github.com/priyadharshinirajkumar197' },
              { label: 'Behance', href: 'https://www.behance.net/priyadharshinir22' },
              { label: 'Dribbble', href: 'https://dribbble.com/priyadharshinirajkumar87' },
              { label: 'Email', href: 'mailto:priyadharshinirajkumar87@gmail.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-body text-[13px] hover:text-[#A78BFA] transition-colors duration-200"
                style={{ color: muted }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-6">
          <p className="font-body text-[12px]" style={{ color: muted }}>
            © 2024 Priyadharshini R · All rights reserved
          </p>
          <p className="font-body text-[12px]" style={{ color: muted }}>
            Designed with intention · Built for opportunity
          </p>
        </div>

      </div>
    </footer>
  )
}
