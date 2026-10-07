/**
 * Contenido del catálogo, común a todas las versiones (PALEX y neutra).
 *
 * Fuente: líneas de servicio reales del proyecto (src/data/services.ts).
 * Regla: no se inventan clientes, cifras, capacidades, coberturas ni tecnologías.
 * Lo no confirmado se marca con [PENDIENTE DE CONFIRMAR].
 *
 * Un texto propio de la marca (p. ej. nombres de productos propios) va en `palex`
 * y SOLO se muestra en la versión con branding.
 */
import type { PhotoKey } from '../images';
import { PENDING } from './config';

export type CategoryKey = 'transporte' | 'logistica' | 'especiales' | 'eventos' | 'consultoria' | 'medida' | 'excedentes';

export type NeedKey =
  | 'almacenaje'
  | 'distribucion'
  | 'temperatura'
  | 'embalaje'
  | 'urgente'
  | 'alto-valor'
  | 'ecommerce'
  | 'eventos'
  | 'optimizacion'
  | 'a-medida'
  | 'excedentes';

export const needs: Record<NeedKey, string> = {
  almacenaje: 'Almacenaje',
  distribucion: 'Distribución',
  temperatura: 'Temperatura controlada',
  embalaje: 'Embalaje',
  urgente: 'Transporte urgente',
  'alto-valor': 'Equipos de alto valor',
  ecommerce: 'E-commerce',
  eventos: 'Eventos',
  optimizacion: 'Optimización',
  'a-medida': 'Soluciones a medida',
  excedentes: 'Excedentes',
};

export interface Step {
  title: string;
  text: string;
}

export interface Category {
  key: CategoryKey;
  slug: string;
  num: string;
  name: string;
  /** Etiqueta corta para navegación y filtros. */
  short: string;
  tagline: string;
  intro: string;
  image: PhotoKey;
  /** Presentación de los servicios en la página de categoría. */
  layout: 'list' | 'mosaic' | 'process' | 'feature';
  process?: Step[];
  palex?: { intro?: string };
}

export interface CatalogItem {
  slug: string;
  name: string;
  category: CategoryKey;
  needs: NeedKey[];
  image: PhotoKey;
  /** Términos adicionales para el buscador. */
  keywords?: string;
  summary: string;
  offer: string;
  applications: string[];
  features: string[];
  advantages: string[];
  related?: string[];
  palex?: Partial<Pick<CatalogItem, 'summary' | 'offer' | 'features' | 'applications'>>;
}

export const categories: Category[] = [
  {
    key: 'transporte',
    slug: 'transporte',
    num: '01',
    name: 'Transporte',
    short: 'Transporte',
    tagline: 'Soluciones para mover mercancías con precisión, seguridad y control.',
    intro:
      'Desde un paquete urgente hasta un camión completo a temperatura controlada. Elegimos la modalidad según volumen, condiciones de conservación y plazo de entrega.',
    image: 'transporte',
    layout: 'list',
  },
  {
    key: 'logistica',
    slug: 'logistica',
    num: '02',
    name: 'Logística',
    short: 'Logística',
    tagline: 'Almacenaje, preparación de pedidos y fulfillment configurados para cada operación.',
    intro:
      'Del muelle de entrada al cliente final: recepción, ubicación, preparación, embalaje y expedición, coordinados con el transporte adecuado.',
    image: 'logistica',
    layout: 'mosaic',
  },
  {
    key: 'especiales',
    slug: 'servicios-especiales',
    num: '03',
    name: 'Servicios especiales',
    short: 'Especiales',
    tagline: 'Cuando una operación no encaja en un estándar, diseñamos una solución específica.',
    intro:
      'Embalaje, transporte de equipos de alto valor y manipulación especial con protección, trazabilidad y control en cada paso.',
    image: 'especiales',
    layout: 'list',
  },
  {
    key: 'eventos',
    slug: 'eventos-y-congresos',
    num: '04',
    name: 'Eventos y congresos',
    short: 'Eventos',
    tagline: 'Fechas cerradas. Múltiples destinos. Una sola coordinación.',
    intro:
      'Planificamos, preparamos, almacenamos, transportamos, montamos y desmontamos el material de eventos, congresos y ferias.',
    image: 'eventos',
    layout: 'process',
    process: [
      { title: 'Planificación', text: 'Calendario, cantidades, destinos y accesos.' },
      { title: 'Preparación', text: 'Kits y lotes por stand, sala o asistente.' },
      { title: 'Almacenaje', text: 'Custodia del material hasta la salida.' },
      { title: 'Transporte', text: 'Entrega en sede dentro de la ventana asignada.' },
      { title: 'Montaje', text: 'Material listo antes de la apertura.' },
      { title: 'Evento', text: 'Soporte logístico durante la celebración.' },
      { title: 'Desmontaje', text: 'Retirada, retorno o almacenaje.' },
    ],
  },
  {
    key: 'consultoria',
    slug: 'consultoria',
    num: '05',
    name: 'Consultoría y optimización',
    short: 'Consultoría',
    tagline: 'No solo ejecutamos la logística. La analizamos y la mejoramos.',
    intro:
      'Diagnóstico, análisis y propuestas de mejora para transporte, almacén, procesos, sistemas y embalajes, con acompañamiento en la implantación.',
    image: 'consultoria',
    layout: 'list',
  },
  {
    key: 'medida',
    slug: 'soluciones-a-medida',
    num: '06',
    name: 'Soluciones a medida',
    short: 'A medida',
    tagline: 'Cada operación es diferente.',
    intro: 'Analizamos las necesidades de cada cliente para diseñar una solución logística adaptada a su operación.',
    image: 'medida',
    layout: 'feature',
    process: [
      { title: 'Analizamos', text: 'Producto, volúmenes, plazos, destinos y restricciones de la operación.' },
      { title: 'Diseñamos', text: 'El modelo logístico: procesos, recursos, transporte y sistemas.' },
      { title: 'Implantamos', text: 'Puesta en marcha ordenada y coordinada con el cliente.' },
      { title: 'Gestionamos', text: 'Operación diaria con un único interlocutor.' },
      { title: 'Optimizamos', text: 'Revisión continua para mejorar costes, plazos y calidad.' },
    ],
  },
  {
    key: 'excedentes',
    slug: 'excedentes-industriales',
    num: '07',
    name: 'Excedentes industriales',
    short: 'Excedentes',
    tagline: 'Convertimos excedentes y stocks sobrantes en material en circulación.',
    intro:
      'Compra, gestión, almacenaje y venta de stocks, materiales sobrantes y activos excedentes, con la logística de cada operación incluida.',
    image: 'excedentes',
    layout: 'list',
  },
];

