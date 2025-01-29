"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Facebook, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logoonly.svg"
              alt="RGB Welfare Foundation"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="ml-3 text-xl font-semibold whitespace-nowrap">
              RGB Welfare Foundation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/campaigns">Campaigns</NavLink>
              <NavLink href="/donate">Donate</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
            <Link 
              href="/join" 
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors shrink-0"
            >
              Join Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:hidden pb-6"
          >
            <div className="flex flex-col space-y-3">
              <MobileNavLink href="/" onClick={() => setIsOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsOpen(false)}>
                About Us
              </MobileNavLink>
              <MobileNavLink href="/campaigns" onClick={() => setIsOpen(false)}>
                Campaigns
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
                  className="inline-block bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4 pt-4 border-t mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61571891546414"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rgbwelfarefoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
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
    <Link href={href} className="text-gray-600 hover:text-primary transition-colors whitespace-nowrap">
      {children}
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
      className="text-gray-600 hover:text-primary transition-colors block px-2 py-1"
    >
      {children}
    </Link>
  )
}

