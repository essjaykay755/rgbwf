import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Skip middleware if the request is for the login page to prevent loops
  if (req.nextUrl.pathname.startsWith('/auth/login')) {
    return NextResponse.next()
  }

  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if accessing invoice page
  if (req.nextUrl.pathname.startsWith('/invoice')) {
    // If not logged in, redirect to login page
    if (!session) {
      // Store the original URL to redirect back after login
      const redirectUrl = new URL('/auth/login', req.url)
      redirectUrl.searchParams.set('redirectTo', req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    
    // If user is logged in but not authorized, redirect to home
    if (session.user.email !== 'rgbwfoundation@gmail.com') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/invoice/:path*']
} 