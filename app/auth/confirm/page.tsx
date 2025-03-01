'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'
import { toast } from 'sonner'

// Define a type for the debug info
interface DebugInfo {
  urlParams?: Record<string, string>;
  hashPresent?: boolean;
  hashLength?: number;
  error?: string;
  accessTokenPresent?: boolean;
  refreshTokenPresent?: boolean;
  expiresInPresent?: boolean;
  accessTokenLength?: number;
  refreshTokenLength?: number;
  sessionError?: string;
  noUserData?: boolean;
  sessionSet?: boolean;
  userEmail?: string;
  verificationError?: string;
  noSessionAfterSet?: boolean;
  sessionVerified?: boolean;
  noAccessToken?: boolean;
  noHashFragment?: boolean;
  delayedCheckError?: string;
  sessionFoundAfterDelay?: boolean;
  noSessionAfterDelay?: boolean;
  catchError?: string;
  stack?: string;
}

export default function AuthConfirmPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null)

  useEffect(() => {
    // Initialize once on component mount
    console.log('Auth confirm page mounted')
    setInitialized(true)
    
    // Log URL parameters for debugging
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const params = Object.fromEntries(url.searchParams.entries())
      if (Object.keys(params).length > 0) {
        console.log('URL parameters:', params)
        setDebugInfo(prev => ({ ...prev, urlParams: params }))
      }
      
      // Check for hash fragments
      if (window.location.hash) {
        console.log('Hash fragment detected:', window.location.hash)
        setDebugInfo(prev => ({ ...prev, hashPresent: true, hashLength: window.location.hash.length }))
      }
    }
    
    return () => {
      console.log('Auth confirm page unmounted')
    }
  }, [])

  useEffect(() => {
    if (!initialized) return

    // Check for the hash fragment in the URL
    const handleHashFragment = async () => {
      try {
        // Get the browser client
        const browserClient = createBrowserClient()
        if (!browserClient) {
          const errorMsg = 'Browser client initialization failed'
          console.error(errorMsg)
          setError(errorMsg)
          setDebugInfo(prev => ({ ...prev, error: errorMsg }))
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
          const expiresIn = hashParams.get('expires_in')
          
          console.log('Access token present:', !!accessToken)
          console.log('Refresh token present:', !!refreshToken)
          console.log('Expires in present:', !!expiresIn)
          
          setDebugInfo(prev => ({ 
            ...prev, 
            accessTokenPresent: !!accessToken,
            refreshTokenPresent: !!refreshToken,
            expiresInPresent: !!expiresIn,
            accessTokenLength: accessToken ? accessToken.length : 0,
            refreshTokenLength: refreshToken ? refreshToken.length : 0
          }))
          
          if (accessToken) {
            // Set the session using the hash parameters
            console.log('Setting session with access token')
            const { data, error } = await browserClient.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            })
            
            if (error) {
              console.error('Error setting session:', error)
              setError(`Error setting session: ${error.message}`)
              setDebugInfo(prev => ({ ...prev, sessionError: error.message }))
              throw error
            }
            
            if (!data || !data.user) {
              console.error('No user data returned from setSession')
              setError('No user data returned')
              setDebugInfo(prev => ({ ...prev, noUserData: true }))
              throw new Error('No user data returned from setSession')
            }
            
            const userEmail = data.user.email || 'unknown'
            console.log('Session set successfully, user:', userEmail)
            setDebugInfo(prev => ({ ...prev, sessionSet: true, userEmail }))
            
            // Verify the session was set by getting the session
            console.log('Verifying session...')
            const { data: { session }, error: sessionError } = await browserClient.auth.getSession()
            
            if (sessionError) {
              console.error('Error getting session after setting:', sessionError)
              setError(`Error verifying session: ${sessionError.message}`)
              setDebugInfo(prev => ({ ...prev, verificationError: sessionError.message }))
              throw sessionError
            }
            
            if (!session) {
              console.error('No session found after setting')
              setError('Failed to persist session')
              setDebugInfo(prev => ({ ...prev, noSessionAfterSet: true }))
              throw new Error('Failed to persist session')
            }
            
            console.log('Session verified, user:', session.user.email)
            setDebugInfo(prev => ({ ...prev, sessionVerified: true }))
            
            toast.success('Successfully signed in')
            
            // Small delay to ensure cookies are set before redirect
            console.log('Waiting before redirect to ensure cookies are set...')
            setTimeout(() => {
              console.log('Redirecting to invoice page')
              router.push('/invoice')
            }, 1000)
          } else {
            // No access token found, redirect to home
            console.warn('No access token found in hash fragment')
            setError('No access token found')
            setDebugInfo(prev => ({ ...prev, noAccessToken: true }))
            setTimeout(() => {
              router.push('/')
            }, 2000)
          }
        } else {
          // No hash fragment, let the server-side handler work
          console.log('No hash fragment found, waiting for server-side handler...')
          setDebugInfo(prev => ({ ...prev, noHashFragment: true }))
          
          // After a short delay, check if we have a session
          setTimeout(async () => {
            console.log('Checking for session after delay...')
            const { data: { session }, error: sessionError } = await browserClient.auth.getSession()
            
            if (sessionError) {
              console.error('Error checking session:', sessionError)
              setError(`Error checking session: ${sessionError.message}`)
              setDebugInfo(prev => ({ ...prev, delayedCheckError: sessionError.message }))
              setTimeout(() => {
                router.push('/')
              }, 2000)
              return
            }
            
            if (session) {
              console.log('Session found, redirecting to invoice page')
              setDebugInfo(prev => ({ ...prev, sessionFoundAfterDelay: true }))
              router.push('/invoice')
            } else {
              console.warn('No session found after delay')
              setError('Authentication failed')
              setDebugInfo(prev => ({ ...prev, noSessionAfterDelay: true }))
              setTimeout(() => {
                router.push('/')
              }, 2000)
            }
            
            setIsProcessing(false)
          }, 2000)
        }
      } catch (error: any) {
        console.error('Error handling auth callback:', error)
        setError(`Failed to sign in: ${error.message || 'Unknown error'}`)
        setDebugInfo(prev => ({ ...prev, catchError: error.message, stack: error.stack }))
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {isProcessing ? 'Signing you in...' : error ? 'Authentication Error' : 'Authentication Complete'}
        </h1>
        <p className="mb-4">
          {isProcessing 
            ? 'Please wait while we complete the authentication process.' 
            : error 
              ? `Error: ${error}. Redirecting to home page...` 
              : 'Redirecting to invoice page...'}
        </p>
        
        {/* Debug information for troubleshooting */}
        {debugInfo && (
          <div className="mt-8 text-left p-4 bg-gray-100 rounded text-xs overflow-auto max-h-60">
            <h3 className="font-bold mb-2">Debug Information:</h3>
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
} 