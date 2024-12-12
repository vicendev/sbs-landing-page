import type { ReactFormExtendedApi } from "@tanstack/react-form";
import type { Lead } from "../types/lead";
import { showSuccessModal } from "../components/ui/modals/SuccessModal";
import { LeadRepository } from "../api/supabase/repositories/leads/leads.repository";
import env from "astro:env/client";

type Props = {
  captchaToken: string | null;
  form: ReactFormExtendedApi<Lead, undefined>;
};

export const useLeadForm = ({ captchaToken, form }: Props) => {
  const leadRepository = new LeadRepository({
    supabaseUrl: env.PUBLIC_SUPABASE_URL,
    supabaseKey: env.PUBLIC_SUPABASE_KEY,
  });

  const handleSubmit = async (lead: Lead) => {
    try {
      if (!captchaToken) {
        return;
      }

      // Enviar el token al servidor para validación
      const response = await fetch(env.PUBLIC_FN_RECAPTCHA_CHECKER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.PUBLIC_SUPABASE_KEY}`,
        },
        body: JSON.stringify({ token: captchaToken }),
      });

      const result = await response.json();

      if (result.success) {
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
