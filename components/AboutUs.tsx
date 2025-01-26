"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Heart, Globe } from "lucide-react"
import Team from "./Team"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About RGB Welfare Foundation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering communities across India through sustainable development and education
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower women and support the development of underprivileged children from rural, urban, and tribal
              communities across India, fostering resilient community growth and sustainable development.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To create a society where every individual, regardless of their background, has access to education,
              healthcare, and opportunities for growth, projecting our roots onto global platforms.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Community First</h3>
              <p className="text-gray-600">Prioritizing the needs and development of local communities</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Compassion</h3>
              <p className="text-gray-600">Acting with empathy and understanding in all our initiatives</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Globe className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">Creating lasting positive impact through sustainable solutions</p>
            </motion.div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-16">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473227783_122095731974729718_7799801113706853113_n.jpg-XdiE4VS1wzRr0rhhVg145olmH28nNG.jpeg"
            alt="RGB Welfare Foundation team conducting an educational session"
            fill
            className="object-cover"
          />
        </div>

        {/* Team Section */}
        <Team />
      </div>
    </div>
  )
}

