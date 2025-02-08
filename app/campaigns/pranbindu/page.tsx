"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, School } from "lucide-react"
import Link from "next/link"

export default function PranbinduPage() {
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
            Pranbindu
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Building social responsibility and awareness about blood donation among students
          </p>
        </motion.div>

        {/* Campaign Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto"
        >
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <motion.div 
              key={num} 
              whileHover={{ y: -5 }}
              className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`/campaign5/campaign${num}.jpg`}
                  alt={`Pranbindu Campaign Image ${num}`}
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
                <span>West Bengal</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <School className="w-5 h-5 text-primary" />
                <span>100 Schools</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Users className="w-5 h-5 text-primary" />
                <span>2 Million Students</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-gray-600 leading-relaxed">
                To become an ideal human being, academic knowledge alone is not enough. Students must also be taught social responsibility, giving back to society, and helping the helpless, so they can one day feel proud as human beings.
              </p>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h3>
              <p className="mb-8 text-gray-600 leading-relaxed">
                Our project, "Pranabindu," is working with 100 schools across Bengal and 2 million students. Through this initiative, we focus on raising awareness about the necessity of blood, the importance of blood donation, preventing external causes of bloodborne infections, and determining blood groups. This endeavor has been widely appreciated by all.
              </p>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Project Focus Areas</h3>
              <ul className="list-none pl-0 mb-8 grid md:grid-cols-2 gap-4">
                {[
                  "Blood donation awareness",
                  "Blood group determination",
                  "Prevention of bloodborne infections",
                  "Social responsibility education",
                  "Student engagement in community service",
                  "Health and hygiene awareness"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Project Impact</h3>
              <ul className="list-none pl-0 mb-8 grid md:grid-cols-2 gap-4">
                {[
                  "Reaching 2 million students",
                  "Partnering with 100 schools",
                  "Creating young blood donation advocates",
                  "Building socially responsible future citizens",
                  "Promoting health awareness",
                  "Fostering community engagement"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Get Involved</h3>
              <p className="mb-6 text-gray-600">
                You can support this initiative by:
              </p>
              <ul className="list-none pl-0 mb-8 grid md:grid-cols-2 gap-4">
                {[
                  "Volunteering at awareness programs",
                  "Helping organize blood donation camps",
                  "Supporting our school outreach programs",
                  "Spreading awareness about the initiative",
                  "Making donations to support the program"
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
                Contact Us to Support
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