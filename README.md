# PALEX MEDICAL · Web corporativa de soluciones logísticas

Web B2B estática construida con **Astro 5 + TypeScript + CSS propio**. Tema oscuro (negro, grafito y dorado‑cobre), titulares en Fraunces (serif) y texto en Manrope. Cero dependencias de UI,
≈1 KB de JavaScript (gzip), diseño editorial sin dependencias de UI y HTML pre‑renderizado para SEO y Core Web Vitals.

- Estrategia, investigación y arquitectura: [`docs/01-investigacion-y-estrategia.md`](docs/01-investigacion-y-estrategia.md)
- Test, auditoría y **lista de datos pendientes**: [`docs/02-auditoria-y-pendientes.md`](docs/02-auditoria-y-pendientes.md)
- **Registro de datos** (verificado / en validación / no encontrado): [`docs/03-registro-de-datos.md`](docs/03-registro-de-datos.md)
- **Rediseño visual v3** (auditoría, referencias, sistema visual y fotografía): [`docs/04-rediseno-visual.md`](docs/04-rediseno-visual.md)

## Puesta en marcha

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # comprobación de tipos + build estático en /dist
npm run preview   # sirve /dist
npm run images    # descarga y optimiza la fotografía (AVIF/WebP) — ejecutar antes de publicar
```

Variables de entorno (copiar `.env.example` a `.env`):

| Variable | Uso |
|---|---|
| `SITE_URL` | Dominio definitivo (canonical, Open Graph, sitemap, robots) |
| `PUBLIC_FORM_ENDPOINT` | URL que recibe el formulario por `POST` JSON (Formspree, HubSpot, CRM, función serverless) |

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Datos de empresa, contacto, **horarios** y ubicaciones | `src/data/site.ts` |
| Servicios (genera `/servicios/<slug>/` automáticamente) | `src/data/services.ts` |
| Sectores | `src/data/sectors.ts` |
| Tecnología | `src/data/technology.ts` |
| Proyectos / casos | `src/data/cases.ts` |
| Certificaciones y evidencias (estado de cada dato) | `src/data/trust.ts` |
| Menús, proceso y cadena de valor | `src/data/navigation.ts` |
| Fotografía | `src/data/images.ts` + `public/images/` (`npm run images`) |
| Colores, tipografía, espaciado | `src/styles/tokens.css` |
| Logo | `src/components/Logo.astro` |
| Iconos | `src/data/icons.ts` |

### Fotografía
Registro central en `src/data/images.ts`: fotos de Unsplash (licencia libre de uso comercial)
usadas como **imágenes de contexto**, nunca como instalaciones propias.

1. **Antes de publicar**, ejecutar `npm run images` en un equipo con acceso a Internet: descarga cada
   foto, genera AVIF/WebP en 4 anchos en `public/images/` y escribe `src/data/images.local.json`.
   Desde ese momento la web sirve las imágenes en local (sin depender de Unsplash).
2. **Fotografía real de PALEX:** guardar el original como `public/images/source/<slot>.jpg`
   (p. ej. `hero.jpg`), ejecutar `npm run images` y poner `contextual: false` en el slot.

### Regla de contenido
No se publica ningún dato no confirmado (clientes, cifras, certificaciones, cobertura…).
Los huecos se muestran con el marcador visible `[DATOS PENDIENTES DE CONFIRMAR]`.

## Estructura

```
src/
  components/   Header, Footer, Logo, Visual, PageHero, ServiceCard, FlowSteps,
                ItemGrid, SectorGrid, TechGrid, CaseCard, CtaBand, Faq, ContactForm…
  data/         Contenido tipado (único lugar para editar textos)
  layouts/      BaseLayout (SEO, Open Graph, Schema.org), LegalLayout
  pages/        Home, servicios/[slug], sectores, soluciones-a-medida, tecnologia,
                proyectos, sostenibilidad, contacto, legales, 404, robots.txt
  scripts/      main.ts (menú, revelado al scroll, parallax, CTA fijo)
  styles/       tokens.css, global.css
```

SEO incluido: title/description por página, canonical, Open Graph/Twitter, Schema.org
(Organization, WebSite, BreadcrumbList, Service, FAQPage, ContactPage), `sitemap-index.xml`
y `robots.txt` generados en el build.
