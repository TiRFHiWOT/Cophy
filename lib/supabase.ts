import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Add basic validation to prevent the library from crashing on app startup 
// during module evaluation if keys are missing or are still placeholders.
const isValidUrl = supabaseUrl.startsWith("http");
const finalUrl = isValidUrl ? supabaseUrl : "https://placeholder-project.supabase.co";

export const supabase = createClient<Database>(finalUrl, supabaseAnonKey);
