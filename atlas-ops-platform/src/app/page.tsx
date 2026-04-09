import Nav from '@/components/landing/Nav'
import Hero from '@/components/landing/Hero'
import Problem from '@/components/landing/Problem'
import Agents from '@/components/landing/Agents'
import HowItWorks from '@/components/landing/HowItWorks'
import Pricing from '@/components/landing/Pricing'
import Proof from '@/components/landing/Proof'
import FinalCta from '@/components/landing/FinalCta'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Problem />
      <Agents />
      <HowItWorks />
      <Pricing />
      <Proof />
      <FinalCta />
      <Footer />
    </main>
  )
}
