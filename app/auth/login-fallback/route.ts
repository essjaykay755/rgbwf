import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirectTo') || '/invoice'
  
  // Redirect to the static fallback login page
  const fallbackUrl = new URL('/login-fallback.html', url.origin)
  fallbackUrl.searchParams.set('redirectTo', redirectTo)
  
  const response = NextResponse.redirect(fallbackUrl)
  response.headers.set('Cache-Control', 'no-store, max-age=0')
  
  return response
} 