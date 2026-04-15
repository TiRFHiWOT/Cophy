-- =============================================================
-- B2B Coffee Export Platform — Supabase Migration
-- Run this in your Supabase SQL Editor (Dashboard → SQL → New Query)
-- =============================================================

-- 1. Coffee Lots (The Products)
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lot_number text UNIQUE NOT NULL,
  name text NOT NULL,
  region text NOT NULL,
  washing_station text NOT NULL,
  altitude_range text,
  process_method text NOT NULL CHECK (process_method IN ('Washed', 'Natural', 'Honey', 'Anaerobic')),
  sca_score float,
  moisture_content float,
  harvest_year int NOT NULL,
  total_bags int NOT NULL DEFAULT 0,
  bags_available int NOT NULL DEFAULT 0,
  bag_weight_kg int NOT NULL DEFAULT 60,
  fob_price_usd decimal(10,2), -- Restricted via column-level security or split view in production
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 2. Organizations (B2B Multi-tenancy, for future use)
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  country text NOT NULL,
  tax_id text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- 3. Inquiries (The Checkout Replacement)
-- This is the core table that InquiryModal writes to
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Company info (Step 1)
  company_name text NOT NULL,
  company_country text NOT NULL,
  company_website text,
  -- Contact info (Step 2)
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  contact_role text,
  -- Lot reference
  lot_id uuid REFERENCES coffee_lots(id) ON DELETE SET NULL,
  lot_number text,
  -- Request details (Step 3)
  type text NOT NULL CHECK (type IN ('sample_request', 'quote_request')),
  quantity_bags int,
  shipping_method text,
  incoterm text DEFAULT 'FOB',
  notes text,
  -- Status tracking
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'sample_shipped', 'quoted', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- 4. Document Vault (for shipping/export documents)
CREATE TABLE IF NOT EXISTS shipment_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES inquiries(id) ON DELETE CASCADE,
  doc_type text NOT NULL, -- 'Phytosanitary', 'Origin', 'Bill of Lading', 'ICO'
  file_url text NOT NULL, -- Supabase Storage path
  uploaded_at timestamptz DEFAULT now()
);

-- =============================================================
-- Row Level Security (RLS)
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE coffee_lots ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_documents ENABLE ROW LEVEL SECURITY;

-- Coffee Lots: Public read for published lots
CREATE POLICY "Public can read published lots"
  ON coffee_lots FOR SELECT
  USING (is_published = true);

-- Inquiries: Anyone can INSERT (the lead capture form is public)
CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Inquiries: Only authenticated users (admins) can read/update
CREATE POLICY "Admins can read inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Shipment Documents: Only authenticated users
CREATE POLICY "Admins can manage documents"
  ON shipment_documents FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================
-- Storage Bucket: trade-documents
-- =============================================================
-- Run this separately or via the Supabase Dashboard:
--
-- 1. Go to Storage → Create Bucket
-- 2. Name: "trade-documents"
-- 3. Public: OFF (private bucket)
-- 4. File size limit: 10MB
-- 5. Allowed MIME types: application/pdf, image/jpeg, image/png
--
-- Then add this RLS policy for the bucket:
--   INSERT: auth.role() = 'authenticated'
--   SELECT: auth.role() = 'authenticated'
--   DELETE: auth.role() = 'authenticated'

-- =============================================================
-- Indexes for performance
-- =============================================================
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_lot_id ON inquiries(lot_id);
CREATE INDEX IF NOT EXISTS idx_coffee_lots_region ON coffee_lots(region);
CREATE INDEX IF NOT EXISTS idx_coffee_lots_published ON coffee_lots(is_published);
