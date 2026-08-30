/**
 * Safe Supabase End-to-End Connection Diagnostic Utility
 * 
 * Tests API connectivity, authentication endpoints, and table schemas
 * without exposing environment variables, secrets, or keys.
 */

import { supabase, isSupabaseConnected } from './client';

export interface SupabaseDiagnosticReport {
  configurationStatus: 'CONFIGURED' | 'NOT_CONFIGURED';
  apiConnectivity: 'CONNECTED' | 'FAILED' | 'UNCONFIGURED';
  databaseConnectivity: 'CONNECTED' | 'TABLES_MISSING' | 'FAILED' | 'UNCONFIGURED';
  authConnectivity: 'CONNECTED' | 'FAILED' | 'UNCONFIGURED';
  details: {
    existingTables: string[];
    missingTables: string[];
    sampleReadSuccessful: boolean;
    sampleTableName?: string;
    errorMessage?: string;
  };
}

export const EXPECTED_SCHEMA_TABLES = [
  'profiles',
  'career_interests',
  'skills',
  'user_skills',
  'internship_categories',
  'internships',
  'internship_modules',
  'tasks',
  'user_internships',
  'task_progress',
  'project_submissions',
  'project_feedback',
  'certificates'
];

/**
 * Executes a non-destructive diagnostic check against the Supabase backend.
 */
export async function runSupabaseDiagnostics(): Promise<SupabaseDiagnosticReport> {
  if (!isSupabaseConnected()) {
    return {
      configurationStatus: 'NOT_CONFIGURED',
      apiConnectivity: 'UNCONFIGURED',
      databaseConnectivity: 'UNCONFIGURED',
      authConnectivity: 'UNCONFIGURED',
      details: {
        existingTables: [],
        missingTables: EXPECTED_SCHEMA_TABLES,
        sampleReadSuccessful: false,
        errorMessage: 'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set or contains placeholder values.'
      }
    };
  }

  let authConnected = false;
  let apiConnected = false;
  let sampleReadSuccessful = false;
  let sampleTableName = '';
  const existingTables: string[] = [];
  const missingTables: string[] = [];
  let diagnosticError: string | undefined;

  // 1. Check Auth service connectivity
  try {
    const { error: authError } = await supabase.auth.getSession();
    if (!authError) {
      authConnected = true;
      apiConnected = true;
    } else {
      diagnosticError = `Auth verification returned: ${authError.message}`;
    }
  } catch (err: any) {
    diagnosticError = `Auth service exception: ${err.message || err}`;
  }

  // 2. Check Database Tables
  for (const table of EXPECTED_SCHEMA_TABLES) {
    try {
      const { data, error } = await supabase.from(table).select('*').limit(1);
      if (error) {
        if (error.code === '42P01' || error.message.includes('schema cache') || error.message.includes('relation') || error.message.includes('find the table')) {
          missingTables.push(table);
        } else {
          // Table exists but maybe empty or RLS policy restricts reading rows (which confirms table exists)
          existingTables.push(table);
        }
      } else {
        existingTables.push(table);
        if (!sampleReadSuccessful && Array.isArray(data)) {
          sampleReadSuccessful = true;
          sampleTableName = table;
        }
      }
    } catch (err: any) {
      missingTables.push(table);
    }
  }

  let dbStatus: 'CONNECTED' | 'TABLES_MISSING' | 'FAILED' = 'CONNECTED';
  if (missingTables.length > 0) {
    dbStatus = 'TABLES_MISSING';
  } else if (!apiConnected && existingTables.length === 0) {
    dbStatus = 'FAILED';
  }

  return {
    configurationStatus: 'CONFIGURED',
    apiConnectivity: apiConnected ? 'CONNECTED' : 'FAILED',
    databaseConnectivity: dbStatus,
    authConnectivity: authConnected ? 'CONNECTED' : 'FAILED',
    details: {
      existingTables,
      missingTables,
      sampleReadSuccessful,
      sampleTableName: sampleTableName || undefined,
      errorMessage: diagnosticError
    }
  };
}
