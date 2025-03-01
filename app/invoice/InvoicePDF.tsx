import { Document, Page, Text, View, StyleSheet, Image, DocumentProps, Font } from '@react-pdf/renderer'

// Register a font that supports the rupee symbol
Font.register({
  family: 'Noto Sans',
  src: 'https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf'
})

const styles = StyleSheet.create({
  page: {
    padding: 15,
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
    marginBottom: 15,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  orgDetails: {
    marginBottom: 10,
    fontSize: 9,
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
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  text: {
    fontSize: 9,
    marginBottom: 2,
  },
  invoiceDetails: {
    marginBottom: 10,
  },
  table: {
    flexDirection: 'column',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 3,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
  },
  tableCol: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 9,
  },
  tableColAmount: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 9,
    textAlign: 'right',
  },
  total: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 5,
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 8,
    lineHeight: 1.2,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: '#666',
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

  return (
    <Document {...props}>
      <Page size="A5" orientation="landscape" style={styles.page}>
        {/* Background logo with low opacity - centered on the page */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          {showBackgroundLogo && <Image src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/logoonly.png`} style={{ width: 250, opacity: 0.03 }} />}
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
              <Image src={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/logoonly.png`} style={styles.orgLogo} />
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
          <Text style={styles.bold}>Total Amount: ₹{data.amount ? data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</Text>
        </View>

        <Text style={styles.footer}>
          License No: RGBWF/2023/001 | PAN: AADTR1234C | GST: 19AADTR1234C1ZA
        </Text>
      </Page>
    </Document>
  )
} 