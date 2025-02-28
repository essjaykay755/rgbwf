import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { InvoicePDF } from '@/app/invoice/InvoicePDF'
import { createElement } from 'react'

// Create a Supabase admin client for server-side operations
// This bypasses RLS policies
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Function to ensure the invoices bucket exists
async function ensureInvoicesBucketExists() {
  try {
    // Check if the bucket exists
    const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      throw listError
    }
    
    const invoicesBucketExists = buckets.some(bucket => bucket.name === 'invoices')
    
    if (!invoicesBucketExists) {
      console.log('Invoices bucket does not exist, creating it...')
      const { error: createError } = await supabaseAdmin.storage.createBucket('invoices', {
        public: true
      })
      
      if (createError) {
        console.error('Error creating invoices bucket:', createError)
        throw createError
      }
      
      console.log('Invoices bucket created successfully')
    } else {
      console.log('Invoices bucket already exists')
    }
  } catch (error) {
    console.error('Error ensuring invoices bucket exists:', error)
    throw error
  }
}

// Function to check if the invoices table exists
async function checkInvoicesTableExists() {
  try {
    // Try to query the invoices table
    const { error } = await supabaseAdmin
      .from('invoices')
      .select('id')
      .limit(1)
    
    // If there's an error with code 42P01, the table doesn't exist
    if (error && error.code === '42P01') {
      return false
    }
    
    // If there's another error, throw it
    if (error) {
      throw error
    }
    
    // If there's no error, the table exists
    return true
  } catch (error) {
    console.error('Error checking if invoices table exists:', error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Authentication error: No authorization header found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    
    // Verify the token using the regular supabase client
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Authentication error:', authError || 'No user found')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Check if the user is authorized
    if (user.email !== 'rgbwfoundation@gmail.com') {
      console.error(`Authorization error: Unauthorized email ${user.email}`)
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse request data
    const data = await request.json()
    const { donorName, donorEmail, donorAddress, amount, description, date } = data
    console.log('Received invoice data:', { donorName, donorEmail, amount, date })

    // Generate invoice number
    const serialNumber = `INV-${Date.now()}`
    console.log('Generated serial number:', serialNumber)

    try {
      // Ensure the invoices bucket exists
      await ensureInvoicesBucketExists()
      
      // Generate PDF
      console.log('Generating PDF...')
      const pdfBuffer = await renderToBuffer(
        createElement(InvoicePDF, {
          data: {
            donorName,
            donorEmail,
            donorAddress,
            amount,
            description,
            date,
          }
        })
      )
      console.log('PDF generated successfully')

      // Save to Supabase Storage using admin client
      console.log('Uploading to Supabase Storage...')
      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
        .from('invoices')
        .upload(`${serialNumber}.pdf`, pdfBuffer, {
          contentType: 'application/pdf',
          upsert: true
        })

      if (uploadError) {
        console.error('Storage upload error:', uploadError)
        throw uploadError
      }
      console.log('PDF uploaded successfully')

      // Get public URL
      console.log('Getting public URL...')
      const { data: publicUrl } = supabaseAdmin.storage
        .from('invoices')
        .getPublicUrl(`${serialNumber}.pdf`)
      console.log('Public URL:', publicUrl.publicUrl)

      // Check if the invoices table exists
      const tableExists = await checkInvoicesTableExists()
      
      if (!tableExists) {
        console.warn('Invoices table does not exist. Skipping database insert but returning PDF URL.')
        return NextResponse.json({
          success: true,
          serialNumber,
          pdfUrl: publicUrl.publicUrl,
          warning: 'Invoice was not saved to database because the table does not exist.'
        })
      }

      // Save to database using admin client to bypass RLS
      console.log('Saving to database...')
      const { error: dbError } = await supabaseAdmin.from('invoices').insert({
        serial_number: serialNumber,
        donor_details: {
          name: donorName,
          email: donorEmail,
          address: donorAddress,
        },
        amount,
        date,
        description,
        pdf_url: publicUrl.publicUrl,
        status: 'generated',
      })

      if (dbError) {
        console.error('Database error:', dbError)
        return NextResponse.json({
          success: true,
          serialNumber,
          pdfUrl: publicUrl.publicUrl,
          warning: 'Invoice was generated but could not be saved to the database: ' + dbError.message
        })
      }
      
      console.log('Database entry created successfully')

      return NextResponse.json({
        success: true,
        serialNumber,
        pdfUrl: publicUrl.publicUrl,
      })
    } catch (innerError: any) {
      console.error('Error in PDF generation or storage:', innerError)
      throw innerError
    }
  } catch (error: any) {
    console.error('Error generating invoice:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate invoice' },
      { status: 500 }
    )
  }
} 