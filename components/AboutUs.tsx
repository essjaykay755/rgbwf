"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users, Heart, Globe, GraduationCap, Target, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import Team from "./Team"

export default function AboutUs() {
  const milestones = [
    { number: "5000+", label: "Lives Impacted" },
    { number: "100+", label: "Schools Reached" },
    { number: "10+", label: "Active Campaigns" },
    { number: "1000+", label: "Volunteers" },
  ]

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Compassion",
      description: "Acting with empathy and understanding in all our initiatives"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community First",
      description: "Prioritizing the needs and development of local communities"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Impact Driven",
      description: "Focusing on measurable, sustainable outcomes in all projects"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Education Focus",
      description: "Believing in the transformative power of knowledge"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Sustainability",
      description: "Creating lasting positive impact through sustainable solutions"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Innovation",
      description: "Embracing new ideas and approaches to solve challenges"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-gray-900"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transforming Lives,
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Building Futures
                </span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                RGB Welfare Foundation works across India, empowering women and supporting the development of underprivileged children from rural, urban, and tribal communities.
              </p>
              <Link 
                href="/join"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition-all group"
              >
                <span>Join Our Mission</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473227783_122095731974729718_7799801113706853113_n.jpg-XdiE4VS1wzRr0rhhVg145olmH28nNG.jpeg"
                  alt="RGB Welfare Foundation team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To empower women and support the development of underprivileged children from rural, urban, and tribal
                  communities across India, fostering resilient community growth and sustainable development.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  To create a society where every individual, regardless of their background, has access to education,
                  healthcare, and opportunities for growth, projecting our roots onto global platforms.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Our Impact in Numbers
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="absolute -inset-4 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.h3
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                  >
                    {milestone.number}
                  </motion.h3>
                </div>
                <p className="text-gray-300">{milestone.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our work and shape our impact in communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary/20 transition-all h-full">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />
    </div>
  )
}

