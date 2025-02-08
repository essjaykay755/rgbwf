"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Heart, Home } from "lucide-react"
import Link from "next/link"

export default function FloodReliefPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Flood Relief 2024</h1>
          <p className="text-xl text-gray-600 mb-8">
            Emergency support for communities affected by the 2024 West Bengal floods
          </p>
        </motion.div>

        {/* Campaign Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[1, 2, 3].map((num) => (
            <div key={num} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={`/campaign3/camp${num}.jpeg`}
                alt={`Flood Relief Campaign Image ${num}`}
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
                <span>South Bengal</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                <span>Emergency Relief</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-primary" />
                <span>Affected Communities</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                The 2024 floods in West Bengal severely impacted many communities in the southern regions. Our emergency relief campaign provided immediate support to affected families with essential supplies and assistance.
              </p>

              <h3 className="text-2xl font-bold mb-4">Emergency Response</h3>
              <p className="mb-6">
                We mobilized our resources and volunteers to provide immediate relief to flood-affected communities. Our focus was on delivering essential supplies, medical aid, and temporary shelter to those displaced by the floods.
              </p>

              <h3 className="text-2xl font-bold mb-4">Relief Activities</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Distribution of food and water</li>
                <li>Emergency medical assistance</li>
                <li>Temporary shelter arrangements</li>
                <li>Hygiene kit distribution</li>
                <li>Rescue operations support</li>
                <li>Community coordination</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Impact Achieved</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Immediate relief to affected families</li>
                <li>Medical support to the vulnerable</li>
                <li>Safe drinking water supply</li>
                <li>Emergency shelter provision</li>
                <li>Community rehabilitation support</li>
                <li>Post-flood recovery assistance</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Future Preparedness</h3>
              <p className="mb-6">
                While this campaign has concluded, we continue to:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Monitor vulnerable areas</li>
                <li>Maintain emergency response readiness</li>
                <li>Build community resilience</li>
                <li>Coordinate with local authorities</li>
                <li>Train emergency response teams</li>
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