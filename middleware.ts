import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Skip middleware for static files and auth-related paths to prevent loops
  if (req.nextUrl.pathname.startsWith('/auth/') || 
      req.nextUrl.pathname.includes('callback') ||
      req.nextUrl.pathname.includes('login-fallback') ||
      req.nextUrl.pathname === '/login-fallback.html' ||
      req.nextUrl.pathname.startsWith('/_next/') ||
      req.nextUrl.pathname.includes('.')) {
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
        console.log('Middleware: No session found, redirecting to login')
        
        // Check if the user has had issues with the login page
        const cookies = req.cookies
        const loginAttempts = cookies.get('login_attempts')?.value
        
        // Create the redirect URL with the original URL as a parameter
        const redirectUrl = new URL(
          loginAttempts && parseInt(loginAttempts) > 2 
            ? '/auth/login-fallback' 
            : '/auth/login', 
          req.url
        )
        
        // Add the redirect target as a query parameter
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        
        // Create the response
        const response = NextResponse.redirect(redirectUrl)
        
        // Set a cookie to track login attempts if using the main login page
        if (!loginAttempts || parseInt(loginAttempts) <= 2) {
          const attempts = loginAttempts ? parseInt(loginAttempts) + 1 : 1
          response.cookies.set('login_attempts', attempts.toString(), { 
            path: '/',
            maxAge: 60 * 60 * 24, // 24 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
          })
        }
        
        // Add cache control headers
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        response.headers.set('Pragma', 'no-cache')
        
        return response
      }
      
      // If user is logged in but not authorized, redirect to home
      if (session.user.email !== 'rgbwfoundation@gmail.com') {
        console.log('Middleware: User not authorized, redirecting to home')
        const response = NextResponse.redirect(new URL('/', req.url))
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        return response
      }
      
      // User is authorized, let them access the invoice page
      console.log('Middleware: User authorized, allowing access to invoice page')
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
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