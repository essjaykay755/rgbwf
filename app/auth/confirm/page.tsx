'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'
import { toast } from 'sonner'

export default function AuthConfirmPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    // Initialize once on component mount
    setInitialized(true)
  }, [])

  useEffect(() => {
    if (!initialized) return

    // Check for the hash fragment in the URL
    const handleHashFragment = async () => {
      try {
        // Get the browser client
        const browserClient = createBrowserClient()
        if (!browserClient) {
          setError('Browser client initialization failed')
          return
        }

        console.log('Auth confirm page loaded, checking for hash fragment')
        setIsProcessing(true)
        
        // If we have a hash fragment, try to parse it
        if (window.location.hash) {
          console.log('Hash fragment found:', window.location.hash)
          
          // The hash includes the # character, so we need to remove it
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1)
          )
          
          // Check if we have an access_token, which indicates a successful login
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          
          console.log('Access token present:', !!accessToken)
          
          if (accessToken) {
            // Set the session using the hash parameters
            console.log('Setting session with access token')
            const { data, error } = await browserClient.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            })
            
            if (error) {
              console.error('Error setting session:', error)
              throw error
            }
            
            console.log('Session set successfully, user:', data.user)
            
            // Get the user to verify the session was set
            const { data: { user }, error: getUserError } = await browserClient.auth.getUser()
            
            if (getUserError) {
              console.error('Error getting user after setting session:', getUserError)
              throw getUserError
            }
            
            console.log('User retrieved successfully:', user)
            
            toast.success('Successfully signed in')
            router.push('/invoice')
          } else {
            // No access token found, redirect to home
            console.warn('No access token found in hash fragment')
            setError('No access token found')
            router.push('/')
          }
        } else {
          // No hash fragment, let the server-side handler work
          console.log('No hash fragment found, waiting for server-side handler...')
          
          // After a short delay, check if we have a session
          setTimeout(async () => {
            const { data: { session }, error: sessionError } = await browserClient.auth.getSession()
            
            if (sessionError) {
              console.error('Error checking session:', sessionError)
              setError('Error checking session')
              return
            }
            
            if (session) {
              console.log('Session found, redirecting to invoice page')
              router.push('/invoice')
            } else {
              console.warn('No session found after delay')
              setError('Authentication failed')
              setTimeout(() => {
                router.push('/')
              }, 3000)
            }
            
            setIsProcessing(false)
          }, 2000)
        }
      } catch (error) {
        console.error('Error handling auth callback:', error)
        setError('Failed to sign in')
        toast.error('Failed to sign in')
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } finally {
        setIsProcessing(false)
      }
    }

    handleHashFragment()
  }, [router, initialized])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          {isProcessing ? 'Signing you in...' : error ? 'Authentication Error' : 'Authentication Complete'}
        </h1>
        <p>
          {isProcessing 
            ? 'Please wait while we complete the authentication process.' 
            : error 
              ? `Error: ${error}. Redirecting to home page...` 
              : 'Redirecting to invoice page...'}
        </p>
      </div>
    </div>
  )
} 