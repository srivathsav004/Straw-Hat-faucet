import { Navbar } from "@/components/shared/navbar"
import { ScrollProgress } from "@/components/shared/scroll-progress"
import { HeroSection } from "@/components/sections/hero"
import { FeaturesSection } from "@/components/sections/features"
import { SupportedNetworksSection } from "@/components/sections/supported-networks"
import { HowItWorksSection } from "@/components/sections/how-it-works"
import { CTASection } from "@/components/sections/cta-section"
import { FAQSection } from "@/components/sections/faq"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SupportedNetworksSection />
      <HowItWorksSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  )
}
