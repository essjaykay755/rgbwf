"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Calendar, ArrowRight, Users } from "lucide-react"
import OptimizedImage from "./OptimizedImage"

interface ArticleItem {
  image: string;
  title: string;
  description: string;
  date: string;
  location: string;
  slug: string;
  metrics: {
    [key: string]: string;
  };
}

export default function Articles() {
  const articles: ArticleItem[] = [
    // News section is intentionally left empty
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
              Our News
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Stories of Impact and
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Community Action
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Read about our events, initiatives, and the positive changes we're creating across communities
            </p>
          </motion.div>

          {/* Article Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-16"
          >
            {[
              { number: "10+", label: "Events Covered" },
              { number: "5000+", label: "People Reached" },
              { number: "15+", label: "Communities Engaged" },
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

      {/* News Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {articles.map((article, index) => (
                <motion.div
                  key={article.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link href={`/articles/${article.slug}`}>
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-500">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <OptimizedImage
                          src={article.image}
                          alt={article.title}
                          aspectRatio="campaign"
                          className="group-hover:scale-105 transition-transform duration-300"
                          style={{ objectPosition: '50% 50%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        
                        {/* Article Date Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/90 text-white">
                            {article.date}
                          </span>
                        </div>

                        {/* Article Metrics */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          {Object.entries(article.metrics).map(([key, value], i) => (
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
                          {article.title}
                        </h2>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {article.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{article.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-primary font-medium group-hover:translate-x-2 transition-transform">
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No news available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 