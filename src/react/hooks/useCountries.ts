import { useState } from "react"
import { CountryRepository } from "../api/supabase/repositories/country/country.repository"
import type { Country } from "../types/country"


export const useCountries = () => {

  const [countries, setCountries] = useState<Country[]>([])

  const contryRepository = new CountryRepository(
    {
      supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
      supabaseKey: import.meta.env.PUBLIC_SUPABASE_KEY
    }
  )

  const fetchAllCountries = async () => {
    const response = await contryRepository.getAllCountries();
    setCountries(response);
  }
  

  return {
    // Methods
    fetchAllCountries,

    // Props
    countries,
  }
}