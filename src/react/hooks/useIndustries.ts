import { useState } from "react"
import type { Industry } from "../types/industry"
import { IndustryRepository } from "../api/supabase/repositories/industry/industry.repository"


export const useIndustries = () => {

  const [industries, setIndustries] = useState<Industry[]>([])

  const industryRepository = new IndustryRepository(
    {
      supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
      supabaseKey: import.meta.env.PUBLIC_SUPABASE_KEY
    }
  )

  const fetchAllIndustriesByLang = async () => {
    const response = await industryRepository.getAllIndustriesByLanguage();
    setIndustries(response);
  }
  

  return {
    // Methods
    fetchAllIndustriesByLang,

    // Props
    industries,
  }
}