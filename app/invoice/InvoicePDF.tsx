import { Document, Page, Text, View, StyleSheet, Image, DocumentProps, Font } from '@react-pdf/renderer'
import { format } from 'date-fns'

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
    width: 150,
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
  return (
    <Document {...props}>
      <Page size="A5" orientation="landscape" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Image
              src="/logowithtext.png"
              style={styles.logo}
            />
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
              <Text style={styles.text}>Invoice Date: {format(new Date(data.date), 'dd/MM/yyyy')}</Text>
              <Text style={styles.text}>Invoice Number: {data.date ? `INV-${Date.now()}` : ''}</Text>
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
              <Text style={styles.orgName}>RGB Welfare Foundation</Text>
              <Text style={styles.text}>P-348, Basunagar Gate No 1</Text>
              <Text style={styles.text}>Madhyamgram, Kolkata 700129</Text>
              <Text style={styles.text}>India</Text>
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
              <Text>₹{data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
            </View>
          </View>
        </View>

        <View style={styles.total}>
          <Text style={styles.bold}>Total Amount: ₹{data.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Text>
        </View>
      </Page>
    </Document>
  )
} 