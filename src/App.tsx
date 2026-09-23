import Nav from './components/Nav'
import Hero from './components/Hero'
import AriaSection from './components/AriaSection'
import MarqueeSection from './components/creator/MarqueeSection'
import AboutSection from './components/creator/AboutSection'
import ServicesSection from './components/creator/ServicesSection'
import ProjectsSection from './components/creator/ProjectsSection'
import FooterHeroSection from './components/creator/FooterHeroSection'

function App() {
  return (
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <Nav />
      <Hero />
      <AriaSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <FooterHeroSection />
    </main>
  )
}

export default App
