'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Campaigns from "@/components/Campaigns"
import Team from "@/components/Team"
import FAQ from "@/components/FAQ"
import VideoSection from "@/components/VideoSection"
import { toast } from 'sonner'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check for authentication errors in URL
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const errorParam = url.searchParams.get('error')
      
      if (errorParam) {
        switch (errorParam) {
          case 'auth':
            toast.error('Authentication failed')
            break
          case 'auth_exception':
            toast.error('Authentication process error')
            break
          case 'no_code':
            toast.error('No authentication code received')
            break
          case 'unauthorized':
            toast.error('You do not have permission to access the invoice generator. Only authorized accounts can access this feature.')
            break
          default:
            toast.error('Login failed')
        }
        
        // Remove the error parameter from the URL
        url.searchParams.delete('error')
        window.history.replaceState({}, '', url.toString())
      }
    }
  }, [])

  useEffect(() => {
    // Check for hash fragments that might indicate an auth callback
    if (typeof window !== 'undefined' && window.location.hash && 
        window.location.hash.includes('access_token')) {
      
      // Initialize Supabase client directly
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
          }
        }
      )
      
      // Let Supabase handle the hash fragment
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          // If the user is authorized, redirect to invoice page
          if (session.user.email === 'rgbwfoundation@gmail.com') {
            router.push('/invoice')
          }
        }
      })
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

