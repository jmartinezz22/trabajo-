/**
 * Proyectos / casos.
 *  - status 'verified'   → caso real publicado por Palex. Solo resultados publicados, sin cifras añadidas.
 *  - status 'validation' → proyecto encontrado en fuentes públicas (perfiles profesionales).
 *                          Se describe de forma cualitativa; cifras y cliente NO se publican
 *                          hasta validación interna (ver docs/03-registro-de-datos.md).
 */
import type { EvidenceStatus } from './trust';

export interface CaseStudy {
  id: string;
  status: Exclude<EvidenceStatus, 'not-found'>;
  tag: string;
  client: string;
  title: string;
  problem: string;
  solution: string;
  results: string[];
  scope?: string;
  technologies: string[];
  services: string[];
}

export const featuredCase: CaseStudy = {
  id: 'hospital-sant-joan-de-deu',
  status: 'verified',
  tag: 'Logística hospitalaria',
  client: 'Hospital Sant Joan de Déu · Barcelona',
  title: 'Automatización y digitalización de los procesos logísticos hospitalarios',
  problem: 'Automatizar y digitalizar la gestión del material sanitario en los almacenes del hospital.',
  solution:
    'Automatización de procesos y gestión de almacenes con tecnología RFID y las soluciones Dyane SmartKanban, Dyane SmartCabinet y Dyane Captis.',
  scope: '176 almacenes',
  results: [
    'Reducción de las solicitudes urgentes',
    'Reducción de referencias obsoletas',
    'Reducción de caducidades',
    'Mejora de la trazabilidad',
    'Reducción de tareas administrativas',
  ],
  technologies: ['RFID', 'Dyane SmartKanban', 'Dyane SmartCabinet', 'Dyane Captis'],
  services: ['Gestión de almacenes', 'Automatización', 'Trazabilidad'],
};

export const pendingCases: CaseStudy[] = [
  {
    id: 'optimizacion-flujos',
    status: 'validation',
    tag: 'Optimización logística',
    client: 'Proyecto logístico — Cliente confidencial',
    title: 'Optimización de flujos y del transporte',
    problem: 'Redistribución de materiales y flujos logísticos con margen de mejora en coste y eficiencia.',
    solution: 'Consolidación de envíos, optimización del transporte y planificación de la distribución.',
    results: ['[RESULTADOS PENDIENTES DE VALIDACIÓN INTERNA]'],
    technologies: [],
    services: ['Consultoría', 'Transporte', 'Distribución'],
  },
  {
    id: 'reorganizacion-almacen',
    status: 'validation',
    tag: 'Almacén',
    client: 'Proyecto logístico — Cliente confidencial',
    title: 'Reorganización de almacén y preparación por oleadas',
    problem: 'Almacén con necesidad de reorganizar ubicaciones y procesos de preparación.',
    solution: 'Reorganización del almacén, preparación de pedidos por oleadas, radiofrecuencia y automatización.',
    results: ['[RESULTADOS PENDIENTES DE VALIDACIÓN INTERNA]'],
    technologies: ['Radiofrecuencia'],
    services: ['Logística', 'Automatización'],
  },
  {
    id: 'logistica-inversa',
    status: 'validation',
    tag: 'Distribución',
    client: 'Proyecto logístico — Cliente confidencial',
    title: 'Logística inversa y dropshipping',
    problem: 'Gestión de devoluciones y envío directo al cliente final.',
    solution: 'Diseño de flujos de logística inversa y de dropshipping integrados en la operación.',
    results: ['[RESULTADOS PENDIENTES DE VALIDACIÓN INTERNA]'],
    technologies: [],
    services: ['Logística', 'E-commerce'],
  },
];

/** Compatibilidad: listado completo (real primero). */
export const cases: CaseStudy[] = [featuredCase, ...pendingCases];
