import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Helper function to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null
  
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1))
    }
  }
  return null
}

// Helper function to set cookie
const setCookie = (name: string, value: string, days: number = 7): void => {
  if (typeof document === 'undefined') return
  
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`
}

// Helper function to delete cookie
const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`
}

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
          console.log(`Storage: Getting item ${key}`)
          
          // Try to get from localStorage first
          let value = null
          try {
            value = window.localStorage.getItem(key)
            if (value) {
              console.log(`Storage: Found ${key} in localStorage`)
              return JSON.parse(value)
            }
          } catch (e) {
            console.error(`Storage: Error reading ${key} from localStorage:`, e)
          }
          
          // If not in localStorage, try to get from cookies
          try {
            const cookieValue = getCookie(key)
            if (cookieValue) {
              console.log(`Storage: Found ${key} in cookies`)
              return JSON.parse(cookieValue)
            }
          } catch (e) {
            console.error(`Storage: Error reading ${key} from cookies:`, e)
          }
          
          console.log(`Storage: ${key} not found in storage`)
          return null
        } catch (error) {
          console.error('Storage: Error reading from storage:', error)
          return null
        }
      },
      setItem: (key, value) => {
        if (typeof window === 'undefined') return
        
        const valueStr = JSON.stringify(value)
        console.log(`Storage: Setting item ${key}`)
        
        try {
          // Store in localStorage
          try {
            window.localStorage.setItem(key, valueStr)
            console.log(`Storage: Saved ${key} to localStorage`)
          } catch (e) {
            console.error(`Storage: Error writing ${key} to localStorage:`, e)
          }
          
          // Also store in cookies
          try {
            setCookie(key, valueStr)
            console.log(`Storage: Saved ${key} to cookies`)
          } catch (e) {
            console.error(`Storage: Error writing ${key} to cookies:`, e)
          }
        } catch (error) {
          console.error('Storage: Error writing to storage:', error)
        }
      },
      removeItem: (key) => {
        if (typeof window === 'undefined') return
        
        console.log(`Storage: Removing item ${key}`)
        
        try {
          // Remove from localStorage
          try {
            window.localStorage.removeItem(key)
            console.log(`Storage: Removed ${key} from localStorage`)
          } catch (e) {
            console.error(`Storage: Error removing ${key} from localStorage:`, e)
          }
          
          // Remove from cookies
          try {
            deleteCookie(key)
            console.log(`Storage: Removed ${key} from cookies`)
          } catch (e) {
            console.error(`Storage: Error removing ${key} from cookies:`, e)
          }
        } catch (error) {
          console.error('Storage: Error removing from storage:', error)
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

// Add debug method to log all auth-related storage
export const debugStorage = () => {
  if (typeof window === 'undefined') return
  
  console.log('--- Storage Debug ---')
  
  // Check localStorage
  try {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && (key.includes('supabase') || key.includes('auth'))) {
        keys.push(key)
      }
    }
    console.log('LocalStorage keys:', keys)
  } catch (e) {
    console.error('Error reading localStorage:', e)
  }
  
  // Check cookies
  try {
    const cookies = document.cookie.split(';').map(c => c.trim())
    console.log('Cookies:', cookies)
  } catch (e) {
    console.error('Error reading cookies:', e)
  }
  
  console.log('--- End Storage Debug ---')
}

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
    debugStorage() // Log storage before sign out
    
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
        deleteCookie('supabase.auth.token')
        deleteCookie('sb-refresh-token')
        deleteCookie('sb-access-token')
        deleteCookie('session_verified')
        deleteCookie('middleware_verified')
      } catch (error) {
        console.error('Error clearing storage during sign out:', error)
      }
    }
    
    debugStorage() // Log storage after sign out
  } catch (error) {
    console.error('Exception signing out:', error)
    throw error
  }
}

export const isAuthorizedEmail = (email: string) => {
  return email === 'rgbwfoundation@gmail.com'
} 