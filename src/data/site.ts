/**
 * Datos corporativos de PALEX MEDICAL.
 *
 * REGLA: no se publica ningún dato que no haya confirmado la empresa.
 * Mientras un campo valga `null`, la web muestra el marcador [PENDIENTE DE CONFIRMAR]
 * y omite ese dato en Schema.org. Para publicarlo basta con rellenarlo aquí.
 */

export const PENDING = '[DATOS PENDIENTES DE CONFIRMAR]';

export interface Address {
  street: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
}

export const site = {
  name: 'PALEX MEDICAL',
  legalName: null as string | null, // [CONFIRMAR] Razón social exacta de la entidad que presta los servicios
  taxId: null as string | null, // [CONFIRMAR] CIF
  tagline: 'Soluciones logísticas integrales adaptadas a cada cliente',
  description:
    'Transporte, almacenaje, distribución, servicios especiales, eventos, excedentes industriales y consultoría logística para empresas. Soluciones diseñadas a medida de cada operación.',
  locale: 'es_ES',
  lang: 'es',

  contact: {
    phone: null as string | null, // [CONFIRMAR] p. ej. '+34 900 000 000'
    email: null as string | null, // [CONFIRMAR] p. ej. 'comercial@dominio.es'
    address: null as Address | null, // [CONFIRMAR]
    hours: null as string | null, // [CONFIRMAR] Horario de atención comercial
  },

  social: {
    linkedin: null as string | null, // [CONFIRMAR] URL de la página de empresa
  },

  /** Endpoint del formulario (ver .env.example). */
  formEndpoint: import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined,
} as const;

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;
