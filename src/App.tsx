import { useState } from 'react'
import { ThemeContext } from './ThemeContext'
import Nav from './components/Nav'
import IntroFlow from './components/IntroFlow'
import Work from './components/Work'
import CareerTimeline from './components/CareerTimeline'
import TechStack from './components/TechStack'
import Process from './components/Process'
import Experience from './components/Experience'
import ResumeCTA from './components/ResumeCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudy from './components/CaseStudy'

import evCarePDF from '@/imports/Desktop_-_1.pdf?url'
import bloodSyncPDF from '@/imports/1.pdf?url'

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  problem: string
  solution: string
  category: string
  role: string
  year: string
  duration: string
  platform: string
  tools: string[]
  image: string
  accentColor: string
  liveUrl: string
  pdfUrl: string
}

export const projects: Project[] = [
  {
    id: 'evcare',
    title: 'EVCare',
    subtitle: 'Predictive Care for Modern EV Drivers',
    description:
      'Designing a personalized platform that helps EV drivers monitor vehicle health and prevent unexpected failures — through a clear dashboard, smart charging insights, and predictive maintenance alerts.',
    problem:
      'New EV adopters lack the experience to properly manage and maintain their vehicles. Users feel uncertain about battery health, charging habits, and maintenance needs — leading to inefficient vehicle care and overlooked warning signs.',
    solution:
      'A platform providing a vehicle health dashboard, battery and efficiency metrics, charging insights, predictive service alerts, and personalized EV care recommendations to help users confidently manage their vehicles.',
    category: 'UX Case Study · Web Platform',
    role: 'UI/UX Designer',
    year: '2025',
    duration: '4 Weeks',
    platform: 'Web',
    tools: ['Figma', 'Adobe XD', 'Poppins'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1400&h=900&fit=crop&auto=format',
    accentColor: '#FF7A59',
    liveUrl: 'https://ev-care-nshp.vercel.app/',
    pdfUrl: evCarePDF,
  },
  {
    id: 'bloodsync',
    title: 'BloodSync',
    subtitle: 'Smart Blood Bank Prediction System',
    description:
      'An AI-powered healthcare platform designed to streamline donor outreach and optimize blood inventory management — connecting hospitals and blood banks through predictive insights and a unified dashboard.',
    problem:
      'Blood banks manually contact large donor pools with uncertain response rates, while hospitals identify shortages only when inventory hits critical levels. Communication between facilities is fragmented and time-consuming.',
    solution:
      'Intelligent donor prediction, real-time blood stock monitoring, and centralized dashboards give hospitals and blood banks the tools to act proactively — reducing response time and improving emergency coordination.',
    category: 'UX Case Study · Desktop Platform',
    role: 'UI/UX Designer',
    year: '2026',
    duration: '6 Weeks',
    platform: 'Desktop',
    tools: ['Figma', 'Miro', 'Notion', 'Inter'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&h=900&fit=crop&auto=format',
    accentColor: '#6347D8',
    liveUrl: 'https://bloodsync-ui.vercel.app/',
    pdfUrl: bloodSyncPDF,
  },
]

export default function App() {
  const [activePage, setActivePage] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(d => {
      const next = !d
      document.documentElement.classList.toggle('light', !next)
      return next
    })
  }

  const navigateTo = (page: string | null) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  if (activePage) {
    const project = projects.find((p) => p.id === activePage)
    if (project) {
      return <CaseStudy project={project} onBack={() => navigateTo(null)} />
    }
  }

  return (
    <ThemeContext.Provider value={isDark}>
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#121116] text-[#F8F7FC]' : 'bg-[#F4F3F9] text-[#121116]'}`}>
      <Nav onNavigate={navigateTo} />
      <main>
        <IntroFlow isDark={isDark} onToggleTheme={toggleTheme} />
        <Work projects={projects} onOpenProject={navigateTo} />
        <CareerTimeline />
        <TechStack />
        <Process />
        <Experience />
        <ResumeCTA />
        <Contact />
      </main>
      <Footer />
    </div>
    </ThemeContext.Provider>
  )
}
