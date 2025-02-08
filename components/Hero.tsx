"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-27%20at%2011.56.26%20PM%20(1)-9m0W9ABQ9Pwkcpi6uZb0DMLNPD4Y9P.jpeg"
          alt="Children reading books"
          fill
          className="object-cover md:object-center object-[80%_center]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/50 md:via-black/30 md:to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto md:mx-0 pt-16 pb-48 sm:pb-56 md:py-20 lg:py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2 md:space-y-4 text-center md:text-left mb-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Empowering
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">
              Communities
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              Across India
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 md:mb-12 leading-relaxed text-center md:text-left max-w-xl mx-auto md:mx-0"
          >
            Supporting underprivileged children and women through education, healthcare, and sustainable development
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
          >
            <Link
              href="/donate"
              className="bg-primary text-white px-6 py-3 rounded-xl text-base sm:text-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105 hover:shadow-lg text-center w-full sm:w-auto"
            >
              Donate Now
            </Link>
            <Link
              href="/campaigns"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-xl text-base sm:text-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 text-center w-full sm:w-auto"
            >
              Our Campaigns
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <StatCard 
              percentage="5000+" 
              title="Lives Impacted" 
              color="bg-white/5 hover:bg-white/10" 
              textColor="text-white" 
            />
            <StatCard 
              title="Women Empowerment" 
              subtitle="Skills & Training" 
              color="bg-white/5 hover:bg-white/10" 
              textColor="text-white" 
            />
            <StatCard 
              title="Child Development" 
              subtitle="Education & Growth" 
              color="bg-white/5 hover:bg-white/10" 
              textColor="text-white" 
            />
            <StatCard 
              title="Community Growth" 
              subtitle="Pan India Impact" 
              color="bg-white/5 hover:bg-white/10" 
              textColor="text-white" 
            />
          </div>
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
    <motion.div 
      whileHover={{ scale: 1.02 }} 
      className={`${color} rounded-xl p-3 md:p-4 border border-white/10 backdrop-blur-sm transition-all`}
    >
      {percentage && <div className={`text-xl md:text-2xl font-bold mb-0.5 md:mb-1 ${textColor}`}>{percentage}</div>}
      <h3 className={`text-sm md:text-base font-semibold ${textColor} line-clamp-1`}>{title}</h3>
      {subtitle && <p className={`text-xs md:text-sm ${textColor} opacity-70 line-clamp-1 mt-0.5`}>{subtitle}</p>}
    </motion.div>
  )
}

