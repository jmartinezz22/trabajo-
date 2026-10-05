/**
 * Capacidades tecnológicas.
 * `confirmed: true`  → experiencia con evidencia pública verificada.
 * `confirmed: false` → se muestra [CONFIRMAR TECNOLOGÍA] junto al detalle.
 */
import type { IconName } from './icons';

export interface TechCapability {
  id: string;
  title: string;
  text: string;
  icon: IconName;
  confirmed: boolean;
  detail?: string;
}

export const technology: TechCapability[] = [
  {
    id: 'trazabilidad',
    title: 'Trazabilidad',
    text: 'Seguimiento de materiales y movimientos con tecnología RFID y sistemas de trazabilidad.',
    icon: 'trace',
    confirmed: true,
  },
  {
    id: 'automatizacion',
    title: 'Automatización',
    text: 'Automatización de almacenes y de procesos logísticos para reducir tareas manuales.',
    icon: 'implant',
    confirmed: true,
  },
  {
    id: 'sap',
    title: 'SAP HANA y SAP EWM',
    text: 'Experiencia en la implantación de SAP HANA y del módulo de gestión de almacenes EWM en centros propios.',
    icon: 'database',
    confirmed: true,
  },
  {
    id: 'reposicion',
    title: 'Reposición inteligente',
    text: 'Gestión de stock por doble cajón con lectura RFID (Dyane SmartKanban).',
    icon: 'rack',
    confirmed: true,
  },
  {
    id: 'alto-valor',
    title: 'Control de material de alto valor',
    text: 'Acceso y registro de consumo de material de alto valor (Dyane SmartCabinet).',
    icon: 'shield',
    confirmed: true,
  },
  {
    id: 'impacto',
    title: 'Control de impactos',
    text: 'Indicadores de impacto ShockWatch 50G para detectar y registrar golpes en equipos sensibles.',
    icon: 'impact',
    confirmed: true,
  },
  {
    id: 'integracion',
    title: 'Integración de sistemas',
    text: 'Conexión con los sistemas del cliente para intercambiar pedidos, stock y estados.',
    icon: 'integration',
    confirmed: false,
    detail: 'Métodos de integración con terceros (EDI, API, ficheros)',
  },
  {
    id: 'seguimiento',
    title: 'Seguimiento para clientes',
    text: 'Visibilidad del estado de envíos y operaciones para el cliente.',
    icon: 'monitor',
    confirmed: false,
    detail: 'Portal o canal de seguimiento',
  },
];

/** Soluciones propias de la división de Logística Hospitalaria (verificadas). */
export const ownSolutions = [
  { name: 'Dyane SmartKanban', text: 'Gestión de almacenes de planta por doble cajón con RFID.' },
  { name: 'Dyane SmartCabinet', text: 'Armario RFID para control de acceso y consumo de material de alto valor.' },
  { name: 'Dyane Captis', text: 'Digitalización del registro de implantes y explotación de datos.' },
];
