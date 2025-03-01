import { NextRequest, NextResponse } from 'next/server'
import { supabase, isAuthorizedEmail } from '@/lib/supabase'
import { renderToBuffer } from '@react-pdf/renderer'
import { InvoicePDF } from '@/app/invoice/InvoicePDF'

export async function POST(request: NextRequest) {
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
    
    // Get the invoice data from the request body
    const invoiceData = await request.json()
    
    // Generate a unique serial number for the invoice
    const serialNumber = `INV${Date.now()}`
    
    // Create the PDF
    const pdfBuffer = await renderToBuffer(
      InvoicePDF({
        data: {
          donorName: invoiceData.donorName,
          donorEmail: invoiceData.donorEmail,
          donorAddress: invoiceData.donorAddress,
          amount: invoiceData.amount,
          description: invoiceData.description,
          date: invoiceData.date
        }
      })
    )
    
    // Upload the PDF to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('invoices')
      .upload(`${serialNumber}.pdf`, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true
      })
    
    if (uploadError) {
      console.error('Error uploading PDF:', uploadError)
      return NextResponse.json({ error: 'Failed to upload invoice PDF' }, { status: 500 })
    }
    
    // Get a signed URL for the uploaded PDF
    const { data: urlData, error: urlError } = await supabase
      .storage
      .from('invoices')
      .createSignedUrl(`${serialNumber}.pdf`, 60) // 60 seconds expiry
    
    if (urlError) {
      console.error('Error getting signed URL:', urlError)
      return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 })
    }
    
    // Store the invoice data in the database according to the existing schema
    const { data: invoiceRecord, error: dbError } = await supabase
      .from('invoices')
      .insert({
        serial_number: serialNumber,
        donor_details: {
          name: invoiceData.donorName,
          email: invoiceData.donorEmail,
          address: invoiceData.donorAddress
        },
        amount: invoiceData.amount,
        date: invoiceData.date,
        description: invoiceData.description,
        pdf_url: urlData.signedUrl,
        status: 'completed'
      })
      .select()
      .single()
    
    if (dbError) {
      console.error('Error storing invoice data:', dbError)
      return NextResponse.json({ error: 'Failed to store invoice data' }, { status: 500 })
    }
    
    return NextResponse.json({
      success: true,
      pdfUrl: urlData.signedUrl,
      serialNumber: serialNumber
    })
  } catch (error) {
    console.error('Unexpected error in invoice API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 