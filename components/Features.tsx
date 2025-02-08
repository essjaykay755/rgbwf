"use client"

import { motion } from "framer-motion"
import { Heart, GraduationCap, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Features() {
  const features = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Education First",
      description: "Providing quality education and skills training to underprivileged children",
      color: "from-blue-500/20 to-blue-600/20",
      link: "/campaigns/boi-bondhu"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Women Empowerment",
      description: "Supporting women through skill development and economic independence",
      color: "from-rose-500/20 to-rose-600/20",
      link: "/campaigns/amar-meye-durga"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Development",
      description: "Building stronger communities through sustainable development programs",
      color: "from-emerald-500/20 to-emerald-600/20",
      link: "/campaigns"
    }
  ]

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Creating Lasting Impact
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Where It Matters Most
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Discover our key initiatives that are transforming lives and building stronger communities
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <Link href={feature.link}>
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-primary/20 transition-colors overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative">
                    <div className="mb-6 relative">
                      {/* Icon Background */}
                      <div className="absolute inset-0 bg-primary/5 rounded-full transform scale-150 group-hover:scale-175 transition-transform duration-500" />
                      <div className="relative text-primary group-hover:scale-110 transition-transform duration-500">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-primary gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

