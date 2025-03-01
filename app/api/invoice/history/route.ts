import { NextRequest, NextResponse } from 'next/server'
import { supabase, isAuthorizedEmail } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid token' }, { status: 401 })
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1]
    
    // Verify the token by getting the session
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Authentication error:', authError)
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 })
    }
    
    // Check if the user is authorized
    if (!isAuthorizedEmail(user.email || '')) {
      console.error('User not authorized:', user.email)
      return NextResponse.json({ error: 'Forbidden: You do not have permission to access this resource' }, { status: 403 })
    }
    
    // Fetch invoice records from the database
    const { data: invoices, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      console.error('Error fetching invoices:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch invoice records' }, { status: 500 })
    }
    
    return NextResponse.json({ invoices: invoices || [] })
  } catch (error) {
    console.error('Unexpected error in invoice history API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 