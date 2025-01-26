"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, MapPin, Users, BookOpen } from "lucide-react"

export function CampaignArticle() {
  return (
    <article className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Boi Bondhu: Nurturing Education in Tribal Communities
          </motion.h1>

          <div className="flex flex-wrap gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Ongoing Project</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Nayagram, Medinipur</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span>Lodha and Shabar Communities</span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[500px] mb-12 rounded-xl overflow-hidden"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473227783_122095731974729718_7799801113706853113_n.jpg-XdiE4VS1wzRr0rhhVg145olmH28nNG.jpeg"
            alt="Boi Bondhu teaching session in progress"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="prose prose-lg max-w-none mb-12"
          >
            <p className="lead text-xl">
              Children are the future of society. Only education can make that future bright.
            </p>

            <p>
              In Nayagram, Medinipur, where the Lodha and Shabar communities live, the average family income is so low
              that educating children becomes very difficult. However, we are determined to shape their future.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Project Goals</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>Ensure overall development of children</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>Create regular study habits</span>
              </li>
              <li className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-primary shrink-0 mt-1" />
                <span>Increase interest in education through learning, discussions, and storybook reading</span>
              </li>
            </ul>

            <p className="mt-6">
              We express our gratitude to the Paschim Medinipur administration, headmaster of Nayagram Primary School -
              Mr. Biplab Arya, and the villagers for their support.
            </p>
          </motion.div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/472965069_122095731260729718_8985383357583637982_n.jpg-qw2OTV0cYykfIi4GWTME4r9lB3zz8y.jpeg"
                alt="Students attending the session"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473188313_122095732040729718_3899448995614558912_n.jpg-Kw43BSRMkSwKcCa3xW4VsEEep7e7N8.jpeg"
                alt="Children reading books"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473061380_122095732646729718_681774077671731010_n.jpg-PQnh9zCrCoFQYl9EdSVyXBJ1y7a7mP.jpeg"
                alt="Teaching session in progress"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[300px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/473158673_122095731554729718_5804540254651846415_n.jpg-ry2d5NHB00tnT0yrLjBobU7JBKSO7Z.jpeg"
                alt="Community engagement"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-primary/5 rounded-xl p-8 mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Support Our Vision</h2>
            <p className="text-gray-600 mb-6">
              We need your support and blessings to expand this project across the entire state.
            </p>
            <button className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors">
              Contribute Now
            </button>
          </motion.div>
        </div>
      </div>
    </article>
  )
}

