# PALEX MEDICAL · Web logística B2B
## Fases 1–5: Investigación, arquitectura, UX, copy y sistema visual

> Documento de trabajo previo al desarrollo. Todo dato marcado como
> **[DATOS PENDIENTES DE CONFIRMAR]** debe validarlo PALEX MEDICAL antes de publicar.

---

## 0. Advertencia previa sobre la marca (leer primero)

La investigación pública sobre "Palex Medical" devuelve principalmente a **Palex Medical, S.A.**,
distribuidor de tecnología sanitaria (MedTech) con sede en Sant Cugat del Vallès (Barcelona),
almacén central en Cornellà de Llobregat y una división de **logística hospitalaria**
(SmartKanban, armarios RFID, carros y mobiliario clínico). Ver fuentes al final.

**No hemos encontrado fuentes públicas** que documenten los servicios del briefing
(paquetería, grupaje, camión completo, fulfillment e-commerce, excedentes industriales,
eventos y congresos, consultoría SAP HANA) como líneas de negocio de esa empresa.

Consecuencias aplicadas en la web:

1. El catálogo de servicios se toma **del briefing del cliente** (fuente: PALEX MEDICAL).
2. **No se usa** ningún dato público del grupo (facturación, empleados, países, años,
   direcciones) porque no está confirmado que correspondan a esta actividad logística.
3. Dirección, teléfono, email y LinkedIn quedan como **[PENDIENTE DE CONFIRMAR]**.
   Para la validación interna: las direcciones públicas del grupo son
   *C/ Jesús Serra Santamans 5, Sant Cugat del Vallès* (sede) y
   *Ctra. del Mig 57-61, Cornellà de Llobregat* (almacén central).
4. **Logo**: no se ha podido descargar el archivo oficial (acceso bloqueado desde el entorno
   de desarrollo). Se usa un *wordmark tipográfico provisional* aislado en un único componente
   (`src/components/Logo.astro`) para sustituirlo por el SVG oficial en un minuto.
5. **Color**: fuentes de análisis de logotipos atribuyen a Palex un verde-turquesa
   (`#00A886`) y un naranja secundario (`#F4823A`). Confianza media. Se han definido como
   *tokens* en `src/styles/tokens.css`; si el manual de marca indica otros valores, se cambian
   en un único archivo.

---

## 1. Conclusiones de mercado

| # | Conclusión | Implicación para PALEX MEDICAL |
|---|---|---|
| 1 | Los grandes operadores (DHL Supply Chain, GXO, CEVA, DSV, Kuehne+Nagel, Rhenus, ID Logistics, FM Logistic) organizan su web en **Soluciones (qué) × Sectores (para quién)**. Es el estándar mental del comprador B2B. | Navegación con dos ejes: *Servicios* y *Sectores*. |
| 2 | Venden **escala** (m², centros, países, empleados). | PALEX no puede competir en cifras (no confirmadas). Debe competir en **adaptación, cercanía y amplitud funcional**. |
| 3 | Los especialistas pharma (Movianto, Logista Pharma, Disalfarm, Airpharm, Fedefarma, Eurotranspharma, AZA) basan el mensaje en **cumplimiento GDP, rangos de temperatura (2-8 °C, 15-25 °C) y trazabilidad**. | Temperatura controlada y trazabilidad son argumentos de primer nivel. Certificaciones GDP: **[CONFIRMAR]**, nunca afirmarlas. |
| 4 | El mercado español está **fragmentado por nicho**: transportistas frigoríficos, operadores de fulfillment, logística de eventos (Directia, Transvolando…), white-glove de equipos (High Tech Transporting, SIT Spain), excedentes (Surus, Compramosstock…), consultoría SAP EWM (NTT Data…). | **Ningún actor analizado reúne todos estos nichos bajo una única relación comercial.** Esa es la oportunidad central. |
| 5 | Las webs de nicho son, en general, visualmente débiles (plantillas, stock genérico, mensajes "líderes en el sector"). | Una web editorial y sobria diferencia por sí sola frente a los competidores de su tamaño. |
| 6 | Tendencias B2B 2026: arquitectura orientada a problema, CTA persistente, formularios cualificadores, prueba social estructurada (caso: reto → solución → resultado), *mobile-first* real, rendimiento como factor SEO y de confianza, animación contenida. | Aplicadas todas. Se descartan efectos de moda (glassmorphism intenso, 3D) por rendimiento y sobriedad. |
| 7 | Sostenibilidad: los grandes publican objetivos cuantificados (net zero 2045, SBTi, -40 % CO₂ 2030). | PALEX no tiene datos confirmados → sección **"Logística más eficiente"** basada en *prácticas* (consolidación, rutas, embalaje), sin cifras ni sellos. |

## 2. Competidores analizados

