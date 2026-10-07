# PALEX MEDICAL · Rediseño visual (v3)

## 1. Auditoría de la versión anterior

**Pregunta de control:** *"Si fuera director de logística de una farmacéutica y entrara aquí,
¿me transmitiría confianza para confiarle una operación importante?"*

**Respuesta: NO.** El contenido era correcto, pero la forma lo contradecía.

| Problema | Por qué resta confianza | Causa concreta en v2 |
|---|---|---|
| Aspecto SaaS / dashboard | Sugiere startup de software, no operador con operaciones reales | Gráfica abstracta en el hero, tipografía monoespaciada, etiquetas "FIG. 01", rejillas punteadas |
| Exceso de tarjetas y bordes | Fragmenta la lectura; nada parece importante | ItemGrid, SectorGrid, TechGrid, CertList, CaseCard: todo en cajas de 1 px |
| Muchos elementos pequeños por pantalla | El ojo no sabe dónde ir; parece una plantilla | Índice de servicios dentro del hero, iconos en cada bloque, chips |
| Sin fotografía | No hay sensación de escala ni de operación física | Composiciones SVG en lugar de imágenes |
| Color verde por todas partes | Resta elegancia y jerarquía | Eyebrows, números, iconos, líneas, chips en verde |
| Jerarquía tipográfica plana | Titulares medianos y textos densos compiten | H2 de tamaño similar en todas las secciones; texto dentro de cajas |
| Marcadores de pendiente omnipresentes | Parece un borrador | Cajas naranjas en pie, tarjetas y tecnología |

## 2. Lectura de las referencias (sin copiar)

DHL Supply Chain, GXO, CEVA, DSV, Rhenus, Kuehne+Nagel, Movianto, Logista Pharma y consultoras premium.
Patrones comunes:

| Criterio | Patrón observado | Aplicación a PALEX |
|---|---|---|
| Elementos por pantalla | 1 idea por pantalla: un titular, un párrafo corto, un CTA | Cada sección tiene un solo mensaje |
| Fotografía | Gran formato, a sangre, operación real (almacén, camión, personas trabajando), tonos sobrios | Hero a pantalla completa y fotos de 50–100 % del ancho |
| Tipografía | Sans-serif corporativa, titulares muy grandes, peso medio, interlineado ajustado | Inter Tight 500, H1 de hasta 112 px, sin monoespaciada |
| Espacio en blanco | Secciones de 120–200 px de separación | `--section-y` hasta 13 rem |
| Composición | Asimétrica: texto 5/12 + imagen 7/12; listas a todo ancho con líneas finas | Rejillas 5/7, listas editoriales con hairlines |
| Navegación | Logo + 5–7 entradas + 1 CTA; cabecera transparente sobre la foto | Cabecera superpuesta al hero que se vuelve sólida al hacer scroll |
| CTAs | Uno principal por sección, verbo claro | "Solicitar una solución" / "Ver proyecto" |
| Color | Neutros + 1 acento corporativo en CTA y detalles | Verde Palex solo en botones, enlaces, indicadores y puntos |
| Tarjetas | Pocas; solo para contenido navegable con imagen | Eliminadas casi por completo |
| Estructura | Hero → propuesta → cifras → servicios → caso → tecnología → sectores → confianza → CTA | Ver §3 |

## 3. Nueva estructura de la Home

1. **Hero**: fotografía a pantalla completa + titular grande + 2 CTA. Nada más.
2. **Declaración**: "Más que transporte. Diseñamos soluciones logísticas." + Transporte / Logística / Tecnología / Consultoría.
3. **Cifras verificadas**: +25 años · 176 almacenes · SAP HANA / EWM.
4. **Capacidad**: fotografía grande + explicación de lo que combinamos.
5. **Servicios** en franjas horizontales; al pasar el ratón cambia la imagen, aparece la descripción y la flecha.
6. **Caso real Hospital Sant Joan de Déu**: composición editorial a doble columna + "Ver proyecto" (página propia).
7. **Tecnología**: SAP HANA · SAP EWM · RFID · Automatización · Trazabilidad, en tipografía grande.
8. **Servicios especiales**: fotografía a sangre de gran impacto.
9. **Sectores**: lista editorial a dos columnas.
10. **Proceso**: línea horizontal con 01–05 y un verbo.
11. **Calidad y cumplimiento**: sección de confianza (GDP no se muestra).
12. **CTA final**: fondo oscuro, titular enorme, un botón y el teléfono verificado.

## 4. Sistema visual

- **Color:** off-white `#F4F3EF`, tinta `#0A141C`, grises cálidos; verde Palex `#00A886` solo como acento.
- **Tipografía:** Inter Tight 500 (titulares), Inter 400/500 (texto). Se elimina la monoespaciada.
- **Forma:** sin cajas; líneas de 1 px como divisores; radios 0–2 px.
- **Iconos:** eliminados salvo los funcionales (flecha, teléfono, menú).
- **Movimiento:** fade + desplazamiento de 24 px, zoom de imagen de 1,04 en hover, líneas que se dibujan, números que entran. Todo desactivado con `prefers-reduced-motion`.

## 5. Fotografía

Fotografías de Unsplash (licencia libre para uso comercial), elegidas por su descripción:
almacén, transporte, embalaje, hospital, automatización y arquitectura, sin poses ni sonrisas a cámara.

- Se usan como **imágenes de contexto**: ninguna se presenta como instalación propia, y la del caso
  hospitalario lleva la etiqueta "Imagen ilustrativa".
