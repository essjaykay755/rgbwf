import { NextRequest, NextResponse } from 'next/server'
import { supabase, isAuthorizedEmail } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the invoice ID from the URL params
    const invoiceId = params.id
    
    if (!invoiceId) {
      return NextResponse.json({ error: 'Invoice ID is required' }, { status: 400 })
    }
    
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
    
    // Fetch the invoice record from the database
    const { data: invoice, error: fetchError } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .single()
    
    if (fetchError || !invoice) {
      console.error('Error fetching invoice:', fetchError)
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }
    
    // Get the PDF URL from storage
    const { data: pdfData, error: storageError } = await supabase
      .storage
      .from('invoices')
      .createSignedUrl(`${invoice.serial_number}.pdf`, 60) // 60 seconds expiry
    
    if (storageError || !pdfData) {
      console.error('Error getting PDF URL:', storageError)
      return NextResponse.json({ error: 'Failed to retrieve invoice PDF' }, { status: 500 })
    }
    
    return NextResponse.json({ 
      pdfUrl: pdfData.signedUrl,
      invoice: invoice
    })
  } catch (error) {
    console.error('Unexpected error in invoice download API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 