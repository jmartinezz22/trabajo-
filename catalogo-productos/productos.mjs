/**
 * Catálogo de producto (muestra) · PALEX MEDICAL
 *
 * Contenido elaborado a partir de las fotografías de producto (fotos-originales/).
 * Regla: solo se afirma lo que se ve en el producto o en su impresión.
 * Todo dato técnico no visible queda como PENDING hasta que lo confirme Palex.
 */
export const PENDING = '[PENDIENTE DE CONFIRMAR]';

export const brand = {
  name: 'Palex',
  tagline: ['Improving technologies', 'Improving lives'],
  // Colores tomados de la impresión de las cajas Palex fotografiadas. [CONFIRMAR con manual de marca]
  teal: '#169e91',
  navy: '#1c2a5c',
  email: 'palexmedical@palex.es',
  phones: [
    { label: 'Teléfono general', number: '+34 934 006 500' },
    { label: 'Atención al cliente', number: '900 180 132' },
  ],
  address: ['C/ Jesús Serra Santamans, 5', '08174 Sant Cugat del Vallès (Barcelona)'],
};

export const families = [
  {
    id: 'equipos',
    name: 'Equipos de embalaje',
    intro: 'Equipos para el puesto de packing: relleno de papel bajo demanda y dispensado de cartón ondulado para proteger cada envío.',
    image: 'speedman',
  },
  {
    id: 'proteccion',
    name: 'Protección y relleno',
    intro: 'Materiales para envolver, acolchar y precintar la mercancía durante el almacenaje y el transporte.',
    image: 'nido-abeja',
  },
  {
    id: 'cajas',
    name: 'Cajas y envases',
    intro: 'Cajas impresas, envases para cadena de frío y formatos específicos para producto sanitario, documentación y expediciones.',
    image: 'caja-isotermica',
  },
  {
    id: 'identificacion',
    name: 'Identificación y documentación',
    intro: 'Etiquetas de temperatura, etiquetas térmicas y sobres porta-documentos para que cada bulto viaje identificado.',
    image: 'etiquetas-frio',
  },
  {
    id: 'almacenaje',
    name: 'Almacenaje y manipulación',
    intro: 'Palets, cubetas y cajas para ordenar el almacén, preparar pedidos y mover la mercancía.',
    image: 'cubetas-carton',
  },
];

/**
 * layout: 'single' = una página por producto; los demás se agrupan en `grid` por familia.
 * specs: pares [campo, valor]; los no visibles quedan PENDING.
 */
