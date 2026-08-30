/**
 * Supabase Client Configuration & Adapter Setup
 * 
 * To connect to Supabase:
 * 1. Define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment (.env)
 * 2. The client will automatically transition from local persistent store to live Supabase backend
 */

export interface SupabaseConfig {
  url?: string;
  anonKey?: string;
  isReady: boolean;
}

export function getSupabaseConfig(): SupabaseConfig {
  const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
  const url = env.VITE_SUPABASE_URL || '';
  const anonKey = env.VITE_SUPABASE_ANON_KEY || '';
  
  return {
    url,
    anonKey,
    isReady: Boolean(url && anonKey && url.startsWith('http') && !url.includes('placeholder'))
  };
}
