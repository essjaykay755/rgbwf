'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function AuthConfirmPage() {
  const router = useRouter()

  useEffect(() => {
    // Check for the hash fragment in the URL
    const handleHashFragment = async () => {
      try {
        // If we have a hash fragment, try to parse it
        if (window.location.hash) {
          // The hash includes the # character, so we need to remove it
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          )
          
          // Check if we have an access_token, which indicates a successful login
          const accessToken = hashParams.get('access_token')
          
          if (accessToken) {
            // Set the session using the hash parameters
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: hashParams.get('refresh_token') || '',
            })
            
            if (error) {
              throw error
            }
            
            toast.success('Successfully signed in')
            router.push('/invoice')
          } else {
            // No access token found, redirect to home
            router.push('/')
          }
        } else {
          // No hash fragment, let the server-side handler work
          console.log('No hash fragment found, waiting for server-side handler...')
        }
      } catch (error) {
        console.error('Error handling auth callback:', error)
        toast.error('Failed to sign in')
        router.push('/')
      }
    }

    handleHashFragment()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Signing you in...</h1>
        <p>Please wait while we complete the authentication process.</p>
      </div>
    </div>
  )
} 