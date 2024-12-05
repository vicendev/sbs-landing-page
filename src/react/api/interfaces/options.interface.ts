import { type SupabaseClientOptions } from "@supabase/supabase-js";
import { type JwtFromRequestFunction } from "passport-jwt";

export interface SupabaseAuthStrategyOptions {
  supabaseUrl: string;
  supabaseKey: string;
  supabaseOptions: SupabaseClientOptions<'public'>;
  extractor: JwtFromRequestFunction;
}