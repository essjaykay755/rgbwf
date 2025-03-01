import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const accessToken = requestUrl.searchParams.get('access_token')
  const refreshToken = requestUrl.searchParams.get('refresh_token')
  
  console.log('Hash fragment route handler called')
  console.log('Access token present:', !!accessToken)
  console.log('Refresh token present:', !!refreshToken)
  
  if (!accessToken) {
    console.error('No access token provided')
    return NextResponse.redirect(new URL('/auth/login?error=no_token', requestUrl.origin))
  }
  
  try {
    // Make the cookies mutable
    const cookieStore = cookies()
    
    // Create a Supabase client specifically for the route handler
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    // Set the session manually
    if (refreshToken) {
      console.log('Setting session with refresh token')
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      })
    } else {
      console.log('Setting session with access token only')
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: ''
      })
    }
    
    // Get the user details
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      console.error('Error getting user from token:', userError)
      return NextResponse.redirect(new URL('/auth/login?error=invalid_token', requestUrl.origin))
    }
    
    console.log('User retrieved from token:', user.email)
    
    // Check if the user is authorized
    if (user.email === 'rgbwfoundation@gmail.com') {
      console.log('Authorized user, redirecting to invoice page')
      return NextResponse.redirect(new URL('/invoice', requestUrl.origin))
    } else {
      console.log('Unauthorized user, signing out')
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/?error=unauthorized', requestUrl.origin))
    }
  } catch (error: any) {
    console.error('Exception during hash authentication:', error.message || error)
    return NextResponse.redirect(new URL('/auth/login?error=hash_exception', requestUrl.origin))
  }
} 