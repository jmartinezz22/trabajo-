import { services, serviceHref } from './services';

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  num?: string;
}

export const serviceLinks: NavLink[] = services.map((s) => ({
  label: s.name,
  href: serviceHref(s.slug),
  description: s.short,
  num: s.num,
}));

export const mainNav: { label: string; href: string; children?: NavLink[] }[] = [
  { label: 'Servicios', href: '/servicios/', children: serviceLinks },
  { label: 'Soluciones a medida', href: '/soluciones-a-medida/' },
  { label: 'Sectores', href: '/sectores/' },
  { label: 'Tecnología', href: '/tecnologia/' },
  { label: 'Proyectos', href: '/proyectos/' },
];

export const companyLinks: NavLink[] = [
  { label: 'Soluciones a medida', href: '/soluciones-a-medida/' },
  { label: 'Tecnología', href: '/tecnologia/' },
  { label: 'Proyectos', href: '/proyectos/' },
  { label: 'Logística más eficiente', href: '/sostenibilidad/' },
  { label: 'Contacto', href: '/contacto/' },
];

export const legalLinks: NavLink[] = [
  { label: 'Aviso legal', href: '/aviso-legal/' },
  { label: 'Política de privacidad', href: '/politica-de-privacidad/' },
  { label: 'Política de cookies', href: '/politica-de-cookies/' },
];

/** Proceso de trabajo transversal (Home y Soluciones a medida). */
export const methodSteps = [
  { num: '01', title: 'Analizamos', text: 'Estudiamos tu operación, tus volúmenes, tu producto y tus restricciones.' },
  { num: '02', title: 'Diseñamos', text: 'Definimos el modelo: procesos, recursos, transporte y sistemas.' },
  { num: '03', title: 'Implantamos', text: 'Ponemos en marcha la solución de forma ordenada y controlada.' },
  { num: '04', title: 'Gestionamos', text: 'Operamos el día a día con un interlocutor único.' },
  { num: '05', title: 'Optimizamos', text: 'Revisamos y ajustamos para mejorar de forma continua.' },
];

/** Cadena de valor: fases en las que puede intervenir PALEX MEDICAL. */
export const valueChain = [
  { label: 'Transporte', href: '/servicios/transporte/' },
  { label: 'Almacenaje', href: '/servicios/logistica/' },
  { label: 'Preparación', href: '/servicios/logistica/' },
  { label: 'Distribución', href: '/servicios/transporte/' },
  { label: 'Servicios especiales', href: '/servicios/servicios-especiales/' },
  { label: 'Consultoría', href: '/servicios/consultoria-logistica/' },
  { label: 'Soluciones a medida', href: '/soluciones-a-medida/' },
];
