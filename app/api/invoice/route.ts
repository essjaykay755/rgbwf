import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { supabase } from '@/lib/supabase'
import { sendInvoiceEmail } from '@/lib/email'
import { InvoicePDF } from '@/app/invoice/InvoicePDF'
import { createElement } from 'react'

export async function POST(request: Request) {
  try {
    const session = await supabase.auth.getSession()
    if (!session.data.session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userEmail = session.data.session.user.email
    if (userEmail !== 'rgbwfoundation@gmail.com') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    const { donorName, donorEmail, donorAddress, amount, description, date } = data

    // Generate invoice number
    const serialNumber = `INV-${Date.now()}`

    // Generate PDF
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

    // Save to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(`${serialNumber}.pdf`, pdfBuffer, {
        contentType: 'application/pdf',
      })

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from('invoices')
      .getPublicUrl(`${serialNumber}.pdf`)

    // Save to database
    const { error: dbError } = await supabase.from('invoices').insert({
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
      throw dbError
    }

    // Send email
    await sendInvoiceEmail({
      donorEmail,
      donorName,
      amount,
      invoiceNumber: serialNumber,
      pdfBuffer,
    })

    return NextResponse.json({
      success: true,
      serialNumber,
      pdfUrl: publicUrl.publicUrl,
    })
  } catch (error) {
    console.error('Error generating invoice:', error)
    return NextResponse.json(
      { error: 'Failed to generate invoice' },
      { status: 500 }
    )
  }
} 