**Grandes operadores / contract logistics:** DHL Supply Chain, GXO Logistics, CEVA Logistics,
DB Schenker, DSV, Rhenus, Kuehne+Nagel, FM Logistic, ID Logistics.
**Healthcare / pharma:** UPS Healthcare, Movianto, Logista Pharma, Disalfarm, Airpharm,
Fedefarma, Eurotranspharma, AZA Logistics.
**Nichos:** Ontime (pharma XS), Transimó (refrigerado), Moldtrans (logística integral),
Directia / Transvolando / Verto (eventos), High Tech Transporting / SIT Spain (alto valor),
Surus / Compramosstock / Trazko (excedentes), integradores SAP EWM.

### Matriz comparativa (síntesis)

Leyenda: ●● fuerte · ● presente · ○ débil/ausente · ? no confirmado

| Criterio | Grandes 3PL (DHL, GXO, K+N, DSV) | Pharma (Movianto, Logista Pharma) | Nicho (eventos, white-glove, excedentes) | **PALEX MEDICAL (propuesta)** |
|---|---|---|---|---|
| Transporte (paquetería, FTL, grupaje) | ●● | ● | ● | ● |
| Almacenaje y preparación | ●● | ●● | ○ | ● |
| Temperatura controlada / frío | ● | ●● | ○ | ● (certificación ?) |
| E-commerce / fulfillment | ●● | ○ | ○ | ● |
| Pharma / healthcare | ●● | ●● | ○ | ● (afinidad de marca) |
| Servicios especiales / alto valor | ● | ● | ●● | ●● |
| Eventos y congresos | ○ | ○ | ●● | ●● |
| Excedentes industriales | ○ | ○ | ●● | ●● |
| Consultoría / SAP HANA | ● (interna) | ○ | ● (solo IT) | ●● (operativa + sistemas) |
| Tecnología comunicada | ●● | ●● | ○ | ? → placeholders |
| UX | ● (portales complejos) | ● | ○ | ●● objetivo |
| Diseño | ● corporativo | ● | ○ | ●● editorial |
| CTA | ● "Contact sales" genérico | ● | ● teléfono | ●● cualificado y persistente |
| Diferenciación | escala | cumplimiento | especialización | **amplitud + diseño a medida** |

## 3. Oportunidades para PALEX MEDICAL

1. **"Un solo interlocutor para toda la cadena"**: posicionarse en el hueco entre el gran 3PL
   (escala, poca flexibilidad) y el especialista de nicho (flexible, alcance limitado).
2. **Ingeniería + ejecución**: la consultoría (layouts, procesos, SAP HANA, embalaje) unida a la
   operación es rara en operadores medianos. Vende *capacidad de pensar*, no solo de mover.
3. **Operaciones que no encajan**: servicios especiales, equipos de alto valor, eventos con
   fecha límite. Mensaje: *"Cuando una operación no encaja en un estándar, diseñamos la solución."*
4. **Excedentes como servicio de valor**: casi ningún operador lo ofrece; conecta almacenaje,
   clasificación y venta → convierte un coste del cliente en liquidez.
5. **Afinidad sanitaria de la marca**: el nombre "Medical" da credibilidad en pharma y healthcare;
   se aprovecha sin afirmar certificaciones no confirmadas.
6. **Formulario cualificador**: los competidores piden "contáctanos"; PALEX pide origen, destino,
   tipo de mercancía y requisitos → leads de más calidad y respuesta comercial más rápida.

## 4. Sitemap recomendado

```
/                                   Home
/servicios/                         Visión general de las 6 líneas
  /servicios/transporte/
  /servicios/logistica/
  /servicios/excedentes-industriales/
  /servicios/servicios-especiales/
  /servicios/eventos-y-congresos/
  /servicios/consultoria-logistica/
/soluciones-a-medida/               Proceso 01–05 + CTA proyecto
/sectores/                          8 sectores con problema → respuesta
/tecnologia/                        Trazabilidad, integración, SAP HANA (placeholders)
/proyectos/                         Casos (plantilla reto/solución/resultado)
/sostenibilidad/                    Logística más eficiente (editable)
/contacto/                          Formulario cualificado
/aviso-legal/  /politica-de-privacidad/  /politica-de-cookies/
/404
```

URLs en español, cortas, sin parámetros; slugs alineados con keyword principal de cada página.

## 5. UX: navegación y user journey

**Header fijo:** Logo · Servicios (mega-menú con las 6 líneas) · Soluciones a medida · Sectores ·
Tecnología · Proyectos · **[Solicitar propuesta]** (botón siempre visible).
**Móvil:** barra superior compacta con logo + botón "Propuesta" + menú; panel a pantalla completa
con acordeón de servicios; enlace telefónico cuando se confirme el número.

