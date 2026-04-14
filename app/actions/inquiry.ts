"use server";

import { supabase } from "@/lib/supabase";

export interface InquiryFormData {
  // Step 1 — Company
  companyName: string;
  country: string;
  website: string;
  // Step 2 — Contact
  fullName: string;
  email: string;
  phone: string;
  role: string;
  // Step 3 — Order
  quantityBags: string;
  shippingMethod: string;
  incoterm: string;
  notes: string;
  // Context
  lotId?: string;
  lotNumber?: string;
  type: "sample_request" | "quote_request";
}

export async function submitInquiry(data: InquiryFormData) {
  const { error } = await supabase.from("inquiries").insert({
    company_name: data.companyName,
    company_country: data.country,
    company_website: data.website || null,
    contact_name: data.fullName,
    contact_email: data.email,
    contact_phone: data.phone || null,
    contact_role: data.role || null,
    lot_id: data.lotId || null,
    lot_number: data.lotNumber || null,
    type: data.type,
    quantity_bags: data.quantityBags ? parseInt(data.quantityBags) : null,
    shipping_method: data.shippingMethod || null,
    incoterm: data.incoterm || "FOB",
    notes: data.notes || null,
    status: "pending",
  });

  if (error) {
    console.error("Failed to submit inquiry:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}
