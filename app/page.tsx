'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Campaigns from "@/components/Campaigns"
import Team from "@/components/Team"
import FAQ from "@/components/FAQ"
import VideoSection from "@/components/VideoSection"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check for hash fragments that might indicate an auth callback
    if (typeof window !== 'undefined' && window.location.hash && 
        window.location.hash.includes('access_token')) {
      // Redirect to the auth confirm page to handle the hash fragment
      router.push(`/auth/confirm${window.location.hash}`)
    }
  }, [router])

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Features />
      <VideoSection />
      <Campaigns />
      <Team />
      <FAQ />
    </main>
  )
}

