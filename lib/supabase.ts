import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a browser client that uses cookies for session management
// This is the primary client that should be used in all client components
let browserClient: ReturnType<typeof createClientComponentClient> | null = null

export const createBrowserClient = () => {
  if (typeof window === 'undefined') {
    return null
  }
  
  if (!browserClient) {
    // Create a client that can handle hash fragments
    browserClient = createClientComponentClient()
  }
  
  return browserClient
}

// This client should only be used in server contexts or for initialization
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable this for server-side to prevent issues
  }
})

// Create a special client that can handle hash fragments for direct use
export const createHashFragmentClient = () => {
  if (typeof window === 'undefined') {
    return null
  }
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true, // Enable this to handle hash fragments
    }
  })
}

export const getUser = async () => {
  try {
    const client = createBrowserClient() || supabase
    const { data: { user }, error } = await client.auth.getUser()
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
    const client = createBrowserClient() || supabase
    const { data: { session }, error } = await client.auth.getSession()
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
    const client = createBrowserClient() || supabase
    const { error } = await client.auth.signOut()
    if (error) {
      console.error('Error signing out:', error)
      throw error
    }
    return true
  } catch (error) {
    console.error('Exception signing out:', error)
    throw error
  }
}

export const isAuthorizedEmail = (email: string) => {
  return email === 'rgbwfoundation@gmail.com'
} 