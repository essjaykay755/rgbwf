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
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/?error=auth', requestUrl.origin))
      }
      
      console.log('Successfully exchanged code for session, user:', data?.session?.user?.email)
      
      // Verify the session was set
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Error getting session after exchange:', sessionError)
      } else if (sessionData?.session) {
        console.log('Session verified after exchange, user:', sessionData.session.user.email)
        
        // Create a response that redirects to the invoice page
        const response = NextResponse.redirect(new URL('/invoice', requestUrl.origin))
        
        // Return the response with the session cookie
        return response
      } else {
        console.warn('No session found after exchange')
      }
    } catch (error) {
      console.error('Exception during code exchange:', error)
      return NextResponse.redirect(new URL('/?error=auth_exception', requestUrl.origin))
    }
  } else {
    console.warn('No code parameter found in callback URL')
  }

  // URL to redirect to after sign in process completes
  console.log('Redirecting to invoice page after auth callback')
  return NextResponse.redirect(new URL('/invoice', requestUrl.origin))
} 