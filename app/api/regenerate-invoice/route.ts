import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { InvoicePDF } from '@/app/invoice/InvoicePDF'
import { createClient } from '@supabase/supabase-js'
import { isAuthorizedEmail } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get the request data
    const { serialNumber, invoiceData } = await request.json()
    
    if (!serialNumber || !invoiceData) {
      return NextResponse.json({ 
        error: 'Missing required data', 
        details: 'Serial number and invoice data are required' 
      }, { status: 400 })
    }
    
    return await regenerateInvoice(serialNumber, invoiceData)
  } catch (error) {
    console.error('Unexpected error in regenerate-invoice API (POST):', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the serial number from the URL
    const url = new URL(request.url)
    const serialNumber = url.searchParams.get('serialNumber')
    
    if (!serialNumber) {
      return NextResponse.json({ 
        error: 'Missing serial number', 
        details: 'Serial number is required' 
      }, { status: 400 })
    }
    
    // Check if Supabase URL and key are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    // Create a new client with service role for storage operations
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Get the invoice data from the database
    const { data: invoiceData, error: invoiceError } = await serviceClient
      .from('invoices')
      .select('*')
      .eq('serial_number', serialNumber)
      .single()
    
    if (invoiceError || !invoiceData) {
      console.error('Error fetching invoice data:', invoiceError)
      return NextResponse.json({ 
        error: 'Invoice not found', 
        details: 'Could not find the invoice data to regenerate the PDF' 
      }, { status: 404 })
    }
    
    return await regenerateInvoice(serialNumber, invoiceData)
  } catch (error) {
    console.error('Unexpected error in regenerate-invoice API (GET):', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

async function regenerateInvoice(serialNumber: string, invoiceData: any) {
  try {
    console.log('Regenerating PDF for invoice:', serialNumber)
    
    // Get the base URL for assets
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rgbwf.vercel.app'
    console.log('Using base URL for assets:', baseUrl)
    
    // Create the PDF
    const pdfBuffer = await renderToBuffer(
      InvoicePDF({
        data: {
          donorName: invoiceData.donor_details.name,
          donorEmail: invoiceData.donor_details.email,
          donorAddress: invoiceData.donor_details.address,
          amount: invoiceData.amount,
          description: invoiceData.description,
          date: invoiceData.date
        }
      })
    )
    
    console.log('PDF regenerated successfully, size:', pdfBuffer.byteLength, 'bytes')
    
    // Check if Supabase URL and key are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    // Create a new client with service role for storage operations
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    console.log('Uploading regenerated PDF to storage bucket: invoices')
    
    // Upload the PDF to Supabase Storage
    const { data: uploadData, error: uploadError } = await serviceClient
      .storage
      .from('invoices')
      .upload(`${serialNumber}.pdf`, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
        cacheControl: '3600'
      })
    
    if (uploadError) {
      console.error('Error uploading regenerated PDF:', uploadError)
      return NextResponse.json({ 
        error: 'Failed to upload regenerated PDF', 
        details: uploadError.message 
      }, { status: 500 })
    }
    
    console.log('Regenerated PDF uploaded successfully')
    
    // Get a signed URL for the uploaded PDF
    const { data: urlData, error: urlError } = await serviceClient
      .storage
      .from('invoices')
      .createSignedUrl(`${serialNumber}.pdf`, 60 * 60 * 24) // 24 hour expiry
    
    if (urlError) {
      console.error('Error getting signed URL for regenerated PDF:', urlError)
      return NextResponse.json({ 
        error: 'Failed to generate download link', 
        details: urlError.message 
      }, { status: 500 })
    }
    
    if (!urlData || !urlData.signedUrl) {
      console.error('No signed URL returned for regenerated PDF')
      return NextResponse.json({ 
        error: 'Failed to generate download link', 
        details: 'No signed URL returned' 
      }, { status: 500 })
    }
    
    console.log('Signed URL generated for regenerated PDF')
    
    // Redirect to the signed URL for direct download
    return NextResponse.redirect(urlData.signedUrl)
  } catch (error) {
    console.error('Error in regenerateInvoice function:', error)
    return NextResponse.json({ 
      error: 'Failed to regenerate invoice', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 