import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
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

  console.log('Middleware: Processing request for', req.nextUrl.pathname)
  
  // Create a response to modify
  const res = NextResponse.next()
  
  // Create a Supabase client
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Log all cookies for debugging
    const allCookies = req.cookies.getAll()
    console.log('Middleware: All cookies:', allCookies.map(c => c.name))
    
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
        
        // Create the redirect URL with the original URL as a parameter
        const redirectUrl = new URL('/auth/login', req.url)
        
        // Add the redirect target as a query parameter
        redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
        
        // Create the response with cache control headers
        const response = NextResponse.redirect(redirectUrl)
        
        // Add cache control headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        
        return response
      }
      
      console.log('Middleware: Session found for user:', session.user.email)
      
      // If user is logged in but not authorized, redirect to home
      if (session.user.email !== 'rgbwfoundation@gmail.com') {
        console.log('Middleware: User not authorized, redirecting to home')
        const response = NextResponse.redirect(new URL('/', req.url))
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        return response
      }
      
      // User is authorized, let them access the invoice page
      console.log('Middleware: User authorized, allowing access to invoice page')
      res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
      res.headers.set('Pragma', 'no-cache')
      res.headers.set('Expires', '0')
      
      // Set a cookie to indicate the session was verified by middleware
      res.cookies.set('middleware_verified', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: false, // Make it accessible to client-side JavaScript for debugging
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      })
      
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