export const products = [
  // 01 — EQUIPOS
  {
    id: 'speedman',
    family: 'equipos',
    layout: 'single',
    name: 'SpeedMan Flex',
    kicker: 'Sistema de relleno y acolchado con papel',
    image: 'speedman',
    description:
      'Equipo que transforma bobinas de papel en relleno acolchado bajo demanda. Protege la mercancía dentro de la caja, ocupa los huecos y evita desplazamientos durante el transporte.',
    features: [
      'Pantalla de control en el cabezal',
      'Accionamiento mediante pedal',
      'Pulsador de parada de emergencia',
      'Portabobinas integrado en la columna',
      'Bandeja de salida del papel',
      'Base en cruz con ruedas para moverlo entre puestos',
    ],
    uses: ['Puestos de packing y expedición', 'Pedidos de e-commerce', 'Relleno de huecos en cajas con producto frágil'],
    specs: [
      ['Modelo', 'SpeedMan Flex'],
      ['Consumible', 'Bobinas de papel SpeedMan'],
      ['Alimentación eléctrica', PENDING],
      ['Velocidad de salida', PENDING],
      ['Dimensiones y peso', PENDING],
    ],
  },
  {
    id: 'carton-rollo',
    family: 'equipos',
    layout: 'single',
    name: 'Cartón ondulado en rollo con dispensador',
    kicker: 'Envolver y proteger en el puesto de trabajo',
    image: 'carton-rollo',
    description:
      'Rollo de cartón ondulado kraft montado en un soporte vertical con eje. Permite cortar la longitud necesaria para envolver, separar o proteger producto directamente en el puesto de embalaje.',
    features: ['Cartón ondulado kraft en rollo', 'Soporte vertical con eje de desenrollado', 'Corte a la medida de cada envío', 'Ocupa poco espacio en planta'],
    uses: ['Envolver piezas y equipos', 'Separadores entre capas', 'Protección de esquinas y superficies'],
    specs: [
      ['Material', 'Cartón ondulado kraft'],
      ['Ancho de rollo', PENDING],
      ['Longitud de rollo', PENDING],
      ['Gramaje / canal', PENDING],
    ],
  },

  // 02 — PROTECCIÓN Y RELLENO
  {
    id: 'nido-abeja',
    family: 'proteccion',
    layout: 'grid',
    name: 'Papel kraft nido de abeja',
    image: 'nido-abeja',
    description: 'Papel kraft con estructura alveolar que se expande al estirarlo y forma un envoltorio amortiguador. Alternativa en papel a los envoltorios plásticos.',
    features: ['Papel kraft', 'Estructura alveolar amortiguadora', 'Medidas y formato: ' + PENDING],
  },
  {
    id: 'film-impreso',
    family: 'proteccion',
    layout: 'grid',
    name: 'Film transparente impreso',
    image: 'film-impreso',
    description: 'Film transparente en rollo con impresión de la marca Palex, para envolver y proteger la mercancía manteniendo la identificación visible.',
    features: ['Transparente', 'Impresión de marca', 'Material, galga y medidas: ' + PENDING],
  },
  {
    id: 'precinto',
    family: 'proteccion',
    layout: 'grid',
    name: 'Precinto impreso Palex',
    image: 'caja-envio',
    imageNote: 'Precinto aplicado sobre caja de envío',
    description: 'Cinta adhesiva transparente con impresión de marca para el cierre de cajas. La propia cinta indica: 50 % fabricado con film BOPP reciclado y sin disolventes.',
    features: ['Impresión corporativa', '50 % film BOPP reciclado (según impresión)', 'Sin disolventes (según impresión)'],
  },

  // 03 — CAJAS Y ENVASES
  {
    id: 'caja-envio',
    family: 'cajas',
    layout: 'single',
    name: 'Cajas de envío impresas Palex',
    kicker: 'Embalaje corporativo para expedición',
    image: 'caja-envio',
    image2: 'caja-fsc',
    description:
      'Cajas de cartón blanco con impresión corporativa para la expedición de producto. Incorporan las zonas de identificación y los pictogramas de manipulación necesarios en una expedición.',
    features: [
      'Impresión corporativa Palex',
      'Recuadro para «Etiqueta EXP»',
      'Indicación «Contiene documentación»',
      'Pictogramas de manipulación: este lado arriba, frágil, proteger de la humedad',
      'Marcado FSC Mixto (FSC C124233) y Recipap',
    ],
    uses: ['Expedición de producto sanitario', 'Envíos con documentación adjunta', 'Distribución a centros y clientes'],
    specs: [
      ['Material', 'Cartón ondulado blanco'],
      ['Certificación impresa', 'FSC Mixto · FSC C124233'],
      ['Formatos y medidas', PENDING],
      ['Unidades por paquete', PENDING],
    ],
  },
  {
    id: 'caja-isotermica',
    family: 'cajas',
    layout: 'single',
    name: 'Caja isotérmica metalizada',
    kicker: 'Envío de producto refrigerado',
    image: 'caja-isotermica',
    description:
      'Caja de acabado metalizado para el envío de producto refrigerado. Su impresión advierte al receptor de que debe almacenarse en cuanto llegue, para no romper la cadena de frío.',
    features: ['Acabado exterior metalizado', 'Pictograma de producto refrigerado', 'Aviso «Almacenar urgente a su llegada»', 'Impresión de marca Palex'],
    uses: ['Producto sanitario termosensible', 'Reactivos y muestras', 'Envíos refrigerados de corta duración'],
    specs: [
      ['Rango de temperatura', PENDING],
      ['Autonomía térmica', PENDING],
      ['Medidas exteriores / interiores', PENDING],
      ['Material aislante', PENDING],
    ],
  },
  {
    id: 'caja-frio-azul',
    family: 'cajas',
    layout: 'single',
    name: 'Caja para producto congelado y refrigerado',
    kicker: 'Señalización de cadena de frío',
    image: 'caja-frio-azul',
    description:
      'Caja de color azul con señalización de cadena de frío de gran tamaño, pensada para que el producto congelado o refrigerado se identifique a simple vista en la recepción.',
    features: ['Aviso «Almacenar urgente a su llegada»', 'Casillas «Producto congelado» y «Producto refrigerado»', 'Pictograma de frío', 'Impresión con sellos Recipap y LRQA ISO 9001'],
    uses: ['Producto congelado', 'Producto refrigerado', 'Recepción prioritaria en almacén o farmacia'],
    specs: [
      ['Formatos y medidas', PENDING],
      ['Rango de temperatura', PENDING],
      ['Interior / aislamiento', PENDING],
    ],
  },
  {
    id: 'cajas-largas',
    family: 'cajas',
    layout: 'grid',
    name: 'Cajas largas impresas',
    image: 'cajas-largas',
    description: 'Cajas de formato alargado con impresión corporativa para producto de gran longitud, con zona de etiqueta de expedición.',
    features: ['Formato alargado', 'Recuadro «Etiqueta EXP»', 'Medidas: ' + PENDING],
  },
  {
    id: 'caja-perforada',
    family: 'cajas',
    layout: 'grid',
    name: 'Caja troquelada con tapa perforada',
    image: 'caja-perforada',
    description: 'Caja de cartón blanco con interior kraft y tapa troquelada con perforaciones circulares, de montaje sin cola.',
    features: ['Tapa con perforaciones circulares', 'Exterior blanco, interior kraft', 'Uso y medidas: ' + PENDING],
  },
  {
    id: 'palextand',
    family: 'cajas',
    layout: 'grid',
    name: 'Palextand',
    image: 'palextand',
    description: 'Caja de cartón blanco con la marca Palextand impresa.',
    features: ['Impresión de marca Palextand', 'Contenido y aplicación: ' + PENDING],
  },
  {
    id: 'caja-hu',
    family: 'cajas',
    layout: 'grid',
    name: 'Caja Palex HU',
    image: 'caja-hu',
    description: 'Caja de cartón blanco con impresión Palex HU, tapa con muesca de apertura y cuadrícula impresa en la tapa.',
    features: ['Muesca frontal de apertura', 'Cuadrícula impresa en la tapa', 'Contenido y medidas: ' + PENDING],
  },
  {
    id: 'caja-orca',
    family: 'cajas',
    layout: 'grid',
    name: 'Caja ORCA multi-use',
    image: 'caja-orca',
    description: 'Caja de cartón blanco de la gama ORCA multi-use con zonas de cierre señalizadas («Tape here»).',
    features: ['Gama ORCA multi-use', 'Zonas de cierre señalizadas', 'Capacidad y medidas: ' + PENDING],
  },

  // 04 — IDENTIFICACIÓN Y DOCUMENTACIÓN
  {
    id: 'etiquetas-frio',
    family: 'identificacion',
    layout: 'single',
    name: 'Etiquetas de cadena de frío',
    kicker: 'Identificación de temperatura en el bulto',
    image: 'etiquetas-frio',
    description:
      'Etiquetas adhesivas en rollo, en amarillo de alta visibilidad, que indican la condición de temperatura del bulto o del acumulador para que se identifique al instante en recepción y almacenaje.',
    features: ['Amarillo de alta visibilidad', 'Pictograma de frío', 'Suministro en rollo'],
    uses: ['«Congelado · Acumulador rojo · Bolsa · −20 °C»', '«Ultracongelado · −80 °C»', 'Señalización de envíos a temperatura controlada'],
    specs: [
      ['Modelos', 'Congelado −20 °C · Ultracongelado −80 °C'],
      ['Medidas de etiqueta', PENDING],
      ['Etiquetas por rollo', PENDING],
      ['Adhesivo apto para frío', PENDING],
    ],
  },
  {
    id: 'etiquetas-termicas',
    family: 'identificacion',
    layout: 'grid',
    name: 'Etiquetas térmicas en rollo',
    image: 'etiquetas-termicas',
    description: 'Rollo de etiquetas adhesivas blancas para impresión de etiquetas de expedición, ubicación o identificación de producto.',
    features: ['Etiqueta blanca adhesiva', 'Suministro en rollo', 'Tipo (térmica directa / transferencia) y medidas: ' + PENDING],
  },
  {
    id: 'sobres-docs',
    family: 'identificacion',
    layout: 'grid',
    name: 'Sobres porta-documentos',
    image: 'sobres-docs',
    description: 'Sobres adhesivos con la leyenda «Documentos / Packing list» para que la documentación viaje adherida al bulto.',
    features: ['Leyenda «Documentos / Packing list»', 'Se adhieren al exterior del bulto', 'Medidas: ' + PENDING],
  },

  // 05 — ALMACENAJE Y MANIPULACIÓN
  {
    id: 'palets',
    family: 'almacenaje',
    layout: 'grid',
    name: 'Palets de madera y de plástico',
    image: 'palets',
    description: 'Palets de madera y palets de plástico para el almacenaje y el transporte de mercancía.',
    features: ['Versión en madera', 'Versión en plástico', 'Medidas y carga admisible: ' + PENDING],
  },
  {
    id: 'cubetas-carton',
    family: 'almacenaje',
    layout: 'grid',
    name: 'Cubetas de cartón apilables',
    image: 'cubetas-carton',
    description: 'Cubetas de cartón con frontal abierto que se apilan en columna para organizar pequeño material en estanterías y puestos de picking.',
    features: ['Frontal abierto para el picking', 'Apilables en columna', 'Medidas: ' + PENDING],
  },
  {
    id: 'cubeta-azul',
    family: 'almacenaje',
    layout: 'grid',
    name: 'Cubeta de plástico',
    image: 'cubeta-azul',
    description: 'Cubeta de plástico con frontal abierto para el almacenaje de piezas y material de pequeño tamaño en estantería.',
    features: ['Frontal abierto', 'Plástico de color azul', 'Medidas y capacidad: ' + PENDING],
  },
  {
    id: 'caja-plegable',
    family: 'almacenaje',
    layout: 'grid',
    name: 'Caja plegable de plástico',
    image: 'caja-plegable',
    description: 'Caja de plástico plegable con asas, que se pliega para ocupar poco espacio cuando está vacía.',
    features: ['Plegable', 'Asas laterales', 'Medidas y carga: ' + PENDING],
  },
];

/** Marcas de sostenibilidad visibles en los productos fotografiados. */
export const sustainability = [
  { title: 'FSC Mixto', text: 'Las cajas de envío llevan impreso el sello FSC Mixto (FSC C124233): embalaje que apoya la silvicultura responsable.' },
  { title: 'Recipap', text: 'Marcado Recipap «reciclable por naturaleza» en las cajas de cartón.' },
  { title: 'Precinto con film reciclado', text: 'El precinto Palex indica 50 % film BOPP reciclado y fabricación sin disolventes.' },
  { title: 'Papel en lugar de plástico', text: 'Relleno de papel y papel nido de abeja como alternativa a los rellenos y envoltorios plásticos.' },
];
