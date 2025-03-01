'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient, getSession } from '@/lib/supabase'
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Campaigns from "@/components/Campaigns"
import Team from "@/components/Team"
import FAQ from "@/components/FAQ"
import VideoSection from "@/components/VideoSection"
import { toast } from 'sonner'

export default function Home() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    // Initialize once on component mount
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (!initialized) return

    const handleAuth = async () => {
      setIsCheckingAuth(true)
      
      try {
        // Get the browser client
        const browserClient = createBrowserClient()
        if (!browserClient) {
          console.error('Browser client initialization failed on home page')
          setIsCheckingAuth(false)
          return
        }

        // Check for hash fragments that might indicate an auth callback
        if (typeof window !== 'undefined' && window.location.hash && 
            window.location.hash.includes('access_token')) {
          console.log('Auth hash fragment detected on home page, redirecting to auth confirm')
          
          // Check if we're coming from a failed auth attempt
          const url = new URL(window.location.href)
          const errorParam = url.searchParams.get('error')
          
          if (errorParam) {
            console.warn('Error parameter detected:', errorParam)
            toast.error('Authentication error detected')
          }
          
          // Redirect to the auth confirm page to handle the hash fragment
          router.push(`/auth/confirm${window.location.hash}`)
          return
        }

        // Check if we have a session already
        const session = await getSession()
        
        if (session) {
          console.log('Session found on home page, user:', session.user.email)
          
          // If the user is authorized, redirect to invoice page
          if (session.user.email === 'rgbwfoundation@gmail.com') {
            console.log('Authorized user, redirecting to invoice page')
            router.push('/invoice')
          }
        } else {
          console.log('No session found on home page')
          
          // Check for error parameters in the URL
          if (typeof window !== 'undefined') {
            const url = new URL(window.location.href)
            const errorParam = url.searchParams.get('error')
            
            if (errorParam) {
              console.warn('Error parameter detected:', errorParam)
              
              switch (errorParam) {
                case 'auth':
                  toast.error('Authentication failed')
                  break
                case 'session':
                  toast.error('Session creation failed')
                  break
                case 'no_session':
                  toast.error('No session was created')
                  break
                case 'no_code':
                  toast.error('No authentication code received')
                  break
                case 'auth_exception':
                  toast.error('Authentication process error')
                  break
                default:
                  toast.error('Login failed')
              }
              
              // Remove the error parameter from the URL
              url.searchParams.delete('error')
              window.history.replaceState({}, '', url.toString())
            }
          }
        }
      } catch (error) {
        console.error('Exception checking session on home page:', error)
      } finally {
        setIsCheckingAuth(false)
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

