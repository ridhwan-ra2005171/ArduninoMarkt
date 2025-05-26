import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
// Note: In production, these should be environment variables
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or anon key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);