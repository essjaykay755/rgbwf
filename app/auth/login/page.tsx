'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// Create a client component that uses useSearchParams
function LoginContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/invoice'
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasRedirected, setHasRedirected] = useState(false)

  useEffect(() => {
    // Prevent multiple redirects
    if (hasRedirected) return
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session) {
          setIsLoggedIn(true)
          
          // If already logged in, redirect to the target page
          if (session.user.email === 'rgbwfoundation@gmail.com') {
            setHasRedirected(true)
            window.location.href = redirectTo
          } else {
            // If not authorized, redirect to home
            setHasRedirected(true)
            window.location.href = '/'
          }
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [redirectTo, hasRedirected])

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?redirectTo=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error logging in:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>
        <p className="text-gray-600">Please sign in to access the invoice generation system</p>
      </div>
      
      <button 
        onClick={handleLogin}
        className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 px-4 py-2 rounded-md"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
            <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
            <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
            <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
            <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
          </g>
        </svg>
        Sign in with Google
      </button>
    </div>
  )
}

// Loading fallback for Suspense
function LoginFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading login page...</p>
    </div>
  )
}

// Main page component with Suspense boundary
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  )
} 