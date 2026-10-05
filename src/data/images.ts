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
  hero: { unsplash: 'scKZFa9oW_Q', alt: 'Pasillo de almacén con estanterías en penumbra', credit: 'Alex Durynin', position: '50% 50%', contextual: true },
  capacity: { unsplash: 'WKMOPVvlLvo', alt: 'Almacén de gran superficie con mercancía paletizada', credit: 'Junseong Lee', position: '50% 50%', contextual: true },
  transporte: { unsplash: 'J2FWLr43GIk', alt: 'Camión circulando por autopista de noche', credit: 'Jason Leung', position: '50% 55%', contextual: true },
  logistica: { unsplash: 'If5vloAJSBQ', alt: 'Estanterías de almacén con cajas preparadas', credit: 'Brayden Prato', position: '50% 50%', contextual: true },
  especiales: { unsplash: 'UTT39aMPxwg', alt: 'Cajas de madera para transporte de mercancía', credit: null, position: '50% 50%', contextual: true },
  eventos: { unsplash: 'l0SiVK5WBH0', alt: 'Auditorio vacío preparado para un congreso', credit: 'Evan Jeung', position: '50% 50%', contextual: true },
  excedentes: { unsplash: 'OnbSOhz0oig', alt: 'Almacén con palés de material', credit: null, position: '50% 50%', contextual: true },
  consultoria: { unsplash: '7imAsr-cUa8', alt: 'Detalle arquitectónico de un edificio moderno', credit: 'Sebastian Schuster', position: '50% 50%', contextual: true },
  hospital: { unsplash: 'jhSkpyCwJI0', alt: 'Pasillo de hospital iluminado', credit: 'Fabio Sasso', position: '50% 50%', contextual: true },
  tecnologia: { unsplash: 'KdS8ZwvCq0k', alt: 'Almacén con maquinaria automatizada', credit: null, position: '50% 50%', contextual: true },
  pharma: { unsplash: 'mLaIFEtUZFs', alt: 'Estantería con medicamentos', credit: 'David Trinks', position: '50% 50%', contextual: true },
  empresa: { unsplash: 'CjV322K-pdA', alt: 'Fachada de edificio corporativo de noche', credit: 'Mike Hindle', position: '50% 50%', contextual: true },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof photos;

export interface LocalVariant { avif: string; webp: string; width: number; height: number; widths: number[] }
const manifest = local as Record<string, LocalVariant>;

export const getLocal = (key: PhotoKey): LocalVariant | undefined => manifest[key];
export const remoteUrl = (id: string, w: number) => `https://unsplash.com/photos/${id}/download?w=${w}`;
export const REMOTE_WIDTHS = [800, 1400, 2200];
