"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Team() {
  const team = [
    {
      name: "Kabita Ghosal",
      role: "Founder - President",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-26%20at%201.24.08%20PM-hobA9TP9sC7ydrZIHg6bXcvWeBm5Al.jpeg",
    },
    {
      name: "SK Rajibul Islam",
      role: "Secretary - Programme Director",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-01-26%20at%202.28.50%20PM-pQQ1HI57bviq69lAq8Jx3j6anMzuvG.jpeg",
    },
    {
      name: "Dr. Ramendralal Mukherjee",
      role: "Designated Scientist and Advisor",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4b8748fa-8bdd-42e2-8bd2-098c8920d92f.jpg-tMN3KuaG5qg3IVEPfGLd36fXuSRPcQ.jpeg",
    },
    {
      name: "Subhojit Karmakar",
      role: "Director of IT Operations",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RgmTg4HBeA41xVkURZjhsmzTuJDB3x.webp",
    },
    {
      name: "Anirban Mandal",
      role: "Director and Treasurer",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bea4f1a9-5a08-42f2-903f-fe9cc934cfc1.jpg-YjlRPQ6W7hJGQnsyYP1t2lRgYfb524.jpeg",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="relative w-48 h-48 mx-auto mb-4">
              <Image
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

