"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { CheckCircle2 } from "lucide-react"

export default function JoinForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    dob: "",
    phone: "",
    email: "",
    hasSocialWorkExperience: "",
    whyJoin: "",
    howKnow: ""
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
      console.log("Submitting form data:", formData)
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log("Server response:", data)

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit application")
      }

      setSuccess(true)
      setFormData({
        name: "",
        occupation: "",
        dob: "",
        phone: "",
        email: "",
        hasSocialWorkExperience: "",
        whyJoin: "",
        howKnow: ""
      })
      formRef.current?.reset()

      // Scroll to the alert
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error("Form submission error:", err)
      setError(err instanceof Error ? err.message : "Failed to submit application")
      // Scroll to the error
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Join Our Community</h1>

          <div className="bg-white rounded-xl shadow-lg p-8">
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
                Application submitted successfully! We'll get back to you soon.
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
                <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                  Occupation *
                </label>
                <input
                  type="text"
                  name="occupation"
                  id="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Do you have experience in social work? *
                </label>
                <div className="space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasSocialWorkExperience"
                      value="yes"
                      checked={formData.hasSocialWorkExperience === "yes"}
                      onChange={handleChange}
                      required
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="hasSocialWorkExperience"
                      value="no"
                      checked={formData.hasSocialWorkExperience === "no"}
                      onChange={handleChange}
                      required
                      className="form-radio text-primary"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="whyJoin" className="block text-sm font-medium text-gray-700 mb-1">
                  Why do you want to join RGB Welfare Foundation? *
                </label>
                <textarea
                  name="whyJoin"
                  id="whyJoin"
                  value={formData.whyJoin}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="howKnow" className="block text-sm font-medium text-gray-700 mb-1">
                  How did you hear about us? *
                </label>
                <textarea
                  name="howKnow"
                  id="howKnow"
                  value={formData.howKnow}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

