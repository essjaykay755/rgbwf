'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase } from '@/lib/supabase'
import { PDFViewer, PDFDownloadLink, pdf } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { InvoicePDF } from './InvoicePDF'
import { useRouter } from 'next/navigation'
import { LoginButton } from '@/components/ui/LoginButton'
import { LogOut } from 'lucide-react'

const invoiceSchema = z.object({
  donorName: z.string().min(1, 'Donor name is required'),
  donorEmail: z.string().email('Invalid email address'),
  donorAddress: z.string().min(1, 'Donor address is required'),
  amount: z.number().min(1, 'Amount must be greater than 0'),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
})

type InvoiceFormData = z.infer<typeof invoiceSchema>

export default function InvoicePage() {
  const [previewData, setPreviewData] = useState<InvoiceFormData | null>(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [authStatus, setAuthStatus] = useState<'loading' | 'authenticated' | 'unauthenticated' | 'unauthorized'>('loading')
  const router = useRouter()

  // Use a ref to track if we've already redirected to prevent loops
  const hasRedirected = useState(false)

  useEffect(() => {
    let isMounted = true
    
    const checkAuth = async () => {
      try {
        // Get the session
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          if (isMounted) {
            setAuthStatus('unauthenticated')
          }
          return
        }
        
        // Get the user
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          if (isMounted) {
            setAuthStatus('unauthenticated')
          }
          return
        }
        
        // Check if user is authorized
        if (user.email !== 'rgbwfoundation@gmail.com') {
          if (isMounted) {
            setAuthStatus('unauthorized')
          }
          return
        }
        
        // User is authenticated and authorized
        if (isMounted) {
          setUser(user)
          setAuthStatus('authenticated')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        if (isMounted) {
          setAuthStatus('unauthenticated')
        }
      }
    }
    
    checkAuth()
    
    return () => {
      isMounted = false
    }
  }, [])
  
  // Handle redirects based on auth status
  useEffect(() => {
    if (hasRedirected[0]) return
    
    if (authStatus === 'unauthenticated') {
      hasRedirected[0] = true
      window.location.href = '/auth/login?redirectTo=/invoice'
    } else if (authStatus === 'unauthorized') {
      hasRedirected[0] = true
      window.location.href = '/'
    }
  }, [authStatus, hasRedirected])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
  })

  const formData = watch()

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      setLoading(true)
      setPreviewData(data)

      console.log('Submitting form data:', data)
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        throw new Error('You must be logged in to generate an invoice')
      }
      
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (!response.ok) {
        console.error('API error response:', result)
        throw new Error(result.error || 'Failed to generate invoice')
      }

      console.log('API success response:', result)
      toast.success('Invoice generated and saved successfully')

      // Download the PDF
      const link = document.createElement('a')
      link.href = result.pdfUrl
      link.download = `invoice-${result.serialNumber}.pdf`
      link.click()
    } catch (error: any) {
      console.error('Error generating invoice:', error)
      toast.error(`Failed to generate invoice: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/'
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Failed to log out')
    }
  }

  if (authStatus === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  // Only render the form if authenticated
  if (authStatus === 'authenticated') {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Generate Invoice</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block mb-2">Donor Name</label>
                <Input {...register('donorName')} />
                {errors.donorName && (
                  <p className="text-red-500 text-sm">{errors.donorName.message}</p>
                )}
              </div>
  
              <div>
                <label className="block mb-2">Donor Email</label>
                <Input {...register('donorEmail')} type="email" />
                {errors.donorEmail && (
                  <p className="text-red-500 text-sm">{errors.donorEmail.message}</p>
                )}
              </div>
  
              <div>
                <label className="block mb-2">Donor Address</label>
                <Textarea {...register('donorAddress')} />
                {errors.donorAddress && (
                  <p className="text-red-500 text-sm">{errors.donorAddress.message}</p>
                )}
              </div>
  
              <div>
                <label className="block mb-2">Amount</label>
                <Input
                  {...register('amount', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">{errors.amount.message}</p>
                )}
              </div>
  
              <div>
                <label className="block mb-2">Date</label>
                <Input {...register('date')} type="date" />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>
  
              <div>
                <label className="block mb-2">Description</label>
                <Textarea {...register('description')} />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description.message}</p>
                )}
              </div>
  
              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate & Download Invoice'}
                </Button>
              </div>
            </form>
          </Card>
  
          {previewData && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Preview</h2>
              <div className="h-[600px] overflow-auto border rounded">
                <PDFViewer width="100%" height="100%" className="border-0">
                  <InvoicePDF data={previewData} />
                </PDFViewer>
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // This should never be reached due to redirects, but as a fallback
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting...</p>
    </div>
  )
} 