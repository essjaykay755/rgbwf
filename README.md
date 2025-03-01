# RGB Welfare Foundation Invoice System

This is an invoice generation and management system for RGB Welfare Foundation.

## Features

- Generate invoices for donors
- View and download previously generated invoices
- Secure authentication and authorization
- PDF generation with customizable templates

## Setup

### Prerequisites

- Node.js 18 or higher
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### Database Setup

1. Create a new Supabase project
2. The database schema is already defined in `supabase-schema.sql`. This file includes:
   - The `invoices` table structure with fields for serial number, donor details (as JSONB), amount, date, description, PDF URL, and status
   - Row Level Security (RLS) policies to ensure only authorized users can access the data
   - Indexes for faster queries
3. Run this SQL script in your Supabase SQL editor
4. Create a storage bucket named `invoices` with appropriate permissions

### Running the Application

```
npm run dev
```

The application will be available at http://localhost:3000

## Authentication

Only authorized users (currently only `rgbwfoundation@gmail.com`) can access the invoice generation system. Other users will see an unauthorized message.

## Invoice Generation

1. Fill out the invoice form with donor details
2. Preview the invoice in real-time
3. Submit to generate and download the PDF

## Invoice History

View and download previously generated invoices from the invoice history page.

## License

All rights reserved. © 2024 RGB Welfare Foundation. 