**Las tres preguntas en el primer scroll:**
- ¿Qué hacen? → H1 + subclaim + franja de las 6 líneas inmediatamente bajo el hero.
- ¿Pueden resolver mi problema? → bloques de servicios, sectores y "soluciones a medida".
- ¿Cómo contacto? → CTA en header, en hero, cada 2-3 secciones y CTA final.

**Journeys tipo:**
1. *Laboratorio con producto termosensible* → Home → Transporte (temperatura controlada) → Sectores/Pharma → Contacto (servicio y "necesidades especiales" prerrellenados vía URL).
2. *Organizador de congreso* → Home → Eventos (proceso 7 fases) → Contacto.
3. *Industrial con stock obsoleto* → Home → Excedentes → Contacto.
4. *Director de operaciones* → Home → Consultoría / Soluciones a medida → Proyectos → Contacto.

Cada página de servicio termina con un CTA que enlaza a `/contacto/?servicio=<línea>` y el
formulario preselecciona el servicio.

## 6. Mensajes y claims

**Claim principal (H1 Home):** *Soluciones logísticas para operaciones que no pueden fallar.*
**Subclaim:** Transporte, almacenaje, distribución y proyectos a medida para empresas que
necesitan algo más que un proveedor.

Alternativas evaluadas:
- "Soluciones logísticas integrales adaptadas a cada cliente." → claro pero genérico; se usa como
  *descriptor SEO* (title/meta), no como H1.
- "Diseñamos la logística. La ejecutamos. La mejoramos." → se usa en el bloque de proceso.
- "Tu operación. Nuestra solución." → bloque de soluciones a medida.

**Mensajes por sección:**
| Sección | Mensaje |
|---|---|
| Capacidad | Una solución. Todas las fases de la operación. |
| Servicios | Seis líneas de servicio. Un único interlocutor. |
| A medida | ¿Tu operación no encaja en un estándar? Diseñamos una que sí. |
| Proceso | Analizamos → Diseñamos → Implantamos → Gestionamos → Optimizamos |
| Especiales | Cuando una operación no encaja en una solución estándar, diseñamos una solución específica. |
| Excedentes | Convertimos excedentes y stocks sobrantes en oportunidades. |
| Eventos | Fechas cerradas. Múltiples destinos. Una sola coordinación. |
| Consultoría | No solo ejecutamos la logística. La analizamos y la mejoramos. |
| CTA final | Cuéntanos qué necesitas. |

**Vocabulario permitido:** capacidad, precisión, flexibilidad, eficiencia, trazabilidad,
adaptación, integración, optimización, servicio.
**Prohibido:** "líderes", "el mejor", "expertos con X años", cualquier cifra no confirmada.

## 7. Dirección visual

- **Concepto:** *ingeniería editorial*. Mezcla de memoria técnica (líneas, rejillas, numeración
  01-05, rutas) y revista corporativa (tipografía grande, aire, imágenes a sangre).
- **Color:** tinta profunda azul-pizarra `#0E1A24` como base de autoridad, blanco cálido
  `#F7F7F4` como fondo, **verde Palex `#00A886`** como único acento funcional (CTA, líneas de ruta,
  estados). Naranja `#F4823A` reservado a microdetalles (máx. 1 por pantalla). Grises neutros.
- **Tipografía:** *Inter Tight* para titulares (compacta, técnica, internacional) e *Inter* para
  texto; numeración y datos en *JetBrains Mono* (sensación de sistema/trazabilidad).
  [CONFIRMAR con la tipografía corporativa del manual de marca]
- **Forma:** radios de 2–4 px, bordes de 1 px, sin sombras pesadas, iconografía lineal propia
  de trazo 1.5 px (sin librerías de iconos infantiles).
- **Composición:** alternancia de rejillas (12 col.), bloques a sangre oscuros, listas numeradas,
  diagramas de flujo animados con línea que se dibuja al hacer scroll.
- **Fotografía:** gran formato, tratamiento frío y desaturado. Todas las imágenes se gestionan
  desde `src/data/images.ts`. Mientras no haya fotografía propia, se muestran **composiciones
  gráficas técnicas** (no fotos de stock) etiquetadas como *imagen de contexto*, para no sugerir
  instalaciones que no están confirmadas.
- **Animación:** aparición (opacidad + 16 px), dibujo de líneas de proceso, parallax ≤ 6 %,
  respetando `prefers-reduced-motion`.

## 8. Tecnologías recomendadas

