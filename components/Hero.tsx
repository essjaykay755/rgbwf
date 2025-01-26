"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Empowering Communities
          <br />
          Across India
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          Supporting underprivileged children and women through
          <br />
          education, healthcare, and sustainable development
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/donate" className="bg-primary text-white px-6 py-2 rounded-full">
            Donate Now
          </Link>
          <Link href="/campaigns" className="border border-primary text-primary px-6 py-2 rounded-full">
            Our Campaigns
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard percentage="1000+" title="Lives Impacted" color="bg-accent/20" />
        <StatCard title="Women Empowerment" subtitle="Skills & Training" color="bg-primary/10" />
        <StatCard title="Join Our Donors" subtitle="Make a Difference" color="bg-secondary/20" />
        <StatCard title="Community Growth" subtitle="Pan India Impact" color="bg-accent/20" />
      </div>
    </section>
  )
}

function StatCard({
  percentage,
  title,
  subtitle,
  color,
}: {
  percentage?: string
  title: string
  subtitle?: string
  color: string
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className={`${color} rounded-2xl p-6`}>
      {percentage && <div className="text-3xl font-bold mb-2">{percentage}</div>}
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </motion.div>
  )
}

