'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LogOut, ArrowLeft, Download, Search } from 'lucide-react'
import { createBrowserClient, getSession, signOut, isAuthorizedEmail } from '@/lib/supabase'
import { Input } from '@/components/ui/input'

interface InvoiceRecord {
  id: string
  created_at: string
  donor_name: string
  donor_email: string
  amount: number
  description: string
  invoice_number: string
  serial_number: string
}

export default function InvoiceHistoryPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication in invoice history page')
        
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
        console.log('User is authorized, allowing access to invoice history page')
        
        // Fetch invoice history
        await fetchInvoiceHistory(session.access_token)
      } catch (error) {
        console.error('Error checking authentication:', error)
        toast.error('Error checking authentication status')
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [router])

  const fetchInvoiceHistory = async (accessToken: string) => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/invoice/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch invoice history')
      }

      const data = await response.json()
      setInvoices(data.invoices)
      setFilteredInvoices(data.invoices)
      console.log('Fetched invoice history:', data.invoices)
    } catch (error: any) {
      console.error('Error fetching invoice history:', error)
      toast.error(`Failed to fetch invoice history: ${error.message || 'Unknown error'}`)
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

  const handleDownload = async (invoiceId: string, invoiceNumber: string) => {
    try {
      const session = await getSession()
      
      if (!session) {
        toast.error('Your session has expired. Please log in again.')
        router.push('/auth/login')
        return
      }
      
      toast.loading(`Downloading invoice ${invoiceNumber}...`)
      
      const response = await fetch(`/api/invoice/download/${invoiceId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to download invoice')
      }

      const data = await response.json()
      
      // Download the PDF
      const link = document.createElement('a')
      link.href = data.pdfUrl
      link.download = `invoice-${invoiceNumber}.pdf`
      link.click()
      
      toast.dismiss()
      toast.success(`Invoice ${invoiceNumber} downloaded successfully`)
    } catch (error: any) {
      toast.dismiss()
      console.error('Error downloading invoice:', error)
      toast.error(`Failed to download invoice: ${error.message || 'Unknown error'}`)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    
    if (!term.trim()) {
      setFilteredInvoices(invoices)
      return
    }
    
    const filtered = invoices.filter(invoice => 
      invoice.donor_name.toLowerCase().includes(term) ||
      invoice.donor_email.toLowerCase().includes(term) ||
      invoice.invoice_number.toLowerCase().includes(term) ||
      invoice.description.toLowerCase().includes(term)
    )
    
    setFilteredInvoices(filtered)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    } catch (error) {
      console.error('Error formatting date:', error)
      return dateString
    }
  }

  // Show loading state
  if (loading && !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Loading invoice history...</p>
        <p className="text-sm text-gray-500">Please wait while we fetch your data</p>
      </div>
    )
  }

  // Show login prompt if no user
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p>Please sign in to access the invoice history.</p>
        <Button onClick={() => router.push('/auth/login')}>Go to Login Page</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/invoice')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Invoice Generator
          </Button>
          <h1 className="text-3xl font-bold">Invoice History</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-gray-500" />
          <Input
            placeholder="Search by donor name, email, invoice number or description..."
            value={searchTerm}
            onChange={handleSearch}
            className="flex-1"
          />
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <p>Loading invoice records...</p>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div className="text-center py-8">
            <p>No invoice records found.</p>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">Try adjusting your search criteria.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Invoice #</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Donor Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Amount</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{formatDate(invoice.created_at)}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.invoice_number}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.donor_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.donor_email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ₹{invoice.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{invoice.description}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(invoice.id, invoice.invoice_number)}
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
} 