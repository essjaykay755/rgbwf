import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // Check if Supabase URL and key are available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing Supabase credentials',
        details: { 
          hasUrl: !!supabaseUrl, 
          hasServiceKey: !!supabaseServiceKey 
        }
      }, { status: 500 })
    }
    
    // Create a new client with service role for storage operations
    const serviceClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
    
    // Check if we can list buckets
    const { data: buckets, error: bucketsError } = await serviceClient
      .storage
      .listBuckets()
    
    if (bucketsError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to list buckets',
        details: bucketsError.message
      }, { status: 500 })
    }
    
    // Check if invoices bucket exists
    const invoicesBucket = buckets.find(bucket => bucket.name === 'invoices')
    
    if (!invoicesBucket) {
      // Try to create the bucket
      const { data: newBucket, error: createBucketError } = await serviceClient
        .storage
        .createBucket('invoices', {
          public: false,
          fileSizeLimit: 5242880, // 5MB
        })
      
      if (createBucketError) {
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to create invoices bucket',
          details: createBucketError.message
        }, { status: 500 })
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Invoices bucket created successfully',
        buckets: [...buckets, newBucket]
      })
    }
    
    // Try to upload a test file to the invoices bucket
    const testContent = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]) // "hello" in bytes
    
    const { data: uploadData, error: uploadError } = await serviceClient
      .storage
      .from('invoices')
      .upload('test.txt', testContent, {
        contentType: 'text/plain',
        upsert: true
      })
    
    if (uploadError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to upload test file to invoices bucket',
        details: uploadError.message,
        buckets
      }, { status: 500 })
    }
    
    // Try to get a signed URL for the test file
    const { data: urlData, error: urlError } = await serviceClient
      .storage
      .from('invoices')
      .createSignedUrl('test.txt', 60)
    
    if (urlError) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to create signed URL for test file',
        details: urlError.message,
        buckets
      }, { status: 500 })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Storage is working correctly',
      buckets,
      testUrl: urlData.signedUrl
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error checking storage',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 