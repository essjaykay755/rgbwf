"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Community() {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-2xl mb-4">
          Join our community of change-makers
          <br />
          and help create a better tomorrow
        </h2>

        <p className="text-xl text-muted-foreground mb-8">Be part of our growing family of supporters and volunteers</p>

        <Link href="/join" className="bg-primary text-white px-8 py-3 rounded-full">
          Join Our Community
        </Link>

        <div className="mt-12 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              let&apos;s help each other * let&apos;s help each other * let&apos;s help each other *
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

