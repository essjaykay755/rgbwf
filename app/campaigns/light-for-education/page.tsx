"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Lightbulb, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function LightForEducationPage() {
  // Array of all available images
  const images = [
    "/campaign2/camp1.png",
    "/campaign2/camp2.png",
    "/campaign2/camp3.png",
    "/campaign2/camp4.png",
    "/campaign2/campaign3.png",
    "/campaign2/campaign4.png"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Light for Education</h1>
          <p className="text-xl text-gray-600 mb-8">
            Illuminating the path to education with solar emergency lights
          </p>
        </motion.div>

        {/* Campaign Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {images.map((image, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`Light for Education Campaign Image ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Campaign Details */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Hingalganj, Boltola</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <span>Solar Emergency Lights</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span>Meritorious Students</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                In areas where power outages are frequent, many talented students struggle to maintain their studies during evening hours. Our Light for Education initiative aims to solve this problem by providing solar emergency lights to meritorious students in Hingalganj.
              </p>

              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-6">
                We believe that lack of electricity should not hinder a student's education. By providing sustainable solar-powered lighting solutions, we ensure that students can continue their studies uninterrupted, regardless of power availability.
              </p>

              <h3 className="text-2xl font-bold mb-4">Project Focus Areas</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Distribution of solar emergency lights</li>
                <li>Identification of meritorious students</li>
                <li>Sustainable energy education</li>
                <li>Regular maintenance support</li>
                <li>Academic performance tracking</li>
                <li>Community awareness programs</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Project Impact</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Uninterrupted study time</li>
                <li>Improved academic performance</li>
                <li>Reduced dependency on grid power</li>
                <li>Environmental awareness</li>
                <li>Community development</li>
                <li>Sustainable education support</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="mb-6">
                You can support this initiative by:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Sponsoring solar lights for students</li>
                <li>Supporting maintenance programs</li>
                <li>Volunteering in distribution drives</li>
                <li>Helping identify deserving students</li>
                <li>Contributing to awareness programs</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
              >
                Contact Us to Support
              </Link>
              <Link
                href="/join"
                className="inline-block bg-white text-primary border-2 border-primary px-6 py-3 rounded-full hover:bg-gray-50 transition-colors"
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