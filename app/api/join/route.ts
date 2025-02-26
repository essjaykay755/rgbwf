import { NextResponse } from "next/server"
import * as SibApiV3Sdk from "sib-api-v3-sdk"
import { verifyTurnstileToken } from "@/utils/turnstile"

const defaultClient = SibApiV3Sdk.ApiClient.instance

if (!process.env.BREVO_API_KEY) {
  throw new Error('BREVO_API_KEY is not defined in environment variables')
}

defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

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
  console.log("Join API route handler started")
  
  try {
    const data = await request.json()
    console.log("Join API received data:", data)

    const {
      name,
      email,
      phone,
      address,
      occupation,
      interests,
      experience,
      availability,
      expectations,
      referral,
      turnstileToken
    } = data

    // Validate required fields
    const missingFields = []
    if (!name) missingFields.push("name")
    if (!email) missingFields.push("email")
    if (!phone) missingFields.push("phone")
    if (!address) missingFields.push("address")
    if (!occupation) missingFields.push("occupation")
    if (!interests.length) missingFields.push("areas of interest")
    if (!experience) missingFields.push("relevant experience")
    if (!availability) missingFields.push("availability")
    if (!expectations) missingFields.push("expectations")
    if (!referral) missingFields.push("how you heard about us")
    if (!turnstileToken) missingFields.push("captcha verification")

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(", ")}`
      console.error(errorMessage)
      return NextResponse.json(
        { error: errorMessage },
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

    // Send email notification first
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.subject = 'New Volunteer Application'
    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h2>New Volunteer Application</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Occupation:</strong> ${occupation}</p>
          <p><strong>Areas of Interest:</strong> ${interests.join(', ')}</p>
          <p><strong>Relevant Experience:</strong></p>
          <p>${experience}</p>
          <p><strong>Availability:</strong> ${availability}</p>
          <p><strong>Expectations:</strong></p>
          <p>${expectations}</p>
          <p><strong>How did you hear about us?</strong> ${referral}</p>
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

    console.log("Attempting to send email notification...")
    try {
      await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log("Email notification sent successfully")
      return NextResponse.json({ 
        success: true,
        message: "Your application has been submitted successfully! We'll contact you soon."
      })
    } catch (error: any) {
      console.error("Error sending email notification:", error?.response?.body || error)
      return NextResponse.json(
        { error: "Failed to send application notification. Please try again." },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Error in join API route:", error?.response?.body || error)
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    )
  }
} 