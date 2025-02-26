"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import OptimizedImage from "./OptimizedImage"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden flex items-center">
      {/* Background Image Container - Using direct Next.js Image for better control */}
      <div className="absolute inset-0 w-full h-full">
        {/* Main Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/hero.jpeg"
            alt="Smiling children reading books together"
            fill
            priority={true}
            sizes="100vw"
            quality={90}
            className="object-cover"
            style={{ 
              objectPosition: '60% center',
            }}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVigAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy0vLi44QjxAOEA4Qi5AOTc5PkVFPkdEREdHREdHR0f/2wBDAR"
          />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:from-black/60 md:via-black/40 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      {/* Content Container with Dark Backdrop for Text */}
      <div className="container relative z-10 mx-auto px-6 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-white max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium">Transforming Lives Since 2023</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                Creating
                <br />
                <span className="text-primary">
                  Lasting Impact
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-lg mx-auto lg:mx-0">
                Empowering communities through education, healthcare, and sustainable development initiatives across India.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/donate"
                className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-primary/90 transition-all transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center group shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none"
                style={{ backgroundColor: 'rgb(22, 163, 74)' }}
              >
                Make a Difference
                <motion.span
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    times: [0, 0.5, 1]
                  }}
                  className="ml-2"
                >
                  ❤️
                </motion.span>
              </Link>
              <Link
                href="/campaigns"
                className="bg-white/10 text-white border border-white/20 px-8 py-4 rounded-xl text-lg font-medium hover:bg-white/20 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Explore Our Work
              </Link>
            </motion.div>

            {/* Mobile Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-12 grid grid-cols-2 gap-4 lg:hidden"
            >
              <MobileStatsCard number="5000+" label="Lives Impacted" />
              <MobileStatsCard number="100+" label="Schools Reached" />
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-6">
              <StatsCard
                number="5000+"
                label="Lives Impacted"
                description="Through our various initiatives"
              />
              <StatsCard
                number="100+"
                label="Schools Reached"
                description="Across West Bengal"
              />
              <StatsCard
                number="10+"
                label="Active Campaigns"
                description="Running successfully"
              />
              <StatsCard
                number="1000+"
                label="Volunteers"
                description="Working together"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L48 8.875C96 17.75 192 35.5 288 44.375C384 53.25 480 53.25 576 44.375C672 35.5 768 17.75 864 17.75C960 17.75 1056 35.5 1152 44.375C1248 53.25 1344 53.25 1392 53.25H1440V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

function StatsCard({
  number,
  label,
  description
}: {
  number: string
  label: string
  description: string
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
    >
      <h3 className="text-3xl font-bold text-white mb-2">{number}</h3>
      <p className="text-lg font-medium text-white mb-1">{label}</p>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  )
}

function MobileStatsCard({
  number,
  label
}: {
  number: string
  label: string
}) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center">
      <h3 className="text-2xl font-bold text-white mb-1">{number}</h3>
      <p className="text-sm font-medium text-gray-200">{label}</p>
    </div>
  )
}

