import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/invoice'
  
  console.log('Auth callback: Processing with code and redirectTo:', { 
    hasCode: !!code, 
    redirectTo 
  })
  
  // If there's no code, this isn't an OAuth callback, so redirect to home
  if (!code) {
    console.log('Auth callback: No code provided, redirecting to home')
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  }

  // Create a Supabase client for the route handler
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  try {
    // Exchange the code for a session
    console.log('Auth callback: Exchanging code for session')
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Error exchanging code for session:', exchangeError)
      throw exchangeError
    }
    
    // Get the session directly after exchange to ensure it's fresh
    console.log('Auth callback: Getting session after exchange')
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    
    if (sessionError) {
      console.error('Error getting session:', sessionError)
      throw sessionError
    }
    
    if (!session) {
      console.error('No session found after exchange')
      throw new Error('Authentication failed: No session created')
    }
    
    console.log('Auth callback: Session created for user:', session.user.email)
    
    // If the user is rgbwfoundation@gmail.com, redirect to the specified page or invoice page
    if (session.user && session.user.email === 'rgbwfoundation@gmail.com') {
      console.log('Auth callback: User is authorized, redirecting to:', redirectTo)
      
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
      
      // Set session cookies to help with client-side auth
      response.cookies.set('sb-auth-token-verified', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: false, // Make it accessible to client-side JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
      // Set a session verification cookie to help with debugging
      response.cookies.set('session_verified', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: false, // Make it accessible to client-side JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
      return response
    }
    
    // Otherwise, redirect to the homepage
    console.log('Auth callback: User is not authorized, redirecting to home')
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
    const response = NextResponse.redirect(new URL('/auth/login?error=callback_error', requestUrl.origin), {
      status: 303
    })
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    return response
  }
} 