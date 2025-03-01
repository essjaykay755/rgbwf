'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export default function AdminLink() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initial session check
    const checkUser = async () => {
      try {
        setLoading(true)
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error checking session in AdminLink:', error)
          return
        }
        
        setUser(session?.user || null)
      } catch (error) {
        console.error('Error checking user in AdminLink:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('AdminLink: Auth state changed:', event)
        setUser(session?.user || null)
        setLoading(false)
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
      <Link href={`/invoice?t=${Date.now()}`} prefetch={false}>
        <Button className="bg-primary hover:bg-primary/90">
          Invoice Admin
        </Button>
      </Link>
    </div>
  )
} 