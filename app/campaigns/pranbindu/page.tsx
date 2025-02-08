"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, School } from "lucide-react"
import Link from "next/link"

export default function PranbinduPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pranbindu</h1>
          <p className="text-xl text-gray-600 mb-8">
            Building social responsibility and awareness about blood donation among students
          </p>
        </motion.div>

        {/* Campaign Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={`/campaign5/campaign${num}.jpg`}
                alt={`Pranbindu Campaign Image ${num}`}
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
                <span>West Bengal</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-primary" />
                <span>100 Schools</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>2 Million Students</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                To become an ideal human being, academic knowledge alone is not enough. Students must also be taught social responsibility, giving back to society, and helping the helpless, so they can one day feel proud as human beings.
              </p>

              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-6">
                Our project, "Pranabindu," is working with 100 schools across Bengal and 2 million students. Through this initiative, we focus on raising awareness about the necessity of blood, the importance of blood donation, preventing external causes of bloodborne infections, and determining blood groups. This endeavor has been widely appreciated by all.
              </p>

              <h3 className="text-2xl font-bold mb-4">Project Focus Areas</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Blood donation awareness</li>
                <li>Blood group determination</li>
                <li>Prevention of bloodborne infections</li>
                <li>Social responsibility education</li>
                <li>Student engagement in community service</li>
                <li>Health and hygiene awareness</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Project Impact</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Reaching 2 million students</li>
                <li>Partnering with 100 schools</li>
                <li>Creating young blood donation advocates</li>
                <li>Building socially responsible future citizens</li>
                <li>Promoting health awareness</li>
                <li>Fostering community engagement</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="mb-6">
                You can support this initiative by:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Volunteering at awareness programs</li>
                <li>Helping organize blood donation camps</li>
                <li>Supporting our school outreach programs</li>
                <li>Spreading awareness about the initiative</li>
                <li>Making donations to support the program</li>
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