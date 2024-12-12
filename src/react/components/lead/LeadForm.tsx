import { useForm } from "@tanstack/react-form";
import ReCAPTCHA from "react-google-recaptcha";

import type { Lead } from "../../types/lead";
import { Button } from "../ui/Button";
import { Validator } from "../../helpers/validators";
import { useCountries } from "../../hooks/useCountries";
import { useLeadForm } from "../../hooks/useLeadForm";
import { useEffect, useState } from "react";
import CountrySelector from "../ui/Selects/CountrySelect";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import IndustrySelector from "../ui/Selects/IndustrySelect";
import { useIndustries } from "../../hooks/useIndustries";

import { PUBLIC_SUPABASE_KEY } from "astro:env/client"

export const LeadForm = () => {
  let captcha: ReCAPTCHA | null;
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const { fetchAllCountries, countries } = useCountries();
  const { fetchAllIndustriesByLang, industries } = useIndustries();

  useEffect(() => {
    fetchAllCountries();
    fetchAllIndustriesByLang();
  }, []);

  const form = useForm<Lead>({
    onSubmit: async () => {},
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      phone: {
        dialingCode: "+56",
        iso_code: "CL",
        phoneNumber: "",
      },
      industry: 1,
      message: "",
    },
  });

  const canSubmit = form.useStore((state) => state.canSubmit);
  const isDirty = form.useStore((state) => state.isDirty);

  const { handleSubmit } = useLeadForm({ captchaToken, form });

  return (
    <>
      <form.Field
        name="name"
        validators={{
          onMount: ({ value }) => (value.length < 2 ? "Mount" : undefined),
          onChange: ({ value }) =>
            value.length < 2
              ? "Debe ingresar al menos 2 caracteres."
              : undefined,
        }}
      >
        {(field) => (
          <div className="my-4 relative flex-1">
            <label className="text-lg" htmlFor={field.name}>
              Nombre:{" "}
            </label>
            <input
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese su Nombre"
              id={field.name}
              name={field.name}
              value={field.state.value}
              type="text"
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors &&
              (field.state.meta.isTouched || field.state.meta.isDirty) && (
                <div className="w-80 absolute italic text-red-600" role="alert">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="lastname"
        validators={{
          onMount: ({ value }) => (value.length < 2 ? "Mount" : undefined),
          onChange: ({ value }) =>
            value.length < 2
              ? "Debe ingresar al menos 2 caracteres."
              : undefined,
        }}
      >
        {(field) => (
          <div className="my-4 relative flex-1">
            <label className="text-lg" htmlFor={field.name}>
              Apellido:{" "}
            </label>
            <input
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese su Apellido"
              id={field.name}
              name={field.name}
              value={field.state.value}
              type="text"
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors &&
              (field.state.meta.isTouched || field.state.meta.isDirty) && (
                <div className="w-80 absolute italic text-red-600" role="alert">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="email"
        validators={{
          onMount: ({ value }) => (value.length < 2 ? "Mount" : undefined),
          onChange: ({ value }) =>
            !Validator.emailFormat(value)
              ? "Debe ingresar un correo válido."
              : undefined,
        }}
      >
        {(field) => (
          <div className="my-4 relative flex-1">
            <label className="text-lg" htmlFor={field.name}>
              Correo Electrónico:{" "}
            </label>
            <input
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese su Correo Electrónico"
              id={field.name}
              name={field.name}
              value={field.state.value}
              type="text"
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors &&
              (field.state.meta.isTouched || field.state.meta.isDirty) && (
                <div className="w-80 absolute italic text-red-600" role="alert">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="phone"
        validators={{
          onMount: ({ value }) =>
            value.phoneNumber.length < 2 ? "Mount" : undefined,
          onChange: ({ value }) =>
            value.phoneNumber.length < 7
              ? "Debe ingresar un teléfono válido."
              : undefined,
        }}
      >
        {(field) => (
          <div className="my-4 relative flex-1">
            <label className="text-lg" htmlFor={field.name}>
              Teléfono:{" "}
            </label>
            <div className="grid grid-cols-4">
              <div className="col-span-1">
                {!countries.length ? (
                  <LoadingSpinner className="m-auto mt-2" />
                ) : (
                  <CountrySelector
                    className="w-full mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    countries={countries}
                    onChange={(selectedOption) => {
                      const option = selectedOption as any;
                      field.handleChange({
                        ...field.state.value,
                        dialingCode: option.value,
                        iso_code: countries.find(
                          (country) => country.dialing_code == option.value
                        )!.iso_code,
                      });
                    }}
                  />
                )}
              </div>
              <div className="col-span-3">
                <input
                  className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Ingrese su Teléfono"
                  id={field.name}
                  name={field.name}
                  value={field.state.value.phoneNumber}
                  type="text"
                  min={0}
                  onChange={(e) =>
                    field.handleChange({
                      ...field.state.value,
                      phoneNumber: Validator.positiveNumberFilter(
                        e.target.value
                      ),
                    })
                  }
                />
              </div>
            </div>

            {field.state.meta.errors &&
              (field.state.meta.isTouched || field.state.meta.isDirty) && (
                <div className="w-80 absolute italic text-red-600" role="alert">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
          </div>
        )}
      </form.Field>

      <form.Field name="industry">
        {(field) => (
          <div className="my-4 relative flex-1">
            <label className="text-lg" htmlFor={field.name}>
              Rubro:{" "}
            </label>
            {!countries.length ? (
              <LoadingSpinner className="m-auto mt-2" />
            ) : (
              <IndustrySelector
                className="w-full mt-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                industries={industries}
                onChange={(selectedOption) => {
                  const option = selectedOption as any;
                  const industry = industries.find(
                    (search) =>
                      search.name.toLowerCase() ===
                      String(option.value).toLocaleLowerCase()
                  )
                  field.handleChange(industry!.id);
                }}
              />
            )}
            {field.state.meta.errors &&
              (field.state.meta.isTouched || field.state.meta.isDirty) && (
                <div className="w-80 absolute italic text-red-600" role="alert">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="message"
        validators={{
          onMount: ({ value }) => (value.length < 2 ? "Mount" : undefined),
          onChange: ({ value }) =>
            value.length < 50
              ? "Debe ingresar al menos 50 caracteres."
              : undefined,
        }}
      >
        {(field) => (
          <div className="my-4 relative flex-1">
            <label className="text-lg" htmlFor={field.name}>
              Mensaje:{" "}
            </label>
            <textarea
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ingrese su Mensaje"
              id={field.name}
              name={field.name}
              value={field.state.value}
              rows={4}
              cols={50}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors &&
              (field.state.meta.isTouched || field.state.meta.isDirty) && (
                <div className="w-80 absolute italic text-red-600" role="alert">
                  {field.state.meta.errors.join(", ")}
                </div>
              )}
          </div>
        )}
      </form.Field>
      <div className="mt-8">
        <ReCAPTCHA
          ref={(e) => (captcha = e)}
          size="normal"
          sitekey={import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={handleCaptchaChange}
          type="image"
          onExpired={() => setCaptchaToken(null)}
        />
      </div>
      <div className="my-4 mt-6">
        <Button
          className="w-full"
          disabled={captchaToken == null || !canSubmit || !isDirty}
          onClick={async () => {
            captcha?.reset();
            handleSubmit(form.state.values);
          }}
        >
          Enviar
        </Button>
      </div>
    </>
  );
};
