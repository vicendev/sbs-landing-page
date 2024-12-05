import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_AUTH } from "../../../constants";
import type { SupabaseBasicOptions } from "../../../interfaces/basic.options.interface";
import type { Industry } from "../../../../types/industry";

export class IndustryRepository {

  readonly name = SUPABASE_AUTH;
  private supabase: SupabaseClient;

  constructor(options: SupabaseBasicOptions) {

    this.supabase = createClient(
      options.supabaseUrl,
      options.supabaseKey,
    );
  }

  async getAllIndustriesByLanguage(lang: string = "es"): Promise<Industry[]> {

    const { data, error } = await this.supabase.from('table_industries').select().filter("language", 'eq', lang);

    return data as Industry[];
  }

}