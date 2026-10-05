# PALEX MEDICAL · Web corporativa de soluciones logísticas

Web B2B estática construida con **Astro 5 + TypeScript + CSS propio**. Cero dependencias de UI,
≈1 KB de JavaScript (gzip) y HTML pre‑renderizado para SEO y Core Web Vitals.

- Estrategia, investigación y arquitectura: [`docs/01-investigacion-y-estrategia.md`](docs/01-investigacion-y-estrategia.md)
- Test, auditoría y **lista de datos pendientes**: [`docs/02-auditoria-y-pendientes.md`](docs/02-auditoria-y-pendientes.md)
- **Registro de datos** (verificado / en validación / no encontrado): [`docs/03-registro-de-datos.md`](docs/03-registro-de-datos.md)

## Puesta en marcha

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # comprobación de tipos + build estático en /dist
npm run preview   # sirve /dist
```

Variables de entorno (copiar `.env.example` a `.env`):

| Variable | Uso |
|---|---|
| `SITE_URL` | Dominio definitivo (canonical, Open Graph, sitemap, robots) |
| `PUBLIC_FORM_ENDPOINT` | URL que recibe el formulario por `POST` JSON (Formspree, HubSpot, CRM, función serverless) |

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Datos de empresa y contacto | `src/data/site.ts` |
| Servicios (genera `/servicios/<slug>/` automáticamente) | `src/data/services.ts` |
| Sectores | `src/data/sectors.ts` |
| Tecnología | `src/data/technology.ts` |
| Proyectos / casos | `src/data/cases.ts` |
| Certificaciones y evidencias (estado de cada dato) | `src/data/trust.ts` |
| Menús, proceso y cadena de valor | `src/data/navigation.ts` |
| Imágenes | `src/data/images.ts` + `public/images/` |
| Colores, tipografía, espaciado | `src/styles/tokens.css` |
| Logo | `src/components/Logo.astro` |
| Iconos | `src/data/icons.ts` |

### Sustituir imágenes
Mientras un slot de `src/data/images.ts` tenga `src: null`, se muestra una composición gráfica
técnica (no fotos de stock, para no sugerir instalaciones no confirmadas). Para usar una foto:
copiarla a `public/images/`, rellenar `src`, `width`, `height` y `alt`; si es conceptual y no
propia, añadir `contextual: true` y se etiquetará como "Imagen de contexto".

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
