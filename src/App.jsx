import TopNav from './components/TopNav.jsx'
import Hero from './components/Hero.jsx'
import DemoSection from './components/DemoSection.jsx'
import WhatIsNiki from './components/WhatIsNiki.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Compare from './components/Compare.jsx'
import Install from './components/Install.jsx'
import AudienceCli from './components/AudienceCli.jsx'
import Shipped from './components/Shipped.jsx'
import ProductHunt from './components/ProductHunt.jsx'
import Pricing from './components/Pricing.jsx'
import Faq from './components/Faq.jsx'
import CtaStrip from './components/CtaStrip.jsx'
import BrandLogo from './components/BrandLogo.jsx'
import Footer from './components/Footer.jsx'
import { Seo } from './seo.jsx'

export default function App() {
  return (
    <>
      <Seo
        title="Niki · Multi-agent coding pipeline that ships verified pull requests"
        description="Four independent LLM agents plan, code, test, and review in hermetic sandboxes — then hand you a verified niki/<id> branch with a full audit trail. Open source, BYOK, no telemetry."
        path="/"
      />
      <TopNav />
      <main id="content">
        <a id="top" aria-hidden="true" tabIndex={-1} />
        <Hero />
        <DemoSection />
        <WhatIsNiki />
        <HowItWorks />
        <Compare />
        <Install />
        <AudienceCli />
        <Shipped />
        <ProductHunt />
        <Pricing />
        <Faq />
        <CtaStrip />
        <BrandLogo />
      </main>
      <Footer />
    </>
  )
}
