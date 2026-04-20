"use server";

import { supabase } from "@/lib/supabase";

export interface InquiryFormData {
  // Step 1 — Company
  companyName: string;
  country: string;
  website?: string;
  // Step 2 — Contact
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
  // Step 3 — Order
  quantityBags: string;
  shippingMethod?: string;
  incoterm?: string;
  notes?: string;
  // Context
  lotId?: string;
  lotNumber?: string;
  type: "sample_request" | "quote_request";
}


export async function submitInquiry(data: InquiryFormData): Promise<{ success: boolean; error?: string }> {
  // Frontend-only MVP: Success mock without database
  console.log("Mock Ingestion — Inquiry received:", data);
  return { success: true };
}

