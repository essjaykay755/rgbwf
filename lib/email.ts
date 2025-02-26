import * as SibApiV3Sdk from 'sib-api-v3-sdk'

const defaultClient = SibApiV3Sdk.ApiClient.instance

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY is not defined in environment variables')
}

defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

interface SendInvoiceEmailParams {
  donorEmail: string
  donorName: string
  amount: number
  invoiceNumber: string
  pdfBuffer: Buffer
}

export const sendInvoiceEmail = async ({
  donorEmail,
  donorName,
  amount,
  invoiceNumber,
  pdfBuffer,
}: SendInvoiceEmailParams) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

    sendSmtpEmail.subject = `RGB Welfare Foundation - Invoice ${invoiceNumber}`
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <p>Dear ${donorName},</p>
          <p>Thank you for your generous donation of ₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} to RGB Welfare Foundation.</p>
          <p>Please find attached your invoice for the donation.</p>
          <p>Your contribution will help us continue our mission of empowering communities through education, healthcare, and sustainable development initiatives.</p>
          <br/>
          <p>Best regards,<br>RGB Welfare Foundation Team</p>
        </body>
      </html>
    `
    sendSmtpEmail.sender = {
      name: 'RGB Welfare Foundation',
      email: 'rgbwfoundation@gmail.com',
    }
    sendSmtpEmail.to = [{
      email: donorEmail,
      name: donorName,
    }]
    sendSmtpEmail.cc = [{
      email: 'rgbwfoundation@gmail.com',
      name: 'RGB Welfare Foundation',
    }]
    sendSmtpEmail.attachment = [{
      name: `invoice-${invoiceNumber}.pdf`,
      content: pdfBuffer.toString('base64'),
    }]

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
} 