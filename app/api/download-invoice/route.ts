import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    
    console.log('Handling download request for invoice:', serialNumber)
    
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
    
    // Check if the file exists
    const { data: fileData, error: fileError } = await serviceClient
      .storage
      .from('invoices')
      .list('', {
        limit: 100,
        search: serialNumber
      })
    
    if (fileError) {
      console.error('Error checking file existence:', fileError)
      return NextResponse.json({ 
        error: 'Failed to check if file exists', 
        details: fileError.message 
      }, { status: 500 })
    }
    
    const fileExists = fileData?.some(file => file.name === `${serialNumber}.pdf`)
    
    if (!fileExists) {
      console.error('File does not exist in storage:', `${serialNumber}.pdf`)
      
      // Try to get the invoice data to regenerate the PDF
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
      
      // Redirect to the regenerate endpoint
      const regenerateUrl = new URL('/api/regenerate-invoice', request.url)
      regenerateUrl.searchParams.set('serialNumber', serialNumber)
      
      return NextResponse.redirect(regenerateUrl.toString())
    }
    
    // Get a signed URL for the PDF
    const { data: urlData, error: urlError } = await serviceClient
      .storage
      .from('invoices')
      .createSignedUrl(`${serialNumber}.pdf`, 60 * 60 * 24) // 24 hour expiry
    
    if (urlError) {
      console.error('Error getting signed URL:', urlError)
      return NextResponse.json({ 
        error: 'Failed to generate download link', 
        details: urlError.message 
      }, { status: 500 })
    }
    
    if (!urlData || !urlData.signedUrl) {
      console.error('No signed URL returned')
      return NextResponse.json({ 
        error: 'Failed to generate download link', 
        details: 'No signed URL returned' 
      }, { status: 500 })
    }
    
    console.log('Redirecting to signed URL for download')
    
    // Instead of redirecting, fetch the PDF and return it with proper headers
    try {
      const response = await fetch(urlData.signedUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }
      
      const pdfBuffer = await response.arrayBuffer();
      
      // Create a response with the PDF content and appropriate headers
      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');
      headers.set('Content-Disposition', `attachment; filename="${serialNumber}.pdf"`);
      
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers
      });
    } catch (fetchError) {
      console.error('Error fetching PDF from signed URL:', fetchError);
      
      // Fall back to redirect if fetching fails
      return NextResponse.redirect(urlData.signedUrl);
    }
  } catch (error) {
    console.error('Unexpected error in download-invoice API:', error)
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
} 