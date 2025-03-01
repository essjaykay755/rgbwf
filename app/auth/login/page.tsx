'use client'

import { useState, useEffect, Suspense } from 'react'
import { LoginButton } from '@/components/ui/LoginButton'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserClient, getSession, signOut } from '@/lib/supabase'
import { toast } from 'sonner'

// Component to handle search params separately
function LoginErrorHandler() {
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Check for error parameters
    const errorParam = searchParams?.get('error')
    if (errorParam) {
      switch (errorParam) {
        case 'auth':
          toast.error('Authentication failed. Please try again.')
          break
        case 'auth_exception':
          toast.error('There was a problem with the authentication process. Please try again.')
          break
        case 'no_code':
          // Don't show error for no_code when there's a hash fragment
          if (typeof window !== 'undefined' && !window.location.hash.includes('access_token')) {
            toast.error('No authentication code received. Please try again.')
          }
          break
        case 'no_session':
          toast.error('Failed to create a session. Please try again.')
          break
        default:
          toast.error('Login failed. Please try again.')
      }
    }
  }, [searchParams])
  
  return null
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        console.log('Checking authentication in login page')
        
        // If we have a hash fragment with access_token, let the LoginButton component handle it
        if (typeof window !== 'undefined' && window.location.hash && window.location.hash.includes('access_token')) {
          console.log('Hash fragment detected in login page, letting LoginButton handle it')
          setIsLoading(false)
          return
        }
        
        // Initialize the browser client
        const supabase = createBrowserClient()
        if (!supabase) {
          console.error('Failed to initialize Supabase client')
          setIsLoading(false)
          return
        }
        
        // Get the current session
        const session = await getSession()
        
        if (session && session.user) {
          console.log('Session found, user:', session.user.email)
          
          // If the user is authorized, redirect to invoice page
          if (session.user.email === 'rgbwfoundation@gmail.com') {
            console.log('User is authorized, redirecting to invoice page')
            router.push('/invoice')
            return
          } else {
            console.log('User not authorized, signing out')
            toast.error('You do not have permission to access the invoice page')
            
            try {
              // Sign out the unauthorized user
              await signOut()
              console.log('Successfully signed out unauthorized user');
            } catch (signOutError) {
              console.error('Error signing out unauthorized user:', signOutError);
            }
          }
        } else {
          console.log('No active session found');
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Loading authentication status...</p>
        <p className="text-sm text-gray-500">Please wait while we verify your session</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      {/* Wrap the component that uses useSearchParams in Suspense */}
      <Suspense fallback={null}>
        <LoginErrorHandler />
      </Suspense>
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center mb-6">Invoice Generator Login</h1>
        <p className="text-gray-600 mb-8 text-center">
          Please sign in with the authorized Google account to access the invoice generator.
        </p>
        <LoginButton />
        <p className="text-xs text-gray-500 text-center mt-6">
          Note: Only the rgbwfoundation@gmail.com account is authorized to access the invoice generator.
        </p>
      </div>
    </div>
  )
} 