/**
 * Datos corporativos de PALEX MEDICAL.
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

export interface Location {
  label: string;
  address: Address;
  phone?: Phone;
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
  name: 'PALEX MEDICAL',
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
    { label: 'Sede central', address: headquarters, phone: { label: 'Teléfono general', number: '+34 934 006 500' } },
    { label: 'Almacén central', address: centralWarehouse, phone: { label: 'Almacén', number: '900 181 753' } },
  ] as Location[],

  social: {
    linkedin: null as string | null, // No verificado para esta web
  },

  /** Endpoint del formulario (ver .env.example). */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined,
} as const;

export const yearsSince = (year: number) => new Date().getFullYear() - year;
export const telHref = (phone: string) => `tel:${phone.startsWith('+') ? '' : '+34'}${phone.replace(/[^+\d]/g, '')}`;
export const formatAddress = (a: Address) => `${a.street}, ${a.postalCode} ${a.city} (${a.region})`;
