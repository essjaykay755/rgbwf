import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if accessing invoice page
  if (req.nextUrl.pathname.startsWith('/invoice')) {
    // If user is logged in but not authorized, redirect to home
    if (session && session.user.email !== 'rgbwfoundation@gmail.com') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/invoice/:path*']
} 