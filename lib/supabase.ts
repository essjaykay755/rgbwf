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
    browserClient = createClientComponentClient()
  }
  
  return browserClient
}

// This client should only be used in server contexts or for initialization
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Disable this to prevent duplicate session handling
    flowType: 'pkce'
  }
})

export const getUser = async () => {
  const client = createBrowserClient() || supabase
  const { data: { user }, error } = await client.auth.getUser()
  if (error) {
    throw error
  }
  return user
}

export const signOut = async () => {
  const client = createBrowserClient() || supabase
  const { error } = await client.auth.signOut()
  if (error) {
    throw error
  }
}

export const isAuthorizedEmail = (email: string) => {
  return email === 'rgbwfoundation@gmail.com'
} 