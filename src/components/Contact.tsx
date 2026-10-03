import { useState } from 'react'
import { useInView } from '../hooks/useInView'
import { useTheme } from '../ThemeContext'

export default function Contact() {
  const { ref, inView } = useInView()
  const isDark = useTheme()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [company, setCompany] = useState('')

  const fg = isDark ? '#EEEDF8' : '#0E0F12'
  const muted = isDark ? '#B9B7D1' : '#5E6170'
  const border = isDark ? '#212136' : '#C5C8D0'
  const inputBg = isDark ? '#13131F' : '#FFFFFF'
  const accent = isDark ? '#A78BFA' : '#7C3AED'
  const btnFg = isDark ? '#0B0B12' : '#FFFFFF'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your message right now.')
      }

      setSent(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to send your message right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="border-t" style={{ borderColor: border }}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="reveal grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-0 py-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Left */}
          <div className="pb-12 lg:pb-0 lg:pr-14 lg:border-r" style={{ borderColor: border }}>
            <p className="font-body text-[14px] leading-relaxed max-w-sm mb-10" style={{ color: muted }}>
              {"I'm open to internship opportunities, freelance projects, and collaborations. Whether it's building a product from scratch or improving an existing experience — reach out."}
            </p>

            <div className="flex flex-col gap-0">
              {[
                { label: 'Email', value: 'priyadharshinirajkumar87@gmail.com', href: 'mailto:priyadharshinirajkumar87@gmail.com' },
                { label: 'LinkedIn', value: 'www.linkedin.com/in/priyadharshinirajkumar197', href: 'https://www.linkedin.com/in/priyadharshinirajkumar197' },
                { label: 'GitHub', value: 'github.com/priyadharshinirajkumar197', href: 'https://github.com/priyadharshinirajkumar197' },
                { label: 'Behance', value: 'behance.net/priyadharshinir22', href: 'https://www.behance.net/priyadharshinir22' },
                { label: 'Dribbble', value: 'dribbble.com/priyadharshinirajkumar87', href: 'https://dribbble.com/priyadharshinirajkumar87' },
              ].map((link, i) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex items-center justify-between py-5 border-b group hover:pl-2 transition-all duration-300 ${i === 0 ? 'border-t' : ''}`}
                  style={{ borderColor: border }}
                >
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] mb-1 font-semibold" style={{ color: muted }}>
                      {link.label.toUpperCase()}
                    </p>
                    <p className="font-body text-[14px] transition-colors duration-200" style={{ color: fg }}>
                      {link.value}
                    </p>
                  </div>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-all duration-200"
                    style={{ color: muted }}
                    fill="none" viewBox="0 0 16 16"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="pt-12 lg:pt-0 lg:pl-14 border-t lg:border-t-0" style={{ borderColor: border }}>
            {sent ? (
              <div
                className="border p-10 text-center h-full flex flex-col items-center justify-center gap-3"
                style={{ borderColor: accent, background: isDark ? 'rgba(167,139,250,0.05)' : 'rgba(124,58,237,0.05)' }}
              >
                <span className="font-mono text-[10px] tracking-[0.25em] font-semibold" style={{ color: accent }}>
                  MESSAGE SENT
                </span>
                <p className="font-body text-[14px]" style={{ color: muted }}>
                  {"Thanks for reaching out! I'll get back to you soon."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="absolute -left-[10000px]" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-[0.18em] font-semibold" style={{ color: muted }}>
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border font-body text-[14px] px-4 py-3 focus:outline-none transition-colors"
                      style={{ background: inputBg, borderColor: border, color: fg }}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-[10px] tracking-[0.18em] font-semibold" style={{ color: muted }}>
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="border font-body text-[14px] px-4 py-3 focus:outline-none transition-colors"
                      style={{ background: inputBg, borderColor: border, color: fg }}
                      placeholder="your@email.com"
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] tracking-[0.18em] font-semibold" style={{ color: muted }}>
                    MESSAGE
                  </label>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="border font-body text-[14px] px-4 py-3 focus:outline-none transition-colors resize-none"
                    style={{ background: inputBg, borderColor: border, color: fg }}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>
                {error && (
                  <p className="font-body text-[13px]" role="alert" style={{ color: '#F87171' }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group self-start flex items-center gap-2.5 font-body text-[13px] font-medium px-7 py-3 transition-colors duration-200 cursor-pointer shadow-md disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ background: accent, color: btnFg }}
                >
                  {isSubmitting ? 'Sending…' : 'Send message'}
                  <svg className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 12 10">
                    <path d="M1 5h10M7 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
