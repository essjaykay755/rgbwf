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
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

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

      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to generate invoice')
      }

      const result = await response.json()
      toast.success('Invoice generated and sent successfully')

      // Open PDF in new tab
      window.open(result.pdfUrl, '_blank')
    } catch (error) {
      console.error('Error generating invoice:', error)
      toast.error('Failed to generate invoice')
    } finally {
      setLoading(false)
    }
  }

  const handlePreviewDownload = async () => {
    try {
      const blob = await pdf(<InvoicePDF data={formData as InvoiceFormData} />).toBlob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `invoice-preview-${Date.now()}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading preview:', error)
      toast.error('Failed to download preview')
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
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
                {loading ? 'Generating...' : 'Generate & Send Invoice'}
              </Button>

              {Object.keys(formData).every(key => formData[key as keyof InvoiceFormData]) && (
                <Button variant="outline" onClick={handlePreviewDownload}>
                  Download Preview
                </Button>
              )}
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