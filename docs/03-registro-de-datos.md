# PALEX MEDICAL · Registro de datos y evidencias

Este registro fija qué se puede afirmar en la web. Se apoya en la investigación con fuentes
públicas aportada por el cliente, contrastada en parte con búsquedas propias.
En el código, el estado de cada dato está en `src/data/trust.ts`, `src/data/site.ts`,
`src/data/cases.ts` y `src/data/technology.ts`.

| Estado | Significado | Cómo aparece en la web |
|---|---|---|
| **1 · Verificado** | Se puede usar | Como hecho, sin marcador |
| **2 · Requiere validación** | Dato público no confirmado internamente | "En validación" / "Pendiente de validación interna", o no se muestra |
| **3 · No encontrado** | No existe evidencia | Solo como placeholder; nunca se inventa |

---

## 1. Datos verificados (publicados)

| Dato | Dónde se usa |
|---|---|
| Razón social: PALEX MEDICAL, S.A. | Pie, aviso legal, privacidad, Schema.org |
| Sede: C/ Jesús Serra Santamans, 5 · 08174 Sant Cugat del Vallès (Barcelona) | Pie, contacto, empresa, legales, Schema.org |
| Teléfono general: +34 934 006 500 | CTA, cabecera móvil, pie, contacto, Schema.org |
| Atención al cliente: 900 180 132 | Pie, contacto, empresa, Schema.org |
| Almacén central: Ctra. del Mig, 57-61 · 08940 Cornellà de Llobregat (Barcelona) · 900 181 753 | Pie, contacto, empresa, Schema.org (`location`) |
| División de Logística Hospitalaria e Ingeniería iniciada en 1998 → "más de 25 años" en soluciones de logística hospitalaria | Hero, banda de experiencia, empresa, sectores |
| Experiencia en logística, gestión e integración de almacenes, transporte, distribución, preparación de pedidos, optimización de flujos y del transporte, automatización, trazabilidad, logística hospitalaria y de material sanitario, soluciones personalizadas | Empresa, servicios, propuesta de valor |
| Soluciones propias: RFID, Dyane SmartKanban, Dyane SmartCabinet, Dyane Captis | Tecnología, caso de éxito |
| Experiencia en implantación de SAP HANA y del módulo SAP EWM en centros propios | Tecnología, consultoría (redacción prudente: "experiencia", no "consultoría SAP generalizada") |
| Caso real Hospital Sant Joan de Déu (Barcelona): automatización y digitalización logística, RFID, SmartKanban, SmartCabinet, Captis, gestión de almacenes, trazabilidad, **176 almacenes** | Home, proyectos, tecnología |
| Resultados publicados del caso (solo cualitativos): menos solicitudes urgentes, menos referencias obsoletas, menos caducidades, mejor trazabilidad, menos tareas administrativas | Caso de éxito |
| Indicadores de impacto ShockWatch 50G para equipos sensibles y envíos de alto valor (detectar golpes, control en manipulación, almacenamiento y transporte, registro de incidencias, trazabilidad) | Servicios especiales, tecnología, sectores |
| Planificación y ejecución de operaciones logísticas para congresos/eventos | Eventos y congresos |

Fuentes públicas localizadas: [Palex Hospital Logistics](https://www.palexsolucioneshospitalarias.es/en/) ·
[25 años de la división](https://www.palexsolucioneshospitalarias.es/en/celebrating-25-years/) ·
[Dyane SmartKanban](https://www.palexsolucioneshospitalarias.es/en/productos/dyane-smartkanban-en/) ·
[RFID Journal — Dyane](https://www.rfidjournal.com/news/palex-medical-launches-rfid-system-for-tracking-surgical-supplies/83783/) ·
[Almacén Cornellà](https://www.palex.es/en//warehouse-cornella.cfm).
**Pendiente:** añadir la URL de la publicación del caso Sant Joan de Déu y de la información sobre ShockWatch
(aportadas por la investigación del cliente; no localizadas en nuestras búsquedas).

## 2. Datos públicos que requieren validación (no publicados como hechos)

| Dato | Tratamiento en la web | Qué confirmar |
|---|---|---|
| ISO 9001:2015 | Listada como "En validación", sin logotipo | Vigencia, alcance, sociedad, entidad, n.º de certificado |
| UNE-EN ISO 14001:2015 | "En validación" (empresa, home, sostenibilidad) | Ídem; aparece en documentación del grupo |
| ISO 37001 (antisoborno) | "En validación" | Ídem; asociada a "Palex España" y Bureau Veritas |
| UNE 19601 (compliance penal) | "En validación" | Ídem |
| Proyecto "Implementación SAP HANA y módulo EWM" en **más de 8 centros propios** | Se menciona la experiencia **sin la cifra** | Número de centros y si se puede citar |
| Ahorro de **más de 1,5 M€** en un proyecto de optimización logística (2026) | **No publicado** | Cliente, alcance, autorización y método de cálculo |
| Almacén de **más de 12.000 palets** | **No publicado** | Titularidad, uso y si está disponible para terceros |
| Proyectos de optimización de flujos, redistribución de materiales, consolidación de envíos, reorganización de almacenes, preparación por oleadas, planificación de la distribución, logística inversa, dropshipping, radiofrecuencia | Tres fichas en /proyectos/ como "Pendiente de validación interna", sin cliente ni cifras | Cliente (o anonimización), alcance, resultados |
| Alcance de un servicio SAP para terceros | Marcador `[PENDIENTE DE VALIDACIÓN COMERCIAL]` | Si se ofrece y con qué alcance |
| (Hallazgo propio) "Más de 2.000 unidades instaladas en más de 20 países" (soluciones Dyane, RFID Journal) | **No publicado** | Vigencia de la cifra y pertinencia para esta web |

## 3. Datos no encontrados (solo placeholders)

| Dato | Marcador |
|---|---|
| Certificación GDP | `[CONFIRMAR CERTIFICACIÓN GDP]` |
| Email de contacto | `[DATOS PENDIENTES DE CONFIRMAR]` |
| LinkedIn de la entidad | `[DATOS PENDIENTES DE CONFIRMAR]` |
| CIF | `[PENDIENTE DE CONFIRMAR]` (legales) |
| Cobertura geográfica, flota, superficie, capacidad de almacenaje | `[DATOS PENDIENTES DE CONFIRMAR]` |
| Coberturas de seguro para alto valor | `[DATOS PENDIENTES DE CONFIRMAR]` |
| Tipologías de excedentes aceptadas | `[DATOS PENDIENTES DE CONFIRMAR]` |
| Métodos de integración con terceros y portal de seguimiento para clientes | `[CONFIRMAR TECNOLOGÍA]` |
| Indicadores ambientales | `[DATOS PENDIENTES DE CONFIRMAR]` |
| Número de eventos, clientes de eventos | No se menciona |

## Mensajes prohibidos (comprobado en el HTML generado)

"Somos líderes", "los mejores", "X vehículos", "X m²", "X almacenes" propios, "X países",
"X clientes", "certificación GDP", "expertos en SAP" como servicio generalizado.
La única cifra de almacenes publicada (176) es el alcance del caso real verificado,
no una capacidad propia.

## Cómo publicar un dato cuando se valide

- **Certificación:** en `src/data/trust.ts`, cambiar `status` a `'verified'`; la web deja de mostrar "En validación".
  Añadir el logotipo solo con el certificado en vigor.
- **Proyecto:** en `src/data/cases.ts`, completar cliente/resultados y pasar `status` a `'verified'`.
- **Cifra (p. ej. 8 centros SAP):** editar el texto en `src/data/technology.ts` y en `ProofBand.astro`.
