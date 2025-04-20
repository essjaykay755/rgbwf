"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, ArrowLeft, Share2 } from "lucide-react"
import OptimizedImage from "./OptimizedImage"

interface ArticleDetailProps {
  slug: string
}

export default function ArticleDetail({ slug }: ArticleDetailProps) {
  const [copied, setCopied] = useState(false)

  // Reset the copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  // Handle sharing the article URL
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
  }

  // Articles data - in a real app, this would be fetched from an API or database
  const articlesData = {
    "womens-day-2024": {
      title: "Women's Day 2024 Special Event",
      date: "March 8, 2025",
      location: "Bidhannagar, Kolkata",
      coverImage: "/articles/WhatsApp Image 2025-03-08 at 13.52.12_5e19bcca.jpg",
      content: `
        <p class="mb-4">Women's Day is not just a one-day celebration for us. It is a day to raise awareness about women's self-reliance, health, education, and self-respect. This day is not about competition with men but rather about walking together with assurance. It marks the beginning of equal rights for all genders.</p>

        <p class="mb-4">On the occasion of International Women's Day, RGB Welfare Foundation organized a special event where both women and men participated equally as volunteers.</p>

        <p class="mb-6">Today's special program was supported by Jhunku Mondal, Councillor, Bidhannagar Municipality Corporation (Ward 23), and Debraj Chakraborty, Councillor & Member of the Mayor-in-Council, Bidhannagar Municipal Corporation.</p>
      `,
      galleryImages: [
        "/articles/WhatsApp Image 2025-03-08 at 13.52.07_e50d75b3.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.13_bdb1afbd.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.11_dbebb342.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.08_58257ccb.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.16_4c3c6967.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.09_c55e80dc.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.23_196cbf11.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 13.52.08_ba3d31f5.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 18.58.19_7e29728f.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 18.58.18_a012e08f.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 18.58.16_70bd23b7.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 18.58.16_d8b51811.jpg",
        "/articles/WhatsApp Image 2025-03-08 at 18.58.15_53e17eae.jpg"
      ],
      hashtags: ["RGBwelfarefoundation", "RuralToGlobalBridge", "WomensDay2024", "GenderEquality"]
    }
  }

  const article = articlesData[slug as keyof typeof articlesData]

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Article not found</h1>
        <Link href="/articles" className="text-primary hover:underline">
          Back to News
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[50vh] md:h-[60vh] bg-gray-900">
          <OptimizedImage
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="container mx-auto px-4 pb-16 md:pb-24 text-white">
              <Link 
                href="/articles" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to News</span>
              </Link>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-4">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{article.location}</span>
                </div>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copied ? "Copied!" : "Share"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none mb-16"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {article.galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="relative aspect-square rounded-lg overflow-hidden"
                  >
                    <OptimizedImage
                      src={image}
                      alt={`Event photo ${index + 1}`}
                      className="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-12">
              {article.hashtags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-bold mb-3">Visit our website and apply for volunteer service</h3>
                  <p className="mb-4">Join us in making a difference in our communities</p>
                  <a 
                    href="https://www.rgbwf.org" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-block bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                  >
                    www.rgbwf.org
                  </a>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-2 bg-white rounded-lg">
                    <img 
                      src="/qr.png" 
                      alt="Contact QR Code" 
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                  <p className="text-center text-sm mt-2 text-gray-600">Scan to connect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 