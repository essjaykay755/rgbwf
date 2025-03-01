'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut } from 'lucide-react'
import { signOut } from '@/lib/supabase'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function UnauthorizedMessage({ email }: { email: string }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await signOut()
      toast.success('Logged out successfully')
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Failed to log out')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Card className="max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized Access</h1>
        <div className="mb-6">
          <p className="text-lg mb-2">
            Sorry, your account <span className="font-semibold">{email}</span> does not have permission to access the invoice generation system.
          </p>
          <p className="text-gray-600">
            This feature is restricted to administrators only. If you believe this is an error, please contact the system administrator.
          </p>
        </div>
        <div className="flex justify-center">
          <Button 
            onClick={handleLogout} 
            disabled={isLoggingOut}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {isLoggingOut ? 'Logging out...' : 'Log Out'}
          </Button>
        </div>
      </Card>
    </div>
  )
} 