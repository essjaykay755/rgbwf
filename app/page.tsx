'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Campaigns from "@/components/Campaigns"
import Team from "@/components/Team"
import FAQ from "@/components/FAQ"
import VideoSection from "@/components/VideoSection"

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Initialize once on component mount
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (!initialized) return

    const handleAuth = async () => {
      // Get the browser client
      const browserClient = createBrowserClient()
      if (!browserClient) return

      // Check for hash fragments that might indicate an auth callback
      if (typeof window !== 'undefined' && window.location.hash && 
          window.location.hash.includes('access_token')) {
        console.log('Auth hash fragment detected on home page, redirecting to auth confirm')
        
        // Check if we're coming from a failed auth attempt
        const url = new URL(window.location.href)
        const errorParam = url.searchParams.get('error')
        
        if (errorParam) {
          console.warn('Error parameter detected:', errorParam)
        }
        
        // Redirect to the auth confirm page to handle the hash fragment
        router.push(`/auth/confirm${window.location.hash}`)
        return
      }

      // Check if we have a session already
      try {
        const { data: { session }, error } = await browserClient.auth.getSession()
        
        if (error) {
          console.error('Error checking session on home page:', error)
          return
        }
        
        if (session) {
          console.log('Session found on home page, user:', session.user.email)
          
          // If the user is authorized, redirect to invoice page
          if (session.user.email === 'rgbwfoundation@gmail.com') {
            console.log('Authorized user, redirecting to invoice page')
            router.push('/invoice')
          }
        } else {
          console.log('No session found on home page')
        }
      } catch (error) {
        console.error('Exception checking session on home page:', error)
      }
    }
    
    handleAuth()
  }, [router, initialized])

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

