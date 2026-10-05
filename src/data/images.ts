/**
 * Registro central de fotografía.
 *
 * Fotos de Unsplash (licencia libre de uso comercial) usadas como IMÁGENES DE CONTEXTO:
 * ninguna representa instalaciones, flota ni personal propios de PALEX MEDICAL.
 *
 * Funcionamiento:
 *  - Desarrollo: si no existe la versión local, la imagen se carga desde Unsplash.
 *  - Producción: `npm run images` descarga cada foto y genera AVIF/WebP en /public/images
 *    (manifiesto: images.local.json). La web pasa a servirlas en local automáticamente.
 *  - Fotografía real de PALEX: dejar `public/images/source/<slot>.jpg`, ejecutar
 *    `npm run images` y marcar `contextual: false`.
 */
import local from './images.local.json';

export interface PhotoSlot {
  /** Id de la foto en Unsplash (unsplash.com/photos/<id>). */
  unsplash: string;
  alt: string;
  credit: string | null;
  /** Encuadre CSS object-position. */
  position?: string;
  /** true = imagen ilustrativa, no instalación propia. */
  contextual: boolean;
}

export const photos = {
  // Portada y capacidad
  hero: { unsplash: '0A_XOIocfrE', alt: 'Camión de mercancías en autopista al atardecer', credit: 'Jonas Augustin', position: '50% 60%', contextual: true },
  capacity: { unsplash: 'wHfvgx506PM', alt: 'Almacén de gran superficie con racks industriales ordenados', credit: 'Rack Manufacturing Expert', position: '50% 50%', contextual: true },
  // Transporte
  transporte: { unsplash: 'J2FWLr43GIk', alt: 'Camión circulando por autopista de noche', credit: 'Jason Leung', position: '50% 55%', contextual: true },
  transporte2: { unsplash: 'S9KZmxx3OJE', alt: 'Camión de mercancías en carretera', credit: null, position: '50% 50%', contextual: true },
  // Logística
  logistica: { unsplash: 'If5vloAJSBQ', alt: 'Estanterías de almacén con cajas preparadas', credit: 'Brayden Prato', position: '50% 50%', contextual: true },
  logistica2: { unsplash: '1Elnip2SeM8', alt: 'Pasillo de almacén con estanterías alineadas', credit: 'Brian Wangenheim', position: '50% 50%', contextual: true },
  // Servicios especiales
  especiales: { unsplash: 'RqZ-xGRnCYI', alt: 'Caja embalada con cinta de mercancía frágil', credit: 'Ari Sha', position: '50% 50%', contextual: true },
  especiales2: { unsplash: 'YiSD-1eJ_1g', alt: 'Manipulación cuidadosa de una caja frágil', credit: 'jesse ramirez', position: '50% 50%', contextual: true },
  // Eventos y congresos
  eventos: { unsplash: 'l0SiVK5WBH0', alt: 'Auditorio preparado para un congreso', credit: 'Evan Jeung', position: '50% 50%', contextual: true },
  eventos2: { unsplash: 'nwLTVwb7DbU', alt: 'Asistentes en un congreso profesional', credit: 'Evangeline Shaw', position: '50% 40%', contextual: true },
  // Excedentes
  excedentes: { unsplash: '2E22hMX-e00', alt: 'Material metálico industrial apilado de forma ordenada', credit: 'ZENG YILI', position: '50% 50%', contextual: true },
  // Consultoría y tecnología
  consultoria: { unsplash: 'O0jOMufR1_g', alt: 'Equipo analizando datos de una operación frente a una pantalla', credit: 'Walls.io', position: '50% 50%', contextual: true },
  tecnologia: { unsplash: 'KdS8ZwvCq0k', alt: 'Almacén con maquinaria automatizada', credit: null, position: '50% 50%', contextual: true },
  // Healthcare
  hospital: { unsplash: 'jhSkpyCwJI0', alt: 'Pasillo de hospital iluminado', credit: 'Fabio Sasso', position: '50% 50%', contextual: true },
  hospital2: { unsplash: 'CjgwW0VR3d0', alt: 'Habitación hospitalaria con monitor', credit: 'Frederic Köberl', position: '50% 50%', contextual: true },
  pharma: { unsplash: 'mLaIFEtUZFs', alt: 'Estantería con medicamentos', credit: 'David Trinks', position: '50% 50%', contextual: true },
  // Empresa y sostenibilidad
  empresa: { unsplash: 'CjV322K-pdA', alt: 'Fachada de edificio corporativo de noche', credit: 'Mike Hindle', position: '50% 50%', contextual: true },
  rutas: { unsplash: 'qms-kprAgJM', alt: 'Camiones en autopista al atardecer', credit: 'Vitalii Onyshchuk', position: '50% 55%', contextual: true },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof photos;

export interface LocalVariant { avif: string; webp: string; width: number; height: number; widths: number[] }
const manifest = local as Record<string, LocalVariant>;

export const getLocal = (key: PhotoKey): LocalVariant | undefined => manifest[key];
export const remoteUrl = (id: string, w: number) => `https://unsplash.com/photos/${id}/download?w=${w}`;
export const REMOTE_WIDTHS = [800, 1400, 2200];
