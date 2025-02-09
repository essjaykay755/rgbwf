import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RGB Welfare Foundation - Empowering Communities Across India",
  description:
    "RGB Welfare Foundation works across Pan India, empowering women and supporting the development of underprivileged children from rural, urban, and tribal communities.",
  icons: {
    icon: [
      {
        url: '/logoonly.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: ['/logoonly.svg'],
    apple: [
      {
        url: '/logoonly.svg',
        type: 'image/svg+xml',
      }
    ],
  },
  verification: {
    google: "ur8m53OSLVosH4gKxqsweh5kxGi9M2rYFWCYd1BlF7w",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

