'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { debugAuthState } from '@/lib/debug'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, isAuthorized } = useAuth()
  const router = useRouter()
  
  // Get the redirectTo from the URL directly
  const getRedirectTo = () => {
    if (typeof window === 'undefined') return '/invoice'
    const params = new URLSearchParams(window.location.search)
    return params.get('redirectTo') || '/invoice'
  }
  
  const redirectTo = getRedirectTo()
  
  useEffect(() => {
    // Debug auth state on component mount
    debugAuthState().catch(error => {
      console.error('Error in debug auth state:', error)
    })
    
    // If already authenticated and authorized, redirect to the target page
    if (isAuthenticated && isAuthorized) {
      console.log('Login page: User already logged in, redirecting to:', redirectTo)
      router.push(redirectTo)
    }
  }, [isAuthenticated, isAuthorized, redirectTo, router])

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      console.log('Login page: Starting Google OAuth flow with redirect to:', redirectTo)
      
      // Construct the callback URL with the redirectTo parameter
      const callbackUrl = new URL('/auth/callback', window.location.origin)
      callbackUrl.searchParams.set('redirectTo', redirectTo)
      
      // Simple direct OAuth call
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      
      if (error) {
        console.error('Error initiating OAuth flow:', error)
        setError(error.message)
        setIsLoading(false)
      }
      
      // The OAuth flow will handle the redirect, so we don't need to do anything else
    } catch (error: any) {
      console.error('Exception during login:', error)
      setError(error?.message || 'An unexpected error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <p className="text-gray-600">Please sign in to access the invoice generation system</p>
        {redirectTo && (
          <p className="text-sm text-gray-500 mt-2">
            You will be redirected to: {redirectTo}
          </p>
        )}
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <button 
        onClick={handleLogin}
        disabled={isLoading}
        className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
      >
        {isLoading ? (
          'Connecting to Google...'
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            Sign in with Google
          </>
        )}
      </button>
    </div>
  )
} 