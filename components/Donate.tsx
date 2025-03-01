"use client"

import { motion } from "framer-motion"
import { AlertCircle, Heart, Users, School, HandHeart, ArrowRight, Shield, Award, Trophy } from "lucide-react"
import Image from "next/image"

export function DonateComponent() {
  const impactMetrics = [
    { number: "5000+", label: "Lives Impacted", icon: <Users className="w-6 h-6" /> },
    { number: "100+", label: "Schools Reached", icon: <School className="w-6 h-6" /> },
    { number: "10+", label: "Active Campaigns", icon: <Heart className="w-6 h-6" /> },
  ]

  const trustIndicators = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Donations",
      description: "Your contributions are processed through secure payment gateways"
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "Transparency",
      description: "Regular updates on how your donation creates impact"
    },
    {
      icon: <Trophy className="w-6 h-6 text-primary" />,
      title: "Recognition",
      description: "Tax benefits available under 80G certification"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6">
              Make a Difference Today
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support Our Mission to
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Transform Lives
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Your contribution helps us continue our work in empowering communities and creating lasting positive change.
            </p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {impactMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto text-primary">
                    {metric.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{metric.number}</h3>
                  <p className="text-gray-600">{metric.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Donation Options */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
              <div className="flex items-center justify-center gap-4 text-amber-600 mb-6">
                <AlertCircle className="w-8 h-8" />
                <h2 className="text-xl font-semibold">Online Donation Coming Soon</h2>
              </div>
              <p className="text-gray-600 mb-8">
                We are currently working on implementing secure online donation facilities. In the meantime, if you would
                like to contribute to our cause, please contact us directly through our contact page or reach out via our
                social media channels.
              </p>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <HandHeart className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">Email: rgbwfoundation@gmail.com</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <HandHeart className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">Phone: 090730 13343</p>
                    </div>
                  </div>
                </div>
                
                {/* Bank Account Details */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-4 text-lg">Bank Account Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <HandHeart className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">A/C NAME: RGB WELFARE FOUNDATION</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <HandHeart className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">A/C NO: 925020008521912</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <HandHeart className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">IFSC: UTIB0000547</p>
                    </div>
                  </div>
                </div>
                
                {/* Registration and Legal Information */}
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <h3 className="font-semibold mb-4 text-lg">Registration & Legal Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">Registration No: U88100WB2025NPL275903</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">License No: 163588</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">NITI Aayog: WB/2025/0503823</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">12A: AAOCR2429RE20241</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <p className="text-gray-600">80G: AAOCR2529RF2025101</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61571891546414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all group"
                  >
                    <span>Facebook</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <span>LinkedIn</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-8">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={indicator.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    {indicator.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{indicator.title}</h3>
                  <p className="text-gray-600 text-sm">{indicator.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

