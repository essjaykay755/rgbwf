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
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-amber-200/50 rounded-xl transform -skew-y-1"></div>
                <div className="relative flex flex-col items-center justify-center gap-4 bg-white rounded-xl p-6 border border-amber-200 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-2">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2
                      }}
                    >
                      <AlertCircle className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-amber-700 mb-2">Online Donation Coming Soon</h2>
                    <p className="text-amber-700/80">
                      We're working hard to bring you a seamless online donation experience
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
                We are currently working on implementing secure online donation facilities. In the meantime, if you would
                like to contribute to our cause, please use one of the methods below or reach out via our
                social media channels.
              </p>
              
              {/* Redesigned Information Sections */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Contact Information - Redesigned */}
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group">
                  <div className="bg-primary/10 p-4 text-center">
                    <h3 className="font-semibold text-lg text-primary">Contact Information</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="text-gray-700 font-medium">rgbwfoundation@gmail.com</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="text-gray-700 font-medium">91631 97045</p>
                    </div>
                  </div>
                </div>
                
                {/* Bank Account Details - Redesigned */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group">
                  <div className="bg-blue-100 p-4 text-center">
                    <h3 className="font-semibold text-lg text-blue-700">Bank Account Details</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">Account Name</p>
                      <p className="text-gray-700 font-medium">RGB WELFARE FOUNDATION</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">Account Number</p>
                      <p className="text-gray-700 font-medium">925020008521912</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">IFSC Code</p>
                      <p className="text-gray-700 font-medium">UTIB0000547</p>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* Registration and Legal Information - Redesigned */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md mb-8">
                <div className="bg-amber-100 p-4 text-center">
                  <h3 className="font-semibold text-lg text-amber-700">Registration & Legal Information</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">Registration No</p>
                      <p className="text-gray-700 font-medium">U88100WB2025NPL275903</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">License No</p>
                      <p className="text-gray-700 font-medium">163588</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">NITI Aayog</p>
                      <p className="text-gray-700 font-medium">WB/2025/0503823</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">12A</p>
                      <p className="text-gray-700 font-medium">AAOCR2429RE20241</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">80G</p>
                      <p className="text-gray-700 font-medium">AAOCR2529RF2025101</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/80 hover:bg-white transition-colors">
                      <p className="text-xs text-gray-500 mb-1">Tax Benefits</p>
                      <p className="text-gray-700 font-medium">Available under 80G</p>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* Social Media Links - Redesigned */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6 mb-8">
                <h3 className="font-semibold text-lg text-center mb-6">Connect With Us</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61571891546414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <span className="font-medium">Facebook</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition-all shadow-sm hover:shadow-md"
                  >
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.instagram.com/rgbwelfarefoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <span className="font-medium">Instagram</span>
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

