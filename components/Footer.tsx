import Link from "next/link"
import { Facebook, Linkedin, Mail, Phone, MapPin, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer>
      {/* White section for logo */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center">
            <Image
              src="/logoonly.svg"
              alt="RGB Welfare Foundation"
              width={80}
              height={80}
              className="h-20 w-auto mb-4"
            />
            <h3 className="text-2xl font-semibold mb-4">RGB Welfare Foundation</h3>
            <p className="text-gray-600 text-center max-w-2xl">
              Empowering communities across India through sustainable development and education.
            </p>
          </div>
        </div>
      </div>

      {/* Green section for footer content */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-secondary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-secondary transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/campaigns" className="hover:text-secondary transition-colors">
                    Campaigns
                  </Link>
                </li>
                <li>
                  <Link href="/donate" className="hover:text-secondary transition-colors">
                    Donate
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-secondary transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="hover:text-secondary transition-colors">
                    Join Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-secondary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-secondary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-secondary transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>P-348, Basunagar Gate No 1, Madhyamgram, Kolkata 700129, India</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>090730 13343</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>rgbwfoundation@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-80">
              © {new Date().getFullYear()} RGB Welfare Foundation. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="https://www.facebook.com/profile.php?id=61571891546414"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/rgb-welfare-foundation-315696346"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rgbwelfarefoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

