"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Users, Heart } from "lucide-react"

export function CampaignArticle() {
  return (
    <article className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Flood Relief 2024: Supporting Communities in Crisis
          </motion.h1>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>September 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>South Bengal</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>5,000+ People Supported</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[500px] mb-12 rounded-xl overflow-hidden"
        >
          <Image
            src="/campaign3/camp1.jpeg"
            alt="Flood relief efforts in action"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <p className="lead text-xl">
              When natural disasters strike, immediate response and community support become crucial for survival and recovery.
            </p>

            <p>
              The 2024 West Bengal floods, occurring in mid-September, brought unprecedented challenges to the southern regions 
              of the state. Communities found themselves facing immediate needs for food, clean water, and essential supplies.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Our Response</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>Provided emergency relief supplies to over 5,000 affected individuals</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>Distributed clean drinking water and non-perishable food items</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>Supported families with temporary shelter and essential medicines</span>
              </li>
            </ul>

            <p className="mt-6">
              We extend our heartfelt gratitude to our volunteers, donors, and local administration for their 
              swift support in making this relief effort possible.
            </p>
          </motion.div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="/campaign3/camp2.jpeg"
                alt="Distribution of relief materials"
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
                src="/campaign3/camp3.jpeg"
                alt="Community support during floods"
                fill
                className="object-cover"
              />
            </motion.div>

          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-primary/5 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Support Our Emergency Response</h2>
            <p className="text-gray-600 mb-6">
              Your contribution helps us respond quickly to communities in crisis.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
              Donate Now
            </button>
          </motion.div>
        </div>
      </div>
    </article>
  )
} 