/**
 * Supabase Client Initialization & Security Layer
 * 
 * Safely initializes the Supabase client using environment variables.
 * Provides fallback detection and handles auth token storage securely.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

// Environment variables detection
function getEnvConfig() {
  let supabaseUrl = '';
  let supabaseAnonKey = '';

  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
      supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';
    }
  } catch (e) {
    // import.meta may not be available in Node context
  }

  if (!supabaseUrl && typeof process !== 'undefined' && process.env) {
    supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
  }

  const isConfigured = Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('MY_SUPABASE_URL')
  );

  return {
    supabaseUrl,
    supabaseAnonKey,
    isConfigured
  };
}

const envConfig = getEnvConfig();

// Create the Supabase client
// When unconfigured, provide a valid client instance pointing to localhost/dummy so initialization never throws
export const supabase: SupabaseClient<Database> = createClient<Database>(
  envConfig.isConfigured ? envConfig.supabaseUrl : 'https://placeholder.supabase.co',
  envConfig.isConfigured ? envConfig.supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'internlab_supabase_auth_token'
    }
  }
);

/**
 * Check if the application is connected to a live Supabase backend
 */
export function isSupabaseConnected(): boolean {
  return envConfig.isConfigured;
}

export function getSupabaseEndpoint(): string {
  return envConfig.supabaseUrl || 'https://placeholder.supabase.co';
}
