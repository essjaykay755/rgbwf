import { supabase } from './supabase'

/**
 * Debug utility to check the current authentication state
 * This can be called from any component to log the current session state
 */
export async function debugAuthState() {
  if (typeof window === 'undefined') {
    console.log('Debug: Running on server, no auth state available')
    return
  }

  try {
    console.log('Debug: Checking auth state...')
    
    // Check local storage
    const localStorageKeys = Object.keys(localStorage)
      .filter(key => key.includes('supabase') || key.includes('auth'))
    
    console.log('Debug: Local storage auth-related keys:', localStorageKeys)
    
    // Check session from Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Debug: Error getting session:', sessionError)
    } else if (session) {
      console.log('Debug: Session exists:', {
        user: session.user.email,
        expires_at: new Date(session.expires_at! * 1000).toISOString(),
        is_expired: Date.now() > session.expires_at! * 1000,
      })
    } else {
      console.log('Debug: No session found')
    }
    
    // Check user from Supabase
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Debug: Error getting user:', userError)
    } else if (user) {
      console.log('Debug: User exists:', {
        id: user.id,
        email: user.email,
        created_at: user.created_at,
      })
    } else {
      console.log('Debug: No user found')
    }
  } catch (error) {
    console.error('Debug: Exception during auth state check:', error)
  }
} 