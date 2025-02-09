"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"

export default function RuralToGlobalBridgePage() {
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
            Rural to Global Bridge
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Empowering women in tribal communities through skill development and economic opportunities
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
                  src={`/campaign6/campaign${num}.jpg`}
                  alt={`Rural to Global Bridge Campaign Image ${num}`}
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
                <span>Tribal Communities</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Users className="w-5 h-5 text-primary" />
                <span>Women Empowerment</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl">
                <Briefcase className="w-5 h-5 text-primary" />
                <span>Skill Development</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-8 text-gray-600 leading-relaxed">
                To build a better society, women must be empowered to earn. Educating them is essential, as only then can children be educated too. From this new year, our goal is to bring smiles to the faces of these families.
              </p>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Our Mission</h3>
              <p className="mb-8 text-gray-600 leading-relaxed">
                In tribal communities, the per capita income is so low that running a household becomes a challenge. That's why we have taken the initiative to provide skill-based training and job opportunities for women, enabling them to earn a livelihood.
              </p>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Program Focus Areas</h3>
              <ul className="list-none pl-0 mb-8 grid md:grid-cols-2 gap-4">
                {[
                  "Skill-based training programs",
                  "Job placement assistance",
                  "Financial literacy education",
                  "Entrepreneurship development",
                  "Community support networks",
                  "Sustainable livelihood solutions"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold mb-6 text-gray-900">Expected Impact</h3>
              <ul className="list-none pl-0 mb-8 grid md:grid-cols-2 gap-4">
                {[
                  "Increased household income",
                  "Better education for children",
                  "Enhanced family well-being",
                  "Women's economic independence",
                  "Community development",
                  "Sustainable growth"
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
                  "Volunteering as a trainer",
                  "Supporting skill development programs",
                  "Providing job opportunities",
                  "Sponsoring training sessions",
                  "Spreading awareness"
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