- Registro central: `src/data/images.ts` (id, autor, texto alternativo, encuadre).
- **Producción:** `npm run images` descarga cada foto y genera versiones AVIF/WebP optimizadas en
  `public/images/`. A partir de ahí la web sirve las imágenes en local, sin depender de Unsplash.
- **Sustituir por fotos reales de PALEX:** dejar el archivo en `public/images/<slot>.jpg`,
  ejecutar `npm run images` y cambiar `contextual` a `false`.

> Limitación del entorno de desarrollo: el acceso a bancos de imágenes está bloqueado, por lo que
> las fotos no se han podido revisar visualmente aquí. Validar la selección en el navegador antes de publicar.

---

# v4 · Dirección oscura: negro, grafito y dorado‑cobre

Por petición expresa se cambia la dirección visual (se mantiene toda la estructura, el contenido
y las reglas de datos verificados):

| Elemento | Decisión |
|---|---|
| Paleta | Negro `#070708` / `#0d0d0f`, grafitos `#141417` y `#1a1b1e`, marfil `#f2ede4` para titulares; acento **dorado‑cobre** `#c9a066` (hover `#dcb984`, cobre profundo `#9a6b3c`) solo en CTA, enlaces, indicadores y cursivas |
| Tipografía | **Fraunces** (serif variable con ejes de óptica y suavidad) en titulares, con *cursiva dorada* como acento; **Manrope** (sans) en texto e interfaz |
| Textura | Grano muy sutil sobre el negro para evitar un fondo plano "digital" |
| Animación | Aparición con subida, entrada lateral, titulares que se descubren (máscara), imágenes que se asientan, parallax, barrido de luz en botones y barra dorada de progreso de lectura. Todo desactivado con `prefers-reduced-motion` |
| Fotografía | Tratamiento cálido y desaturado para integrarse con el negro |
| **Horario visual** | Línea de tiempo semanal 06–22 h por sede, día actual resaltado, línea de "ahora" en hora de Madrid y estado *Abierto ahora / Cerrado · abre…* en vivo. Sin datos confirmados muestra `[HORARIO PENDIENTE DE CONFIRMAR]` (no se inventa). Se rellena en `src/data/site.ts → locations[].hours` |
| **Ubicación** | Pestañas Sede central / Almacén central, dirección destacada, teléfono, "Cómo llegar" (Google Maps) y mapa: vista ligera con chincheta animada; Google Maps se carga **solo al pulsar** (privacidad y rendimiento), con estilo oscuro |
| Identidad | El dorado sustituye al verde Palex por decisión de diseño. Para volver a la identidad corporativa basta con cambiar `--accent` en `src/styles/tokens.css` |

Archivos principales: `src/styles/tokens.css`, `src/styles/global.css`, `src/scripts/main.ts`,
`src/components/VisitSection.astro` (HTML + CSS + JS del horario y el mapa).

---

# v5 · Refinamiento visual profesional

## Auditoría previa (estado v4)

| Problema detectado | Impacto | Corrección v5 |
|---|---|---|
| Fotografía de palets/cajas poco cuidada y otras elegidas sin verificar | Transmite desorden: lo contrario de precisión y control | Sustituidas **todas** las fotos dudosas; criterio estricto (moderno, limpio, ordenado, licencia gratuita, sin renders 3D ni IA); página de revisión `/revision-imagenes/` |
| Paleta dorada ajena a la marca | Rompe la identidad PALEX | Vuelta a blanco / negro / petróleo con verde PALEX solo como acento |
| Portada estática | Poco memorable | Portada narrativa con scroll + introducción de entrada opcional |
| Fotos "dentro" de bloques | La imagen no forma parte del diseño | Franjas fotográficas a sangre con texto superpuesto por área |
| Caso Sant Joan de Déu como bloque más | No demuestra capacidad | Sección completa sobre petróleo, composición de dos fotografías, cifras verificadas |
| Certificaciones en cajas | Poca importancia visual | Filas editoriales con tipografía grande |
| Espaciado | Algo comprimido | +15–20 % de aire entre secciones y bloques |

## Fotografía: criterio de selección

Prioridad aplicada: (1) fotos reales de PALEX → no hay públicas utilizables; (2–4) Unsplash con
licencia gratuita. Se descartan: fotos Unsplash+ (de pago / Getty), renders 3D, imágenes con aspecto
generado, almacenes desordenados, palets rotos, mercancía abandonada. Ninguna imagen se repite en la Home.
Todas son **imágenes de contexto**; las del caso hospitalario se etiquetan como ilustrativas.
**Pendiente:** validación visual en navegador (el entorno de desarrollo no tiene acceso a Unsplash).

## Auditoría final (v5)

| Perfil | Pregunta | Respuesta | Por qué |
|---|---|---|---|
| Director de Supply Chain (farma) | ¿Puede PALEX gestionar una operación compleja? | **Sí** | Experiencia hospitalaria desde 1998, caso real de 176 almacenes, trazabilidad RFID, SAP HANA/EWM, transporte a temperatura controlada |
| Director de compras | ¿Me transmite confianza? | **Sí, con matices** | Datos verificados, sede y teléfonos reales, sin cifras infladas. Pendiente: certificaciones validadas y fotos propias |
| Director de operaciones | ¿Capacidad tecnológica y operativa? | **Sí** | Sección de tecnología, soluciones propias Dyane, control de impactos, método en 5 fases |
| Cliente nuevo | ¿Entiendo rápido qué ofrecen? | **Sí** | Portada → cuatro áreas → capacidad → franjas por área → seis servicios con imagen al pasar el ratón |
