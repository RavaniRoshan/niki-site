import TopNav from './components/TopNav.jsx'
import Hero from './components/Hero.jsx'
import WhatIsNiki from './components/WhatIsNiki.jsx'
import Demo from './components/Demo.jsx'
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
        title="Niki · AI coding agents that ship reviewable pull requests"
        description="Niki is a hermetic multi-agent AI coding system where Planner, Coder, Tester, and Reviewer agents collaborate in a sandbox and deliver a clean pull request branch."
        path="/"
      />
      <TopNav />
      <main id="content">
        <a id="top" aria-hidden="true" tabIndex={-1} />
        <Hero />
        <WhatIsNiki />
        <Demo />
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
