/**
 * catalogConfig — configuración central de las dos versiones del catálogo.
 *
 * Un único sistema (mismos datos, componentes, buscador, filtros y fichas)
 * que se publica con dos identidades:
 *   - palex  → /catalogo/palex/   Identidad corporativa PALEX MEDICAL.
 *   - neutro → /catalogo/neutro/  White label: sin ninguna referencia a la marca.
 *
 * Para cambiar logo, colores, contacto, SEO o favicon de una versión basta con
 * editar su bloque aquí. Ningún componente contiene datos de marca.
 *
 * Variables de entorno (ver .env.example):
 *   PUBLIC_CONTACT_EMAIL          Email de contacto de la versión neutra (CONTACT_EMAIL).
 *   PUBLIC_PALEX_CONTACT_EMAIL    Sustituye el email de la versión PALEX.
 *   PUBLIC_CATALOGS               Versiones a generar: "palex,neutro" (por defecto),
 *                                 "neutro" para desplegar solo el white label en otro dominio.
 */

export type BrandId = 'palex' | 'neutro';

export interface CatalogConfig {
  id: BrandId;
  /** Segmento de URL: /catalogo/<slug>/ */
  slug: string;
  /** Nombre de marca. Vacío en la versión neutra. */
  brandName: string;
  /** true = muestra logo, nombre y datos de la marca. */
  showBranding: boolean;
  /** Logotipo: ruta a un SVG oficial en /public o null (se usa el wordmark tipográfico / sin logo). */
  logo: string | null;
  /** Texto que identifica el catálogo en cabecera cuando no hay logo. */
  label: string;
  /** Línea superior de la portada. */
  kicker: string;
  primaryColor: string;
  secondaryColor: string;
  /** Color de acento (botones, números, líneas activas). */
  accentColor: string;
  /** Texto sobre el color de acento. */
  onAccent: string;
  /** Acento para texto sobre fondo claro (contraste AA). */
  accentText: string;
  /** Acento para elementos sobre fondo oscuro. */
  accentSoft: string;
  inkColor: string;
  paperColor: string;
  surfaceColor: string;
  mutedColor: string;
  lineColor: string;
  fontDisplay: string;
  fontBody: string;
  fontsHref: string;
  /** Composición: palex = portada partida con panel corporativo; neutro = editorial a sangre. */
  layout: 'corporate' | 'editorial';
  /** Valores que transmite la versión (franja de la portada). */
  pillars: string[];
  /** Frase de presentación tras la portada. */
  statement: string;
  contactEmail: string;
  phone: string | null;
  phones: { label: string; number: string }[];
  address: string | null;
  socialLinks: { label: string; href: string }[];
  /** Pie de página. */
  footerNote: string;
  legalName: string | null;
  seo: { title: string; description: string; ogImage: string };
  favicon: string;
  themeColor: string;
  /** Catálogo PDF (presentación corporativa A4 horizontal). */
  pdf: {
    /** Marca espaciada de cabecera ('' = sin marca). */
    mark: string;
    dark: string;
    paper: string;
    ink: string;
    muted: string;
    line: string;
    accent: string;
    fontHead: string;
    fontBody: string;
    fontsHref: string;
    /** Texto de la portada. */
    coverText: string;
    /** Línea inferior derecha de la portada. */
    coverNote: string;
    fileName: string;
  };
}

const env = import.meta.env;

/** CONTACT_EMAIL de cada versión. No se inventan emails: la neutra queda vacía hasta configurarla. */
export const CONTACT_EMAIL: Record<BrandId, string> = {
  palex: (env.PUBLIC_PALEX_CONTACT_EMAIL as string | undefined) || 'palexmedical@palex.es',
  neutro: (env.PUBLIC_CONTACT_EMAIL as string | undefined) || '',
};

export const PENDING = '[PENDIENTE DE CONFIRMAR]';

