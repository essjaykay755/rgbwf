'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { supabase, createBrowserClient } from '@/lib/supabase'
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
  const [isLoading, setIsLoading] = useState(true)
  const [browserClient, setBrowserClient] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Initialize the browser client
    setBrowserClient(createBrowserClient())
  }, [])

  useEffect(() => {
    if (!browserClient) return

    const checkUser = async () => {
      try {
        console.log('Checking user in invoice page')
        const { data: { user }, error } = await browserClient.auth.getUser()
        
        if (error) {
          console.error('Error getting user in invoice page:', error)
          throw error
        }
        
        if (user) {
          console.log('User found in invoice page:', user.email)
          setUser(user)
        } else {
          console.log('No user found in invoice page')
        }
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [browserClient])

  // Function to check if the user is logged in
  const checkUserLoggedIn = async () => {
    try {
      if (!browserClient) {
        toast.error('Browser client not initialized')
        return false
      }
      
      const { data: { session }, error } = await browserClient.auth.getSession()
      
      if (error) {
        console.error('Error checking session in invoice page:', error)
        toast.error('Error checking login status')
        return false
      }
      
      if (!session) {
        console.log('No session found in invoice page')
        toast.error('You must be logged in to generate an invoice')
        return false
      }
      
      console.log('Session found in invoice page, user:', session.user.email)
      return true
    } catch (error) {
      console.error('Error checking session:', error)
      toast.error('Error checking login status')
      return false
    }
  }

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
      // Check if the user is logged in
      const isLoggedIn = await checkUserLoggedIn()
      if (!isLoggedIn) return

      setLoading(true)
      setPreviewData(data)

      console.log('Submitting form data:', data)
      
      // Get the current session
      if (!browserClient) {
        throw new Error('Browser client not initialized')
      }
      
      const { data: { session }, error: sessionError } = await browserClient.auth.getSession()
      
      if (sessionError) {
        console.error('Error getting session for API call:', sessionError)
        throw new Error('Error getting session')
      }
      
      if (!session) {
        throw new Error('You must be logged in to generate an invoice')
      }
      
      console.log('Using session for API call, user:', session.user.email)
      
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
      if (!browserClient) {
        toast.error('Browser client not initialized')
        return
      }
      
      console.log('Logging out')
      const { error } = await browserClient.auth.signOut()
      
      if (error) {
        console.error('Error signing out:', error)
        throw error
      }
      
      console.log('Successfully signed out')
      router.push('/')
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Error logging out:', error)
      toast.error('Failed to log out')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Please sign in to access the invoice generation system.</p>
        <LoginButton />
      </div>
    )
  }

  if (user && user.email !== 'rgbwfoundation@gmail.com') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>You don't have permission to access this page.</p>
        <div className="flex gap-4">
          <Button onClick={() => router.push('/')}>Go Home</Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    )
  }

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

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          {Object.keys(formData).every(key => formData[key as keyof InvoiceFormData]) && (
            <div className="h-[800px]">
              <PDFViewer width="100%" height="100%">
                <InvoicePDF data={formData as InvoiceFormData} />
              </PDFViewer>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
} 