# Catálogo digital · versión PALEX y versión neutra (white label)

Un único sistema de catálogo con dos identidades. Mismos datos, componentes, buscador,
filtros, fichas, imágenes y animaciones; cambian marca, logo, colores, tipografía,
contacto, SEO, favicon y composición.

## URLs

| Versión | URL | Uso |
|---|---|---|
| PALEX | `/catalogo/palex/` | Clientes a los que se presenta la marca |
| Neutra | `/catalogo/neutro/` (alias `/catalogo/white-label/`) | Clientes sin marca |
| Imprimible | `/catalogo/<versión>/imprimir/` | Imprimir o guardar como PDF (A4) |

Estructura de cada versión: portada → `/<categoría>/` → `/<categoría>/<servicio>/` · `/contacto/`.

## Dónde se cambia cada cosa

- **Identidad de cada versión** → `src/data/catalog/config.ts` (`catalogConfig`):
  `brandName`, `logo`, colores, tipografías, `contactEmail`, teléfonos, dirección,
  `socialLinks`, `showBranding`, SEO, favicon, valores de portada y composición.
- **Contenido** (categorías y fichas) → `src/data/catalog/content.ts`. Es común a las dos
  versiones. Lo que solo debe verse con marca va en el campo `palex` de cada ficha.
- **Fotografías** → `src/data/images.ts` (todas ilustrativas; revisión en `/revision-imagenes/`).
- **Estilos** → `src/styles/catalog.css` (tema `corporate` = PALEX, `editorial` = neutro, e impresión A4).

## Variables de entorno (`.env` o panel de Vercel/Netlify)

| Variable | Qué hace |
|---|---|
| `PUBLIC_CONTACT_EMAIL` | `CONTACT_EMAIL` de la versión neutra. Vacía = `[PENDIENTE DE CONFIRMAR]` |
| `PUBLIC_PALEX_CONTACT_EMAIL` | Sustituye el email de la versión PALEX |
| `PUBLIC_CATALOGS` | `palex,neutro` (por defecto) o `neutro` para publicar solo el white label en otro dominio |

## Logotipo oficial de PALEX

Ahora se usa un wordmark tipográfico provisional. Para el logo oficial: copiar el SVG en
`public/catalogo/palex-logo.svg` y poner `logo: '/catalogo/palex-logo.svg'` en la versión PALEX.
Los colores PALEX están marcados como `[CONFIRMAR]` con el manual de marca.

## Garantía de la versión neutra

El HTML, CSS y JS que carga la versión neutra no contienen ninguna referencia a la marca
(ni nombre, ni logo, ni contacto, ni productos propios, ni la ruta de la otra versión).
Comprobación rápida tras compilar:

```bash
npm run build && grep -ril "palex" dist/catalogo/neutro   # no debe devolver nada
```

Para un white label total (que nadie pueda llegar a la versión PALEX desde el mismo dominio),
publicar un segundo despliegue con `PUBLIC_CATALOGS=neutro` en un dominio propio.

## Cambio de versión (uso interno)

Invisible para el cliente. Abrir cualquier página de la versión PALEX con `?interno=1`:
aparece abajo a la izquierda un selector PALEX / NEUTRO que lleva a la página equivalente.
Se desactiva con `?interno=0`.

## PDF

`/catalogo/<versión>/imprimir/` → botón «Imprimir / Guardar PDF» (A4: portada a sangre,
índice, portada de cada categoría y una ficha por página). También se puede automatizar:

```js
await page.goto('https://…/catalogo/neutro/imprimir/');
await page.pdf({ path: 'catalogo-neutro.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
```
