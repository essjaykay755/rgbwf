-- Create the invoices table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  serial_number TEXT NOT NULL,
  donor_details JSONB NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on the serial_number column for faster lookups
CREATE INDEX IF NOT EXISTS invoices_serial_number_idx ON public.invoices (serial_number);

-- Set up Row Level Security (RLS) policies
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- First, drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS select_invoices ON public.invoices;
DROP POLICY IF EXISTS insert_invoices ON public.invoices;
DROP POLICY IF EXISTS update_invoices ON public.invoices;
DROP POLICY IF EXISTS delete_invoices ON public.invoices;

-- Create a policy that allows only authenticated users to select invoices
CREATE POLICY select_invoices ON public.invoices
  FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Create a policy that allows only specific users to insert invoices
CREATE POLICY insert_invoices ON public.invoices
  FOR INSERT
  WITH CHECK (auth.email() = 'rgbwfoundation@gmail.com');

-- Create a policy that allows only specific users to update invoices
CREATE POLICY update_invoices ON public.invoices
  FOR UPDATE
  USING (auth.email() = 'rgbwfoundation@gmail.com');

-- Create a policy that allows only specific users to delete invoices
CREATE POLICY delete_invoices ON public.invoices
  FOR DELETE
  USING (auth.email() = 'rgbwfoundation@gmail.com');

-- Grant permissions to authenticated users
GRANT SELECT ON public.invoices TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.invoices TO authenticated;

-- Create a storage bucket for invoices if it doesn't exist
-- Note: This is a placeholder as Supabase doesn't support creating buckets via SQL
-- You'll need to create the bucket manually through the Supabase dashboard

-- Set up RLS for the storage bucket
-- Note: This is a placeholder as Supabase doesn't support setting up storage RLS via SQL
-- You'll need to set up the storage RLS manually through the Supabase dashboard 