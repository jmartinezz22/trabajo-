/**
 * Registro central de fotografía (Pexels, licencia libre de uso comercial).
 *
 * Todas son IMÁGENES DE CONTEXTO relacionadas con cada servicio o sector:
 * no representan instalaciones, flota ni personal propios.
 *
 *  - Las imágenes se sirven desde el CDN de Pexels con enlace directo.
 *  - `npm run images` las descarga y genera versiones AVIF/WebP locales
 *    (manifiesto images.local.json); a partir de ahí se sirven en local.
 *  - Foto propia: dejar public/images/source/<clave>.jpg y ejecutar `npm run images`.
 *  - Revisión rápida de todas las fotos: página /revision-imagenes/.
 */
import local from './images.local.json';

export interface PhotoSlot {
  /** Id de la foto en Pexels (pexels.com/photo/<id>). */
  pexels: number;
  alt: string;
  credit: string | null;
  /** Encuadre CSS object-position. */
  position?: string;
  /** true = imagen ilustrativa, no instalación propia. */
  contextual: boolean;
}

export const photos = {
  // Portada y capacidad
  hero: { pexels: 2804929, alt: 'Vista aérea de un centro logístico con camiones en los muelles', credit: 'Marcin Jozwiak', position: '50% 50%', contextual: true },
  capacity: { pexels: 4481326, alt: 'Almacén moderno con estanterías ordenadas', credit: 'Tiger Lily', position: '50% 50%', contextual: true },

  // Servicios
  transporte: { pexels: 6563903, alt: 'Camión de mercancías en carretera', credit: null, position: '50% 55%', contextual: true },
  transporte2: { pexels: 2800121, alt: 'Vista aérea de camiones estacionados en un centro de distribución', credit: 'Marcin Jozwiak', position: '50% 50%', contextual: true },
  frio: { pexels: 9784111, alt: 'Mercancía almacenada en cámara frigorífica', credit: null, position: '50% 50%', contextual: true },
  logistica: { pexels: 4481327, alt: 'Pasillo de almacén con estanterías y mercancía preparada', credit: 'Tiger Lily', position: '50% 50%', contextual: true },
  logistica2: { pexels: 4483942, alt: 'Operario escaneando productos en un almacén', credit: 'Tiger Lily', position: '50% 40%', contextual: true },
  especiales: { pexels: 7089017, alt: 'Equipo de resonancia magnética en una sala hospitalaria', credit: null, position: '50% 50%', contextual: true },
  especiales2: { pexels: 7857523, alt: 'Embalaje cuidadoso de un pedido en caja de cartón', credit: null, position: '50% 50%', contextual: true },
  eventos: { pexels: 207716, alt: 'Asistentes en un congreso profesional', credit: null, position: '50% 50%', contextual: true },
  eventos2: { pexels: 8761324, alt: 'Grupo de profesionales en una sala de conferencias', credit: null, position: '50% 50%', contextual: true },
  excedentes: { pexels: 8803230, alt: 'Interior de una planta industrial siderúrgica', credit: null, position: '50% 50%', contextual: true },
  consultoria: { pexels: 4484155, alt: 'Responsable de operaciones con tableta en un almacén', credit: 'Tiger Lily', position: '50% 35%', contextual: true },
  medida: { pexels: 4483610, alt: 'Almacén amplio con suelo de hormigón y estanterías', credit: 'Tiger Lily', position: '50% 50%', contextual: true },

  // Catálogo (nuevas)
  picking: { pexels: 1267338, alt: 'Interior de almacén con operarios manipulando cajas en estanterías', credit: null, position: '50% 50%', contextual: true },
  ecografo: { pexels: 7108402, alt: 'Equipo de ecografía de alta tecnología en una consulta médica', credit: null, position: '50% 50%', contextual: true },

  // Tecnología
  tecnologia: { pexels: 4508751, alt: 'Racks de servidores en un centro de datos', credit: null, position: '50% 50%', contextual: true },

  // Sectores
  pharma: { pexels: 3735709, alt: 'Científica trabajando en un laboratorio', credit: null, position: '50% 40%', contextual: true },
  industria: { pexels: 8803230, alt: 'Interior de una planta industrial', credit: null, position: '50% 50%', contextual: true },
  ecommerce: { pexels: 7857523, alt: 'Preparación y embalaje de un pedido online', credit: null, position: '50% 50%', contextual: true },
  distribucion: { pexels: 6170458, alt: 'Paquetes dentro de una furgoneta de reparto', credit: null, position: '50% 50%', contextual: true },
  equipamiento: { pexels: 7089017, alt: 'Equipamiento sanitario de alta tecnología', credit: null, position: '50% 50%', contextual: true },
  otros: { pexels: 5156696, alt: 'Cajas en estanterías de un almacén', credit: null, position: '50% 50%', contextual: true },

  // Healthcare (caso real: imágenes ilustrativas)
  hospital: { pexels: 4094199, alt: 'Pasillo de un hospital moderno', credit: 'Sandy Torchon', position: '50% 50%', contextual: true },
  laboratorio: { pexels: 8442105, alt: 'Profesionales sanitarios en un laboratorio', credit: null, position: '50% 50%', contextual: true },

  // Otras páginas
  empresa: { pexels: 5156696, alt: 'Almacén con cajas organizadas en estanterías', credit: null, position: '50% 50%', contextual: true },
  sostenibilidad: { pexels: 2800121, alt: 'Camiones en un centro de distribución', credit: 'Marcin Jozwiak', position: '50% 50%', contextual: true },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof photos;
/** Alias heredado. */
export type ImageKey = PhotoKey;

export interface LocalVariant { avif: string; webp: string; width: number; height: number; widths: number[] }
const manifest = local as Record<string, LocalVariant>;

export const getLocal = (key: PhotoKey): LocalVariant | undefined => manifest[key];
export const remoteUrl = (id: number, w: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
export const REMOTE_WIDTHS = [800, 1400, 2200];
export const sourcePage = (id: number) => `https://www.pexels.com/photo/${id}/`;
