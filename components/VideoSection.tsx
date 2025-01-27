"use client"

import { motion } from "framer-motion"
import { Play } from "lucide-react"
import { useState, useRef } from "react"

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlayClick = () => {
    setIsPlaying(true)
    videoRef.current?.play()
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          playsInline
          controls={isPlaying}
          poster="/video-thumbnail.jpg"
        >
          <source src="/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <motion.button
              onClick={handlePlayClick}
              className="bg-primary/90 hover:bg-primary text-white p-4 rounded-full transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-8 h-8" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}

