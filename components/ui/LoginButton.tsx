import { createClient } from '@supabase/supabase-js'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createHashFragmentClient } from '@/lib/supabase'

export function LoginButton() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()

  // Check for hash fragments on component mount
  useEffect(() => {
    const handleHashFragment = async () => {
      // If we have a hash fragment with access_token, we need to handle it
      if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('access_token')) {
        console.log('Hash fragment with access token detected')
        
        try {
          setIsLoggingIn(true)
          console.log('Processing hash fragment login')
          
          // Extract the access token from the hash
          const hashParams = new URLSearchParams(
            window.location.hash.substring(1) // remove the # character
          )
          const accessToken = hashParams.get('access_token')
          const refreshToken = hashParams.get('refresh_token')
          
          if (!accessToken) {
            console.error('No access token found in hash fragment')
            toast.error('Authentication failed: No access token found')
            return
          }
          
          console.log('Access token found in hash fragment')
          
          // Redirect to our hash route handler with the tokens as query parameters
          const hashRoute = `/auth/hash?access_token=${encodeURIComponent(accessToken)}${refreshToken ? `&refresh_token=${encodeURIComponent(refreshToken)}` : ''}`
          console.log('Redirecting to hash route:', hashRoute)
          
          // Use window.location for a full page reload to ensure clean state
          window.location.href = hashRoute
        } catch (error: any) {
          console.error('Error processing hash login:', error)
          toast.error(`Login failed: ${error.message || 'Unknown error'}`)
          setIsLoggingIn(false)
        }
      }
    }
    
    handleHashFragment()
  }, [router])

  const handleLogin = async () => {
    try {
      setIsLoggingIn(true)
      console.log('Starting login process')
      
      // Get environment variables
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase environment variables are not set')
      }
      
      // Initialize Supabase client directly
      const supabase = createClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false, // Disable auto detection for initial login
          }
        }
      )
      
      // Clear any existing session first
      console.log('Clearing any existing session')
      await supabase.auth.signOut()
      
      // Get the current origin for the redirect URL
      const origin = window.location.origin
      console.log('Current origin:', origin)
      
      // Create the redirect URL
      const redirectUrl = `${origin}/auth/callback`
      console.log('Redirect URL:', redirectUrl)
      
      // Use OAuth for Google sign-in
      console.log('Initiating OAuth login with Google')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        },
      })
      
      if (error) {
        console.error('Error initiating OAuth login:', error)
        toast.error(`Failed to start login process: ${error.message}`)
        throw error
      }
      
      if (!data || !data.url) {
        console.error('No URL returned from signInWithOAuth')
        toast.error('Failed to generate authentication URL')
        throw new Error('No URL returned from signInWithOAuth')
      }
      
      console.log('OAuth login initiated successfully, URL:', data.url)
      
      // Redirect the browser
      window.location.href = data.url
    } catch (error: any) {
      console.error('Error logging in:', error)
      toast.error(`Login failed: ${error.message || 'Unknown error'}`)
    } finally {
      setIsLoggingIn(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Button 
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 w-full justify-center py-6"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
          </g>
        </svg>
        {isLoggingIn ? 'Signing in...' : 'Sign in with Google'}
      </Button>
      <p className="text-xs text-gray-500 text-center mt-2">
        Only authorized accounts can access the invoice generator
      </p>
    </div>
  )
} 