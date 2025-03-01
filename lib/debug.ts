import { supabase, debugStorage } from './supabase'

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
    
    // Check storage (localStorage and cookies)
    debugStorage()
    
    // Check session from Supabase
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Debug: Error getting session:', sessionError)
    } else if (session) {
      console.log('Debug: Session exists:', {
        user: session.user.email,
        expires_at: new Date(session.expires_at! * 1000).toISOString(),
        is_expired: Date.now() > session.expires_at! * 1000,
        access_token_length: session.access_token?.length || 0,
        refresh_token_length: session.refresh_token?.length || 0,
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
    
    // Check middleware verification cookie
    const middlewareVerified = document.cookie
      .split(';')
      .some(cookie => cookie.trim().startsWith('middleware_verified='))
    
    console.log('Debug: Middleware verification cookie exists:', middlewareVerified)
    
    // Check if running in production or development
    console.log('Debug: Environment:', {
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
      hostname: window.location.hostname,
    })
    
    return {
      hasSession: !!session,
      hasUser: !!user,
      middlewareVerified,
    }
  } catch (error) {
    console.error('Debug: Exception during auth state check:', error)
    return {
      hasSession: false,
      hasUser: false,
      middlewareVerified: false,
      error,
    }
  }
} 