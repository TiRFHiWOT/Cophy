import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy initialization to prevent build-time crashes when env vars are missing
let supabaseInstance: SupabaseClient<Database> | null = null;

function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;

  // Check if env vars are missing or are the default placeholders
  const isPlaceholderUrl = !envUrl || envUrl === 'your-project-url';
  const isPlaceholderKey = !envKey || envKey === 'your-anon-key';

  const finalUrl = !isPlaceholderUrl ? envUrl! : "https://placeholder-project.supabase.co";
  
  // Use a hardcoded dummy JWT as final fallback to satisfy the constructor during build/evaluation
  // This helps when Next.js or other tools inspect the object during build
  const finalKey = !isPlaceholderKey ? envKey! : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MTk5NTU1NTU1Nn0.token_placeholder";

  try {
    supabaseInstance = createClient<Database>(finalUrl, finalKey);
  } catch (e) {
    console.warn("Supabase client initialization failed, using mock client during build.");
    // Fallback to a minimal mock if createClient still fails
    return {} as SupabaseClient<Database>;
  }
  
  return supabaseInstance;
}

// Export a proxy as 'supabase' so existing code doesn't need to change from 'supabase.from(...)' to 'supabase().from(...)'
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get: (target, prop) => {
    return (getSupabaseClient() as any)[prop];
  }
});
