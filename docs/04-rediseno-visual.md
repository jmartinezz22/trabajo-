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
