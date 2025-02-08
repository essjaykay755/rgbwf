"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin } from "lucide-react"

export default function Campaigns() {
  const campaigns = [
    {
      image: "/campaign5/campaign1.jpg",
      title: "Pranbindu",
      description:
        "Working with 100 schools and 2 million students across Bengal to raise awareness about blood donation, blood group testing, and preventing bloodborne infections.",
      location: "West Bengal",
      status: "Active",
      slug: "pranbindu",
    },
    {
      image: "/campaign4/campaign1.jpg",
      title: "Amar Meye Durga",
      description:
        "Training 50,000 girls across Bengal in self-defense, empowering them with crucial skills for their safety and confidence, regardless of their background.",
      location: "West Bengal",
      status: "Active",
      slug: "amar-meye-durga",
    },
    {
      image:
        "/campaign1/camp1.jpeg",
      title: "Boi Bondhu: Empowering Through Education",
      description:
        "Free coaching center for primary school students from Lodha and Shabar communities in Nayagram, Medinipur.",
      location: "Nayagram, Medinipur",
      status: "Active",
      slug: "boi-bondhu",
    },
    {
      image: "/campaign2/camp1.png",
      title: "Light for Education",
      description:
        "Supporting meritorious students in Hingalganj with solar emergency lights for uninterrupted education.",
      location: "Hingalganj, Boltola",
      status: "Active",
      slug: "light-for-education",
    },
    {
      image: "/campaign3/camp1.jpeg",
      title: "Flood Relief 2024",
      description:
        "Emergency relief support for communities affected by the 2024 West Bengal floods in southern regions.",
      location: "South Bengal",
      status: "Completed",
      slug: "flood-relief-2024",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
            Our Campaigns
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Making a difference in communities across India through targeted initiatives and sustainable development programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.slug} {...campaign} />
          ))}
        </div>
      </div>
    </div>
  )
}

function CampaignCard({
  image,
  title,
  description,
  location,
  status,
  slug,
}: {
  image: string
  title: string
  description: string
  location: string
  status: string
  slug: string
}) {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 40px -15px rgba(0,0,0,0.1)" }} 
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-primary/20 transition-colors"
    >
      <div className="relative h-56 md:h-64">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            status === "Active" 
              ? "bg-green-500/90 text-white" 
              : "bg-gray-500/90 text-white"
          }`}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6 line-clamp-3">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{location}</span>
        </div>
        <Link
          href={`/campaigns/${slug}`}
          className="block w-full bg-primary text-white text-center py-3 rounded-xl hover:bg-primary/90 transition-all font-medium"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  )
}

