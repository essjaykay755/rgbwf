"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-27%20at%2011.56.26%20PM%20(1)-9m0W9ABQ9Pwkcpi6uZb0DMLNPD4Y9P.jpeg"
          alt="Children reading books"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Empowering Communities
            <br />
            Across India
          </h1>
          <p className="text-gray-200 text-lg mb-8">
            Supporting underprivileged children and women through
            <br />
            education, healthcare, and sustainable development
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/donate"
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/campaigns"
              className="bg-white text-primary px-6 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Our Campaigns
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard percentage="5000+" title="Lives Impacted" color="bg-white/10" textColor="text-white" />
          <StatCard title="Women Empowerment" subtitle="Skills & Training" color="bg-white/10" textColor="text-white" />
          <StatCard title="Child Developments" subtitle="Education & Growth" color="bg-white/10" textColor="text-white" />
          <StatCard title="Community Growth" subtitle="Pan India Impact" color="bg-white/10" textColor="text-white" />
        </div>
      </div>
    </section>
  )
}

function StatCard({
  percentage,
  title,
  subtitle,
  color,
  textColor,
}: {
  percentage?: string
  title: string
  subtitle?: string
  color: string
  textColor: string
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`${color} rounded-2xl p-6`}>
      {percentage && <div className={`text-3xl font-bold mb-2 ${textColor}`}>{percentage}</div>}
      <h3 className={`text-xl font-semibold ${textColor}`}>{title}</h3>
      {subtitle && <p className={`text-sm ${textColor} opacity-80`}>{subtitle}</p>}
    </motion.div>
  )
}