| Elección | Motivo |
|---|---|
| **Astro 5** (salida estática) | HTML estático, 0 KB de JS por defecto, componentes reutilizables, ideal para Core Web Vitals y SEO. Más ligero y mantenible que Next.js para una web corporativa sin lógica de aplicación. |
| **TypeScript** | Contenido tipado en `src/data/*.ts` (servicios, sectores, navegación) → un único lugar para editar textos. |
| **CSS propio con tokens** | Sin Tailwind: menos dependencias, control total del diseño editorial, CSS final pequeño. |
| **JS vanilla (< 5 KB)** | Menú móvil, revelado al scroll (IntersectionObserver), validación del formulario. |
| **@astrojs/sitemap** | Generación automática de `sitemap-index.xml`. |
| **Fuentes autoalojadas vía Google Fonts con `display=swap`** | Sustituibles por las corporativas. |
| Formulario | Envío a un endpoint configurable (`PUBLIC_FORM_ENDPOINT`): Formspree, HubSpot, CRM propio o función serverless. Sin endpoint, el formulario valida y muestra aviso de configuración pendiente. |

## 9. Keywords objetivo (España)

Agrupadas por intención; una keyword principal por URL, sin repetición forzada.

| URL | Keyword principal | Secundarias |
|---|---|---|
| `/` | operador logístico | logística integral, soluciones logísticas para empresas |
| `/servicios/transporte/` | transporte de mercancías para empresas | transporte refrigerado, transporte congelado, transporte a temperatura controlada, grupaje, camión completo, transporte urgente |
| `/servicios/logistica/` | almacenaje y preparación de pedidos | fulfillment, logística e-commerce, picking y packing, manipulados |
| `/servicios/excedentes-industriales/` | compraventa de excedentes industriales | compra de stock, venta de stock sobrante |
| `/servicios/servicios-especiales/` | transporte de equipos de alto valor | embalaje industrial, manipulación especial |
| `/servicios/eventos-y-congresos/` | logística de eventos y congresos | distribución de merchandising, montaje y desmontaje |
| `/servicios/consultoria-logistica/` | consultoría logística | optimización logística, layout de almacén, SAP HANA logística |
| `/sectores/` | logística farmacéutica | logística healthcare, logística industrial |

## Fuentes consultadas

- Palex Hospital Logistics — https://www.palexsolucioneshospitalarias.es/en/
- Hospitecnia, ficha Palex Medical — https://hospitecnia.com/proveedores/palex-medical/
- Palex Medical, almacén Cornellà — https://www.palex.es/en//warehouse-cornella.cfm
- Palex España, nosotros — https://www.palexhealth.com/es-es/nosotros
- Apax Partners, Palex Medical — https://www.apax.com/partnerships/palex-medical/
- Análisis de logotipo Palex — https://whatthelogo.com/logo/palex/67686
- DHL Supply Chain España, Life Sciences — https://www.dhl.com/es-es/home/supply-chain/industries/life-sciences-and-healthcare.html
- GXO soluciones — https://gxo.com/supply-chain-management/ · https://gxo.com/supply-chain-mgmt/reverse-logistics/
- Kuehne+Nagel warehousing / get a quote — https://www.kuehne-nagel.com/us/services/warehousing · https://www.kuehne-nagel.com/contact/get-a-quote
- Movianto España — https://movianto.com/es/ubicaciones/espana/ · https://movianto.com/es/servicios/
- Logista Pharma — https://www.pmfarma.com/empresas/empresa-info.php?idEmpresaSelec=5160
- DSV healthcare — https://www.dsv.com/es-es/nuestras-soluciones/sectores-industriales/logistica-healthcare
- AZA Logistics — https://www.azalogistics.es/
- Eurotranspharma España — https://www.eurotranspharma.com/es/eurotranspharma-espana/
- Ontime pharma XS — https://www.cadenadesuministro.es/logistica/ontime-empieza-ofrecer-transporte-pequenos-productos-farmaceuticos-temperatura-controlada_1515802_102.html
- Rhenus green logistics — https://www.rhenus.group/green-logistics/
- ID Logistics — https://www.id-logistics.com/us/
- Moldtrans operador integral — https://www.moldtrans.com/operador-logistico-integral/
- Directia (PLV y expositores) — https://www.directialogistica.es/montajes-de-expositores-y-plv/
- Transvolando (eventos) — https://transvolando.com/transporte-para-eventos/
- High Tech Transporting — https://hightechtransporting.com/
- SIT Spain — https://www.sitspain.com/mudanza-de-laboratorios-y-centros-sanitarios/
- Excedentes (Europages, Compramosstock, Trazko) — https://www.europages.es/empresas/compraventa-de-excedentes-de-stock.html · https://www.compramosstock.com/ · https://trazko.com/excedentes-metalurgicos
- NTT Data SAP EWM — https://nttdata-solutions.com/es/productos/sap-ewm/
- Clear Digital, B2B web trends 2026 — https://www.cleardigital.com/insights/5-b2b-website-design-trends-to-watch
- Outvio, fulfillment España 2026 — https://outvio.com/es/blog/empresas-fulfillment/
