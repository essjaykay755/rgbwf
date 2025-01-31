"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Instagram } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  // Only reset alerts when user starts typing again
  useEffect(() => {
    const timer = setTimeout(() => {
      if (success || error) {
        setSuccess(false)
        setError("")
      }
    }, 5000) // Hide alerts after 5 seconds

    return () => clearTimeout(timer)
  }, [success, error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      formRef.current?.reset()

      // Scroll to the alert
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
      // Scroll to the error
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us to learn more about our initiatives or to contribute to our cause
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-gray-600">
                  P-348, Basunagar Gate No 1,
                  <br />
                  Madhyamgram, Kolkata 700129,
                  <br />
                  India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-gray-600">090730 13343</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-gray-600">rgbwfoundation@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Working Hours</h3>
                <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {/* Success Alert */}
            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md flex items-center"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            {/* Error Alert */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center"
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                {error}
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
            <div className="mt-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61571891546414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/rgbwelfarefoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-16">
          <div className="h-[400px] rounded-xl overflow-hidden bg-gray-200">
            {/* Replace with actual map implementation */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">Map Placeholder</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

