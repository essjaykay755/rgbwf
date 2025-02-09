"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Users, Calendar, ArrowRight, Target } from "lucide-react"
import OptimizedImage from "./OptimizedImage"

export default function Campaigns() {
  const campaigns = [
    {
      image: "/campaign6/campaign1.jpg",
      title: "Rural to Global Bridge",
      description:
        "Empowering tribal women through skill-based training and job opportunities, enabling them to earn a livelihood and support their families. Our initiative focuses on increasing per capita income and improving living standards.",
      location: "Tribal Communities",
      status: "Active",
      slug: "rural-to-global-bridge",
      metrics: {
        focus: "Women",
        impact: "Families"
      }
    },
    {
      image: "/campaign5/campaign1.jpg",
      title: "Pranbindu",
      description:
        "Working with 100 schools and 2 million students across Bengal to raise awareness about blood donation, blood group testing, and preventing bloodborne infections.",
      location: "West Bengal",
      status: "Active",
      slug: "pranbindu",
      metrics: {
        schools: "100+",
        students: "2M+"
      }
    },
    {
      image: "/campaign4/campaign1.jpg",
      title: "Amar Meye Durga",
      description:
        "Training 50,000 girls across Bengal in self-defense, empowering them with crucial skills for their safety and confidence, regardless of their background.",
      location: "West Bengal",
      status: "Active",
      slug: "amar-meye-durga",
      metrics: {
        target: "50,000",
        reach: "Pan Bengal"
      }
    },
    {
      image:
        "/campaign1/camp1.jpeg",
      title: "Boi Bondhu: Empowering Through Education",
      description:
        "The Boi Bondhu initiative provides free education to primary school students from underprivileged communities across India. Our goal is to ensure that every child, regardless of their socio-economic background, has access to quality education.",
      location: "Pan India",
      status: "Active",
      slug: "boi-bondhu",
      metrics: {
        students: "500+",
        communities: "10+"
      }
    },
    {
      image: "/campaign2/camp1.png",
      title: "Light for Education",
      description:
        "Supporting meritorious students in Hingalganj with solar emergency lights for uninterrupted education.",
      location: "Hingalganj, Boltola",
      status: "Active",
      slug: "light-for-education",
      metrics: {
        beneficiaries: "200+",
        lights: "500+"
      }
    },
    {
      image: "/campaign3/camp1.jpeg",
      title: "Flood Relief 2024",
      description:
        "Emergency relief support for communities affected by the 2024 West Bengal floods in southern regions.",
      location: "South Bengal",
      status: "Completed",
      slug: "flood-relief-2024",
      metrics: {
        families: "1000+",
        villages: "20+"
      }
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
        </div>

        <div className="container relative mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium text-sm mb-6 backdrop-blur-sm">
              Our Initiatives
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Creating Impact Through
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Targeted Action
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover our range of initiatives designed to create lasting positive change in communities across India
            </p>
          </motion.div>

          {/* Campaign Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { number: "5", label: "Active Campaigns" },
              { number: "10K+", label: "Lives Impacted" },
              { number: "100+", label: "Schools Reached" },
              { number: "20+", label: "Communities Served" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:border-primary/20 transition-all">
                <motion.p 
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-1"
                >
                  {stat.number}
                </motion.p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Link href={`/campaigns/${campaign.slug}`}>
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-500">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage
                        src={campaign.image}
                        alt={campaign.title}
                        aspectRatio="campaign"
                        className="group-hover:scale-105 transition-transform duration-300"
                        style={{ objectPosition: '50% 50%' }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                          campaign.status === "Active" 
                            ? "bg-green-500/90 text-white" 
                            : "bg-gray-500/90 text-white"
                        }`}>
                          {campaign.status}
                        </span>
                      </div>

                      {/* Campaign Metrics */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        {Object.entries(campaign.metrics).map(([key, value], i) => (
                          <div key={key} className="bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-sm">
                            <span className="font-semibold">{value}</span>
                            <span className="ml-1 opacity-80">{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {campaign.title}
                      </h2>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {campaign.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-2 transition-transform">
                          <span>Learn More</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

