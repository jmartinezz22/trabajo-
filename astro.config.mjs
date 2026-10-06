// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// [CONFIRMAR] Dominio definitivo. Se usa para canonical, Open Graph y sitemap.
const SITE_URL = process.env.SITE_URL ?? 'https://www.soluciones-logisticas.example';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    sitemap({
      // Excluye páginas noindex (404 y legales)
      filter: (page) => !/\/(404|aviso-legal|politica-de-privacidad|politica-de-cookies|revision-imagenes)\/?$/.test(page),
      i18n: undefined,
    }),
  ],
});
