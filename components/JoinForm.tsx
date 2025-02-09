"use client"

import { motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Heart, Users, Target, ArrowRight, CheckCircle2 } from "lucide-react"
import Turnstile from "react-turnstile"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const benefits = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Make a Difference",
      description: "Join us in creating positive change in communities across India"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Join a Community",
      description: "Connect with like-minded individuals passionate about social welfare"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Gain Experience",
      description: "Develop valuable skills while contributing to meaningful causes"
    }
  ]

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
    
    if (!turnstileToken) {
      setSubmitStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setSubmitStatus("success")
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
    } catch (error) {
      console.error("Error submitting application:", error)
      setSubmitStatus("error")
      // Scroll to the error
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Become Part of Our
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Growing Community
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join us in our mission to create lasting positive change and empower communities across India
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Benefits Section */}
            <div className="space-y-8">
              <div className="grid gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/20 transition-colors group"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473227783_122095731974729718_7799801113706853113_n.jpg-XdiE4VS1wzRr0rhhVg145olmH28nNG.jpeg"
                  alt="RGB Welfare Foundation volunteers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Application Form</h2>
                <p className="text-gray-600">Fill out the form below to join our community</p>
              </div>

              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <p>Application submitted successfully! We'll get back to you soon.</p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                    Occupation *
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Your current occupation"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Do you have experience in social work? *
                  </label>
                  <div className="space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="hasSocialWorkExperience"
                        value="yes"
                        checked={formData.hasSocialWorkExperience === "yes"}
                        onChange={handleChange}
                        className="form-radio text-primary focus:ring-primary"
                        required
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
                        className="form-radio text-primary focus:ring-primary"
                        required
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
                    id="whyJoin"
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Tell us about your motivation..."
                  />
                </div>

                <div>
                  <label htmlFor="howKnow" className="block text-sm font-medium text-gray-700 mb-1">
                    How did you hear about us? *
                  </label>
                  <textarea
                    id="howKnow"
                    name="howKnow"
                    value={formData.howKnow}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Tell us how you found us..."
                  />
                </div>

                <div className="flex justify-center">
                  <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                    onVerify={(token: string) => setTurnstileToken(token)}
                    onError={() => setTurnstileToken(null)}
                    onExpire={() => setTurnstileToken(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className={`w-full bg-primary text-white px-8 py-4 rounded-xl text-lg font-medium 
                    ${isSubmitting || !turnstileToken ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'} 
                    transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>

                {submitStatus === "success" && (
                  <div className="text-green-600 text-center">
                    Application submitted successfully! We'll contact you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-red-600 text-center">
                    Failed to submit application. Please try again.
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

