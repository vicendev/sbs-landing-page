import { type SupabaseClientOptions } from "@supabase/supabase-js";

export interface SupabaseAuthStrategyOptions {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions<'public'>;
}