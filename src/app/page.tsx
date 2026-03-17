import { HeroSection }       from '@/components/sections/HeroSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { FeaturesSection }   from '@/components/sections/FeaturesSection'
import { FooterSection }     from '@/components/sections/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FooterSection />
    </main>
  )
}
