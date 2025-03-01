import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/invoice'
  
  // If there's no code, this isn't an OAuth callback, so redirect to home
  if (!code) {
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  }

  // Create a Supabase client for the route handler
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  try {
    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      throw exchangeError
    }
    
    // Get the session directly after exchange to ensure it's fresh
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Error getting session:', sessionError)
      throw sessionError
    }
    
    if (!session) {
      console.error('No session found after exchange')
      throw new Error('Authentication failed: No session created')
    }
    
    // If the user is rgbwfoundation@gmail.com, redirect to the specified page or invoice page
    if (session.user && session.user.email === 'rgbwfoundation@gmail.com') {
      // Add a cache-busting parameter to prevent browser caching issues
      const targetUrl = new URL(redirectTo, requestUrl.origin)
      targetUrl.searchParams.set('t', Date.now().toString())
      
      // Create a response with cache control headers
      const response = NextResponse.redirect(targetUrl, {
        // Use 303 See Other to ensure a GET request after POST
        status: 303
      })
      
      // Set cache control headers to prevent caching
      response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
      response.headers.set('Pragma', 'no-cache')
      response.headers.set('Expires', '0')
      response.headers.set('Surrogate-Control', 'no-store')
      
      // Clear the login attempts cookie
      response.cookies.set('login_attempts', '', { 
        path: '/',
        maxAge: 0,
        expires: new Date(0)
      })
      
      return response
    }
    
    // Otherwise, redirect to the homepage
    const response = NextResponse.redirect(new URL('/?auth=unauthorized', requestUrl.origin), {
      status: 303
    })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    return response
  } catch (error) {
    console.error('Error in auth callback:', error)
    // On error, redirect to login with an error parameter
    const response = NextResponse.redirect(new URL('/auth/login-fallback?error=callback_error', requestUrl.origin), {
      status: 303
    })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    return response
  }
} 