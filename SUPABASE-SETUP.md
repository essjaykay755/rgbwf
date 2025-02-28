# Supabase Setup for RGB Welfare Foundation

This document provides instructions on how to set up the Supabase project for the RGB Welfare Foundation invoice generation system.

## Prerequisites

1. A Supabase account
2. Access to the Supabase project dashboard

## Setup Steps

### 1. Create a Supabase Project

If you haven't already, create a new Supabase project:

1. Go to [https://app.supabase.io/](https://app.supabase.io/)
2. Click "New Project"
3. Enter a name for your project (e.g., "RGB Welfare Foundation")
4. Choose a database password
5. Choose a region close to your users
6. Click "Create new project"

### 2. Set Up Authentication

1. Go to the "Authentication" section in the Supabase dashboard
2. Under "Providers", enable "Email" authentication
3. Under "URL Configuration", set your site URL and redirect URLs
4. Under "Email Templates", customize the email templates if desired

### 3. Create the Invoices Table

You can create the invoices table in two ways:

#### Option 1: Using the SQL Editor

1. Go to the "SQL Editor" section in the Supabase dashboard
2. Copy and paste the contents of the `supabase-schema.sql` file
3. Click "Run" to execute the SQL commands

#### Option 2: Using the Table Editor

1. Go to the "Table Editor" section in the Supabase dashboard
2. Click "Create a new table"
3. Set the table name to "invoices"
4. Add the following columns:
   - `id` (type: uuid, primary key, default: uuid_generate_v4())
   - `serial_number` (type: text, not null)
   - `donor_details` (type: jsonb, not null)
   - `amount` (type: numeric, not null)
   - `date` (type: date, not null)
   - `description` (type: text, not null)
   - `pdf_url` (type: text, not null)
   - `status` (type: text, not null)
   - `created_at` (type: timestamp with time zone, default: now())
5. Click "Save" to create the table

### 4. Set Up Storage

1. Go to the "Storage" section in the Supabase dashboard
2. Click "Create a new bucket"
3. Set the bucket name to "invoices"
4. Enable "Public" access for the bucket
5. Click "Create bucket"

### 5. Set Up Row Level Security (RLS) Policies

If you used Option 2 to create the table, you'll need to set up RLS policies manually:

1. Go to the "Authentication" > "Policies" section in the Supabase dashboard
2. Find the "invoices" table
3. Click "Add Policies"
4. Add the following policies:
   - For SELECT: Allow authenticated users to select invoices
   - For INSERT: Allow only rgbwfoundation@gmail.com to insert invoices
   - For UPDATE: Allow only rgbwfoundation@gmail.com to update invoices
   - For DELETE: Allow only rgbwfoundation@gmail.com to delete invoices

### 6. Get API Keys

1. Go to the "Settings" > "API" section in the Supabase dashboard
2. Copy the following keys:
   - "URL" (Project URL)
   - "anon" key (public API key)
   - "service_role" key (secret API key with admin privileges)
3. Update your `.env.local` file with these values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

> **IMPORTANT**: The `SUPABASE_SERVICE_ROLE_KEY` has admin privileges and can bypass RLS policies. Never expose this key to the client-side code. It should only be used in server-side code (like API routes).

### 7. Create a User Account

1. Go to the "Authentication" > "Users" section in the Supabase dashboard
2. Click "Invite user"
3. Enter the email address: rgbwfoundation@gmail.com
4. Set a password for the account
5. Click "Invite"

## Testing

After completing the setup, you should be able to:

1. Log in with the rgbwfoundation@gmail.com account
2. Generate invoices
3. Download the generated invoices
4. View the invoices in the Supabase dashboard under the "invoices" table and "invoices" storage bucket

## Troubleshooting

If you encounter any issues:

1. Check the browser console for error messages
2. Check the Supabase dashboard for error logs
3. Ensure that the rgbwfoundation@gmail.com account has been created and has the necessary permissions
4. Verify that the "invoices" table and "invoices" storage bucket have been created correctly
5. Check that the RLS policies are set up correctly
6. Ensure that the `SUPABASE_SERVICE_ROLE_KEY` is correctly set in your `.env.local` file

### Common Issues

#### Row Level Security (RLS) Policy Violations

If you see errors like "new row violates row-level security policy", it means that the user doesn't have permission to insert data into the table. This can be fixed by:

1. Using the `supabaseAdmin` client with the service role key in server-side code
2. Ensuring that the RLS policies are correctly set up
3. Making sure the user is authenticated and has the correct email address

#### Storage Bucket Access Issues

If you see errors related to storage bucket access, make sure:

1. The "invoices" bucket exists
2. The bucket is set to public access
3. The user has permission to upload files to the bucket 