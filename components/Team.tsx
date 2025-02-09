"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Facebook, Linkedin, Mail } from "lucide-react"

export default function Team() {
  const team = [
    {
      name: "Kabita Ghosal",
      role: "Founder - President",
      bio: "Leading with vision and compassion to create lasting positive change in communities.",
      image: "/team/kabita.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/kabita-ghosal",
      }
    },
    {
      name: "Sankar Das",
      role: "Vice President - Project Implementation",
      bio: "Driving successful project execution and implementation across our initiatives.",
      image: "/team/sankar.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/sankar-das",
      }
    },
    {
      name: "SK Rajibul Islam",
      role: "Secretary - Programme Director",
      bio: "Orchestrating impactful programs that transform lives and build stronger communities.",
      image: "/team/rajibul.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/sk-rajibul-islam",
      }
    },
    {
      name: "Anirban Mandal",
      role: "Director and Treasurer",
      bio: "Ensuring financial transparency and sustainable growth of our initiatives.",
      image: "/team/anirban.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/anirban-mandal",
      }
    },
    {
      name: "Dr. Ramendra Lal Mukherjee",
      role: "Designated Scientist and Advisor",
      bio: "Bringing scientific expertise to drive innovative solutions for social welfare.",
      image: "/team/ramendra.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/dr-ramendra-lal-mukherjee",
      }
    },
    {
      name: "Subhojit Karmakar",
      role: "Director of IT Operations",
      bio: "Leveraging technology to amplify our social impact and reach.",
      image: "/team/subhojit.webp",
      social: {
        linkedin: "https://www.linkedin.com/in/subhojit-karmakar",
      }
    },
    {
      name: "Santajit Chatterjee",
      role: "Director of Marketing and Communication",
      bio: "Driving outreach and engagement to expand our impact across communities.",
      image: "/team/santa.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/santajit-chatterjee",
      }
    },
  ]

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dedicated professionals working together to create positive change and empower communities across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group relative"
            >
              <div className="relative mx-auto mb-6">
                {/* Main Image */}
                <div className="w-48 h-48 mx-auto relative">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 via-gray-50 to-transparent" />
                  
                  {/* Image Container */}
                  <div className="absolute inset-0 rounded-full overflow-hidden p-2 bg-white shadow-lg">
                    <div className="relative w-full h-full rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gray-200/50 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                </div>
              </div>

              <div className="relative">
                <motion.h3 
                  className="text-xl font-semibold mb-1 group-hover:text-gray-900 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {member.name}
                </motion.h3>
                <p className="text-gray-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

