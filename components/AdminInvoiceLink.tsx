'use client'

import Link from "next/link"
import { useAuth } from "./AuthProvider"

export default function AdminInvoiceLink() {
  const { isAuthorized } = useAuth()
  
  if (!isAuthorized) {
    return null
  }
  
  return (
    <li>
      <Link href="/invoice" className="text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex">
        Invoice Generator
      </Link>
    </li>
  )
} 