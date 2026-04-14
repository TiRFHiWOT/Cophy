# Project Knowledge: B2B Coffee Export Platform (The "Allo-BNT" Pivot)

## 1. Core Objective
Transition the current "Retail/Cafe" B2B/B2C hybrid into a professional International Coffee Export Portal. The primary audience is global coffee importers, roasters, and green bean buyers.

## 2. Business Logic & UX Shifts
- Transaction Model: Move from "Pay via Card" to "Request Quote/Sample."
- Unit of Sale: Sell by Lots and 60kg Bags, not grams or 500g bags.
- Pricing: Prices are FOB (Free On Board) in USD and are often hidden behind a "Verified Importer" login.
- Key Metrics: Prioritize SCA Score, Moisture %, Water Activity, and Altitude over lifestyle descriptions.

## 3. Tech Stack Requirements
- Framework: Next.js (App Router).
- Backend/Auth: Supabase.
- Storage: Supabase Storage (for Legal/Export Documents).
- Styling: Industrial-Professional (Dark Greens, Earthy Tans, Slate Grays).

## 4. Database Schema (Supabase/PostgreSQL)

```sql
-- 1. Coffee Lots (The Products)
CREATE TABLE coffee_lots (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  lot_number text UNIQUE, -- e.g., ETH-2026-YIRG-001
  name text,              -- e.g., "Yirgacheffe Grade 1 Washed"
  region text,            -- Sidama, Guji, Yirgacheffe, etc.
  washing_station text,
  altitude_range text,    -- e.g., "1900 - 2200m"
  process_method text,    -- Washed, Natural, Honey, Anaerobic
  sca_score decimal(4,2), -- e.g., 87.50
  moisture_content decimal(4,2), -- e.g., 10.5
  harvest_year int,
  bags_available int,
  bag_weight_kg int DEFAULT 60,
  fob_price_usd decimal(10,2),
  is_published boolean DEFAULT false
);

-- 2. Organizations (B2B Multi-tenancy)
CREATE TABLE organizations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text,
  country text,
  tax_id text,
  is_verified boolean DEFAULT false
);

-- 3. Inquiries & Samples (The Checkout Replacement)
CREATE TABLE inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES auth.users(id),
  org_id uuid REFERENCES organizations(id),
  lot_id uuid REFERENCES coffee_lots(id),
  type text CHECK (type IN ('sample_request', 'quote_request')),
  quantity_requested int, -- in bags
  status text DEFAULT 'pending' -- pending, shipped, quoted, closed
);

-- 4. Document Vault
CREATE TABLE shipment_documents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id uuid REFERENCES inquiries(id),
  doc_type text, -- 'Phytosanitary', 'Origin', 'Bill of Lading'
  file_url text, -- Supabase Storage Path
  uploaded_at timestamptz DEFAULT now()
);
```

## 5. Required Page Modules
- Public Catalog: Technical grid showing Lot #, SCA Score, and Origin.
- Origin Stories: Deep-dives into the Washing Stations (High-res industrial photography).
- Client Dashboard (/dashboard):
  - My Samples: Track requested 200g samples.
  - My Shipments: Stepper-component tracking logistics (Milling -> Port -> Vessel).
  - Document Center: Download PDFs for customs clearing.
- Admin Portal: Your friend's interface to update inventory and upload PDFs.

## 6. Design Constraints
- Typography: Serif for headers (Trust), Sans-serif for data (Precision).
- Imagery: Focus on Green Beans (Raw), Jute Bags, and Processing Equipment.
- CTA Strategy: Use "Request Sample" as the primary button.
