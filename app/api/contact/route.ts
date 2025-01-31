import { NextResponse } from "next/server"
import * as SibApiV3Sdk from "@sendinblue/client"

// Initialize both Contacts and Email APIs
const contactsApi = new SibApiV3Sdk.ContactsApi()
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi()

// Configure API key
const apiKey = process.env.BREVO_API_KEY
if (!apiKey) {
  console.error("BREVO_API_KEY is not set in environment variables")
}
contactsApi.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey || "")
emailApi.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey || "")

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

    const { name, email, subject, message } = data

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.error("Missing required fields:", { name, email, subject, message })
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get current time in IST
    const istTime = getISTDateTime()

    // Send email notification first
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.to = [{ email: "rgbwfoundation@gmail.com", name: "RGB Welfare Foundation" }]
    sendSmtpEmail.subject = `New Contact Form Submission: ${subject}`
    sendSmtpEmail.htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
      <p><strong>Submission Time:</strong> ${istTime} (IST)</p>
    `
    sendSmtpEmail.sender = { email: "team@rgbwf.org", name: "RGB Website Contact Form" }

    await emailApi.sendTransacEmail(sendSmtpEmail)
    console.log("Email notification sent successfully")

    // Create new contact or update existing one
    const createContact = new SibApiV3Sdk.CreateContact()
    createContact.email = email
    createContact.attributes = {
      FIRSTNAME: name.split(" ")[0],
      LASTNAME: name.split(" ").slice(1).join(" "),
      FULLNAME: name,
      LAST_MESSAGE: message,
      LAST_SUBJECT: subject,
      LAST_CONTACT_DATE: istTime,
      FORM_TYPE: "contact",
      SUBMISSION_SOURCE: "website_contact_form"
    }

    try {
      await contactsApi.createContact(createContact)
    } catch (apiError: any) {
      // If contact already exists, update it
      if (apiError.response?.body?.code === "duplicate_parameter") {
        const updateContact = new SibApiV3Sdk.UpdateContact()
        updateContact.attributes = {
          LAST_MESSAGE: message,
          LAST_SUBJECT: subject,
          LAST_CONTACT_DATE: istTime
        }
        await contactsApi.updateContact(email, updateContact)
      }
      // Ignore other errors since email was already sent
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error in contact API route:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
} 