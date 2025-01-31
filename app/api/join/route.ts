import { NextResponse } from "next/server"
import * as SibApiV3Sdk from "@sendinblue/client"

// Initialize both Contacts and Email APIs
const contactsApi = new SibApiV3Sdk.ContactsApi()
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi()

// Configure API key
const apiKey = process.env.BREVO_API_KEY
if (!apiKey) {
  console.error("BREVO_API_KEY is not set in environment variables")
  throw new Error("BREVO_API_KEY is not configured")
}

contactsApi.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, apiKey)
emailApi.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, apiKey)

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
      occupation,
      dob,
      phone,
      email,
      hasSocialWorkExperience,
      whyJoin,
      howKnow,
    } = data

    // Format DOB in Indian format
    const formattedDOB = new Date(dob).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    })

    // Validate required fields
    const missingFields = []
    if (!name) missingFields.push("name")
    if (!occupation) missingFields.push("occupation")
    if (!dob) missingFields.push("date of birth")
    if (!phone) missingFields.push("phone")
    if (!email) missingFields.push("email")
    if (!hasSocialWorkExperience) missingFields.push("social work experience")
    if (!whyJoin) missingFields.push("why you want to join")
    if (!howKnow) missingFields.push("how you heard about us")

    if (missingFields.length > 0) {
      const errorMessage = `Missing required fields: ${missingFields.join(", ")}`
      console.error(errorMessage)
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      )
    }

    // Send email notification first
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    sendSmtpEmail.to = [{ email: "rgbwfoundation@gmail.com", name: "RGB Welfare Foundation" }]
    sendSmtpEmail.subject = `New Volunteer Application: ${name}`
    sendSmtpEmail.htmlContent = `
      <h2>New Volunteer Application</h2>
      <p><strong>Personal Information:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Date of Birth:</strong> ${formattedDOB}</li>
        <li><strong>Occupation:</strong> ${occupation}</li>
      </ul>
      
      <p><strong>Application Details:</strong></p>
      <ul>
        <li><strong>Has Social Work Experience:</strong> ${hasSocialWorkExperience}</li>
        <li><strong>Why They Want to Join:</strong></li>
        <p style="white-space: pre-wrap;">${whyJoin}</p>
        <li><strong>How They Found Us:</strong></li>
        <p style="white-space: pre-wrap;">${howKnow}</p>
      </ul>
      
      <p><strong>Submission Time:</strong> ${getISTDateTime()} (IST)</p>
    `
    sendSmtpEmail.sender = { email: "team@rgbwf.org", name: "RGB Website Volunteer Applications" }
    sendSmtpEmail.replyTo = { email: "rgbwfoundation@gmail.com", name: "RGB Welfare Foundation" }

    console.log("Attempting to send email notification...")
    try {
      const emailResult = await emailApi.sendTransacEmail(sendSmtpEmail)
      console.log("Email notification sent successfully:", emailResult)
    } catch (error: any) {
      console.error("Error sending email notification:", error?.response?.body || error)
      return NextResponse.json(
        { error: "Failed to send application notification. Please try again." },
        { status: 500 }
      )
    }

    // Get current time in IST for Brevo attributes
    const now = new Date()
    const istTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })

    // Create contact with form data
    const createContact = new SibApiV3Sdk.CreateContact()
    createContact.email = email
    createContact.attributes = {
      // Personal Information
      FIRSTNAME: name.split(" ")[0],
      LASTNAME: name.split(" ").slice(1).join(" ") || "-",
      FULLNAME: name,
      OCCUPATION: occupation,
      DATE_OF_BIRTH: formattedDOB,
      PHONE: phone,
      
      // Volunteer Information
      HAS_SOCIAL_WORK_EXPERIENCE: hasSocialWorkExperience,
      WHY_JOIN: whyJoin,
      HOW_KNOW: howKnow,
      
      // Application Details
      APPLICATION_STATUS: "PENDING",
      APPLICATION_DATE: istTime,
      
      // Metadata
      FORM_TYPE: "volunteer_application",
      SUBMISSION_DATE: istTime,
      SUBMISSION_SOURCE: "website_volunteer_form",
      
      // For filtering/segmentation
      IS_VOLUNTEER_APPLICANT: "true",
      VOLUNTEER_STATUS: "pending",
    }

    console.log("Attempting to create contact in Brevo...")
    try {
      await contactsApi.createContact(createContact)
      console.log("Contact created successfully in Brevo")
      return NextResponse.json({ 
        success: true,
        message: "Your application has been submitted successfully! We'll contact you soon."
      })
    } catch (error: any) {
      // If contact already exists, just update their information
      if (error?.response?.body?.code === "duplicate_parameter") {
        try {
          console.log("Contact exists, attempting to update...")
          const updateContact = new SibApiV3Sdk.UpdateContact()
          updateContact.attributes = createContact.attributes
          await contactsApi.updateContact(email, updateContact)
          console.log("Existing contact updated successfully")
          return NextResponse.json({ 
            success: true,
            message: "Your application has been submitted successfully! We'll contact you soon."
          })
        } catch (updateError: any) {
          console.error("Error updating contact:", updateError?.response?.body || updateError)
          return NextResponse.json(
            { error: "Failed to update your application. Please try again." },
            { status: 500 }
          )
        }
      }

      console.error("Error creating contact:", error?.response?.body || error)
      return NextResponse.json(
        { error: "Failed to store application data. Please try again." },
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