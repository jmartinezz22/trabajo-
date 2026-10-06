/**
 * Sectores seleccionados a partir del análisis de mercado
 * (ver docs/01-investigacion-y-estrategia.md): se incluyen solo sectores con
 * necesidad documentada de los servicios ofrecidos.
 */
import type { IconName } from './icons';

export type SectorSlug =
  | 'pharma-healthcare'
  | 'industria'
  | 'tecnologia'
  | 'ecommerce'
  | 'distribucion'
  | 'eventos'
  | 'equipamiento'
  | 'otros-b2b';

export interface Sector {
  slug: SectorSlug;
  name: string;
  icon: IconName;
  challenge: string;
  answer: string;
  services: string[];
}

export const sectors: Sector[] = [
  {
    slug: 'pharma-healthcare',
    name: 'Pharma & Healthcare',
    icon: 'thermo',
    challenge: 'Material sanitario y producto sensible, trazabilidad exigente y entregas que no admiten error.',
    answer: 'Experiencia en logística hospitalaria desde 1998: gestión de almacenes, trazabilidad RFID, temperatura controlada y manipulación de equipos sanitarios.',
    services: ['transporte', 'logistica', 'servicios-especiales'],
  },
  {
    slug: 'industria',
    name: 'Industria',
    icon: 'layers',
    challenge: 'Cargas voluminosas, stocks inmovilizados y almacenes que crecen sin planificación.',
    answer: 'Camión completo y grupaje, gestión de excedentes, montaje de estanterías y optimización de layouts.',
    services: ['transporte', 'excedentes-industriales', 'consultoria-logistica'],
  },
  {
    slug: 'tecnologia',
    name: 'Tecnología',
    icon: 'diamond',
    challenge: 'Equipos de alto valor y frágiles, despliegues en múltiples ubicaciones.',
    answer: 'Embalaje a medida, control de impactos en equipos sensibles y distribución coordinada a varios destinos.',
    services: ['servicios-especiales', 'transporte', 'logistica'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce',
    icon: 'ecommerce',
    challenge: 'Pedidos unitarios, picos de demanda y clientes que esperan rapidez.',
    answer: 'Fulfillment completo: almacenaje, picking, packing y envío por paquetería o express.',
    services: ['logistica', 'transporte'],
  },
  {
    slug: 'distribucion',
    name: 'Distribución',
    icon: 'route',
    challenge: 'Muchas referencias, muchos destinos y márgenes ajustados.',
    answer: 'Almacenaje, preparación de pedidos y transporte con consolidación de cargas.',
    services: ['logistica', 'transporte', 'consultoria-logistica'],
  },
  {
    slug: 'eventos',
    name: 'Eventos y congresos',
    icon: 'calendar',
    challenge: 'Fechas inamovibles, material en varias sedes y montajes con horario cerrado.',
    answer: 'Preparación por destino, transporte, montaje, desmontaje y almacenaje entre eventos.',
    services: ['eventos-y-congresos', 'logistica'],
  },
  {
    slug: 'equipamiento',
    name: 'Equipamiento profesional',
    icon: 'box',
    challenge: 'Equipos pesados o delicados que requieren instalación y retirada.',
    answer: 'Transporte especial, embalaje, manipulación y, si procede, salida de equipos en desuso.',
    services: ['servicios-especiales', 'excedentes-industriales'],
  },
  {
    slug: 'otros-b2b',
    name: 'Otros sectores B2B',
    icon: 'compass',
    challenge: 'Necesidades que no encajan en ninguna categoría estándar.',
    answer: 'Analizamos la operación y diseñamos una solución específica.',
    services: ['servicios-especiales', 'consultoria-logistica'],
  },
];
