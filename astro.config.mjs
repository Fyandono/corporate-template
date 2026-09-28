// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// Domain production klien. Dipakai untuk canonical, hreflang, sitemap, dan Open Graph.
const SITE_URL = process.env.SITE_URL ?? 'https://www.example.co.id';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: { '/': '/id' },
  // Shiki memakai inline style yang bertentangan dengan CSP; situs ini tidak menampilkan blok kode.
  markdown: { syntaxHighlight: false },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404') && page !== `${SITE_URL}/`,
      i18n: { defaultLocale: 'id', locales: { id: 'id-ID', en: 'en-US' } },
    }),
    react(),
  ],
  security: {
    // Astro menambahkan hash untuk setiap script & style yang dirender ke <meta http-equiv="Content-Security-Policy">.
    // Header yang tidak didukung di <meta> (mis. frame-ancestors) diatur di firebase.json.
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com",
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
        "font-src 'self'",
        "base-uri 'self'",
        "form-action 'none'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
      scriptDirective: {
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
    // Jangan inline aset kecil sebagai data: URI (melanggar CSP font-src 'self').
    build: { assetsInlineLimit: 0 },
  },
});
