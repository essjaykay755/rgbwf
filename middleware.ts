import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Skip middleware for auth-related paths to prevent loops
  if (req.nextUrl.pathname.startsWith('/auth/') || 
      req.nextUrl.pathname.includes('callback') ||
      req.nextUrl.pathname.includes('login-fallback') ||
      req.nextUrl.pathname === '/login-fallback.html') {
    return NextResponse.next()
  }

  // Create a response to modify
  const res = NextResponse.next()
  
  // Create a Supabase client
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Get the session - this will refresh the session if needed
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Middleware session error:', error)
    }

    // Check if accessing invoice page
    if (req.nextUrl.pathname.startsWith('/invoice')) {
      // If not logged in, redirect to login page
      if (!session) {
        // Check if the user has had issues with the login page
        const cookies = req.cookies
        const loginAttempts = cookies.get('login_attempts')?.value
        
        // Store the original URL to redirect back after login
        let redirectUrl
        
        // If the user has tried the login page multiple times, use the fallback
        if (loginAttempts && parseInt(loginAttempts) > 2) {
          redirectUrl = new URL('/auth/login-fallback', req.url)
        } else {
          redirectUrl = new URL('/auth/login', req.url)
          
          // Set a cookie to track login attempts
          const response = NextResponse.redirect(redirectUrl)
          const attempts = loginAttempts ? parseInt(loginAttempts) + 1 : 1
          response.cookies.set('login_attempts', attempts.toString(), { 
            path: '/',
            maxAge: 60 * 60 * 24 // 24 hours
          })
          
          redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
          return response
        }
        
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
      
      // If user is logged in but not authorized, redirect to home
      if (session.user.email !== 'rgbwfoundation@gmail.com') {
        return NextResponse.redirect(new URL('/', req.url))
      }
      
      // User is authorized, let them access the invoice page
      return res
    }
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, continue to the page - the client-side auth check will handle it
  }

  return res
}

export const config = {
  matcher: ['/invoice/:path*']
} 