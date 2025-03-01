'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LogOut, ArrowLeft, Download, Search } from 'lucide-react'
import { createBrowserClient, getSession, signOut, isAuthorizedEmail } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import UnauthorizedMessage from '../../components/UnauthorizedMessage'

interface InvoiceRecord {
  id: string
  created_at: string
  serial_number: string
  donor_details: {
    name: string
    email: string
    address: string
  }
  amount: number
  date: string
  description: string
  pdf_url: string
  status: string
}

export default function InvoiceHistoryPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<InvoiceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [isAuthorized, setIsAuthorized] = useState(true)
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
          console.log('User not authorized:', session.user.email)
          setUser(session.user)
          setIsAuthorized(false)
          return
        }
        
        setUser(session.user)
        setIsAuthorized(true)
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

  const fetchInvoiceHistory = async (token: string) => {
    try {
      setLoading(true)
      
      const supabase = createBrowserClient()
      if (!supabase) {
        console.error('Failed to initialize Supabase client')
        toast.error('Error: Failed to initialize database connection')
        return
      }
      
      // Fetch invoices from the database
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Error fetching invoices:', error)
        toast.error('Failed to fetch invoice history')
        return
      }
      
      console.log('Fetched invoices:', data)
      
      // Safely transform the data to match our interface
      const typedData: InvoiceRecord[] = data ? data.map((item: any) => ({
        id: item.id,
        created_at: item.created_at,
        serial_number: item.serial_number,
        donor_details: item.donor_details,
        amount: item.amount,
        date: item.date,
        description: item.description,
        pdf_url: item.pdf_url,
        status: item.status
      })) : [];
      
      setInvoices(typedData)
      setFilteredInvoices(typedData)
    } catch (error) {
      console.error('Error in fetchInvoiceHistory:', error)
      toast.error('Failed to load invoice history')
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    
    if (!term.trim()) {
      setFilteredInvoices(invoices)
      return
    }
    
    const filtered = invoices.filter(invoice => 
      invoice.donor_details.name.toLowerCase().includes(term) ||
      invoice.donor_details.email.toLowerCase().includes(term) ||
      invoice.serial_number.toLowerCase().includes(term) ||
      invoice.description.toLowerCase().includes(term)
    )
    
    setFilteredInvoices(filtered)
  }

  const downloadInvoice = async (serialNumber: string) => {
    try {
      const supabase = createBrowserClient()
      if (!supabase) {
        console.error('Failed to initialize Supabase client')
        toast.error('Error: Failed to initialize database connection')
        return
      }
      
      // Get a signed URL for the PDF
      const { data, error } = await supabase
        .storage
        .from('invoices')
        .createSignedUrl(`${serialNumber}.pdf`, 60)
      
      if (error) {
        console.error('Error getting signed URL:', error)
        toast.error('Failed to generate download link')
        return
      }
      
      // Download the PDF
      const link = document.createElement('a')
      link.href = data.signedUrl
      link.download = `invoice-${serialNumber}.pdf`
      link.click()
      
      toast.success('Invoice download started')
    } catch (error) {
      console.error('Error downloading invoice:', error)
      toast.error('Failed to download invoice')
    }
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

  // Show unauthorized message if user is not authorized
  if (!isAuthorized) {
    return <UnauthorizedMessage email={user.email} />
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
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice.serial_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.donor_details.name}</div>
                      <div className="text-sm text-gray-500">{invoice.donor_details.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${Number(invoice.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {invoice.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadInvoice(invoice.serial_number)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
                      >
                        <Download className="w-4 h-4" />
                        Download
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