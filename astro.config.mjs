// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import commonjs from 'vite-plugin-commonjs';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    plugins: [commonjs()],
    ssr: {
      noExternal: ['@supabase/supabase-js'],
    },
  },
  experimental: {
    env:{
      schema: {
        PUBLIC_SUPABASE_URL: envField.string({
          context: 'client',
          access: 'public'
        }),
        PUBLIC_SUPABASE_KEY: envField.string({
          context: 'client',
          access: 'public'
        }),
        PUBLIC_RECAPTCHA_SITE_KEY: envField.string({
          context: 'client',
          access: 'public'
        }),
        PUBLIC_FN_RECAPTCHA_CHECKER: envField.string({
          context: 'client',
          access: 'public'
        })
      }
    }
  }
});