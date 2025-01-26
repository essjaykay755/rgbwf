"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Lightbulb, Users, Calendar, MapPin } from "lucide-react"

export default function CampaignDetail() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-center"
          >
            Light for Education
          </motion.h1>
          <p className="text-lg text-gray-600 text-center mb-8">
            Empowering students in Hingalganj&apos;s Boltola with tools for uninterrupted education
          </p>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yEgJV5mFSHuHQjLokc55upWlxrb9Zq.png"
              alt="RGB Foundation event"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20155012-ee9FRJiXGeBNx4E0wlhrYaBELCGmhs.png"
              alt="Students attending the event"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20154940-ObQSsLexXA7hdmnuEVUeCIJjgglqd4.png"
              alt="Distribution of solar lights"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative h-[300px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20154959-lnbAeWjmlITYz0ha22kOxnwZPr7O19.png"
              alt="Students with their solar lights"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Campaign Details */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Impact</h3>
                  <p className="text-gray-600">50+ Students Supported</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600">Hingalganj, Boltola</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Date</h3>
                  <p className="text-gray-600">January 2025</p>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">About the Campaign</h2>
              <p className="mb-4">
                Students are our future. It is the duty of every citizen to light the path of their education. Only when
                society is educated can the nation progress.
              </p>
              <p className="mb-4">
                In Hingalganj&apos;s Boltola, we have come forward to support meritorious secondary and higher secondary
                students who lack financial stability but have the desire to study. To encourage their education
                further, we have provided them with emergency lights to study during power cuts.
              </p>
              <p className="mb-4">
                We express our gratitude to the local administration and villagers for their support. On behalf of RGB
                Welfare Foundation, we extend our best wishes to all students for their upcoming board exams.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
              Support Our Cause
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

