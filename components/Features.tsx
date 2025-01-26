"use client"

import { motion } from "framer-motion"
import { Heart, GraduationCap, Users } from "lucide-react"

export default function Features() {
  return (
    <section className="bg-accent/20 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Making a Difference
          <br />
          One Step at a Time
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<GraduationCap className="w-12 h-12" />}
            title="Education First"
            description="Providing quality education and skills training to underprivileged children"
          />
          <Feature
            icon={<Heart className="w-12 h-12" />}
            title="Women Empowerment"
            description="Supporting women through skill development and economic independence"
          />
          <Feature
            icon={<Users className="w-12 h-12" />}
            title="Community Development"
            description="Building stronger communities through sustainable development programs"
          />
        </div>
      </div>
    </section>
  )
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </motion.div>
  )
}

