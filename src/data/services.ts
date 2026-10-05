/**
 * Catálogo de servicios de PALEX MEDICAL (fuente: briefing de la empresa).
 * Cada línea genera automáticamente su página en /servicios/<slug>/.
 */
import type { IconName } from './icons';
import type { ImageKey } from './images';
import type { SectorSlug } from './sectors';

export interface ServiceItem {
  title: string;
  text: string;
  icon: IconName;
}

export interface ServiceGroup {
  label?: string;
  items: ServiceItem[];
}

export interface FlowStep {
  title: string;
  text: string;
}

export interface ServiceLine {
  slug: string;
  num: string;
  name: string;
  short: string;
  icon: IconName;
  image: ImageKey;
  seo: { title: string; description: string };
  hero: { title: string; intro: string };
  statement?: string;
  itemsTitle: string;
  itemsIntro?: string;
  groups: ServiceGroup[];
  flow?: { eyebrow: string; title: string; intro?: string; steps: FlowStep[] };
  adapt: { title: string; points: string[] };
  /** Bloque de pilares (p. ej. control de equipos de alto valor). */
  pillars?: { eyebrow: string; title: string; intro?: string; items: ServiceItem[] };
  sectors: SectorSlug[];
  faq: { q: string; a: string }[];
  cta: { title: string; text: string };
}

