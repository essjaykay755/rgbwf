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
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-26%20at%201.24.08%20PM-hobA9TP9sC7ydrZIHg6bXcvWeBm5Al.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/kabita-ghosal",
      }
    },
    {
      name: "SK Rajibul Islam",
      role: "Secretary - Programme Director",
      bio: "Orchestrating impactful programs that transform lives and build stronger communities.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-26%20at%202.28.50%20PM-pQQ1HI57bviq69lAq8Jx3j6anMzuvG.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/sk-rajibul-islam",
      }
    },
    {
      name: "Dr. Ramendra Lal Mukherjee",
      role: "Designated Scientist and Advisor",
      bio: "Bringing scientific expertise to drive innovative solutions for social welfare.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4b8748fa-8bdd-42e2-8bd2-098c8920d92f.jpg-tMN3KuaG5qg3IVEPfGLd36fXuSRPcQ.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/dr-ramendra-lal-mukherjee",
      }
    },
    {
      name: "Subhojit Karmakar",
      role: "Director of IT Operations",
      bio: "Leveraging technology to amplify our social impact and reach.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RgmTg4HBeA41xVkURZjhsmzTuJDB3x.webp",
      social: {
        linkedin: "https://www.linkedin.com/in/subhojit-karmakar",
      }
    },
    {
      name: "Anirban Mandal",
      role: "Director and Treasurer",
      bio: "Ensuring financial transparency and sustainable growth of our initiatives.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bea4f1a9-5a08-42f2-903f-fe9cc934cfc1.jpg-YjlRPQ6W7hJGQnsyYP1t2lRgYfb524.jpeg",
      social: {
        linkedin: "https://www.linkedin.com/in/anirban-mandal",
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

