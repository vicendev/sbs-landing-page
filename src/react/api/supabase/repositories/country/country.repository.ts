import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_AUTH } from "../../../constants";
import type { SupabaseBasicOptions } from "../../../interfaces/basic.options.interface";
import type { Country } from "../../../../types/country";

export class CountryRepository {

  readonly name = SUPABASE_AUTH;
  private supabase: SupabaseClient;

  constructor(options: SupabaseBasicOptions) {

    this.supabase = createClient(
      options.supabaseUrl,
      options.supabaseKey,
    );
  }

  async getAllCountries(): Promise<Country[]> {

    const { data, error } = await this.supabase.from('table_countries').select();

    return data as Country[];
  }

}