"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users, School, BookOpen } from "lucide-react"
import Link from "next/link"

export default function BoiBondhuPage() {
  // Array of all available images
  const images = [
    "/campaign1/camp1.jpeg",
    "/campaign1/camp2.jpeg",
    "/campaign1/camp3.jpeg",
    "/campaign1/camp4.jpeg",
    "/campaign1/camp5.jpeg"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Boi Bondhu: Empowering Through Education</h1>
          <p className="text-xl text-gray-600 mb-8">
            Ensuring quality education for every child across India
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
                alt={`Boi Bondhu Campaign Image ${index + 1}`}
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
                <span>Pan India</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Ongoing</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>500+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="w-5 h-5 text-primary" />
                <span>10+ Communities</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                The Boi Bondhu initiative provides free education to primary school students from underprivileged communities across India. Our goal is to ensure that every child, regardless of their socio-economic background, has access to quality education.
              </p>

              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-6">
                We aim to bridge the educational gap in underprivileged communities by providing free coaching, study materials, and support to help students excel in their academic pursuits. Through education, we empower these young minds to build a better future for themselves and their communities.
              </p>

              <h3 className="text-2xl font-bold mb-4">Project Focus Areas</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Free coaching for primary school students</li>
                <li>Distribution of educational materials</li>
                <li>Regular academic support and mentoring</li>
                <li>Parent counseling and engagement</li>
                <li>Digital literacy programs</li>
                <li>Holistic development activities</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Project Impact</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>500+ students benefited across India</li>
                <li>Present in 10+ communities</li>
                <li>Improved academic performance</li>
                <li>Enhanced parent-teacher engagement</li>
                <li>Digital education integration</li>
                <li>Reduced dropout rates</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="mb-6">
                You can support this initiative by:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Volunteering as a teacher or mentor</li>
                <li>Donating educational materials</li>
                <li>Supporting our community outreach programs</li>
                <li>Sponsoring a child's education</li>
                <li>Helping with administrative tasks</li>
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

