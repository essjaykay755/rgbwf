import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Create a response object that we'll modify and return
  const res = NextResponse.next()
  
  // Create a Supabase client specifically for the middleware
  const supabase = createMiddlewareClient({ req, res })

  try {
    // Get the session from the middleware client
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if accessing invoice page
    if (req.nextUrl.pathname.startsWith('/invoice')) {
      // If not logged in, redirect to home
      if (!session) {
        console.log('Middleware: No session found, redirecting to home')
        return NextResponse.redirect(new URL('/', req.url))
      }
      
      console.log('Middleware: Session found, user:', session.user.email)
      
      // If user is logged in but not authorized, redirect to home
      if (session.user.email !== 'rgbwfoundation@gmail.com') {
        console.log('Middleware: User not authorized, redirecting to home')
        return NextResponse.redirect(new URL('/', req.url))
      }
      
      console.log('Middleware: User authorized, allowing access to invoice page')
    }

    // Allow access to auth callback routes
    if (req.nextUrl.pathname.startsWith('/auth/callback') || 
        req.nextUrl.pathname.startsWith('/auth/confirm')) {
      console.log('Middleware: Allowing access to auth route:', req.nextUrl.pathname)
      return res
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  // Return the response with any cookies that were set
  return res
}

export const config = {
  matcher: ['/invoice/:path*', '/auth/callback/:path*', '/auth/confirm/:path*']
} 