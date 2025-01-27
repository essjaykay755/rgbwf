"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin } from "lucide-react"

export default function Campaigns() {
  const campaigns = [
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Campaigns</h1>
          <p className="text-lg text-gray-600">Making a difference in communities across India</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="relative h-48">
        <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">{status}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <Link
          href={`/campaigns/${slug}`}
          className="block w-full bg-primary text-white text-center py-2 rounded-full hover:bg-primary/90 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  )
}