export const items: CatalogItem[] = [
  // ——— 01 TRANSPORTE ———
  {
    slug: 'paqueteria',
    name: 'Paquetería',
    category: 'transporte',
    needs: ['distribucion', 'ecommerce'],
    image: 'distribucion',
    keywords: 'paquetes envíos pequeño volumen reparto',
    summary: 'Transporte y distribución de paquetes y mercancías de pequeño volumen.',
    offer:
      'Recogida y entrega de paquetes y bultos de pequeño volumen, combinable con el almacenaje y la preparación de pedidos para cerrar el ciclo completo del envío.',
    applications: ['Envíos a clientes finales y a empresas', 'Reposición de puntos de venta o delegaciones', 'Pedidos de tiendas online'],
    features: ['Envíos unitarios o por lotes', 'Integrable con preparación de pedidos y packing', 'Información de estado y entrega'],
    advantages: ['Un solo proveedor para almacén y envío', 'Flexibilidad ante picos de pedidos', 'Menos coordinación para tu equipo'],
    related: ['grupaje', 'express', 'e-commerce'],
  },
  {
    slug: 'grupaje',
    name: 'Grupaje',
    category: 'transporte',
    needs: ['distribucion'],
    image: 'transporte2',
    keywords: 'carga compartida parcial palets consolidación',
    summary: 'Cargas compartidas para optimizar costes y eficiencia en envíos parciales.',
    offer:
      'Consolidación de envíos parciales en rutas compartidas, para mover cargas que no completan un vehículo con un coste ajustado a su volumen.',
    applications: ['Envíos de varios palets', 'Reposición periódica a varios destinos', 'Cargas que no llenan un camión'],
    features: ['Consolidación de mercancía de varios envíos', 'Planificación por rutas', 'Combinable con almacenaje previo'],
    advantages: ['Coste proporcional al volumen enviado', 'Uso eficiente del transporte', 'Alternativa al camión completo'],
    related: ['camion-completo', 'paqueteria', 'mejora-del-transporte'],
  },
  {
    slug: 'camion-completo',
    name: 'Camión completo',
    category: 'transporte',
    needs: ['distribucion'],
    image: 'transporte',
    keywords: 'ftl carga completa dedicado directo',
    summary: 'Carga completa dedicada, sin rupturas intermedias, de origen a destino.',
    offer:
      'Vehículo dedicado a una sola carga, con recogida en origen y entrega directa en destino, sin transbordos intermedios.',
    applications: ['Grandes volúmenes', 'Traslados entre almacenes o plantas', 'Mercancía que no debe manipularse en ruta'],
    features: ['Vehículo dedicado', 'Sin rupturas de carga', 'Planificación de ventana de recogida y entrega'],
    advantages: ['Menos manipulaciones', 'Plazos más previsibles', 'Mayor control de la mercancía'],
    related: ['grupaje', 'temperatura-controlada', 'operaciones-especiales'],
  },
  {
    slug: 'temperatura-ambiente',
    name: 'Temperatura ambiente',
    category: 'transporte',
    needs: ['distribucion'],
    image: 'hero',
    keywords: 'mercancía general seco',
    summary: 'Transporte de mercancía general que no requiere control térmico.',
    offer:
      'Transporte de mercancía general en cualquiera de las modalidades —paquetería, grupaje, camión completo o express— según volumen y plazo.',
    applications: ['Producto industrial y de consumo', 'Material técnico y documental', 'Material de eventos'],
    features: ['Todas las modalidades de envío', 'Combinable con almacenaje', 'Seguimiento del envío'],
    advantages: ['Modalidad ajustada a cada carga', 'Coordinación con la operación de almacén', 'Un único interlocutor'],
    related: ['grupaje', 'camion-completo', 'paqueteria'],
  },
  {
    slug: 'refrigerado',
    name: 'Refrigerado',
    category: 'transporte',
    needs: ['temperatura', 'distribucion'],
    image: 'frio',
    keywords: 'frío cadena de frío refrigerada perecederos',
    summary: 'Mercancías que necesitan conservación en frío durante todo el trayecto.',
    offer:
      'Transporte de mercancía que debe mantenerse refrigerada desde la recogida hasta la entrega, con las condiciones definidas para cada producto.',
    applications: ['Producto sanitario y farmacéutico sensible', 'Alimentación refrigerada', 'Muestras y material de laboratorio'],
    features: ['Conservación en frío durante el trayecto', 'Condiciones definidas por producto', 'Rangos de temperatura: ' + PENDING],
    advantages: ['Cadena de frío sin interrupciones', 'Menor riesgo de pérdida de producto', 'Coordinación con almacén y entrega'],
    related: ['congelado', 'temperatura-controlada', 'express'],
  },
  {
    slug: 'congelado',
    name: 'Congelado',
    category: 'transporte',
    needs: ['temperatura', 'distribucion'],
    image: 'frio',
    keywords: 'congelación frío negativo',
    summary: 'Productos que deben mantenerse en condiciones de congelación.',
    offer: 'Transporte de producto congelado manteniendo las condiciones de congelación durante todo el recorrido.',
    applications: ['Alimentación congelada', 'Producto que requiere frío negativo', 'Reposición a puntos de venta'],
    features: ['Mantenimiento de la congelación en ruta', 'Planificación de ventanas de entrega', 'Rangos de temperatura: ' + PENDING],
    advantages: ['Integridad del producto', 'Entregas coordinadas', 'Un solo proveedor para frío y ambiente'],
    related: ['refrigerado', 'temperatura-controlada', 'camion-completo'],
  },
  {
    slug: 'temperatura-controlada',
    name: 'Temperatura controlada',
    category: 'transporte',
    needs: ['temperatura', 'distribucion'],
    image: 'pharma',
    keywords: 'termosensible registro temperatura farma sanitario',
    summary: 'Mercancías sensibles con control y seguimiento de temperatura.',
    offer:
      'Transporte de mercancía termosensible con control y seguimiento de la temperatura durante el trayecto, según los requisitos de cada producto.',
    applications: ['Producto sanitario y farmacéutico', 'Reactivos y material de laboratorio', 'Producto técnico sensible al calor'],
    features: ['Control de temperatura durante el trayecto', 'Seguimiento de las condiciones', 'Requisitos definidos por producto'],
    advantages: ['Trazabilidad de las condiciones', 'Menos incidencias de calidad', 'Tranquilidad para mercancía sensible'],
    related: ['refrigerado', 'equipos-de-alto-valor', 'express'],
    palex: {
      applications: ['Producto sanitario y farmacéutico', 'Material hospitalario sensible', 'Reactivos y material de laboratorio'],
    },
  },
  {
    slug: 'express',
    name: 'Express',
    category: 'transporte',
    needs: ['urgente', 'distribucion'],
    image: 'distribucion',
    keywords: 'urgente rápido mismo día prioridad',
    summary: 'Servicio urgente para mercancías que necesitan entrega rápida.',
    offer: 'Envíos prioritarios para mercancía que no puede esperar, planificados para cumplir el plazo acordado.',
    applications: ['Roturas de stock', 'Piezas o equipos críticos', 'Entregas con fecha límite'],
    features: ['Prioridad de recogida y entrega', 'Combinable con temperatura controlada', 'Plazos de servicio: ' + PENDING],
    advantages: ['Respuesta ante urgencias', 'Continuidad de la operación', 'Un interlocutor para coordinarlo'],
    related: ['paqueteria', 'temperatura-controlada', 'operaciones-especiales'],
  },

  // ——— 02 LOGÍSTICA ———
  {
    slug: 'almacenaje',
    name: 'Almacenaje',
    category: 'logistica',
    needs: ['almacenaje'],
    image: 'capacity',
    keywords: 'almacén espacio stock ubicaciones custodia',
    summary: 'Almacenamiento de mercancía con gestión de ubicaciones y stock.',
    offer:
      'Espacio de almacenaje con gestión de ubicaciones, control de stock y ubicación según la rotación y las características de cada producto.',
    applications: ['Externalización del almacén', 'Stock de seguridad o estacional', 'Material de proyectos y eventos'],
    features: ['Gestión de ubicaciones y stock', 'Ubicación por rotación', 'Superficie y capacidad disponibles: ' + PENDING],
    advantages: ['Sin inversión en almacén propio', 'Capacidad adaptable', 'Stock controlado y accesible'],
    related: ['preparacion-de-pedidos', 'fulfillment', 'montaje-de-estanterias'],
  },
  {
    slug: 'preparacion-de-pedidos',
    name: 'Preparación de pedidos',
    category: 'logistica',
    needs: ['almacenaje', 'ecommerce', 'distribucion'],
    image: 'logistica2',
    keywords: 'pedidos órdenes preparación',
    summary: 'Pedidos preparados según tus reglas de servicio y prioridades.',
    offer:
      'Preparación de pedidos según las reglas de servicio de cada cliente: prioridades, unidades de venta, documentación y destino.',
    applications: ['Pedidos a tiendas y delegaciones', 'Pedidos de clientes finales', 'Kits para eventos o proyectos'],
    features: ['Reglas de preparación por cliente', 'Control de referencias', 'Coordinación con la expedición'],
    advantages: ['Pedidos correctos y a tiempo', 'Escalable en picos de actividad', 'Menos carga para tu equipo'],
    related: ['picking', 'packing', 'fulfillment'],
  },
  {
    slug: 'picking',
    name: 'Picking',
    category: 'logistica',
    needs: ['almacenaje', 'ecommerce'],
    image: 'picking',
    keywords: 'extracción unidades cajas referencias',
    summary: 'Extracción de unidades o cajas por pedido, con control de referencias.',
    offer: 'Extracción de unidades o cajas para cada pedido, con control de las referencias preparadas.',
    applications: ['Pedidos unitarios', 'Pedidos por cajas completas', 'Reposición a puntos de venta'],
    features: ['Picking por unidad o por caja', 'Control de referencias', 'Integrado con preparación y packing'],
    advantages: ['Menos errores de preparación', 'Rapidez en la salida', 'Trazabilidad del pedido'],
    related: ['preparacion-de-pedidos', 'packing', 'e-commerce'],
  },
  {
    slug: 'packing',
    name: 'Packing',
    category: 'logistica',
    needs: ['embalaje', 'ecommerce'],
    image: 'especiales2',
    keywords: 'embalado etiquetado cajas',
    summary: 'Embalado y etiquetado adaptado al producto y al canal de destino.',
    offer: 'Embalado y etiquetado de cada pedido según el producto, el canal de venta y el modo de transporte.',
    applications: ['Envíos a cliente final', 'Pedidos a distribuidores', 'Material frágil o de presentación cuidada'],
    features: ['Embalaje según producto y canal', 'Etiquetado para el transporte', 'Materiales adecuados a cada envío'],
    advantages: ['Producto protegido', 'Buena experiencia de entrega', 'Menos incidencias en transporte'],
    related: ['embalaje', 'picking', 'mejora-de-embalajes'],
  },
  {
    slug: 'manipulados',
    name: 'Manipulados',
    category: 'logistica',
    needs: ['almacenaje', 'embalaje'],
    image: 'otros',
    keywords: 'kitting reetiquetado packs valor añadido',
    summary: 'Kitting, reetiquetado, montaje de packs y otras operaciones de valor añadido.',
    offer:
      'Operaciones de valor añadido sobre la mercancía almacenada: kitting, reetiquetado, montaje de packs y preparación de lotes.',
    applications: ['Packs promocionales', 'Kits por proyecto o evento', 'Adaptación de etiquetado'],
    features: ['Kitting y montaje de packs', 'Reetiquetado', 'Preparación de lotes'],
    advantages: ['Producto listo para su canal', 'Sin traslados intermedios', 'Flexibilidad en campañas'],
    related: ['preparacion-de-pedidos', 'packing', 'preparacion-de-kits-para-eventos'],
  },
  {
    slug: 'e-commerce',
    name: 'E-commerce',
    category: 'logistica',
    needs: ['ecommerce', 'almacenaje', 'distribucion'],
    image: 'ecommerce',
    keywords: 'tienda online pedidos unitarios devoluciones',
    summary: 'Logística para tiendas online: pedidos unitarios y alta variabilidad.',
    offer:
      'Almacenaje, preparación, embalaje y envío de pedidos de tienda online, preparados para pedidos unitarios y alta variabilidad de demanda.',
    applications: ['Tiendas online B2C', 'Venta B2B por portal', 'Lanzamientos y campañas'],
    features: ['Pedidos unitarios', 'Gestión de picos de demanda', 'Integración de sistemas: ' + PENDING],
    advantages: ['Escalable sin estructura propia', 'Entregas coordinadas', 'Foco del cliente en vender'],
    related: ['fulfillment', 'paqueteria', 'packing'],
  },
  {
    slug: 'fulfillment',
    name: 'Fulfillment',
    category: 'logistica',
    needs: ['ecommerce', 'almacenaje', 'distribucion'],
    image: 'logistica',
    keywords: 'ciclo completo recepción almacenaje envío',
    summary: 'Ciclo completo del pedido: recepción, almacenaje, preparación y envío.',
    offer: 'Gestión completa del ciclo del pedido: recepción, almacenaje, preparación, embalaje y envío al destinatario.',
    applications: ['Marcas que externalizan su logística', 'Nuevos canales de venta', 'Operaciones con muchas referencias'],
    features: ['Recepción y control de entrada', 'Almacenaje y preparación', 'Expedición con el transporte adecuado'],
    advantages: ['Un único proveedor de principio a fin', 'Procesos coordinados', 'Visibilidad de la operación'],
    related: ['e-commerce', 'almacenaje', 'paqueteria'],
  },
  {
    slug: 'soluciones-logisticas-implantadas',
    name: 'Soluciones logísticas implantadas',
    category: 'logistica',
    needs: ['a-medida', 'almacenaje', 'optimizacion'],
    image: 'hospital',
    keywords: 'proyecto implantación hospital automatización rfid trazabilidad',
    summary: 'Operaciones diseñadas y puestas en marcha para un cliente concreto.',
    offer:
      'Diseño e implantación de operaciones logísticas completas para un cliente concreto. Ejemplo publicado: automatización y digitalización de los procesos logísticos de un hospital, con 176 almacenes, tecnología RFID y trazabilidad.',
    applications: ['Entornos hospitalarios', 'Operaciones con muchos puntos de consumo', 'Proyectos de automatización'],
    features: ['Diseño de procesos y flujos', 'Tecnología RFID y trazabilidad', 'Automatización de almacenes'],
    advantages: ['Solución hecha para la operación real', 'Más control del material', 'Menos tareas manuales'],
    related: ['proyectos-a-medida', 'almacenaje', 'optimizacion-de-layouts'],
    palex: {
      offer:
        'Diseño e implantación de operaciones logísticas completas. Caso publicado: Hospital Sant Joan de Déu (Barcelona), 176 almacenes con RFID y las soluciones propias Dyane SmartKanban, SmartCabinet y Captis.',
      features: ['Diseño de procesos y flujos', 'RFID y soluciones propias Dyane', 'Automatización de almacenes'],
    },
  },
  {
    slug: 'montaje-de-estanterias',
    name: 'Montaje y desmontaje de estanterías',
    category: 'logistica',
    needs: ['almacenaje', 'a-medida'],
    image: 'medida',
    keywords: 'racks estanterías instalación reconfiguración',
    summary: 'Instalación, reconfiguración y retirada de sistemas de almacenaje.',
    offer: 'Montaje, reconfiguración y desmontaje de sistemas de estanterías para adaptar el almacén a la operación.',
    applications: ['Apertura o traslado de almacén', 'Cambio de layout', 'Retirada de instalaciones en desuso'],
    features: ['Montaje y desmontaje', 'Reconfiguración de sistemas existentes', 'Coordinación con la operación'],
    advantages: ['Almacén adaptado a la actividad', 'Menos paradas operativas', 'Un interlocutor para todo el cambio'],
    related: ['optimizacion-de-layouts', 'almacenaje', 'activos-excedentes'],
  },

  // ——— 03 SERVICIOS ESPECIALES ———
  {
    slug: 'embalaje',
    name: 'Embalaje',
    category: 'especiales',
    needs: ['embalaje', 'alto-valor'],
    image: 'especiales2',
    keywords: 'embalaje a medida frágil protección',
    summary: 'Embalaje diseñado según la fragilidad, el valor y el modo de transporte.',
    offer: 'Diseño y ejecución del embalaje adecuado para cada mercancía, según su fragilidad, su valor y cómo va a transportarse.',
    applications: ['Equipos técnicos y sanitarios', 'Mercancía frágil', 'Envíos de alto valor'],
    features: ['Embalaje según fragilidad y valor', 'Adaptado al modo de transporte', 'Retirada de embalajes si procede'],
    advantages: ['Menos daños en tránsito', 'Protección documentada', 'Embalaje eficiente en volumen'],
    related: ['equipos-de-alto-valor', 'mejora-de-embalajes', 'packing'],
  },
  {
    slug: 'equipos-de-alto-valor',
    name: 'Transporte de equipos de alto valor',
    category: 'especiales',
    needs: ['alto-valor', 'embalaje'],
    image: 'ecografo',
    keywords: 'equipos sensibles médicos tecnológicos impactos shockwatch',
    summary: 'Equipos sensibles y envíos de alto valor con control de impactos en cada manipulación.',
    offer:
      'Transporte y manipulación de equipos sensibles y de alto valor con embalaje específico, trazabilidad e indicadores de impacto que registran posibles golpes.',
    applications: ['Equipamiento médico', 'Equipos tecnológicos', 'Instrumental sensible'],
    features: ['Indicadores de impacto ShockWatch 50G', 'Trazabilidad del envío', 'Gestión y registro de incidencias'],
    advantages: ['Control de cada manipulación', 'Detección de golpes', 'Tranquilidad para el cliente'],
    related: ['embalaje', 'manipulacion-especial', 'temperatura-controlada'],
    palex: {
      applications: ['Equipamiento médico y hospitalario', 'Equipos tecnológicos', 'Instrumental sensible'],
    },
  },
  {
    slug: 'manipulacion-especial',
    name: 'Manipulación especial',
    category: 'especiales',
    needs: ['alto-valor'],
    image: 'laboratorio',
    keywords: 'carga descarga posicionamiento cuidado',
    summary: 'Carga, descarga y posicionamiento de mercancía que requiere cuidados particulares.',
    offer: 'Carga, descarga y posicionamiento de mercancía que necesita medios o cuidados particulares, planificados antes de la operación.',
    applications: ['Equipos voluminosos o delicados', 'Entregas en espacios de acceso complejo', 'Instalaciones técnicas'],
    features: ['Estudio previo de la operación', 'Medios de manipulación según el caso', 'Ejecución según plan acordado'],
    advantages: ['Menos riesgos en la entrega', 'Operación planificada', 'Coordinación en destino'],
    related: ['equipos-de-alto-valor', 'operaciones-especiales', 'embalaje'],
  },
  {
    slug: 'operaciones-especiales',
    name: 'Operaciones especiales',
    category: 'especiales',
    needs: ['a-medida', 'alto-valor'],
    image: 'transporte2',
    keywords: 'puntuales fuera de estándar',
    summary: 'Operaciones puntuales con requisitos fuera de lo estándar.',
    offer: 'Operaciones logísticas puntuales con requisitos que no encajan en un servicio estándar: estudio, plan, ejecución y cierre.',
    applications: ['Traslados puntuales', 'Proyectos con fechas críticas', 'Mercancía con requisitos singulares'],
    features: ['Estudio de la mercancía y del entorno', 'Plan de embalaje, manipulación y transporte', 'Confirmación de entrega'],
    advantages: ['Una solución para cada caso', 'Planificación antes de moverse', 'Un responsable de la operación'],
    related: ['soluciones-personalizadas', 'manipulacion-especial', 'express'],
  },
  {
    slug: 'soluciones-personalizadas',
    name: 'Soluciones personalizadas',
    category: 'especiales',
    needs: ['a-medida'],
    image: 'consultoria',
    keywords: 'combinación servicios caso concreto',
    summary: 'Combinación de servicios definida para un caso concreto.',
    offer: 'Combinamos transporte, almacenaje, embalaje y manipulación en una solución definida para el caso concreto de cada cliente.',
    applications: ['Necesidades que combinan varios servicios', 'Proyectos nuevos', 'Operaciones con requisitos propios'],
    features: ['Alcance definido con el cliente', 'Servicios combinables', 'Un único interlocutor'],
    advantages: ['Sin adaptar tu operación al proveedor', 'Coordinación simplificada', 'Solución escalable'],
    related: ['operaciones-especiales', 'proyectos-a-medida', 'diseno-de-operacion-a-medida'],
  },

  // ——— 04 EVENTOS Y CONGRESOS ———
  {
    slug: 'distribucion-de-material',
    name: 'Distribución de material para eventos',
    category: 'eventos',
    needs: ['eventos', 'distribucion'],
    image: 'eventos2',
    keywords: 'congreso feria material corporativo técnico documental',
    summary: 'Material corporativo, técnico o documental en cada punto de entrega.',
    offer: 'Distribución del material corporativo, técnico o documental a cada sede, sala o stand en la ventana de entrega asignada.',
    applications: ['Congresos', 'Ferias y exposiciones', 'Eventos corporativos'],
    features: ['Entregas por destino y ventana horaria', 'Material técnico y documental', 'Coordinación de accesos'],
    advantages: ['Todo a tiempo antes de la apertura', 'Un solo coordinador', 'Menos gestiones para la organización'],
    related: ['distribucion-de-merchandising', 'montaje-y-desmontaje', 'almacenaje-para-eventos'],
  },
  {
    slug: 'distribucion-de-merchandising',
    name: 'Distribución de merchandising',
    category: 'eventos',
    needs: ['eventos', 'distribucion'],
    image: 'ecommerce',
    keywords: 'merchandising regalos promocional',
    summary: 'Merchandising preparado y entregado donde y cuando se necesita.',
    offer: 'Almacenaje, preparación y entrega de merchandising para eventos, campañas y puntos de venta.',
    applications: ['Stands de feria', 'Kits de bienvenida', 'Campañas promocionales'],
    features: ['Preparación por destino', 'Almacenaje entre eventos', 'Entrega coordinada'],
    advantages: ['Material listo en el momento justo', 'Control del stock promocional', 'Menos desplazamientos propios'],
    related: ['preparacion-de-kits-para-eventos', 'manipulados', 'distribucion-de-material'],
  },
  {
    slug: 'preparacion-de-kits-para-eventos',
    name: 'Preparación de kits y lotes',
    category: 'eventos',
    needs: ['eventos', 'almacenaje'],
    image: 'logistica2',
    keywords: 'kits lotes stand sala ponente asistente',
    summary: 'Kits y lotes por stand, sala, ponente o asistente.',
    offer: 'Preparación de kits y lotes por stand, sala, ponente o asistente, etiquetados para una entrega sin confusiones.',
    applications: ['Documentación de congresos', 'Kits de asistentes', 'Material por sala o stand'],
    features: ['Kits por destinatario', 'Etiquetado por destino', 'Control de cantidades'],
    advantages: ['Entrega ordenada', 'Menos trabajo in situ', 'Cantidades correctas'],
    related: ['distribucion-de-merchandising', 'manipulados', 'montaje-y-desmontaje'],
  },
  {
    slug: 'montaje-y-desmontaje',
    name: 'Montaje y desmontaje',
    category: 'eventos',
    needs: ['eventos'],
    image: 'eventos',
    keywords: 'montaje stand desmontaje retirada',
    summary: 'Montaje del material en destino y retirada ordenada al terminar.',
    offer: 'Montaje del material en destino antes de la apertura y desmontaje ordenado al finalizar, con retorno o almacenaje.',
    applications: ['Stands', 'Salas y espacios de congreso', 'Eventos itinerantes'],
    features: ['Montaje antes de la apertura', 'Desmontaje y retirada', 'Retorno o almacenaje del material'],
    advantages: ['Tiempos de montaje cumplidos', 'Material recuperado y controlado', 'Un solo equipo de principio a fin'],
    related: ['almacenaje-para-eventos', 'distribucion-de-material', 'coordinacion-logistica'],
  },
  {
    slug: 'almacenaje-para-eventos',
    name: 'Almacenaje para eventos',
    category: 'eventos',
    needs: ['eventos', 'almacenaje'],
    image: 'capacity',
    keywords: 'custodia material entre eventos',
    summary: 'Custodia del material antes, entre y después de eventos.',
    offer: 'Custodia del material de eventos —stands, merchandising, documentación— antes, entre y después de cada cita.',
    applications: ['Calendarios con varios eventos al año', 'Material de stand reutilizable', 'Stock promocional'],
    features: ['Almacenaje entre eventos', 'Inventario del material', 'Salida coordinada con el transporte'],
    advantages: ['Material siempre localizado', 'Sin espacio propio ocupado', 'Preparación rápida del siguiente evento'],
    related: ['montaje-y-desmontaje', 'almacenaje', 'distribucion-de-merchandising'],
  },
  {
    slug: 'coordinacion-logistica',
    name: 'Coordinación logística de eventos',
    category: 'eventos',
    needs: ['eventos', 'a-medida'],
    image: 'eventos2',
    keywords: 'coordinación proveedores plazos accesos planificación',
    summary: 'Un interlocutor que coordina proveedores, plazos y accesos.',
    offer: 'Planificación y coordinación de toda la logística del evento: calendario, cantidades, destinos, accesos y proveedores.',
    applications: ['Congresos con varias sedes', 'Ferias con calendario cerrado', 'Eventos corporativos'],
    features: ['Planificación logística', 'Coordinación de proveedores y accesos', 'Soporte durante el evento'],
    advantages: ['Un único interlocutor', 'Menos riesgos en fechas críticas', 'Organización centrada en el evento'],
    related: ['montaje-y-desmontaje', 'distribucion-de-material', 'preparacion-de-kits-para-eventos'],
  },

  // ——— 05 CONSULTORÍA ———
  {
    slug: 'mejora-del-transporte',
    name: 'Mejora del transporte',
    category: 'consultoria',
    needs: ['optimizacion', 'distribucion'],
    image: 'transporte2',
    keywords: 'rutas modalidades consolidación costes',
    summary: 'Revisión de rutas, modalidades, consolidación y costes de transporte.',
    offer: 'Análisis del transporte actual —rutas, modalidades, consolidación de envíos y costes— y propuesta de escenarios de mejora.',
    applications: ['Costes de transporte al alza', 'Redes de distribución nuevas', 'Planificación de la distribución'],
    features: ['Análisis de rutas y modalidades', 'Consolidación de envíos', 'Escenarios de mejora'],
    advantages: ['Decisiones basadas en datos', 'Transporte más eficiente', 'Acompañamiento en la implantación'],
    related: ['grupaje', 'mejora-logistica', 'optimizacion-de-layouts'],
  },
  {
    slug: 'optimizacion-de-layouts',
    name: 'Optimización de layouts',
    category: 'consultoria',
    needs: ['optimizacion', 'almacenaje'],
    image: 'medida',
    keywords: 'distribución almacén flujos espacio',
    summary: 'Rediseño de la distribución del almacén y sus flujos internos.',
    offer: 'Rediseño de la distribución del almacén y de sus flujos internos para aprovechar mejor el espacio y reducir recorridos.',
    applications: ['Almacenes saturados', 'Cambios de actividad', 'Nuevas instalaciones'],
    features: ['Análisis de flujos', 'Propuesta de layout', 'Montaje de estanterías asociado'],
    advantages: ['Mejor uso del espacio', 'Menos recorridos', 'Operación más ordenada'],
    related: ['montaje-de-estanterias', 'mejora-logistica', 'almacenaje'],
  },
  {
    slug: 'mejora-logistica',
    name: 'Proyectos de mejora logística',
    category: 'consultoria',
    needs: ['optimizacion'],
    image: 'logistica',
    keywords: 'diagnóstico procesos cuellos de botella',
    summary: 'Diagnóstico y plan de mejora de la operación completa.',
    offer: 'Diagnóstico de la operación logística —datos, procesos y visitas— e identificación de cuellos de botella y oportunidades, con plan de mejora.',
    applications: ['Operaciones con incidencias recurrentes', 'Crecimiento de la actividad', 'Revisión de costes'],
    features: ['Diagnóstico de procesos', 'Propuesta de escenarios', 'Seguimiento de resultados'],
    advantages: ['Visión externa con base operativa', 'Mejoras priorizadas', 'Acompañamiento hasta la implantación'],
    related: ['optimizacion-de-layouts', 'mejora-del-transporte', 'proyectos-a-medida'],
  },
  {
    slug: 'sap-hana',
    name: 'SAP HANA y SAP EWM',
    category: 'consultoria',
    needs: ['optimizacion'],
    image: 'tecnologia',
    keywords: 'sap ewm sistemas erp almacén software',
    summary: 'Experiencia en la implantación de SAP HANA y del módulo de gestión de almacenes EWM.',
    offer:
      'Experiencia en la implantación de SAP HANA y del módulo EWM en centros propios, aplicada a alinear procesos logísticos y sistema desde el diseño de la operación.',
    applications: ['Alineación de procesos y sistema', 'Proyectos de implantación', 'Revisión de procesos de almacén'],
    features: ['Experiencia en SAP HANA', 'Experiencia en SAP EWM', 'Alcance del servicio para terceros: ' + PENDING],
    advantages: ['Visión logística y de sistemas', 'Procesos coherentes con el sistema', 'Experiencia en operación real'],
    related: ['mejora-logistica', 'soluciones-logisticas-implantadas', 'proyectos-a-medida'],
  },
  {
    slug: 'mejora-de-embalajes',
    name: 'Mejora de embalajes',
    category: 'consultoria',
    needs: ['optimizacion', 'embalaje'],
    image: 'especiales2',
    keywords: 'embalaje volumen protección eficiencia',
    summary: 'Embalajes más adecuados, protectores y eficientes en volumen.',
    offer: 'Revisión de los embalajes actuales para hacerlos más protectores y más eficientes en volumen y en transporte.',
    applications: ['Daños recurrentes en tránsito', 'Exceso de volumen enviado', 'Nuevos productos'],
    features: ['Análisis del embalaje actual', 'Propuesta de alternativas', 'Pruebas con el producto real'],
    advantages: ['Menos daños', 'Menos volumen transportado', 'Mejor presentación'],
    related: ['embalaje', 'packing', 'mejora-del-transporte'],
  },
  {
    slug: 'proyectos-a-medida',
    name: 'Proyectos a medida',
    category: 'consultoria',
    needs: ['optimizacion', 'a-medida'],
    image: 'consultoria',
    keywords: 'proyecto personalizado alcance reto',
    summary: 'Alcance definido según el reto concreto de cada empresa.',
    offer: 'Proyectos de consultoría con un alcance definido para el reto concreto de cada empresa, del diagnóstico a la implantación.',
    applications: ['Retos que no encajan en un servicio estándar', 'Reorganización logística', 'Nuevas operaciones'],
    features: ['Diagnóstico', 'Propuesta con alcance', 'Implantación y seguimiento'],
    advantages: ['Solución ajustada al problema real', 'Un equipo con base operativa', 'Resultados revisados'],
    related: ['diseno-de-operacion-a-medida', 'mejora-logistica', 'soluciones-personalizadas'],
  },

  // ——— 06 SOLUCIONES A MEDIDA ———
  {
    slug: 'diseno-de-operacion-a-medida',
    name: 'Diseño de operación a medida',
    category: 'medida',
    needs: ['a-medida', 'optimizacion'],
    image: 'medida',
    keywords: 'solución personalizada externalización completa',
    summary: 'Una solución logística diseñada alrededor de tu operación, no al revés.',
    offer:
      'Analizamos la operación, diseñamos el modelo logístico, lo implantamos, lo gestionamos y lo optimizamos de forma continua, combinando los servicios que cada caso necesita.',
    applications: ['Externalización completa de la logística', 'Nuevos negocios o canales', 'Operaciones con requisitos propios'],
    features: ['Análisis de la operación', 'Diseño e implantación', 'Gestión y mejora continua'],
    advantages: ['Un único interlocutor', 'Solución escalable', 'Mejora continua de costes y plazos'],
    related: ['proyectos-a-medida', 'soluciones-personalizadas', 'fulfillment'],
  },

  // ——— 07 EXCEDENTES INDUSTRIALES ———
  {
    slug: 'gestion-de-excedentes',
    name: 'Gestión de excedentes industriales',
    category: 'excedentes',
    needs: ['excedentes', 'almacenaje'],
    image: 'industria',
    keywords: 'excedentes industriales gestión integral',
    summary: 'Análisis y gestión integral de material excedente.',
    offer: 'Análisis, inventario, clasificación y gestión del material excedente hasta encontrarle un nuevo destino.',
    applications: ['Cierre o cambio de líneas de producción', 'Fin de proyectos', 'Inventarios inmovilizados'],
    features: ['Inventario y documentación', 'Clasificación por tipo y estado', 'Tipologías aceptadas: ' + PENDING],
    advantages: ['Libera espacio', 'Recupera valor del material', 'Logística incluida'],
    related: ['compraventa-de-stocks', 'materiales-sobrantes', 'activos-excedentes'],
  },
  {
    slug: 'compraventa-de-stocks',
    name: 'Compra y venta de stocks',
    category: 'excedentes',
    needs: ['excedentes'],
    image: 'otros',
    keywords: 'stocks compra venta sobrantes',
    summary: 'Adquisición y comercialización de stocks que ya no se necesitan.',
    offer: 'Compra de stocks que la empresa ya no necesita y comercialización de stocks disponibles, con valoración caso a caso.',
    applications: ['Stock obsoleto o sin rotación', 'Excesos de compra', 'Liquidación de referencias'],
    features: ['Valoración del stock', 'Compra o gestión de la venta', 'Transporte al nuevo destino'],
    advantages: ['Convierte stock en liquidez', 'Sin gestiones comerciales propias', 'Operación logística resuelta'],
    related: ['gestion-de-excedentes', 'materiales-sobrantes', 'almacenaje'],
  },
  {
    slug: 'materiales-sobrantes',
    name: 'Materiales sobrantes',
    category: 'excedentes',
    needs: ['excedentes'],
    image: 'excedentes',
    keywords: 'materiales sobrantes producción proyectos',
    summary: 'Compra y venta de materiales sobrantes de producción o proyectos.',
    offer: 'Adquisición de materiales sobrantes de producción o de proyectos y búsqueda de una salida comercial para otra empresa que los necesite.',
    applications: ['Sobrantes de obra o proyecto', 'Materia prima no utilizada', 'Componentes sin uso'],
    features: ['Valoración del material', 'Clasificación y almacenaje', 'Distribución al comprador'],
    advantages: ['Recupera valor', 'Evita costes de almacenaje', 'Da una segunda vida al material'],
    related: ['compraventa-de-stocks', 'gestion-de-excedentes', 'activos-excedentes'],
  },
  {
    slug: 'activos-excedentes',
    name: 'Gestión de activos excedentes',
    category: 'excedentes',
    needs: ['excedentes', 'almacenaje'],
    image: 'capacity',
    keywords: 'activos en desuso maquinaria estanterías',
    summary: 'Activos y materiales en desuso, inventariados y gestionados.',
    offer: 'Inventario, retirada, custodia y gestión de activos y materiales en desuso hasta su venta o nuevo destino.',
    applications: ['Equipamiento en desuso', 'Instalaciones que se desmontan', 'Traslados de planta'],
    features: ['Inventario de activos', 'Retirada y almacenaje', 'Gestión de la venta o destino'],
    advantages: ['Espacio liberado', 'Activos controlados', 'Un solo interlocutor'],
    related: ['montaje-de-estanterias', 'gestion-de-excedentes', 'materiales-sobrantes'],
  },
];

/* — Ayudas — */
export const getCategory = (key: CategoryKey) => categories.find((c) => c.key === key)!;
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
export const itemsOf = (key: CategoryKey) => items.filter((i) => i.category === key);
export const getItem = (slug: string) => items.find((i) => i.slug === slug);

/** Aplica los textos propios de la marca cuando la versión muestra branding. */
export const localize = (item: CatalogItem, branded: boolean): CatalogItem =>
  branded && item.palex ? { ...item, ...item.palex } : item;
export const localizeCategory = (c: Category, branded: boolean): Category =>
  branded && c.palex ? { ...c, ...c.palex } : c;

/** Servicios relacionados: los declarados y, si faltan, de la misma categoría. */
export const relatedOf = (item: CatalogItem, max = 3): CatalogItem[] => {
  const declared = (item.related ?? []).map(getItem).filter((i): i is CatalogItem => !!i);
  const extra = itemsOf(item.category).filter((i) => i.slug !== item.slug && !declared.includes(i));
  return [...declared, ...extra].slice(0, max);
};

/** Necesidades que aparecen en algún servicio (para los filtros). */
export const usedNeeds = (Object.keys(needs) as NeedKey[]).filter((n) => items.some((i) => i.needs.includes(n)));
