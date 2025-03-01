'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase, debugStorage } from '@/lib/supabase'
import { User, Session } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'
import { debugAuthState } from '@/lib/debug'

// Define the auth context type
type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isAuthorized: boolean
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
  isAuthorized: false,
  signOut: async () => {},
  refreshSession: async () => {}
})

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if the user is authorized (has the correct email)
  const isAuthorized = user?.email === 'rgbwfoundation@gmail.com'
  
  // Check if the user is authenticated (has a session)
  const isAuthenticated = !!session

  // Function to refresh the session
  const refreshSession = async () => {
    try {
      console.log('AuthProvider: Manually refreshing session')
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error refreshing session:', error)
        return
      }
      
      if (session) {
        console.log('AuthProvider: Session refreshed successfully', session.user.email)
        setSession(session)
        setUser(session.user)
      } else {
        console.log('AuthProvider: No session found after refresh')
      }
    } catch (error) {
      console.error('Exception refreshing session:', error)
    }
  }

  useEffect(() => {
    // Debug auth state on component mount
    debugAuthState().catch(error => {
      console.error('Error in debug auth state:', error)
    })

    // Initial session check
    const checkSession = async () => {
      try {
        console.log('AuthProvider: Checking initial session')
        debugStorage() // Log storage state
        
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error checking session in AuthProvider:', error)
          setIsLoading(false)
          return
        }
        
        if (session) {
          console.log('AuthProvider: Session found', session.user.email)
          setSession(session)
          setUser(session.user)
        } else {
          console.log('AuthProvider: No session found')
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error('Exception checking session in AuthProvider:', error)
        setIsLoading(false)
      }
    }

    checkSession()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state changed:', event)
        
        setSession(session)
        setUser(session?.user || null)
        
        if (event === 'SIGNED_IN') {
          console.log('AuthProvider: User signed in', session?.user?.email)
          debugStorage() // Log storage after sign in
        } else if (event === 'SIGNED_OUT') {
          console.log('AuthProvider: User signed out')
          debugStorage() // Log storage after sign out
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('AuthProvider: Token refreshed')
        } else if (event === 'USER_UPDATED') {
          console.log('AuthProvider: User updated')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Handle sign out
  const handleSignOut = async () => {
    try {
      console.log('AuthProvider: Signing out user')
      const { error } = await supabase.auth.signOut({ scope: 'global' })
      
      if (error) {
        console.error('Error signing out:', error)
        throw error
      }
      
      // Clear session state
      setUser(null)
      setSession(null)
      
      // Redirect to home page
      router.push('/')
    } catch (error) {
      console.error('Exception signing out:', error)
      throw error
    }
  }

  // Provide the auth context to children
  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated,
        isAuthorized,
        signOut: handleSignOut,
        refreshSession
      }}
    >
      {children}
    </AuthContext.Provider>
  )
} 