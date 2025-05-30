import { Document, Page, Text, View, StyleSheet, Image, DocumentProps, Font } from '@react-pdf/renderer'

// Register a font that supports the rupee symbol
Font.register({
  family: 'Noto Sans',
  src: 'https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf'
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Noto Sans',
    backgroundColor: '#ffffff',
    position: 'relative',
  },
  backgroundLogo: {
    position: 'absolute',
    width: 250,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0.03,
    zIndex: -1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoSection: {
    width: '50%',
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  orgDetails: {
    marginBottom: 10,
    fontSize: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  orgDetailsText: {
    marginLeft: 10,
    flex: 1,
  },
  orgLogo: {
    width: 40,
    objectFit: 'contain',
  },
  orgName: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  text: {
    fontSize: 11,
    marginBottom: 2,
  },
  invoiceDetails: {
    marginBottom: 15,
  },
  table: {
    flexDirection: 'column',
    marginTop: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCol: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 11,
  },
  tableColAmount: {
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 11,
    textAlign: 'right',
  },
  total: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 8,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  totalAmount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  contactInfo: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  mainContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSection: {
    width: '60%',
  },
  rightSection: {
    width: '40%',
  },
  orgNameHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#666',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderTopStyle: 'solid',
  },
  noteBox: {
    marginTop: 20,
    marginBottom: 15,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  noteText: {
    fontSize: 10,
    color: '#444',
    lineHeight: 1.4,
  },
})

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

export const InvoicePDF = ({ data, ...props }: InvoicePDFProps) => {
  // Format date manually without using date-fns
  const formatDate = (dateString: string) => {
    try {
      // Check if the date string is in YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        const [year, month, day] = dateString.split('-').map(part => parseInt(part, 10));
        return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      }
      return dateString || 'N/A';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  // Generate a unique invoice number
  const invoiceNumber = `INV-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  // Use a smaller background logo or none at all if causing issues
  const showBackgroundLogo = true; // Set to true to enable background logo
  
  // Determine if we're in a browser environment (for preview) or server environment (for PDF generation)
  const isBrowser = typeof window !== 'undefined';
  
  // Use relative path for browser preview and absolute URL for server-side rendering
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://rgbwf.org';
  const logoPath = isBrowser ? '/logoonly.png' : `${baseUrl}/logoonly.png`;

  return (
    <Document {...props}>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Background logo with low opacity - centered on the page */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          {showBackgroundLogo && <Image src={logoPath} style={{ width: 280, opacity: 0.03 }} />}
        </View>
        
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.orgNameHeader}>RGB Welfare Foundation</Text>
            <View style={styles.contactInfo}>
              <Text>Phone: +91 9830-955-444</Text>
              <Text>Email: rgbwfoundation@gmail.com</Text>
              <Text>Website: www.rgbwf.org</Text>
              <Text>Facebook: www.facebook.com/rgbwf</Text>
              <Text>Instagram: www.instagram.com/rgbwf</Text>
            </View>
          </View>
          <View>
            <Text style={styles.title}>INVOICE</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.leftSection}>
            <View style={styles.invoiceDetails}>
              <Text style={styles.text}>Invoice Date: {formatDate(data.date)}</Text>
              <Text style={styles.text}>Invoice Number: {invoiceNumber}</Text>
            </View>

            <View style={styles.invoiceDetails}>
              <Text style={[styles.text, styles.bold]}>Bill To:</Text>
              <Text style={styles.text}>{data.donorName}</Text>
              <Text style={styles.text}>{data.donorEmail}</Text>
              <Text style={styles.text}>{data.donorAddress}</Text>
            </View>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.orgDetails}>
              {/* Logo with full opacity */}
              <Image src={logoPath} style={styles.orgLogo} />
              <View style={styles.orgDetailsText}>
                <Text style={styles.orgName}>RGB Welfare Foundation</Text>
                <Text style={styles.text}>P-348, Basunagar Gate No 1</Text>
                <Text style={styles.text}>Madhyamgram, Kolkata 700129</Text>
                <Text style={styles.text}>India</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableCol}>
              <Text>Description</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text>Amount</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>{data.description}</Text>
            </View>
            <View style={styles.tableColAmount}>
              <Text>₹{data.amount ? data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.total}>
          <Text style={styles.totalAmount}>Total Amount: ₹{data.amount ? data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</Text>
        </View>

        <View style={styles.noteBox}>
          <Text style={styles.noteText}>
            Note: Please provide photocopy of your AADHAAR & PAN to file Form 10BD and to issue Donation Certificate (Form 10BE).
          </Text>
          <Text style={styles.noteText}>
            This is a computer generated receipt, no signature required.
          </Text>
        </View>

        <Text style={styles.footer}>
          Registration No: U88100WB2025NPL275903 | License No: 163588 | NITI Aayog: WB/2025/0503823
        </Text>
      </Page>
    </Document>
  )
} 