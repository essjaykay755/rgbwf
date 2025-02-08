"use client"

import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, MapPin, Instagram, Heart } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-12 bg-primary/20 rounded-full" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Empowering Communities Through{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                  Sustainable Change
                </span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                Join us in our mission to create lasting positive change. Together, we can build stronger communities 
                and empower lives across India through education, healthcare, and sustainable development.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
                >
                  <span>Become a Volunteer</span>
                  <Heart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
                >
                  <span>Support Us</span>
                  <motion.span
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      times: [0, 0.5, 1]
                    }}
                  >
                    ❤️
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Decorative Elements */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-[400px] mx-auto">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-full animate-pulse" />
                <div className="absolute inset-8 bg-gradient-to-tl from-primary/5 via-transparent to-transparent rounded-full animate-pulse delay-300" />
                
                {/* Center Logo */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full max-w-[180px] mx-auto">
                    <Image
                      src="/logowithtext.png"
                      alt="RGB Welfare Foundation"
                      width={180}
                      height={180}
                      className="w-full h-auto relative z-10 animate-float"
                      priority
                    />
                    <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl transform scale-110" />
                  </div>
                </div>

                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                >
                  <p className="text-2xl font-bold text-primary">5000+</p>
                  <p className="text-sm text-gray-600">Lives Impacted</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-0 left-0 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg"
                >
                  <p className="text-2xl font-bold text-primary">100+</p>
                  <p className="text-sm text-gray-600">Schools Reached</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gradient-to-br from-primary to-primary/90 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url("/pattern-bg.svg")',
            backgroundSize: '60px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-8 bg-white/20 rounded-full" />
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/campaigns" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Join Now
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-8 bg-white/20 rounded-full" />
              <h3 className="text-xl font-bold mb-6">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Contact Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 relative"
            >
              <div className="absolute -left-4 top-0 w-1 h-8 bg-white/20 rounded-full" />
              <h3 className="text-xl font-bold mb-6">Contact Us</h3>

              {/* Mini Map */}
              <div className="mb-6 rounded-xl overflow-hidden shadow-lg bg-white/10">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.7556002694337!2d88.46505619999999!3d22.700140299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa9e089a85dcfc651%3A0x2ec090c30219c4be!2sRGB%20Welfare%20Foundation!5e0!3m2!1sen!2sin!4v1739045182880!5m2!1sen!2sin" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>

              <ul className="space-y-4">
                <motion.li 
                  className="flex items-start gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors">
                    P-348, Basunagar Gate No 1, Madhyamgram, Kolkata 700129, India
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors">
                    090730 13343
                  </span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-4 group p-4 rounded-xl hover:bg-white/5 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-white/90 group-hover:text-white transition-colors">
                    rgbwfoundation@gmail.com
                  </span>
                </motion.li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-sm text-white/70">
                © {new Date().getFullYear()} RGB Welfare Foundation. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61571891546414"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/rgbwelfarefoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

