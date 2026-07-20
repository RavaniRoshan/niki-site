import TopNav from './components/TopNav.jsx'
import Hero from './components/Hero.jsx'
import WhatIsNiki from './components/WhatIsNiki.jsx'
import Pipeline from './components/Pipeline.jsx'
import Compare from './components/Compare.jsx'
import Install from './components/Install.jsx'
import AudienceCli from './components/AudienceCli.jsx'
import Shipped from './components/Shipped.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import CtaStrip from './components/CtaStrip.jsx'
import BrandLogo from './components/BrandLogo.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <TopNav />
      <main id="content">
        <Hero />
        <WhatIsNiki />
        <Pipeline />
        <Compare />
        <Install />
        <AudienceCli />
        <Shipped />
        <Pricing />
        <Faq />
        <CtaStrip />
        <BrandLogo />
      </main>
      <Footer />
    </>
  )
}
