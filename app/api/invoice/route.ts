import { NextRequest, NextResponse } from 'next/server'
import { supabase, isAuthorizedEmail } from '@/lib/supabase'
import { renderToBuffer } from '@react-pdf/renderer'
import { InvoicePDF } from '@/app/invoice/InvoicePDF'
import { createClient } from '@supabase/supabase-js'

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
    
    console.log('Generating PDF for invoice:', serialNumber)
    
    // Get the base URL for assets
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://rgbwf.vercel.app'
    console.log('Using base URL for assets:', baseUrl)
    
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
    
    console.log('PDF generated successfully, size:', pdfBuffer.byteLength, 'bytes')
    
    // Check if Supabase URL and key are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase credentials:', { 
        hasUrl: !!supabaseUrl, 
        hasServiceKey: !!supabaseServiceKey 
      })
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    
    // Create a new client with service role for storage operations
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    console.log('Uploading PDF to storage bucket: invoices')
    
    try {
      // Check if the bucket exists, create it if it doesn't
      const { data: buckets, error: bucketsError } = await serviceClient
        .storage
        .listBuckets()
      
      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError)
        return NextResponse.json({ 
          error: 'Failed to check storage buckets', 
          details: bucketsError.message 
        }, { status: 500 })
      }
      
      const invoicesBucketExists = buckets.some(bucket => bucket.name === 'invoices')
      
      if (!invoicesBucketExists) {
        console.log('Invoices bucket does not exist, creating it...')
        const { data: newBucket, error: createBucketError } = await serviceClient
          .storage
          .createBucket('invoices', {
            public: false,
            fileSizeLimit: 5242880, // 5MB
          })
        
        if (createBucketError) {
          console.error('Error creating invoices bucket:', createBucketError)
          return NextResponse.json({ 
            error: 'Failed to create storage bucket', 
            details: createBucketError.message 
          }, { status: 500 })
        }
        
        console.log('Invoices bucket created successfully')
        
        // Set bucket policy to allow authenticated users to read
        const { error: policyError } = await serviceClient
          .storage
          .from('invoices')
          .createSignedUrls(['test.txt'], 60)
        
        if (policyError) {
          console.warn('Warning: Could not set bucket policy:', policyError)
        }
      }
      
      // Upload the PDF to Supabase Storage using service role client
      console.log('Attempting to upload PDF file with size:', pdfBuffer.byteLength, 'bytes')
      
      try {
        const { data: uploadData, error: uploadError } = await serviceClient
          .storage
          .from('invoices')
          .upload(`${serialNumber}.pdf`, pdfBuffer, {
            contentType: 'application/pdf',
            upsert: true,
            cacheControl: '3600'
          })
        
        if (uploadError) {
          console.error('Error uploading PDF:', uploadError)
          return NextResponse.json({ 
            error: 'Failed to upload invoice PDF', 
            details: uploadError.message 
          }, { status: 500 })
        }
        
        console.log('PDF uploaded successfully, path:', uploadData?.path)
      } catch (uploadErr) {
        console.error('Exception during PDF upload:', uploadErr)
        return NextResponse.json({ 
          error: 'Exception during PDF upload', 
          details: uploadErr instanceof Error ? uploadErr.message : 'Unknown error' 
        }, { status: 500 })
      }
      
      // Get a signed URL for the uploaded PDF
      console.log('Generating signed URL for PDF')
      
      let signedUrl: string
      
      try {
        const { data: urlData, error: urlError } = await serviceClient
          .storage
          .from('invoices')
          .createSignedUrl(`${serialNumber}.pdf`, 60 * 60 * 24) // 24 hour expiry for better user experience
        
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
        
        signedUrl = urlData.signedUrl
        console.log('Signed URL generated successfully:', signedUrl.substring(0, 100) + '...')
      } catch (urlErr) {
        console.error('Exception generating signed URL:', urlErr)
        return NextResponse.json({ 
          error: 'Exception generating signed URL', 
          details: urlErr instanceof Error ? urlErr.message : 'Unknown error' 
        }, { status: 500 })
      }

      // Store the invoice data in the database according to the existing schema
      console.log('Storing invoice data in database')
      
      try {
        const { data: invoiceRecord, error: dbError } = await serviceClient
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
            pdf_url: signedUrl,
            status: 'completed'
          })
          .select()
          .single()
        
        if (dbError) {
          console.error('Error storing invoice data:', dbError)
          return NextResponse.json({ 
            error: 'Failed to store invoice data',
            details: dbError.message
          }, { status: 500 })
        }
        
        console.log('Invoice data stored successfully')
      } catch (dbErr) {
        console.error('Exception storing invoice data:', dbErr)
        return NextResponse.json({ 
          error: 'Exception storing invoice data', 
          details: dbErr instanceof Error ? dbErr.message : 'Unknown error' 
        }, { status: 500 })
      }
      
      return NextResponse.json({
        success: true,
        pdfUrl: signedUrl,
        serialNumber: serialNumber
      })
    } catch (uploadException) {
      console.error('Exception during storage operations:', uploadException)
      return NextResponse.json({ 
        error: 'Storage operation failed',
        details: uploadException instanceof Error ? uploadException.message : 'Unknown error'
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Unexpected error in invoice API:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 