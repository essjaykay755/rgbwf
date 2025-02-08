"use client"

import { motion } from "framer-motion"
import { MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function AmarMeyeDurgaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Amar Meye Durga</h1>
          <p className="text-xl text-gray-600 mb-8">
            Empowering girls across Bengal through self-defense training
          </p>
        </motion.div>

        {/* Campaign Images */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={`/campaign4/campaign${num}.jpg`}
                alt={`Amar Meye Durga Campaign Image ${num}`}
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
                <Users className="w-5 h-5 text-primary" />
                <span>Target: 50,000 girls</span>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Any form of physical activity helps to keep our body and mind healthy. It builds resilience, strengthens the mind, and boosts confidence. Self-defense is one of the most crucial skills in this regard. Every girl should know and learn self-defense techniques, and more girls should be encouraged to learn it.
              </p>

              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="mb-6">
                In the first phase of the "Amar Meye Durga" project, we aim to train 50,000 girls across Bengal in self-defense. Our goal is to bring all girls under the scope of self-defense education, without discrimination based on caste, religion, or financial status.
              </p>

              <h3 className="text-2xl font-bold mb-4">Project Highlights</h3>
              <ul className="list-disc pl-6 mb-6">
                <li>Professional self-defense training</li>
                <li>Focus on practical, real-world techniques</li>
                <li>Building confidence and mental strength</li>
                <li>Inclusive approach - no discrimination</li>
                <li>Regular training sessions and workshops</li>
                <li>Experienced trainers and mentors</li>
              </ul>

              <h3 className="text-2xl font-bold mb-4">Get Involved</h3>
              <p className="mb-6">
                You can support this initiative by:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Volunteering as a trainer or mentor</li>
                <li>Spreading awareness about the program</li>
                <li>Making donations to support training costs</li>
                <li>Helping us reach more communities</li>
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