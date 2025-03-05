"use client"

import { motion } from "framer-motion"
import { AlertCircle, Heart, Users, School, HandHeart, ArrowRight, Shield, Award, Trophy } from "lucide-react"
import Image from "next/image"
import RazorpayPayment from "./RazorpayPayment"
import { useState } from "react"

export function DonateComponent() {
  const [amount, setAmount] = useState<number>(0)

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

  const handlePaymentSuccess = (paymentId: string, orderId: string, signature: string) => {
    // Silently handle the payment success
    console.log('Payment successful:', { paymentId, orderId, signature });
  };

  const handlePaymentError = (error: any) => {
    // Handle error without alert
    console.error('Payment failed:', error);
  };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
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

            {/* Donation Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-16">
              <h2 className="text-2xl font-bold mb-6">Choose Donation Amount</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[500, 1000, 2000, 5000].map((value) => (
                  <button
                    key={value}
                    onClick={() => setAmount(value)}
                    className={`p-4 rounded-lg border ${
                      amount === value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    } transition-all duration-300`}
                  >
                    ₹{value}
                  </button>
                ))}
              </div>
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">₹</span>
                  <input
                    type="number"
                    min="1"
                    value={amount || ''}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-200 p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {amount > 0 && (
                <RazorpayPayment
                  amount={amount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}
            </div>

            {/* Additional Information Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50/50 rounded-xl p-6 border border-green-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-medium text-gray-900">rgbwfoundation@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-base font-medium text-gray-900">91631 97045</p>
                  </div>
                </div>
              </motion.div>

              {/* Bank Account Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50/50 rounded-xl p-6 border border-blue-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Bank Account Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Account Name</p>
                    <p className="text-base font-medium text-gray-900">RGB WELFARE FOUNDATION</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Number</p>
                    <p className="text-base font-medium text-gray-900">925020008521912</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">IFSC Code</p>
                    <p className="text-base font-medium text-gray-900">UTIB0000547</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Registration & Legal Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-12 bg-yellow-50/50 rounded-xl p-6 border border-yellow-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Registration & Legal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Registration No</p>
                    <p className="text-base font-medium text-gray-900">U88100WB2025NPL275903</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">NITI Aayog</p>
                    <p className="text-base font-medium text-gray-900">WB/2025/0503823</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">80G</p>
                    <p className="text-base font-medium text-gray-900">AAOCR2529RE2025101</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">License No</p>
                    <p className="text-base font-medium text-gray-900">163588</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">12A</p>
                    <p className="text-base font-medium text-gray-900">AAOCR2429RE20241</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tax Benefits</p>
                    <p className="text-base font-medium text-gray-900">Available under 80G</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
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

