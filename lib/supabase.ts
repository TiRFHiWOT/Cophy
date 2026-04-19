import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Robust validation to prevent "@supabase/supabase-js" from throwing during module evaluation
const isValidUrl = envUrl && envUrl.startsWith('http');
const finalUrl = isValidUrl ? envUrl : "https://placeholder-project.supabase.co";
const finalKey = envKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU1NTU1Nn0.token_placeholder";

export const supabase = createClient<Database>(finalUrl, finalKey);
