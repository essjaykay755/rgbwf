'use client'

import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
}

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-white">
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-12"
          variants={itemVariants}
        >
          <Image
            src="/placeholder.svg"
            alt="RGB Welfare Foundation Logo"
            width={200}
            height={80}
            className="h-20 w-auto"
          />
        </motion.div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-primary"
            variants={itemVariants}
          >
            Coming Soon
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-12"
            variants={itemVariants}
          >
            RGB Welfare Foundation works across Pan India, empowering women and supporting the development of underprivileged children from rural, urban, and tribal communities. We focus on resilient community growth, aiming to project our roots onto global platforms.
          </motion.p>

          {/* Countdown Timer */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-2xl font-semibold mb-8"
              variants={itemVariants}
            >
              Launching On January 26th, 2025
            </motion.h2>
            <CountdownTimer />
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 text-left max-w-3xl mx-auto"
            variants={containerVariants}
          >
            <motion.div 
              className="flex items-start space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <MapPin className="h-6 w-6 text-primary shrink-0" />
              <p className="text-muted-foreground">
                P-348, basunagar gate no 1, Madhyamgram, Kolkata, India, West Bengal
              </p>
            </motion.div>
            <motion.div 
              className="flex items-start space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Phone className="h-6 w-6 text-primary shrink-0" />
              <p className="text-muted-foreground">
                090730 13343
              </p>
            </motion.div>
            <motion.div 
              className="flex items-start space-x-3"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mail className="h-6 w-6 text-primary shrink-0" />
              <p className="text-muted-foreground">
                rgbwfoundation@gmail.com
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer 
          className="text-center text-muted-foreground"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} RGB Welfare Foundation. All rights reserved.</p>
        </motion.footer>
      </motion.div>
    </div>
  )
}

