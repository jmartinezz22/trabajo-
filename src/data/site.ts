/**
 * Datos del servicio. La web se presenta como servicio, sin marca;
 * la sociedad titular (legalName) solo aparece en los textos legales.
 *
 * Solo contiene DATOS VERIFICADOS (ver docs/03-registro-de-datos.md).
 * Un campo `null` = dato no encontrado: la web muestra el marcador pendiente
 * y lo omite en Schema.org. No añadir teléfonos, emails ni direcciones no verificados.
 */

export const PENDING = '[DATOS PENDIENTES DE CONFIRMAR]';

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
}

export interface Phone {
  label: string;
  number: string;
}

/** Franja horaria "HH:MM"–"HH:MM" (hora de España peninsular). */
export type TimeRange = [string, string];
/** Lunes = 0 … Domingo = 6. Día sin franjas = cerrado. */
export type WeeklyHours = [TimeRange[], TimeRange[], TimeRange[], TimeRange[], TimeRange[], TimeRange[], TimeRange[]];

export interface Location {
  label: string;
  address: Address;
  phone?: Phone;
  /** Horario de atención. null = no confirmado (no inventar). */
  hours: WeeklyHours | null;
}

const headquarters: Address = {
  street: 'C/ Jesús Serra Santamans, 5',
  postalCode: '08174',
  city: 'Sant Cugat del Vallès',
  region: 'Barcelona',
  country: 'ES',
};

const centralWarehouse: Address = {
  street: 'Ctra. del Mig, 57-61',
  postalCode: '08940',
  city: 'Cornellà de Llobregat',
  region: 'Barcelona',
  country: 'ES',
};

export const site = {
  name: 'Soluciones Logísticas',
  legalName: 'PALEX MEDICAL, S.A.',
  taxId: null as string | null, // No verificado: no publicar hasta confirmación
  tagline: 'Soluciones logísticas integrales adaptadas a cada operación',
  description:
    'Logística, transporte, tecnología y trazabilidad para operaciones complejas. Experiencia en soluciones logísticas hospitalarias desde 1998 y soluciones diseñadas a medida de cada cliente.',
  locale: 'es_ES',
  lang: 'es',

  /** Inicio de la división de Logística Hospitalaria e Ingeniería (verificado). */
  hospitalLogisticsSince: 1998,

  contact: {
    /** Teléfono principal de la web (CTA, cabecera, Schema.org). */
    phone: { label: 'Teléfono general', number: '+34 934 006 500' } as Phone,
    customerService: { label: 'Atención al cliente', number: '900 180 132' } as Phone,
    email: null as string | null, // No encontrado: no inventar
    address: headquarters as Address | null,
    hours: null as string | null, // No encontrado
  },

  locations: [
    /*
     * Horario: [DATOS PENDIENTES DE CONFIRMAR]. Ejemplo de formato cuando se confirme:
     * hours: [[['08:00', '14:00'], ['15:00', '18:00']], …(7 días)…, []]
     */
    { label: 'Sede central', address: headquarters, phone: { label: 'Teléfono general', number: '+34 934 006 500' }, hours: null },
    { label: 'Almacén central', address: centralWarehouse, phone: { label: 'Almacén', number: '900 181 753' }, hours: null },
  ] as Location[],

  social: {
    linkedin: null as string | null, // No verificado para esta web
  },

  /** Endpoint del formulario (ver .env.example). */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined,
} as const;

export const yearsSince = (year: number) => new Date().getFullYear() - year;
export const telHref = (phone: string) => `tel:${phone.startsWith('+') ? '' : '+34'}${phone.replace(/[^+\d]/g, '')}`;
export const mapsQuery = (a: Address) => encodeURIComponent(`${a.street}, ${a.postalCode} ${a.city}, ${a.region}, España`);
export const mapsEmbedUrl = (a: Address) => `https://maps.google.com/maps?q=${mapsQuery(a)}&z=15&output=embed`;
export const mapsDirectionsUrl = (a: Address) => `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery(a)}`;
export const formatAddress = (a: Address) => `${a.street}, ${a.postalCode} ${a.city} (${a.region})`;
