"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"

export default function CampaignArticle() {
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
            Light for Education: Empowering Students in Hingalganj
          </motion.h1>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>January 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Hingalganj, Boltola</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>50+ Students Impacted</span>
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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yEgJV5mFSHuHQjLokc55upWlxrb9Zq.png"
            alt="RGB Foundation event"
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
            <p className="lead">
              Students are our future. It is the duty of every citizen to light the path of their education. Only when
              society is educated can the nation progress.
            </p>

            <p>
              In Hingalganj&apos;s Boltola, we have come forward to support meritorious secondary and higher secondary
              students who lack financial stability but have the desire to study. To encourage their education further,
              we have provided them with emergency lights to study during power cuts.
            </p>

            <p>
              We express our gratitude to the local administration and villagers for their support. On behalf of RGB
              Welfare Foundation, we extend our best wishes to all students for their upcoming board exams.
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20155012-ee9FRJiXGeBNx4E0wlhrYaBELCGmhs.png"
                alt="Students attending the event"
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20154940-ObQSsLexXA7hdmnuEVUeCIJjgglqd4.png"
                alt="Distribution of solar lights"
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-25%20154959-lnbAeWjmlITYz0ha22kOxnwZPr7O19.png"
                alt="Students with their solar lights"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
              Support Our Cause
            </button>
          </motion.div>
        </div>
      </div>
    </article>
  )
}

export { CampaignArticle }

