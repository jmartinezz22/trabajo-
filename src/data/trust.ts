/**
 * Registro de evidencias: controla QUÉ se puede afirmar en la web.
 *
 *  - 'verified'   → DATO VERIFICADO: se publica como hecho.
 *  - 'validation' → DATO PÚBLICO QUE REQUIERE VALIDACIÓN: se muestra como
 *                   "en validación" o no se muestra; nunca como hecho definitivo.
 *  - 'not-found'  → DATO NO ENCONTRADO: solo placeholder.
 *
 * Detalle y fuentes: docs/03-registro-de-datos.md
 */

export type EvidenceStatus = 'verified' | 'validation' | 'not-found';

export interface Certification {
  code: string;
  name: string;
  status: EvidenceStatus;
  /** Qué falta confirmar antes de publicarlo como hecho o mostrar logotipo. */
  note: string;
}

/** Certificaciones: ninguna se presenta como definitiva sin confirmar alcance,
 *  entidad certificadora, vigencia, sociedad y número de certificado. */
export const certifications: Certification[] = [
  {
    code: 'ISO 9001:2015',
    name: 'Gestión de la calidad',
    status: 'validation',
    note: 'Aparece en documentación pública anterior. Confirmar vigencia y alcance.',
  },
  {
    code: 'UNE-EN ISO 14001:2015',
    name: 'Gestión ambiental',
    status: 'validation',
    note: 'Aparece en documentación de sostenibilidad del grupo. Confirmar sociedad y alcance.',
  },
  {
    code: 'ISO 37001',
    name: 'Sistema de gestión antisoborno',
    status: 'validation',
    note: 'Confirmar sociedad titular exacta.',
  },
  {
    code: 'UNE 19601',
    name: 'Sistema de gestión de compliance penal',
    status: 'validation',
    note: 'Confirmar sociedad titular exacta.',
  },
  // GDP: NO se muestra en la web (CertList filtra 'not-found') hasta confirmación.
  {
    code: 'GDP',
    name: 'Buenas Prácticas de Distribución',
    status: 'not-found',
    note: '[CONFIRMAR CERTIFICACIÓN GDP]',
  },
];

export const CERT_PENDING = 'Pendiente de validar: alcance, entidad certificadora, vigencia, sociedad y n.º de certificado';

/** Pruebas de experiencia verificadas (se publican como hechos). */
export const credentials = [
  {
    value: 1998,
    kind: 'year' as const,
    label: 'Inicio de la división de Logística Hospitalaria e Ingeniería',
  },
  {
    value: 176,
    kind: 'count' as const,
    label: 'Almacenes en el proyecto del Hospital Sant Joan de Déu (Barcelona)',
  },
];

/** Capacidades con evidencia pública verificada. */
export const provenExperience = [
  'Logística y gestión de almacenes',
  'Transporte y distribución',
  'Preparación de pedidos',
  'Optimización de flujos y de transporte',
  'Integración de almacenes',
  'Automatización',
  'Trazabilidad',
  'Logística hospitalaria y de material sanitario',
  'Soluciones logísticas personalizadas',
];
