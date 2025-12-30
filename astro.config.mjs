// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import icon from "astro-icon";

import node from '@astrojs/node';

export default defineConfig({
  site: 'https://geocited.com.br',
  integrations: [icon(), sitemap()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
  },
  adapter: node({
    mode: 'standalone',
  }),
});