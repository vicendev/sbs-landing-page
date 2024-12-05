import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_AUTH } from "../../../constants";
import type { SupabaseBasicOptions } from "../../../interfaces/basic.options.interface";
import type { Lead } from "../../../../types/lead";

export class LeadRepository {
  readonly name = SUPABASE_AUTH;
  private supabase: SupabaseClient;

  constructor(options: SupabaseBasicOptions) {
    this.supabase = createClient(options.supabaseUrl, options.supabaseKey);
  }

  async insertLead(lead: Lead): Promise<void> {
    const { error } = await this.supabase
      .from("table_leads")
      .insert(
        {
          name: lead.name,
          lastname: lead.lastname,
          email: lead.email, 
          phone: `${lead.phone.dialingCode} ${lead.phone.phoneNumber}`,
          iso_code: lead.phone.iso_code,
          industry: lead.industry,
          message: lead.message
        }
      );

    if (error) throw new Error("Error adding lead")

  }
}
