/**
 * Registro central de imágenes.
 *
 * Cada "slot" representa un hueco visual de la web. Mientras `src` sea null,
 * se muestra una composición gráfica técnica (ver components/Visual.astro)
 * en lugar de fotografía de stock, para no sugerir instalaciones, flota o
 * personal que no estén confirmados.
 *
 * Para usar fotografía real de PALEX MEDICAL:
 *   1. Copiar el archivo optimizado a /public/images/ (WebP/AVIF, ≤ 2400 px de ancho).
 *   2. Rellenar `src`, `width`, `height` y `alt` del slot.
 *   3. Si la foto es conceptual (no propia), marcar `contextual: true`
 *      y se mostrará la etiqueta "Imagen de contexto".
 */

export type ArtVariant = 'network' | 'racks' | 'cold' | 'flow' | 'stack' | 'grid' | 'event' | 'precision';

export interface ImageSlot {
  src: string | null;
  width?: number;
  height?: number;
  alt: string;
  contextual?: boolean;
  /** Composición gráfica que se usa mientras no haya fotografía. */
  art: ArtVariant;
}

export const images = {
  hero: {
    src: null,
    alt: 'Red de distribución: rutas que conectan almacén, transporte y destino',
    art: 'network',
  },
  capacity: { src: null, alt: 'Fases de una operación logística integrada', art: 'flow' },
  transporte: { src: null, alt: 'Transporte de mercancías por carretera', art: 'network' },
  logistica: { src: null, alt: 'Almacén con estanterías y zonas de preparación de pedidos', art: 'racks' },
  excedentes: { src: null, alt: 'Lotes de material clasificados para su gestión y venta', art: 'stack' },
  especiales: { src: null, alt: 'Embalaje a medida de un equipo de alto valor', art: 'precision' },
  eventos: { src: null, alt: 'Preparación logística de material para un congreso', art: 'event' },
  consultoria: { src: null, alt: 'Análisis de layout y flujos de un almacén', art: 'grid' },
  frio: { src: null, alt: 'Control de temperatura durante el transporte', art: 'cold' },
  medida: { src: null, alt: 'Diseño de una solución logística a medida', art: 'grid' },
  tecnologia: { src: null, alt: 'Seguimiento de operaciones y datos logísticos', art: 'flow' },
  sostenibilidad: { src: null, alt: 'Consolidación de cargas y optimización de rutas', art: 'network' },
} satisfies Record<string, ImageSlot>;

export type ImageKey = keyof typeof images;
