/**
 * Capacidades tecnológicas.
 * `confirmed: false` → se muestra [CONFIRMAR TECNOLOGÍA] junto al detalle.
 * Solo SAP HANA figura como confirmado en el briefing de la empresa.
 */
import type { IconName } from './icons';

export interface TechCapability {
  title: string;
  text: string;
  icon: IconName;
  confirmed: boolean;
  detail?: string;
}

export const technology: TechCapability[] = [
  { title: 'SAP HANA', text: 'Experiencia en procesos logísticos sobre SAP HANA: configuración, integración y mejora.', icon: 'database', confirmed: true },
  { title: 'Trazabilidad', text: 'Registro de cada movimiento de la mercancía, de la entrada a la entrega.', icon: 'trace', confirmed: false, detail: 'Sistema y alcance de trazabilidad' },
  { title: 'Gestión de pedidos', text: 'Recepción, priorización y estado de los pedidos de cada cliente.', icon: 'manage', confirmed: false, detail: 'Herramienta de gestión de pedidos' },
  { title: 'Control logístico', text: 'Control de stock, ubicaciones y tareas en almacén.', icon: 'warehouse', confirmed: false, detail: 'Sistema de gestión de almacén (SGA/WMS)' },
  { title: 'Integración de sistemas', text: 'Conexión con los sistemas del cliente para intercambiar pedidos, stock y estados.', icon: 'integration', confirmed: false, detail: 'Métodos de integración (EDI, API, ficheros)' },
  { title: 'Seguimiento de operaciones', text: 'Visibilidad del estado de envíos y operaciones.', icon: 'monitor', confirmed: false, detail: 'Portal o canal de seguimiento para clientes' },
  { title: 'Datos', text: 'Información operativa para tomar decisiones sobre la cadena.', icon: 'data', confirmed: false, detail: 'Informes y KPIs disponibles' },
  { title: 'Optimización', text: 'Análisis de procesos, rutas y espacios para mejorar la operación.', icon: 'chart', confirmed: false, detail: 'Herramientas de optimización' },
];
