/// <reference path="../.astro/types.d.ts" />

interface SupabaseMetaEnv {
  readonly PUBLIC_SUPABASE_URL      : string;
  readonly PUBLIC_SUPABASE_KEY      : string;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
}