export const catalogConfig: Record<BrandId, CatalogConfig> = {
  palex: {
    id: 'palex',
    slug: 'palex',
    brandName: 'PALEX MEDICAL',
    showBranding: true,
    // Sustituir por el SVG oficial: dejar el archivo en public/catalogo/palex-logo.svg y poner su ruta aquí.
    logo: null,
    label: 'Catálogo de servicios',
    kicker: 'PALEX MEDICAL · Catálogo de servicios logísticos',
    // [CONFIRMAR] Colores con el manual de marca de PALEX.
    primaryColor: '#0b2f55',
    secondaryColor: '#0a7cc1',
    accentColor: '#0a7cc1',
    onAccent: '#ffffff',
    accentText: '#075e93',
    accentSoft: '#5cc3f5',
    inkColor: '#0b1f33',
    paperColor: '#f6f8fa',
    surfaceColor: '#ffffff',
    mutedColor: '#526274',
    lineColor: '#d8dee5',
    fontDisplay: "'Inter Tight', 'Inter', system-ui, sans-serif",
    fontBody: "'Inter', system-ui, sans-serif",
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
    layout: 'corporate',
    pillars: ['Healthcare', 'Logística', 'Tecnología', 'Experiencia', 'Confianza'],
    statement:
      'Experiencia en logística hospitalaria desde 1998 aplicada a cualquier operación: transporte, almacenaje, tecnología y soluciones a medida con un único interlocutor.',
    contactEmail: CONTACT_EMAIL.palex,
    phone: '+34 934 006 500',
    phones: [
      { label: 'Teléfono general', number: '+34 934 006 500' },
      { label: 'Atención al cliente', number: '900 180 132' },
    ],
    address: 'C/ Jesús Serra Santamans, 5 · 08174 Sant Cugat del Vallès (Barcelona)',
    socialLinks: [],
    footerNote: 'Catálogo de servicios logísticos de PALEX MEDICAL.',
    legalName: 'PALEX MEDICAL, S.A.',
    seo: {
      title: 'PALEX Medical | Soluciones logísticas integrales',
      description:
        'Catálogo de servicios logísticos de PALEX MEDICAL: transporte, almacenaje, servicios especiales, eventos y consultoría, con experiencia en logística hospitalaria desde 1998.',
      ogImage: '/catalogo/og-palex.png',
    },
    favicon: '/catalogo/favicon-palex.svg',
    themeColor: '#0b2f55',
    pdf: {
      mark: 'PALEX MEDICAL',
      // [CONFIRMAR] Colores con el manual de marca de PALEX.
      dark: '#0b2238',
      paper: '#f8f8f6',
      ink: '#13202c',
      muted: '#5a6672',
      line: '#d8dbdd',
      accent: '#0a7cc1',
      fontHead: "'Inter Tight', 'Helvetica Neue', Arial, sans-serif",
      fontBody: "'Source Serif 4', Georgia, serif",
      fontsHref:
        'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500&display=swap',
      coverText:
        'Transporte, almacenaje, distribución y soluciones especiales, con experiencia en logística hospitalaria desde 1998 y un único interlocutor para toda la operación.',
      coverNote: 'PALEX MEDICAL · Sant Cugat del Vallès (Barcelona)',
      fileName: 'Catalogo_Servicios_PALEX.pdf',
    },
  },

  neutro: {
    id: 'neutro',
    slug: 'neutro',
    brandName: '',
    showBranding: false,
    logo: null,
    label: 'Soluciones logísticas',
    kicker: 'Catálogo de servicios',
    primaryColor: '#111111',
    secondaryColor: '#6b6b6b',
    accentColor: '#b84a22',
    onAccent: '#ffffff',
    accentText: '#9e4220',
    accentSoft: '#f08a62',
    inkColor: '#111111',
    paperColor: '#f3f2ef',
    surfaceColor: '#ffffff',
    mutedColor: '#5c5c5c',
    lineColor: '#d9d7d2',
    fontDisplay: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
    fontBody: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
    fontsHref:
      'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=JetBrains+Mono:wght@400;500&display=swap',
    layout: 'editorial',
    pillars: ['Profesionalidad', 'Capacidad', 'Flexibilidad', 'Tecnología', 'Soluciones a medida'],
    statement:
      'Transporte, almacenaje, distribución y operaciones especiales diseñados alrededor de cada cliente. Una solución logística completa, flexible y gestionada de principio a fin.',
    contactEmail: CONTACT_EMAIL.neutro,
    phone: null,
    phones: [],
    address: null,
    socialLinks: [],
    footerNote: 'Catálogo de servicios logísticos.',
    legalName: null,
    seo: {
      title: 'Soluciones logísticas integrales | Catálogo de servicios',
      description:
        'Catálogo de soluciones logísticas para empresas: transporte, almacenaje, distribución, operaciones especiales, eventos y consultoría a medida de cada operación.',
      ogImage: '/catalogo/og-neutro.png',
    },
    favicon: '/catalogo/favicon-neutro.svg',
    themeColor: '#111111',
    pdf: {
      mark: '',
      dark: '#161616',
      paper: '#f6f5f1',
      ink: '#171717',
      muted: '#5e5e5a',
      line: '#d9d7d1',
      accent: '#b84a22',
      fontHead: "'Archivo', 'Helvetica Neue', Arial, sans-serif",
      fontBody: "'Lora', Georgia, serif",
      fontsHref:
        'https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&family=Lora:wght@400;500&display=swap',
      coverText:
        'Transporte, almacenaje, distribución y operaciones especiales diseñados alrededor de cada cliente, con un único interlocutor de principio a fin.',
      coverNote: 'Transporte · Almacenaje · Distribución · Soluciones especiales',
      fileName: 'Catalogo_Servicios_Logisticos.pdf',
    },
  },
};

/** Versiones que se generan en este despliegue (PUBLIC_CATALOGS). */
export const activeBrands: BrandId[] = ((env.PUBLIC_CATALOGS as string | undefined) || 'palex,neutro')
  .split(',')
  .map((s) => s.trim())
  .filter((s): s is BrandId => s === 'palex' || s === 'neutro');

export const getBrand = (slug: string | undefined): CatalogConfig => {
  const b = Object.values(catalogConfig).find((c) => c.slug === slug);
  if (!b) throw new Error(`Catálogo desconocido: ${slug}`);
  return b;
};

/** Construye las rutas internas de una versión. */
export const catalogPath = (b: CatalogConfig, ...parts: string[]) =>
  `/catalogo/${b.slug}/${parts.filter(Boolean).map((p) => `${p}/`).join('')}`;

/** Enlace del CTA comercial: email con asunto, o la página de contacto si no hay email configurado. */
export const proposalHref = (b: CatalogConfig, subject = 'Solicitud de propuesta') =>
  b.contactEmail
    ? `mailto:${b.contactEmail}?subject=${encodeURIComponent(subject)}`
    : catalogPath(b, 'contacto');
