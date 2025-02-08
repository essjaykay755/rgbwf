import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Campaigns from "@/components/Campaigns"
import Team from "@/components/Team"
import FAQ from "@/components/FAQ"
import VideoSection from "@/components/VideoSection"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <VideoSection />
      <Features />
      <Campaigns />
      <Team />
      <FAQ />
    </main>
  )
}

