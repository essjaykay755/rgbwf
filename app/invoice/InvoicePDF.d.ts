import { DocumentProps } from '@react-pdf/renderer'

interface InvoiceData {
  donorName: string
  donorEmail: string
  donorAddress: string
  amount: number
  description: string
  date: string
}

interface InvoicePDFProps extends DocumentProps {
  data: InvoiceData
}

export declare const InvoicePDF: React.FC<InvoicePDFProps> 