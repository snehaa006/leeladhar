import { Disclaimer } from './Disclaimer'
import { Clients } from './sections/Clients'
import { Contact } from './sections/Contact'
import { Faq } from './sections/Faq'
import { Firm } from './sections/Firm'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Nav } from './sections/Nav'
import { Practice } from './sections/Practice'
import { Process } from './sections/Process'
import { Solutions } from './sections/Solutions'
import { Team } from './sections/Team'

export function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <div id="top" />
        <Hero />
        <Firm />
        <Solutions />
        <Practice />
        <Process />
        <Team />
        <Clients />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Disclaimer />
    </>
  )
}
