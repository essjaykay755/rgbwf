import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const redirectTo = requestUrl.searchParams.get('redirectTo') || '/invoice'
  
  // If there's no code, this isn't an OAuth callback, so redirect to home
  if (!code) {
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  }

  // Create a Supabase client for the route handler
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)
    
    // Get the user to check if they're authorized
    const { data: { user } } = await supabase.auth.getUser()
    
    // If the user is rgbwfoundation@gmail.com, redirect to the specified page or invoice page
    if (user && user.email === 'rgbwfoundation@gmail.com') {
      // Add a cache-busting parameter to prevent browser caching issues
      const targetUrl = new URL(redirectTo, requestUrl.origin)
      targetUrl.searchParams.set('t', Date.now().toString())
      return NextResponse.redirect(targetUrl)
    }
    
    // Otherwise, redirect to the homepage
    return NextResponse.redirect(new URL('/?auth=unauthorized', requestUrl.origin))
  } catch (error) {
    console.error('Error in auth callback:', error)
    // On error, redirect to login with an error parameter
    return NextResponse.redirect(new URL('/auth/login?error=callback_error', requestUrl.origin))
  }
} 