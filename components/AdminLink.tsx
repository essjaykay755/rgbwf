'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/AuthProvider'

export default function AdminLink() {
  const { user, isLoading, isAuthorized } = useAuth()

  // If loading or not authorized, don't show anything
  if (isLoading || !isAuthorized) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href={`/invoice?t=${Date.now()}`} prefetch={false}>
        <Button className="bg-primary hover:bg-primary/90">
          Invoice Admin
        </Button>
      </Link>
    </div>
  )
} 