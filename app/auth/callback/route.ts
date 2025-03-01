import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    
    try {
      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Error exchanging code for session:', error)
        return NextResponse.redirect(new URL('/?error=auth', requestUrl.origin))
      }
      
      console.log('Successfully exchanged code for session')
    } catch (error) {
      console.error('Exception during code exchange:', error)
      return NextResponse.redirect(new URL('/?error=auth_exception', requestUrl.origin))
    }
  } else {
    console.warn('No code parameter found in callback URL')
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(new URL('/invoice', requestUrl.origin))
} 