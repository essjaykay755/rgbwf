"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function WomensDayCampaignPage() {
  // Array of all available images
  const images = [
    "/articles/WhatsApp Image 2025-03-08 at 13.52.12_5e19bcca.jpg",
    "/articles/WhatsApp Image 2025-03-08 at 13.52.07_e50d75b3.jpg",
    "/articles/WhatsApp Image 2025-03-08 at 13.52.13_bdb1afbd.jpg",
    "/articles/WhatsApp Image 2025-03-08 at 13.52.11_dbebb342.jpg",
    "/articles/WhatsApp Image 2025-03-08 at 13.52.08_58257ccb.jpg",
    "/articles/WhatsApp Image 2025-03-08 at 13.52.16_4c3c6967.jpg"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Women's Day 2025
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Celebrating women's self-reliance, health, education, and self-respect
          </p>
        </motion.div>

        {/* Campaign Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto"
        >
          {images.map((image, index) => (
            <motion.div 
              key={index} 
              whileHover={{ y: -5 }}
              className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={image}
                  alt={`Women's Day 2025 Image ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Campaign Details */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-8"
          >
            <div className="flex flex-wrap gap-6 mb-12 text-gray-600 justify-center md:justify-start">
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Bidhannagar, Kolkata</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Calendar className="w-5 h-5 text-primary" />
                <span>March 8, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Users className="w-5 h-5 text-primary" />
                <span>Community Participation</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-gray-600 leading-relaxed">
                Women's Day is not just a one-day celebration for us. It is a day to raise awareness about women's self-reliance, health, education, and self-respect. This day is not about competition with men but rather about walking together with assurance. It marks the beginning of equal rights for all genders.
              </p>

              <p className="mb-8 text-gray-600 leading-relaxed">
                On the occasion of International Women's Day, RGB Welfare Foundation organized a special event where both women and men participated equally as volunteers.
              </p>

              <p className="mb-8 text-gray-600 leading-relaxed">
                Our special program was supported by Jhunku Mondal, Councillor, Bidhannagar Municipality Corporation (Ward 23), and Debraj Chakraborty, Councillor & Member of the Mayor-in-Council, Bidhannagar Municipal Corporation.
              </p>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Event Highlights</h3>
              <ul className="list-none pl-0 mb-8 grid md:grid-cols-2 gap-4">
                {[
                  "Women's health awareness sessions",
                  "Career guidance for young women",
                  "Self-defense demonstrations",
                  "Panel discussions on gender equality",
                  "Recognition of women achievers",
                  "Community engagement activities"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/contact"
                className="inline-block bg-gradient-to-r from-primary to-primary/90 text-white px-8 py-4 rounded-xl hover:from-primary/95 hover:to-primary/85 transition-all font-medium"
              >
                Contact Us
              </Link>
              <Link
                href="/join"
                className="inline-block bg-white text-primary border-2 border-primary px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Volunteer With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 