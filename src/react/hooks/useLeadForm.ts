import type { ReactFormExtendedApi } from "@tanstack/react-form";
import type { Lead } from "../types/lead";
import { showSuccessModal } from "../components/ui/modals/SuccessModal";
import { LeadRepository } from "../api/supabase/repositories/leads/leads.repository";

type Props = {
  captchaToken: string | null;
  form: ReactFormExtendedApi<Lead, undefined>;
};

export const useLeadForm = ({ captchaToken, form }: Props) => {
  const leadRepository = new LeadRepository({
    supabaseUrl: import.meta.env.PUBLIC_SUPABASE_URL,
    supabaseKey: import.meta.env.PUBLIC_SUPABASE_KEY,
  });

  const handleSubmit = async (lead: Lead) => {
    try {
      if (!captchaToken) {
        return;
      }

      // Enviar el token al servidor para validación
      const response = await fetch("http://localhost:8000/validate-recaptcha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: captchaToken }),
      });

      const result = await response.json();

      if (result.success) {
        console.log(import.meta.env.PUBLIC_SUPABASE_URL)
        console.log(import.meta.env.PUBLIC_SUPABASE_KEY)
        await leadRepository.insertLead(lead);

        form.reset();
        showSuccessModal();
      } else {
        alert("Error en la validación de reCAPTCHA.");
        console.error("Detalles:", result);
      }
    } catch (exception) {
      console.error("An unexpected exception occurred", exception);
    }
  };

  return {
    handleSubmit,
  };
};
