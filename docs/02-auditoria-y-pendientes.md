# PALEX MEDICAL · Web logística
## Fases 7–8: Test, auditoría final y lista de pendientes

---

## 0. Resultados de test del rediseño v3

| Prueba | Resultado |
|---|---|
| `astro check` + build | 0 errores · 0 avisos · 20 páginas |
| 20 páginas × 3 viewports (1440 / 820 / 390 px) | Sin errores JS · sin scroll horizontal |
| axe-core WCAG 2 A/AA + buenas prácticas, 14 páginas × escritorio y móvil | Sin incidencias |
| Menú móvil, mega‑menú, CTA fijo, formulario (validación y preselección) | OK |
| Peso de la Home (gzip) | HTML ≈ 12 KB · CSS ≈ 5 KB · JS ≈ 1 KB (+ fotografía) |

Corregido durante el test: desbordamiento del proceso de 7 fases (Eventos), contraste de grises
secundarios y del color de pendientes, texto alternativo visible si una foto no carga, salto de
encabezados en Sostenibilidad.

**Pendiente de verificación visual:** las fotografías no se pudieron cargar en el entorno de
desarrollo (acceso a Unsplash bloqueado). Revisar la selección en el navegador y ejecutar
`npm run images` antes de publicar.

## 1. Resultados de test de la versión inicial (fase 7)

| Prueba | Resultado |
|---|---|
| `astro check` (TypeScript + plantillas) | 0 errores · 0 avisos |
| Build de producción | 18 páginas estáticas generadas |
| 18 páginas × 3 viewports (1440 / 820 / 390 px) | Sin errores JS · sin scroll horizontal |
| Menú móvil (abrir, cerrar con Esc, foco) | OK |
| Mega‑menú de servicios (hover y teclado vía `:focus-within`) | OK |
| CTA fijo móvil (aparece tras el hero, se oculta al final y en /contacto/) | OK |
| Formulario: validación, foco en primer error, email inválido, consentimiento, honeypot | OK |
| Preselección de servicio vía `/contacto/?servicio=<slug>` | OK |
| Auditoría axe-core (WCAG 2 A/AA + buenas prácticas) en 5 páginas clave | Sin incidencias tras correcciones |
| `prefers-reduced-motion` | Desactiva apariciones, parallax, dibujado de líneas y animaciones |
| Sin JavaScript | Todo el contenido visible y navegable (menú móvil enlaza al pie) |

**Peso de la Home (gzip):** HTML ≈ 12 KB · CSS ≈ 5 KB · JS ≈ 1 KB · 0 imágenes de mapa de bits.
LCP = titular de texto → candidato a puntuaciones altas en Core Web Vitals.

Errores encontrados y corregidos durante el test:
1. Un error de inicialización (variable usada antes de declararse) bloqueaba el menú móvil
   cuando el usuario no tenía activado "reducir movimiento".
2. `backdrop-filter` del header encogía el panel del menú móvil a la altura del header.
3. Etiqueta `aria-label` en un elemento sin rol (logo) y salto de nivel de encabezado en Sectores.
4. Etiquetas del gráfico del hero recortadas en algunos formatos.

## 2. Auditoría como cliente potencial (fase 8)

Recorrido simulado: *director/a de operaciones de un laboratorio que necesita distribuir
producto refrigerado y externalizar parte de su almacén.*

| Pregunta del cliente | ¿La web responde? | Dónde |
|---|---|---|
| ¿Qué hacen? | Sí, en < 5 s | H1 + subclaim + índice de 6 servicios dentro del propio hero |
| ¿Pueden resolver mi problema? | Sí | Transporte (refrigerado/temperatura controlada), Logística, Sectores › Pharma |
| ¿Hacen algo más que transportar? | Sí, es el mensaje central | Bloque "Una solución. Todas las fases", consultoría, soluciones a medida |
| ¿Cómo contacto? | Sí, en 1 clic desde cualquier punto | Botón fijo en header, CTA móvil fijo, CTA al final de cada página |
| ¿Puedo confiar? | **Sí, con pruebas** | +25 años en logística hospitalaria, caso real de 176 almacenes, soluciones propias RFID, teléfonos y sedes reales. Pendiente: certificaciones validadas y fotos reales |

