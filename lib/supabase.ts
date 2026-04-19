import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy initialization to prevent build-time crashes when env vars are missing
let supabaseInstance: SupabaseClient<Database> | null = null;

function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;

  // Robust validation
  const isValidUrl = envUrl && envUrl.startsWith('http');
  const finalUrl = isValidUrl ? envUrl : "https://placeholder-project.supabase.co";
  
  // Use a hardcoded dummy key as final fallback to satisfy the constructor during build/evaluation
  const finalKey = envKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU1NTU1Nn0.token_placeholder";

  supabaseInstance = createClient<Database>(finalUrl, finalKey);
  return supabaseInstance;
}

// Export a proxy as 'supabase' so existing code doesn't need to change from 'supabase.from(...)' to 'supabase().from(...)'
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get: (target, prop) => {
    return (getSupabaseClient() as any)[prop];
  }
});
