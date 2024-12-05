// @ts-check
import { defineConfig } from 'astro/config';

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
});