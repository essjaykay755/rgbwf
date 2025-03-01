import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  
  console.log('Auth callback route handler called')
  console.log('Code present:', !!code)
  console.log('Error present:', !!error)
  console.log('Full URL:', request.url)
  
  // Make the cookies mutable
  const cookieStore = cookies()
  
  // Create a Supabase client specifically for the route handler
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
  
  try {
    // If there's a code, exchange it for a session
    if (code) {
      console.log('Exchanging code for session...')
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (exchangeError) {
        console.error('Error exchanging code for session:', exchangeError.message)
        return NextResponse.redirect(new URL('/auth/login?error=auth', requestUrl.origin))
      }
      
      if (!data || !data.session) {
        console.error('No session data returned from exchangeCodeForSession')
        return NextResponse.redirect(new URL('/auth/login?error=no_session', requestUrl.origin))
      }
      
      // Check if the user is authorized to access the invoice page
      const userEmail = data.session.user?.email;
      console.log('User email from session:', userEmail);
      
      if (userEmail === 'rgbwfoundation@gmail.com') {
        console.log('Authorized user, redirecting to invoice page')
        // Create a response that redirects to the invoice page
        return NextResponse.redirect(new URL('/invoice', requestUrl.origin))
      } else {
        console.log('Unauthorized user, signing out and redirecting to home page')
        
        try {
          // Sign out the unauthorized user
          await supabase.auth.signOut()
          console.log('Successfully signed out unauthorized user');
        } catch (signOutError) {
          console.error('Error signing out unauthorized user:', signOutError);
        }
        
        // Redirect to home with unauthorized error
        return NextResponse.redirect(new URL('/?error=unauthorized', requestUrl.origin))
      }
    } 
    // If there's no code but there's an error, handle it
    else if (error) {
      console.error('Error in auth callback:', error)
      return NextResponse.redirect(new URL(`/auth/login?error=${error}`, requestUrl.origin))
    } 
    // If there's no code and no error, redirect to the home page
    else {
      console.log('No code or error parameter found, checking for session')
      
      // Check if we already have a session (might be from hash fragment)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        console.log('Session found, checking user email')
        const userEmail = session.user?.email
        
        if (userEmail === 'rgbwfoundation@gmail.com') {
          console.log('Authorized user, redirecting to invoice page')
          return NextResponse.redirect(new URL('/invoice', requestUrl.origin))
        } else {
          console.log('Unauthorized user, signing out')
          await supabase.auth.signOut()
          return NextResponse.redirect(new URL('/?error=unauthorized', requestUrl.origin))
        }
      }
      
      console.warn('No code parameter found in callback URL and no session')
      return NextResponse.redirect(new URL('/auth/login?error=no_code', requestUrl.origin))
    }
  } catch (error: any) {
    console.error('Exception during auth callback handling:', error.message || error)
    return NextResponse.redirect(new URL('/auth/login?error=auth_exception', requestUrl.origin))
  }
} 