export const services: ServiceLine[] = [
  {
    slug: 'transporte',
    num: '01',
    name: 'Transporte',
    short: 'Paquetería, grupaje y camión completo. Temperatura ambiente, refrigerada, congelada o controlada. Servicio express.',
    icon: 'truck',
    image: 'transporte',
    seo: {
      title: 'Transporte de mercancías para empresas · Refrigerado, congelado y express',
      description:
        'Paquetería, grupaje, camión completo y transporte a temperatura ambiente, refrigerada, congelada o controlada. Servicios express para mercancías urgentes.',
    },
    hero: {
      title: 'Transporte de mercancías adaptado a cada carga.',
      intro:
        'Desde un paquete urgente hasta un camión completo a temperatura controlada. Elegimos la modalidad según volumen, condiciones de conservación y plazo de entrega.',
    },
    itemsTitle: 'Modalidades de transporte',
    itemsIntro: 'Tres variables definen cada envío: cuánto se mueve, en qué condiciones y con qué urgencia.',
    groups: [
      {
        label: 'Por volumen',
        items: [
          { title: 'Paquetería', text: 'Transporte y distribución de paquetes y mercancías de pequeño volumen.', icon: 'parcel' },
          { title: 'Grupaje', text: 'Cargas compartidas para optimizar costes y eficiencia en envíos parciales.', icon: 'groupage' },
          { title: 'Camión completo', text: 'Carga completa dedicada, sin rupturas intermedias, de origen a destino.', icon: 'truck' },
        ],
      },
      {
        label: 'Por condiciones',
        items: [
          { title: 'Temperatura ambiente', text: 'Transporte de mercancía general que no requiere control térmico.', icon: 'ambient' },
          { title: 'Refrigerado', text: 'Mercancías que necesitan conservación en frío durante todo el trayecto.', icon: 'refrigerated' },
          { title: 'Congelado', text: 'Productos que deben mantenerse en condiciones de congelación.', icon: 'frozen' },
          { title: 'Temperatura controlada', text: 'Mercancías sensibles con control y seguimiento de temperatura.', icon: 'thermo' },
        ],
      },
      {
        label: 'Por urgencia',
        items: [
          { title: 'Express', text: 'Servicio urgente para mercancías que necesitan entrega rápida.', icon: 'express' },
        ],
      },
    ],
    flow: {
      eyebrow: 'Cómo planificamos un envío',
      title: 'Cada transporte empieza por las preguntas correctas.',
      steps: [
        { title: 'Mercancía', text: 'Tipo de producto, volumen, peso y requisitos de manipulación.' },
        { title: 'Condiciones', text: 'Rango de temperatura y necesidad de registro durante el trayecto.' },
        { title: 'Plazo', text: 'Ventana de recogida y entrega, urgencia y franjas del destinatario.' },
        { title: 'Modalidad', text: 'Paquetería, grupaje, camión completo o express según el caso.' },
        { title: 'Seguimiento', text: 'Información de estado y entrega para el cliente.' },
      ],
    },
    adapt: {
      title: 'El transporte, integrado en la operación',
      points: [
        'Combinable con almacenaje, preparación de pedidos y distribución.',
        'Modalidades mixtas en una misma operación según cada destino.',
        'Experiencia en optimización del transporte, consolidación de envíos y planificación de la distribución.',
        'Cobertura geográfica: [DATOS PENDIENTES DE CONFIRMAR].',
        'Certificación de distribución farmacéutica: [CONFIRMAR CERTIFICACIÓN GDP].',
      ],
    },
    sectors: ['pharma-healthcare', 'industria', 'distribucion', 'ecommerce'],
    faq: [
      {
        q: '¿Qué diferencia hay entre grupaje y camión completo?',
        a: 'En grupaje la mercancía comparte vehículo con otras cargas, lo que reduce el coste en envíos parciales. En camión completo el vehículo se dedica a una sola carga, sin rupturas intermedias.',
      },
      {
        q: '¿Podéis transportar mercancía refrigerada y congelada?',
        a: 'Sí. Ofrecemos transporte refrigerado, congelado y a temperatura controlada. Cuéntanos el rango de temperatura que necesita tu producto para definir el servicio.',
      },
      {
        q: '¿Se puede combinar el transporte con almacenaje?',
        a: 'Sí. El transporte puede formar parte de una operación logística completa que incluya almacenaje, preparación de pedidos y distribución.',
      },
    ],
    cta: { title: '¿Qué necesitas mover?', text: 'Indícanos origen, destino y tipo de mercancía y te proponemos la modalidad adecuada.' },
  },
  {
    slug: 'logistica',
    num: '02',
    name: 'Logística',
    short: 'Almacenaje, preparación de pedidos, picking, packing, manipulados, e-commerce y fulfillment.',
    icon: 'warehouse',
    image: 'logistica',
    seo: {
      title: 'Almacenaje, preparación de pedidos y fulfillment para empresas',
      description:
        'Espacios de almacenaje, picking, packing, manipulados, logística e-commerce y fulfillment. Soluciones logísticas implantadas y montaje de estanterías.',
    },
    hero: {
      title: 'Logística integral, configurada a la medida de tu operación.',
      intro:
        'Almacenamos, preparamos y expedimos tus pedidos con procesos adaptados a tu producto, tus canales y tu volumen. Con experiencia en gestión de almacenes, automatización y trazabilidad.',
    },
    itemsTitle: 'Servicios logísticos',
    groups: [
      {
        items: [
          { title: 'Espacios de almacenaje', text: 'Almacenamiento de mercancía con gestión de ubicaciones y stock.', icon: 'warehouse' },
          { title: 'Preparación de pedidos', text: 'Pedidos preparados según tus reglas de servicio y prioridades.', icon: 'picking' },
          { title: 'Picking', text: 'Extracción de unidades o cajas por pedido, con control de referencias.', icon: 'picking' },
          { title: 'Packing', text: 'Embalado y etiquetado adaptado al producto y al canal de destino.', icon: 'packing' },
          { title: 'Manipulados', text: 'Kitting, reetiquetado, montaje de packs y otras operaciones de valor añadido.', icon: 'handling' },
          { title: 'E-commerce', text: 'Logística para tiendas online: pedidos unitarios y alta variabilidad.', icon: 'ecommerce' },
          { title: 'Fulfillment', text: 'Ciclo completo del pedido: recepción, almacenaje, preparación y envío.', icon: 'fulfillment' },
          { title: 'Soluciones logísticas implantadas', text: 'Operaciones diseñadas y puestas en marcha para un cliente concreto.', icon: 'implant' },
          { title: 'Montaje y desmontaje de estanterías', text: 'Instalación, reconfiguración y retirada de sistemas de almacenaje.', icon: 'rack' },
        ],
      },
    ],
    flow: {
      eyebrow: 'Flujo logístico',
      title: 'Del muelle de entrada al cliente final.',
      steps: [
        { title: 'Recepción', text: 'Entrada de mercancía, verificación y registro.' },
        { title: 'Almacenaje', text: 'Ubicación según rotación y características del producto.' },
        { title: 'Preparación', text: 'Picking, manipulados y control del pedido.' },
        { title: 'Packing', text: 'Embalaje y etiquetado para cada canal.' },
        { title: 'Expedición', text: 'Salida coordinada con el transporte adecuado.' },
      ],
    },
    adapt: {
      title: 'Adaptamos la operación a tu negocio',
      points: [
        'Procesos definidos según tu producto, tus canales y tus picos de demanda.',
        'Integración del almacén con el transporte en una única operación.',
        'Experiencia en gestión e integración de almacenes, automatización y trazabilidad.',
        'Superficie y capacidad de almacenaje disponibles: [DATOS PENDIENTES DE CONFIRMAR].',
      ],
    },
    sectors: ['ecommerce', 'distribucion', 'pharma-healthcare', 'tecnologia'],
    faq: [
      {
        q: '¿Qué incluye un servicio de fulfillment?',
        a: 'La gestión completa del pedido: recepción y almacenaje del stock, preparación, embalaje y envío al cliente final.',
      },
      {
        q: '¿Hacéis manipulados y montaje de packs?',
        a: 'Sí. Realizamos manipulados como reetiquetado, kitting o montaje de packs, integrados en el flujo de preparación de pedidos.',
      },
      {
        q: '¿Podéis montar o reconfigurar las estanterías de mi almacén?',
        a: 'Sí. Realizamos montaje y desmontaje de estanterías, también como parte de un proyecto de mejora de layout.',
      },
    ],
    cta: { title: '¿Quieres externalizar tu almacén?', text: 'Cuéntanos tu volumen, referencias y canales de venta. Diseñamos la operación contigo.' },
  },
  {
    slug: 'excedentes-industriales',
    num: '03',
    name: 'Excedentes industriales',
    short: 'Compra y venta de stocks y materiales sobrantes. Gestión de activos excedentes.',
    icon: 'cycle',
    image: 'excedentes',
    seo: {
      title: 'Compraventa de excedentes industriales y stocks sobrantes',
      description:
        'Gestión, compra y venta de excedentes industriales, stocks y materiales sobrantes. Damos salida a activos que tu empresa ya no necesita.',
    },
    hero: {
      title: 'Convertimos excedentes y stocks sobrantes en oportunidades.',
      intro:
        'Material que ocupa espacio, inmoviliza capital y no tiene salida. Lo gestionamos, lo clasificamos y le buscamos un destino.',
    },
    statement: 'Un excedente almacenado es un coste. Gestionado, puede volver a tener valor.',
    itemsTitle: 'Qué hacemos con tus excedentes',
    groups: [
      {
        items: [
          { title: 'Gestión de excedentes industriales', text: 'Análisis y gestión integral de material excedente.', icon: 'manage' },
          { title: 'Compra de stocks', text: 'Adquisición de stocks que la empresa ya no necesita.', icon: 'buy' },
          { title: 'Venta de stocks', text: 'Comercialización de stocks disponibles.', icon: 'sell' },
          { title: 'Compra de materiales sobrantes', text: 'Adquisición de materiales sobrantes de producción o proyectos.', icon: 'buy' },
          { title: 'Venta de materiales sobrantes', text: 'Salida comercial para materiales que otra empresa necesita.', icon: 'sell' },
          { title: 'Gestión de activos excedentes', text: 'Activos y materiales en desuso, inventariados y gestionados.', icon: 'layers' },
        ],
      },
    ],
    flow: {
      eyebrow: 'Ciclo del excedente',
      title: 'De material inmovilizado a material en circulación.',
      steps: [
        { title: 'Compra', text: 'Valoración y adquisición del excedente o stock.' },
        { title: 'Gestión', text: 'Inventario y documentación del material.' },
        { title: 'Clasificación', text: 'Agrupación por tipo, estado y destino posible.' },
        { title: 'Almacenaje', text: 'Custodia en condiciones adecuadas mientras se gestiona.' },
        { title: 'Venta', text: 'Búsqueda de comprador y cierre de la operación.' },
        { title: 'Distribución', text: 'Transporte del material a su nuevo destino.' },
      ],
    },
    adapt: {
      title: 'Por qué con un operador logístico',
      points: [
        'La compraventa se apoya en capacidades propias de almacenaje, clasificación y transporte.',
        'Un único interlocutor desde la valoración hasta la entrega al comprador.',
        'Libera espacio en tus instalaciones y simplifica la gestión del material sobrante.',
        'Tipologías de material que se aceptan: [DATOS PENDIENTES DE CONFIRMAR].',
      ],
    },
    sectors: ['industria', 'distribucion', 'tecnologia', 'equipamiento'],
    faq: [
      {
        q: '¿Qué tipo de excedentes gestionáis?',
        a: 'Stocks, materiales sobrantes y activos excedentes de empresas. Las tipologías concretas se valoran caso a caso: [DATOS PENDIENTES DE CONFIRMAR].',
      },
      {
        q: '¿Compráis el stock o solo lo gestionáis?',
        a: 'Ambas opciones: podemos comprar el stock o gestionar su venta. La fórmula se define según el material y la necesidad de la empresa.',
      },
    ],
    cta: { title: '¿Tienes stock o material sin salida?', text: 'Envíanos una descripción del material y lo valoramos.' },
  },
  {
    slug: 'servicios-especiales',
    num: '04',
    name: 'Servicios especiales',
    short: 'Embalaje, equipos de alto valor, manipulación especial y proyectos logísticos a medida.',
    icon: 'diamond',
    image: 'especiales',
    seo: {
      title: 'Transporte de equipos de alto valor y servicios logísticos especiales',
      description:
        'Embalaje a medida, transporte de equipos de alto valor, manipulación especial y proyectos logísticos personalizados para operaciones no estándar.',
    },
    hero: {
      title: 'Cuando una operación no encaja en una solución estándar, diseñamos una solución específica.',
      intro:
        'Equipos delicados, mercancía de alto valor, manipulaciones fuera de lo habitual. Operaciones que exigen planificación propia.',
    },
    itemsTitle: 'Servicios especiales',
    groups: [
      {
        items: [
          { title: 'Embalaje', text: 'Embalaje diseñado según la fragilidad, el valor y el modo de transporte.', icon: 'box' },
          { title: 'Equipos de alto valor', text: 'Equipos sensibles y envíos de alto valor con control de impactos en cada manipulación.', icon: 'diamond' },
          { title: 'Manipulación especial', text: 'Carga, descarga y posicionamiento de mercancía que requiere cuidados particulares.', icon: 'hand' },
          { title: 'Servicios especiales', text: 'Operaciones puntuales con requisitos fuera de lo estándar.', icon: 'shield' },
          { title: 'Soluciones personalizadas', text: 'Combinación de servicios definida para un caso concreto.', icon: 'compass' },
          { title: 'Proyectos logísticos a medida', text: 'Operaciones diseñadas desde cero con el cliente.', icon: 'blueprint' },
        ],
      },
    ],
    flow: {
      eyebrow: 'Método',
      title: 'Una operación especial se planifica antes de moverse.',
      steps: [
        { title: 'Estudio', text: 'Características del equipo o mercancía y del entorno de entrega.' },
        { title: 'Plan', text: 'Embalaje, medios de manipulación y modalidad de transporte.' },
        { title: 'Ejecución', text: 'Recogida, transporte y entrega según el plan acordado.' },
        { title: 'Cierre', text: 'Confirmación de entrega y retirada de embalajes si procede.' },
      ],
    },
    adapt: {
      title: 'Qué cuidamos en una operación especial',
      points: [
        'Protección del equipo en cada punto de manipulación.',
        'Coordinación de ventanas de entrega con el destinatario.',
        'Embalaje adaptado a la pieza, no al revés.',
        'Coberturas de seguro para mercancía de alto valor: [DATOS PENDIENTES DE CONFIRMAR].',
      ],
    },
    pillars: {
      eyebrow: 'Transporte de equipos de alto valor',
      title: 'Protección, trazabilidad y control en cada manipulación.',
      intro:
        'Para equipos sensibles y envíos con requisitos específicos utilizamos indicadores de impacto ShockWatch 50G: cualquier golpe fuera de rango queda registrado y es visible.',
      items: [
        { title: 'Protección', text: 'Embalaje y manipulación definidos según la fragilidad y el valor del equipo.', icon: 'box' },
        { title: 'Trazabilidad', text: 'Registro del estado del envío durante el almacenamiento y el transporte.', icon: 'trace' },
        { title: 'Control', text: 'Indicadores de impacto que detectan posibles golpes durante la manipulación.', icon: 'impact' },
        { title: 'Gestión de incidencias', text: 'Cada incidencia detectada se registra para actuar y documentarla.', icon: 'manage' },
      ],
    },
    sectors: ['pharma-healthcare', 'tecnologia', 'equipamiento', 'industria'],
    faq: [
      {
        q: '¿Qué se considera un equipo de alto valor?',
        a: 'Cualquier equipo cuya pérdida o daño tenga un impacto económico u operativo elevado: equipamiento sanitario, tecnológico, de laboratorio o profesional, entre otros.',
      },
      {
        q: '¿Diseñáis el embalaje?',
        a: 'Sí. El embalaje es parte del servicio y se define según la fragilidad, el valor y el trayecto de la mercancía.',
      },
      {
        q: '¿Cómo se controla que un equipo no ha sufrido golpes?',
        a: 'Utilizamos indicadores de impacto ShockWatch 50G, que cambian de estado si el equipo recibe un golpe fuera de rango durante el almacenamiento o el transporte. La incidencia queda registrada.',
      },
    ],
    cta: { title: '¿Tu operación no encaja en un estándar?', text: 'Explícanos qué hay que mover y en qué condiciones. Diseñamos el plan.' },
  },
  {
    slug: 'eventos-y-congresos',
    num: '05',
    name: 'Eventos y congresos',
    short: 'Preparación, almacenaje, transporte, montaje y desmontaje. Coordinación logística completa.',
    icon: 'calendar',
    image: 'eventos',
    seo: {
      title: 'Logística de eventos y congresos · Distribución, montaje y desmontaje',
      description:
        'Distribución de material y merchandising, preparación de pedidos, almacenaje, transporte, montaje, desmontaje y coordinación logística de eventos y congresos.',
    },
    hero: {
      title: 'Fechas cerradas. Múltiples destinos. Una sola coordinación.',
      intro:
        'En un evento no hay segunda oportunidad. Preparamos, almacenamos, transportamos, montamos y desmontamos con un único plan logístico.',
    },
    itemsTitle: 'Servicios para eventos y congresos',
    groups: [
      {
        items: [
          { title: 'Distribución de material', text: 'Material corporativo, técnico o documental en cada punto de entrega.', icon: 'route' },
          { title: 'Distribución de merchandising', text: 'Merchandising preparado y entregado donde y cuando se necesita.', icon: 'merch' },
          { title: 'Preparación logística de eventos', text: 'Planificación de flujos, cantidades y calendarios de entrega.', icon: 'calendar' },
          { title: 'Preparación de pedidos', text: 'Kits y lotes por stand, sala, ponente o asistente.', icon: 'picking' },
          { title: 'Montaje', text: 'Montaje del material en destino antes de la apertura.', icon: 'assembly' },
          { title: 'Desmontaje', text: 'Retirada ordenada y retorno o almacenaje del material.', icon: 'assembly' },
          { title: 'Transporte', text: 'Transporte de ida y vuelta adaptado al tipo de material.', icon: 'truck' },
          { title: 'Almacenaje', text: 'Custodia del material antes, entre y después de eventos.', icon: 'warehouse' },
          { title: 'Coordinación logística', text: 'Un interlocutor que coordina proveedores, plazos y accesos.', icon: 'coordination' },
        ],
      },
    ],
    flow: {
      eyebrow: 'Proceso',
      title: 'Siete fases. Un calendario.',
      intro: 'Cada fase tiene un responsable y una fecha. Así se cumple la fecha que no se mueve: la del evento.',
      steps: [
        { title: 'Planificación', text: 'Calendario, cantidades, destinos y accesos.' },
        { title: 'Preparación', text: 'Kits y lotes por destino.' },
        { title: 'Almacenaje', text: 'Custodia hasta la salida.' },
        { title: 'Transporte', text: 'Entrega en sede dentro de la ventana asignada.' },
        { title: 'Montaje', text: 'Material listo antes de la apertura.' },
        { title: 'Evento', text: 'Soporte logístico durante la celebración.' },
        { title: 'Desmontaje', text: 'Retirada, retorno o almacenaje.' },
      ],
    },
    adapt: {
      title: 'Pensado para operaciones con fecha límite',
      points: [
        'Experiencia en la planificación y ejecución de operaciones logísticas para congresos.',
        'Múltiples puntos de entrega coordinados en una única planificación.',
        'Material preparado por destino para reducir trabajo en sede.',
        'Almacenaje entre eventos para material reutilizable.',
        'Cobertura geográfica de eventos: [DATOS PENDIENTES DE CONFIRMAR].',
      ],
    },
    sectors: ['eventos', 'pharma-healthcare', 'tecnologia', 'otros-b2b'],
    faq: [
      {
        q: '¿Podéis gestionar varios eventos simultáneos?',
        a: 'La planificación se organiza por destino y fecha, lo que permite coordinar varias entregas en paralelo. Cuéntanos el calendario para valorarlo.',
      },
      {
        q: '¿Almacenáis el material entre eventos?',
        a: 'Sí. El almacenaje forma parte del servicio y permite reutilizar el material en eventos posteriores.',
      },
    ],
    cta: { title: '¿Tienes un evento en el calendario?', text: 'Envíanos fecha, sede y material. Preparamos el plan logístico.' },
  },
  {
    slug: 'consultoria-logistica',
    num: '06',
    name: 'Consultoría',
    short: 'Optimización de transporte, layouts y procesos. Experiencia en SAP HANA y EWM. Mejora de embalajes.',
    icon: 'chart',
    image: 'consultoria',
    seo: {
      title: 'Consultoría logística · Optimización de procesos, layout y SAP HANA',
      description:
        'Proyectos de mejora del transporte y la logística, optimización de layouts y procesos, experiencia en SAP HANA y SAP EWM, mejora de embalajes y proyectos personalizados.',
    },
    hero: {
      title: 'No solo ejecutamos la logística. La analizamos y la mejoramos.',
      intro:
        'Aplicamos nuestra experiencia en logística hospitalaria, automatización y trazabilidad al diagnóstico de tu cadena: transporte, almacén, procesos, sistemas y embalaje.',
    },
    itemsTitle: 'Ámbitos de consultoría',
    groups: [
      {
        items: [
          { title: 'Mejora del transporte', text: 'Revisión de rutas, modalidades, consolidación y costes de transporte.', icon: 'route' },
          { title: 'Optimización de layouts', text: 'Rediseño de la distribución del almacén y sus flujos internos.', icon: 'layout' },
          { title: 'Proyectos de mejora logística', text: 'Diagnóstico y plan de mejora de la operación completa.', icon: 'chart' },
          { title: 'Optimización de procesos', text: 'Simplificación de tareas, tiempos y puntos de control.', icon: 'process' },
          { title: 'SAP HANA y SAP EWM', text: 'Experiencia en la implantación de SAP HANA y del módulo EWM, aplicada a procesos logísticos.', icon: 'database' },
          { title: 'Mejora de embalajes', text: 'Embalajes más adecuados, protectores y eficientes en volumen.', icon: 'package' },
          { title: 'Consultoría logística', text: 'Acompañamiento en decisiones de organización logística.', icon: 'compass' },
          { title: 'Proyectos personalizados', text: 'Alcance definido según el reto concreto de cada empresa.', icon: 'blueprint' },
        ],
      },
    ],
    statement: 'La diferencia entre un consultor y un operador que consulta: lo que proponemos, sabemos ejecutarlo.',
    flow: {
      eyebrow: 'Metodología',
      title: 'Del diagnóstico a la implantación.',
      steps: [
        { title: 'Diagnóstico', text: 'Datos, procesos y visitas a la operación actual.' },
        { title: 'Análisis', text: 'Identificación de cuellos de botella y oportunidades.' },
        { title: 'Propuesta', text: 'Escenarios de mejora con su alcance.' },
        { title: 'Implantación', text: 'Acompañamiento en la puesta en marcha.' },
        { title: 'Seguimiento', text: 'Revisión de resultados y ajustes.' },
      ],
    },
    adapt: {
      title: 'Consultoría con base operativa',
      points: [
        'Propuestas que tienen en cuenta cómo funciona un almacén y un transporte reales.',
        'Posibilidad de implantar la mejora y, si se desea, operarla.',
        'Experiencia en optimización de flujos, integración de almacenes y optimización del transporte.',
        'Experiencia propia en la implantación de SAP HANA y SAP EWM.',
        'Alcance del servicio SAP para terceros: [PENDIENTE DE VALIDACIÓN COMERCIAL].',
      ],
    },
    sectors: ['industria', 'distribucion', 'pharma-healthcare', 'tecnologia'],
    faq: [
      {
        q: '¿Puedo contratar la consultoría sin externalizar la operación?',
        a: 'Sí. La consultoría es un servicio independiente. Si lo deseas, también podemos implantar y gestionar la solución.',
      },
      {
        q: '¿Tenéis experiencia en SAP HANA?',
        a: 'Sí. Contamos con experiencia en la implantación de SAP HANA y del módulo de gestión de almacenes EWM en centros propios. El alcance para cada proyecto se define caso a caso.',
      },
    ],
    cta: { title: '¿Tu operación puede funcionar mejor?', text: 'Cuéntanos dónde ves el problema. Lo analizamos contigo.' },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceHref = (slug: string) => `/servicios/${slug}/`;
