import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  console.log('Auth callback route handler called, code present:', !!code)
  
  if (code) {
    try {
      // Make the cookies mutable
      const cookieStore = cookies()
      
      // Create a Supabase client specifically for the route handler
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      // Exchange the code for a session
      console.log('Exchanging code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error.message)
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
    } catch (error: any) {
      console.error('Exception during code exchange:', error.message || error)
      return NextResponse.redirect(new URL('/auth/login?error=auth_exception', requestUrl.origin))
    }
  } else {
    console.warn('No code parameter found in callback URL')
    return NextResponse.redirect(new URL('/auth/login?error=no_code', requestUrl.origin))
  }
} 