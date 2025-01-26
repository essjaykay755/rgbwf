"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

export function DonateComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Support Our Cause</h1>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-center gap-4 text-amber-600 mb-6">
              <AlertCircle className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Online Donation Coming Soon</h2>
            </div>
            <p className="text-gray-600 mb-8">
              We are currently working on implementing secure online donation facilities. In the meantime, if you would
              like to contribute to our cause, please contact us directly through our contact page or reach out via our
              social media channels.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Contact Information</h3>
                <p className="text-gray-600">Email: rgbwfoundation@gmail.com</p>
                <p className="text-gray-600">Phone: 090730 13343</p>
              </div>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61571891546414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

