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
      // If not logged in, redirect to login page
      if (!session) {
        console.log('No session found, redirecting to login')
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      
      // If user is logged in but not authorized, sign them out and redirect to home
      if (session.user.email !== 'rgbwfoundation@gmail.com') {
        console.log('User not authorized:', session.user.email)
        
        // Sign out the unauthorized user
        await supabase.auth.signOut()
        
        return NextResponse.redirect(new URL('/?error=unauthorized', req.url))
      }
      
      console.log('User authorized, allowing access to invoice page')
    }

    // Allow access to auth callback routes
    if (req.nextUrl.pathname.startsWith('/auth/callback')) {
      return res
    }
  } catch (error) {
    console.error('Middleware error:', error)
  }

  // Return the response with any cookies that were set
  return res
}

export const config = {
  matcher: ['/invoice/:path*', '/auth/callback/:path*', '/auth/login/:path*']
} 