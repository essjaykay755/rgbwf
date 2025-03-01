'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function AdminLink() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // If loading or not authorized, don't show anything
  if (loading || !user || user.email !== 'rgbwfoundation@gmail.com') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link href="/invoice">
        <Button className="bg-primary hover:bg-primary/90">
          Invoice Admin
        </Button>
      </Link>
    </div>
  )
} 