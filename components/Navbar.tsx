"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Facebook, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/logoonly.svg"
              alt="RGB Welfare Foundation Logo"
              width={40}
              height={40}
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            />
            <span className="ml-3 text-xl font-semibold whitespace-nowrap">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">RGB</span>{" "}
              <span className="text-gray-600">Welfare Foundation</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/campaigns">Campaigns</NavLink>
              <NavLink href="/articles">News</NavLink>
              <NavLink href="/donate">Donate</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
            <Link 
              href="/join" 
              className="bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="py-4 space-y-3">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                About Us
              </MobileNavLink>
              <MobileNavLink href="/campaigns" onClick={() => setIsOpen(false)}>
                Campaigns
              </MobileNavLink>
              <MobileNavLink href="/articles" onClick={() => setIsOpen(false)}>
                News
              </MobileNavLink>
              <MobileNavLink href="/donate" onClick={() => setIsOpen(false)}>
                Donate
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </MobileNavLink>
              <div className="pt-2">
                <Link 
                  href="/join" 
                  onClick={() => setIsOpen(false)}
                  className="inline-block w-full text-center bg-primary text-white px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-6 py-4 border-t border-gray-200/50">
              <a
                href="https://www.facebook.com/profile.php?id=61571891546414"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rgbwelfarefoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="relative text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap group"
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Link>
  )
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="block px-2 py-1.5 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100/80"
    >
      {children}
    </Link>
  )
}

