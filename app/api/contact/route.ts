import { NextResponse } from 'next/server'
import { TransactionalEmailsApi, SendSmtpEmail, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo'
import { verifyTurnstileToken } from "@/utils/turnstile"

const apiInstance = new TransactionalEmailsApi()
apiInstance.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY || '')

// Function to format date in IST
function getISTDateTime() {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }
  return new Date().toLocaleString('en-IN', options)
}

export async function POST(request: Request) {
  console.log("Contact API route handler started")
  
  try {
    const data = await request.json()
    console.log("Received data:", data)

    const { name, email, phone, message, turnstileToken } = data

    // Validate required fields
    if (!name || !email || !phone || !message || !turnstileToken) {
      console.error("Missing required fields:", { name, email, phone, message, turnstileToken })
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Verify Turnstile token
    const isTokenValid = await verifyTurnstileToken(turnstileToken)
    if (!isTokenValid) {
      console.error("Invalid Turnstile token")
      return NextResponse.json(
        { error: "Invalid captcha token" },
        { status: 400 }
      )
    }

    // Get current time in IST
    const istTime = getISTDateTime()

    // Send email notification
    const sendSmtpEmail = new SendSmtpEmail()
    sendSmtpEmail.subject = 'New Contact Form Submission'
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </body>
      </html>
    `
    sendSmtpEmail.sender = {
      name: 'RGB Welfare Foundation',
      email: 'rgbwfoundation@gmail.com'
    }
    sendSmtpEmail.to = [{
      email: 'rgbwfoundation@gmail.com',
      name: 'RGB Welfare Foundation'
    }]
    sendSmtpEmail.replyTo = {
      email: email,
      name: name
    }

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log("Email notification sent successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
} 