**Fortalezas**
- Posicionamiento claro de *partner* logístico, no de transportista.
- Arquitectura Servicios × Sectores, estándar del sector y fácil de escanear.
- Formulario cualificador (origen, destino, mercancía, necesidades) → leads de calidad.
- Diseño editorial sobrio, coherente y rápido; sin estética de plantilla.
- Honestidad: ningún dato inventado; todo lo no confirmado es visible como pendiente.

**Debilidades a resolver antes de publicar (por impacto comercial)**
1. **Datos de contacto** (teléfono, email, dirección, LinkedIn): sin ellos la web pierde credibilidad.
2. **Fotografía real** de operación, equipo, flota o instalaciones propias.
3. **Casos reales** (aunque sean anonimizados) con resultado cualitativo verificable.
4. **Certificaciones** aplicables (p. ej. GDP para transporte sanitario, ISO) si existen.
5. **Cobertura geográfica** y capacidades (superficie, tipos de vehículo) si se pueden publicar.
6. **Endpoint del formulario** conectado al CRM o al email comercial.
7. Confirmar si la actividad pertenece a Palex Medical, S.A. o a otra entidad (ver doc. 01, apartado 0).

## 3. Lista de pendientes para PALEX MEDICAL

> Actualizado con la investigación adicional. Detalle por estado (verificado / en validación /
> no encontrado) en [`03-registro-de-datos.md`](03-registro-de-datos.md).

| Dato | Archivo | Estado |
|---|---|---|
| Razón social, sede, teléfonos, almacén central | `src/data/site.ts` | ✅ Verificado y publicado |
| CIF | `src/data/site.ts` | [CONFIRMAR] |
| Email, LinkedIn, horario | `src/data/site.ts` | No encontrado |
| Dominio definitivo / endpoint del formulario | `.env` | [CONFIRMAR] |
| Logo oficial (SVG), colores y tipografía exactos | `Logo.astro`, `tokens.css` | [SUSTITUIR] / [CONFIRMAR] |
| Fotografías reales | `public/images/` + `src/data/images.ts` | Pendiente |
| ISO 9001, ISO 14001, ISO 37001, UNE 19601 | `src/data/trust.ts` | En validación (alcance, entidad, vigencia, sociedad, n.º) |
| Certificación GDP | `src/data/trust.ts` | [CONFIRMAR CERTIFICACIÓN GDP] |
| URL de las fuentes del caso Sant Joan de Déu y de ShockWatch | `FeaturedCase.astro`, doc. 03 | [AÑADIR ENLACE] |
| Cifras de proyectos (8 centros SAP, 1,5 M€, 12.000 palets) | doc. 03 | En validación — no publicadas |
| Fichas de proyectos de optimización | `src/data/cases.ts` | En validación |
| Alcance del servicio SAP para terceros | `technology.ts`, `services.ts` | [PENDIENTE DE VALIDACIÓN COMERCIAL] |
| Integración con terceros y portal de seguimiento | `src/data/technology.ts` | [CONFIRMAR TECNOLOGÍA] |
| Cobertura, flota, superficie, seguros, tipologías de excedentes | `src/data/services.ts` | [DATOS PENDIENTES DE CONFIRMAR] |
| Indicadores ambientales | `src/pages/sostenibilidad.astro` | [DATOS PENDIENTES DE CONFIRMAR] |
| Textos legales | `src/pages/*.astro` | Plantilla con datos verificados; revisión jurídica |

## 4. Siguientes pasos recomendados

1. Completar `src/data/site.ts` y `.env` → publicar en un hosting estático (Netlify, Vercel,
   Cloudflare Pages o servidor propio con Nginx).
2. Sesión fotográfica de la operación real (3–4 escenas: muelle, preparación, transporte, equipo).
3. Alta en Google Search Console y envío de `sitemap-index.xml`.
4. Si se añade analítica: banner de consentimiento de cookies y actualizar la política.
5. Autoalojar las fuentes (o las corporativas) para eliminar la dependencia de Google Fonts.
6. Fase 2 de contenidos: una página por sector y artículos sobre logística a temperatura
   controlada, fulfillment y logística de eventos (captación SEO long‑tail).
