/**
 * Auto-generated Supabase Database types.
 *
 * In production, generate these with:
 *   npx supabase gen types typescript --project-id <your-id> > types/supabase.ts
 *
 * For now, these are hand-written to match the schema in
 * .antigravity/COFFEE_EXPORT_ARCHITECTURE.md
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      coffee_lots: {
        Row: {
          id: string;
          lot_number: string;
          name: string;
          region: string;
          washing_station: string;
          altitude_range: string;
          process_method: string;
          sca_score: number;
          moisture_content: number;
          harvest_year: number;
          bags_available: number;
          bag_weight_kg: number;
          fob_price_usd: number;
          is_published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          lot_number: string;
          name: string;
          region: string;
          washing_station: string;
          altitude_range: string;
          process_method: string;
          sca_score: number;
          moisture_content: number;
          harvest_year: number;
          bags_available: number;
          bag_weight_kg?: number;
          fob_price_usd: number;
          is_published?: boolean;
        };
        Update: {
          id?: string;
          lot_number?: string;
          name?: string;
          region?: string;
          washing_station?: string;
          altitude_range?: string;
          process_method?: string;
          sca_score?: number;
          moisture_content?: number;
          harvest_year?: number;
          bags_available?: number;
          bag_weight_kg?: number;
          fob_price_usd?: number;
          is_published?: boolean;
        };
        Relationships: [];
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          country: string;
          tax_id: string | null;
          is_verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          country: string;
          tax_id?: string | null;
          is_verified?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          country?: string;
          tax_id?: string | null;
          is_verified?: boolean;
        };
        Relationships: [];
      };
      inquiries: {
        Row: {
          id: string;
          company_name: string;
          company_country: string;
          company_website: string | null;
          contact_name: string;
          contact_email: string;
          contact_phone: string | null;
          contact_role: string | null;
          lot_id: string | null;
          lot_number: string | null;
          type: string;
          quantity_bags: number | null;
          shipping_method: string | null;
          incoterm: string | null;
          notes: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          company_name: string;
          company_country: string;
          company_website?: string | null;
          contact_name: string;
          contact_email: string;
          contact_phone?: string | null;
          contact_role?: string | null;
          lot_id?: string | null;
          lot_number?: string | null;
          type: string;
          quantity_bags?: number | null;
          shipping_method?: string | null;
          incoterm?: string | null;
          notes?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          company_name?: string;
          company_country?: string;
          company_website?: string | null;
          contact_name?: string;
          contact_email?: string;
          contact_phone?: string | null;
          contact_role?: string | null;
          lot_id?: string | null;
          lot_number?: string | null;
          type?: string;
          quantity_bags?: number | null;
          shipping_method?: string | null;
          incoterm?: string | null;
          notes?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      shipment_documents: {
        Row: {
          id: string;
          inquiry_id: string;
          doc_type: string;
          file_url: string;
          uploaded_at: string;
        };
        Insert: {
          id?: string;
          inquiry_id: string;
          doc_type: string;
          file_url: string;
        };
        Update: {
          id?: string;
          inquiry_id?: string;
          doc_type?: string;
          file_url?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
