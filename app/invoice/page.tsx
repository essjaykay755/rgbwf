'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PDFViewer } from '@react-pdf/renderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { InvoicePDF } from './InvoicePDF'
import { useRouter } from 'next/navigation'
import { LogOut, History } from 'lucide-react'
import { createBrowserClient, getSession, getUser, signOut, isAuthorizedEmail } from '@/lib/supabase'

// Define the schema for form validation
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
  const router = useRouter()

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        console.log('Checking authentication in invoice page')
        
        // Initialize the browser client
        const supabase = createBrowserClient()
        if (!supabase) {
          console.error('Failed to initialize Supabase client')
          toast.error('Authentication error: Failed to initialize')
          router.push('/auth/login')
          return
        }
        
        // Get the current session
        const session = await getSession()
        
        if (!session) {
          console.log('No session found, redirecting to login')
          toast.error('Please sign in to access this page')
          router.push('/auth/login')
          return
        }
        
        console.log('Session found, user:', session.user.email)
        
        // Check if user is authorized
        if (!isAuthorizedEmail(session.user.email || '')) {
          console.log('User not authorized, signing out and redirecting to home')
          toast.error('You do not have permission to access this page')
          
          // Sign out the unauthorized user
          await signOut()
          
          router.push('/?error=unauthorized')
          return
        }
        
        setUser(session.user)
        console.log('User is authorized, allowing access to invoice page')
      } catch (error) {
        console.error('Error checking authentication:', error)
        toast.error('Error checking authentication status')
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  // Get today's date in YYYY-MM-DD format for the form
  const getTodayFormatted = () => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error('Error formatting today\'s date:', error);
      return ''; // Return empty string as fallback
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      date: getTodayFormatted(),
      donorName: '',
      donorEmail: '',
      donorAddress: '',
      description: '',
    }
  });

  const formData = watch();

  // Safe preview data generation
  const generatePreview = () => {
    if (!formData.donorName || !formData.donorEmail || !formData.donorAddress || 
        !formData.amount || !formData.description || !formData.date) {
      return null;
    }
    
    return {
      donorName: formData.donorName,
      donorEmail: formData.donorEmail,
      donorAddress: formData.donorAddress,
      amount: Number(formData.amount),
      description: formData.description,
      date: formData.date
    };
  };

  const onSubmit = async (data: InvoiceFormData) => {
    try {
      // Get the current session
      const session = await getSession()
      
      if (!session) {
        console.error('Error getting session for form submission')
        toast.error('Your session has expired. Please log in again.')
        router.push('/auth/login')
        return
      }

      setLoading(true)
      
      // Create a safe copy of the data
      const safeData = {
        donorName: data.donorName,
        donorEmail: data.donorEmail,
        donorAddress: data.donorAddress,
        amount: Number(data.amount),
        description: data.description,
        date: data.date
      };
      
      setPreviewData(safeData)

      console.log('Submitting form data:', safeData)
      
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(safeData),
      })

      const result = await response.json()
      
      if (!response.ok) {
        console.error('API error response:', result)
        throw new Error(result.error || 'Failed to generate invoice')
      }

      console.log('API success response:', result)
      toast.success('Invoice generated and saved successfully')

      // Reset the form after successful submission
      reset({
        donorName: '',
        donorEmail: '',
        donorAddress: '',
        amount: undefined,
        description: '',
        date: getTodayFormatted(),
      })

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
      console.log('Logging out')
      await signOut()
      console.log('Successfully signed out')
      router.push('/')
      toast.success('Logged out successfully')
    } catch (error: any) {
      console.error('Error logging out:', error)
      toast.error(`Failed to log out: ${error.message || 'Unknown error'}`)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Loading authentication status...</p>
        <p className="text-sm text-gray-500">Please wait while we verify your session</p>
      </div>
    )
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Please sign in to access the invoice generation system.</p>
        <Button onClick={() => router.push('/auth/login')}>Go to Login Page</Button>
      </div>
    )
  }

  // Calculate preview data safely
  const previewDataSafe = previewData || generatePreview();

  // Show the invoice form for authorized users
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Generate Invoice</h1>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => router.push('/invoice/history')}
            className="flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            View Invoice History
          </Button>
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Generating Invoice...' : 'Generate Invoice'}
            </Button>
          </form>
        </Card>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
          {previewDataSafe ? (
            <div className="h-[600px] overflow-hidden rounded border border-gray-300">
              <PDFViewer 
                width="100%" 
                height="100%" 
                className="rounded"
                showToolbar={false}
              >
                <InvoicePDF data={previewDataSafe} />
              </PDFViewer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded border border-gray-300">
              <p className="text-gray-500">Fill out the form to preview the invoice</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 