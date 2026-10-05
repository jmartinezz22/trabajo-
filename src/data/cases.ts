/**
 * Proyectos / casos. PLACEHOLDERS: no hay casos reales confirmados.
 * Sustituir por proyectos reales (con autorización del cliente o anonimizados)
 * sin inventar cifras ni resultados.
 */
export interface CaseStudy {
  tag: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  services: string[];
}

export const cases: CaseStudy[] = [
  {
    tag: 'Pharma & Healthcare',
    title: 'Proyecto logístico — Cliente confidencial',
    problem: 'El cliente necesitaba distribuir producto sensible a la temperatura a varios destinos con registro de condiciones.',
    solution: 'PALEX MEDICAL diseñó una operación combinando almacenaje, preparación y transporte a temperatura controlada.',
    result: '[RESULTADOS PENDIENTES DE CONFIRMAR]',
    services: ['Temperatura controlada', 'Almacenaje', 'Distribución'],
  },
  {
    tag: 'Eventos y congresos',
    title: 'Proyecto logístico — Cliente confidencial',
    problem: 'El cliente necesitaba material y merchandising preparado y entregado en sede con fecha cerrada.',
    solution: 'PALEX MEDICAL planificó la preparación por destino, el transporte, el montaje y el desmontaje.',
    result: '[RESULTADOS PENDIENTES DE CONFIRMAR]',
    services: ['Preparación', 'Transporte', 'Montaje'],
  },
  {
    tag: 'Industria',
    title: 'Proyecto logístico — Cliente confidencial',
    problem: 'El cliente necesitaba liberar espacio ocupado por stock y materiales sin rotación.',
    solution: 'PALEX MEDICAL gestionó la clasificación, el almacenaje temporal y la salida comercial del excedente.',
    result: '[RESULTADOS PENDIENTES DE CONFIRMAR]',
    services: ['Excedentes', 'Almacenaje', 'Transporte'],
  },
];
