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
  
  // Use absolute URLs for images to ensure they work in downloaded PDFs
  // Handle both server-side and client-side environments
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      // Client-side
      return window.location.origin;
    }
    // Server-side
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://rgbwf.vercel.app';
  };
  
  const baseUrl = getBaseUrl();
  
  // Try multiple logo options to ensure at least one works
  const logoOptions = [
    `${baseUrl}/logoonly.png`,
    `${baseUrl}/logoonly.svg`,
    'https://rgbwf.vercel.app/logoonly.png',
    'data:image/png;base64,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' // Embedded base64 fallback
  ];
  
  const logoPath = logoOptions[0];
  
  console.log('Using logo path:', logoPath);

  return (
    <Document {...props}>
      <Page size="A5" orientation="landscape" style={styles.page}>
        {/* Background logo with low opacity - centered on the page */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          {showBackgroundLogo && <Image src={logoOptions[0]} style={{ width: 250, opacity: 0.03 }} />}
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
              <Image src={logoOptions[0]} style={styles.orgLogo} />
              {/* Fallback logos in case the first one fails */}
              {logoOptions.slice(1).map((logo, index) => (
                <Image key={index} src={logo} style={[styles.orgLogo, { display: 'none' }]} />
              ))}
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
          Registration No: U88100WB2025NPL275903 | License No: 163588 | NITI Aayog: WB/2025/0503823
        </Text>
      </Page>
    </Document>
  )
} 