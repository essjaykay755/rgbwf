import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a custom Supabase client with auto-refresh sessions
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: {
      getItem: (key) => {
        if (typeof window === 'undefined') {
          return null
        }
        
        try {
          // Try to get from localStorage first
          const value = window.localStorage.getItem(key)
          if (value) {
            return JSON.parse(value)
          }
          
          // If not in localStorage, try to get from cookies
          const cookies = document.cookie.split(';')
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim()
            if (cookie.startsWith(key + '=')) {
              const cookieValue = decodeURIComponent(cookie.substring(key.length + 1))
              return JSON.parse(cookieValue)
            }
          }
          return null
        } catch (error) {
          console.error('Error reading from storage:', error)
          return null
        }
      },
      setItem: (key, value) => {
        if (typeof window !== 'undefined') {
          try {
            // Store in both localStorage and cookies for redundancy
            window.localStorage.setItem(key, JSON.stringify(value))
            
            // Also set as a cookie with a long expiry
            const valueStr = encodeURIComponent(JSON.stringify(value))
            const date = new Date()
            date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)) // 7 days
            document.cookie = `${key}=${valueStr}; expires=${date.toUTCString()}; path=/; SameSite=Lax`
          } catch (error) {
            console.error('Error writing to storage:', error)
          }
        }
      },
      removeItem: (key) => {
        if (typeof window !== 'undefined') {
          try {
            // Remove from localStorage
            window.localStorage.removeItem(key)
            
            // Remove from cookies by setting an expired date
            document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
          } catch (error) {
            console.error('Error removing from storage:', error)
          }
        }
      },
    },
  },
  global: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  },
})

export const getUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) {
      console.error('Error getting user:', error)
      return null
    }
    return user
  } catch (error) {
    console.error('Exception getting user:', error)
    return null
  }
}

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    return session
  } catch (error) {
    console.error('Exception getting session:', error)
    return null
  }
}

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut({ scope: 'global' })
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
    
    // Clear any local storage items related to auth
    if (typeof window !== 'undefined') {
      try {
        // Clear specific Supabase auth items
        window.localStorage.removeItem('supabase.auth.token')
        
        // Clear any other auth-related items
        const keysToRemove = []
        for (let i = 0; i < window.localStorage.length; i++) {
          const key = window.localStorage.key(i)
          if (key && (key.includes('supabase') || key.includes('auth'))) {
            keysToRemove.push(key)
          }
        }
        
        // Remove the collected keys
        keysToRemove.forEach(key => {
          window.localStorage.removeItem(key)
        })
        
        // Also clear session cookies by setting expired cookies
        document.cookie = 'session_verified=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        document.cookie = 'supabase.auth.token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      } catch (error) {
        console.error('Error clearing storage during sign out:', error)
      }
    }
  } catch (error) {
    console.error('Exception signing out:', error)
    throw error
  }
}

export const isAuthorizedEmail = (email: string) => {
  return email === 'rgbwfoundation@gmail.com'
} 