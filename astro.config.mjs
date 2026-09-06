// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Custom domain served from the root; public/CNAME must match.
  site: 'https://poppleton.phd',
  vite: {
    plugins: [tailwindcss()]
  }
});