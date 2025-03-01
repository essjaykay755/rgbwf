"use client"

import { motion } from "framer-motion"
import { Play, Pause } from "lucide-react"
import { useState, useRef } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayClick = () => {
    setIsPlaying(true)
    videoRef.current?.play()
  }

  const handlePauseClick = () => {
    setIsPlaying(false)
    videoRef.current?.pause()
  }

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Our Impact in Action
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Watch how we&apos;re making a difference in communities across India
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div 
            className="relative aspect-video rounded-2xl overflow-hidden group shadow-lg"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Video Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            
            {/* Main Video */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              preload="metadata"
              playsInline
              controls={isPlaying}
              poster="/video-thumbnail.jpg"
            >
              <source src="/intro.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Play/Pause Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered || !isPlaying ? 1 : 0 }}
              onClick={isPlaying ? handlePauseClick : handlePlayClick}
              className="absolute inset-0 flex items-center justify-center z-20 group/btn"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary/90 hover:bg-primary text-white p-6 rounded-full backdrop-blur-sm transition-colors relative"
              >
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 translate-x-0.5" />
                )}
              </motion.div>
            </motion.button>

            {/* Video Info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                className="text-white"
              >
                <h3 className="text-xl font-semibold mb-2">RGB Welfare Foundation</h3>
                <p className="text-gray-100 text-sm">
                  Discover our journey of empowering communities and creating sustainable change
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

