/**
 * Genera el catálogo de producto (muestra) de Palex en PDF, A4 horizontal.
 *
 *   node catalogo-productos/build.mjs
 *
 * Entrada: productos.mjs (contenido) + img/<id>.png (fotos de producto recortadas).
 * Salida:  build/catalogo.html y Catalogo_Productos_PALEX_muestra.pdf
 * Requiere Playwright (PLAYWRIGHT_MODULE para indicar una ruta concreta).
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { brand, families, products, sustainability, PENDING } from './productos.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT_HTML = path.join(ROOT, 'build', 'catalogo.html');
const OUT_PDF = path.join(ROOT, 'build', 'Catalogo_Productos_PALEX_muestra.pdf');
const YEAR = new Date().getFullYear();

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const two = (n) => String(n).padStart(2, '0');
const img = (id) => `../img/${id}.png`;
/** Texto con el marcador de dato pendiente resaltado. */
const txt = (s) => {
  const t = esc(s);
  return t.includes(esc(PENDING)) ? t.replace(esc(PENDING), `<span class="pending">${esc(PENDING)}</span>`) : t;
};
const ORD = ['01', '02', '03', '04', '05'];

/* — Paginación — */
const pages = [];
const famStart = {};
const prodPage = {};
pages.push({ t: 'cover' }, { t: 'contents' }, { t: 'intro' });
families.forEach((f, i) => {
  famStart[f.id] = pages.length + 1;
  const list = products.filter((p) => p.family === f.id);
  pages.push({ t: 'divider', f, i, list });
  list.filter((p) => p.layout === 'single').forEach((p) => {
    prodPage[p.id] = pages.length + 1;
    pages.push({ t: 'single', f, p });
  });
  const grid = list.filter((p) => p.layout === 'grid');
  // Grupos de 3 (o de 2 si quedan 4)
  const groups = grid.length === 4 ? [grid.slice(0, 2), grid.slice(2)] : grid.length > 3 ? [grid.slice(0, 2), grid.slice(2)] : grid.length ? [grid] : [];
  groups.forEach((g, gi) => {
    g.forEach((p) => (prodPage[p.id] = pages.length + 1));
    pages.push({ t: 'grid', f, list: g, gi });
  });
});
pages.push({ t: 'sustain' }, { t: 'closing' });

/* — Componentes — */
const mark = (light = false) => `
  <div class="mark${light ? ' mark--light' : ''}">
    <span class="mark__word">${brand.name}</span>
    <span class="mark__tag">${brand.tagline.map(esc).join('<br>')}</span>
  </div>`;
const foot = (label, n, light = false) => `<div class="foot${light ? ' foot--light' : ''}"><span>${esc(label)}</span><span>${two(n)}</span></div>`;
const famLabel = (f) => `${ORD[families.indexOf(f)]} · ${f.name}`;
const list = (items, cls = 'ticks') => `<ul class="${cls}">${items.map((x) => `<li>${txt(x)}</li>`).join('')}</ul>`;

const render = (pg, n) => {
  switch (pg.t) {
    case 'cover':
      return `
      <section class="pg pg--cover">
        <div class="cover-panel">
          ${mark(true)}
          <div class="cover-copy">
            <span class="rule rule--accent"></span>
            <p class="label label--light">Catálogo de producto</p>
            <h1 class="ttl ttl--cover">Packaging y consumibles<br>para la logística sanitaria</h1>
            <p class="body body--light">Equipos de embalaje, materiales de protección, cajas para cadena de frío, identificación y almacenaje: todo lo necesario para preparar y expedir producto con seguridad.</p>
          </div>
          <div class="foot foot--light"><span>Edición de muestra · ${YEAR}</span><span></span></div>
        </div>
        <div class="cover-art">
          <img class="art art--a" src="${img('speedman')}" alt="">
          <img class="art art--b" src="${img('caja-hu')}" alt="">
          <img class="art art--c" src="${img('etiquetas-frio')}" alt="">
          <img class="art art--d" src="${img('caja-perforada')}" alt="">
        </div>
      </section>`;

    case 'contents':
      return `
      <section class="pg">
        ${mark()}
        <p class="label top">Contenido</p>
        <h2 class="ttl ttl--lg">Cinco familias de producto,<br>un mismo objetivo: que cada envío llegue bien.</h2>
        <ol class="toc">
          ${families
            .map((f, i) => {
              const items = products.filter((p) => p.family === f.id);
              return `<li>
                <span class="num-lg">${ORD[i]}</span>
                <span class="toc-name">${esc(f.name)}</span>
                <span class="body small">${esc(f.intro)}</span>
                <span class="toc-meta">${items.length} productos · pág. ${two(famStart[f.id])}</span>
              </li>`;
            })
            .join('')}
        </ol>
        ${foot('Catálogo de producto', n)}
      </section>`;

    case 'intro':
      return `
      <section class="pg pg--intro">
        ${mark()}
        <div class="intro-text">
          <p class="label top">Presentación</p>
          <h2 class="ttl ttl--md">Todo lo que necesita una expedición, con un único proveedor</h2>
          <p class="body para">Este catálogo reúne una selección de equipos y consumibles para el almacén y el puesto de expedición: desde el relleno de papel y el cartón para proteger el producto, hasta las cajas para cadena de frío, las etiquetas de temperatura y las cubetas para ordenar el picking.</p>
          <p class="body para">Es una edición de muestra: describe cada producto a partir de su diseño y de la información impresa en él. Los datos técnicos, formatos y referencias se completarán en la versión definitiva.</p>
          <div class="stats">
            <div><span class="stat-n">${families.length}</span><span class="small-sans">Familias de producto</span></div>
            <div><span class="stat-n">${products.length}</span><span class="small-sans">Productos en esta edición</span></div>
            <div><span class="stat-n">1</span><span class="small-sans">Interlocutor para equipos y consumibles</span></div>
          </div>
        </div>
        <div class="intro-art">
          ${['caja-envio', 'nido-abeja', 'caja-frio-azul', 'cubetas-carton'].map((id) => `<div class="tile"><img src="${img(id)}" alt=""></div>`).join('')}
        </div>
        ${foot('Presentación', n)}
      </section>`;

    case 'divider':
      return `
      <section class="pg pg--divider">
        <div class="div-panel">
          ${mark(true)}
          <div class="div-copy">
            <span class="num-xl">${ORD[pg.i]}</span>
            <span class="rule rule--short"></span>
            <p class="label label--light">Familia ${ORD[pg.i]}</p>
            <h2 class="ttl ttl--div">${esc(pg.f.name)}</h2>
            <p class="body body--light">${esc(pg.f.intro)}</p>
            <ol class="div-list">
              ${pg.list.map((p) => `<li><span>${esc(p.name)}</span><span>${two(prodPage[p.id])}</span></li>`).join('')}
            </ol>
          </div>
          ${foot(famLabel(pg.f), n, true)}
        </div>
        <div class="div-art"><img src="${img(pg.f.image)}" alt=""></div>
      </section>`;

    case 'single': {
      const p = pg.p;
      return `
      <section class="pg pg--single">
        <div class="prod-art">
          <img class="prod-img${p.image2 ? ' prod-img--main' : ''}" src="${img(p.image)}" alt="${esc(p.name)}">
          ${p.image2 ? `<img class="prod-img prod-img--second" src="${img(p.image2)}" alt="">` : ''}
          <span class="ill">Fotografía de producto</span>
        </div>
        <div class="prod-text">
          ${mark()}
          <p class="label top">${esc(famLabel(pg.f))}</p>
          <h2 class="ttl ttl--prod">${esc(p.name)}</h2>
          <p class="prod-kicker">${esc(p.kicker)}</p>
          <p class="body para">${esc(p.description)}</p>
          <div class="cols">
            <div><h3 class="h3">Características</h3>${list(p.features)}</div>
            <div><h3 class="h3">Aplicaciones</h3>${list(p.uses)}</div>
          </div>
          <table class="specs">
            <caption class="label">Datos técnicos</caption>
            ${p.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${txt(v)}</td></tr>`).join('')}
          </table>
        </div>
        ${foot(famLabel(pg.f), n)}
      </section>`;
    }

    case 'grid':
      return `
      <section class="pg pg--grid">
        ${mark()}
        <p class="label top">${esc(famLabel(pg.f))}</p>
        <h2 class="ttl ttl--md wide">${pg.gi === 0 && !products.some((p) => p.family === pg.f.id && p.layout === 'single') ? esc(pg.f.intro) : 'Más productos de la familia'}</h2>
        <div class="grid cols-${pg.list.length}">
          ${pg.list
            .map(
              (p) => `
            <article>
              <div class="g-img"><img src="${img(p.image)}" alt="${esc(p.name)}"></div>
              <h3 class="g-name">${esc(p.name)}</h3>
              <p class="body small">${esc(p.description)}</p>
              ${list(p.features, 'ticks ticks--small')}
            </article>`,
            )
            .join('')}
        </div>
        ${foot(famLabel(pg.f), n)}
      </section>`;

    case 'sustain':
      return `
      <section class="pg pg--sustain">
        ${mark()}
        <div class="sus-text">
          <p class="label top">Sostenibilidad</p>
          <h2 class="ttl ttl--md">«Palex, 100% con la sostenibilidad»</h2>
          <p class="body para">El compromiso que llevan impreso las propias cajas se traduce en detalles concretos de los productos de este catálogo.</p>
          <div class="sus-grid">
            ${sustainability.map((s) => `<div><h3 class="h3">${esc(s.title)}</h3><p class="body small">${esc(s.text)}</p></div>`).join('')}
          </div>
        </div>
        <div class="sus-art"><img src="${img('caja-fsc')}" alt=""></div>
        ${foot('Sostenibilidad', n)}
      </section>`;

    case 'closing':
      return `
      <section class="pg pg--closing">
        ${mark(true)}
        <div class="closing-copy">
          <span class="rule rule--accent"></span>
          <p class="label label--light">Siguiente paso</p>
          <h2 class="ttl ttl--lg">¿Quiere recibir muestras<br>o una oferta para su operación?</h2>
          <p class="body body--light">Indíquenos qué productos le interesan y su consumo aproximado. Le enviaremos muestras, fichas técnicas completas y una propuesta adaptada.</p>
        </div>
        <div class="contact">
          <div><p class="label label--light">Email</p><p class="c-main">${esc(brand.email)}</p><p class="c-sub">Atención comercial</p></div>
          <div><p class="label label--light">Teléfono</p><p class="c-main">${esc(brand.phones[0].number)}</p><p class="c-sub">${esc(brand.phones[1].label)}: ${esc(brand.phones[1].number)}</p></div>
          <div><p class="label label--light">PALEX MEDICAL</p><p class="c-main">${esc(brand.address[0])}</p><p class="c-sub">${esc(brand.address[1])}</p></div>
        </div>
        ${foot(`Catálogo de producto · edición de muestra ${YEAR}`, n, true)}
      </section>`;
  }
  return '';
};

const css = `
@font-face { font-family: 'Inter Tight'; font-weight: 300; src: url(../assets/fonts/inter-tight-latin-300-normal.woff2) format('woff2'); }
@font-face { font-family: 'Inter Tight'; font-weight: 400; src: url(../assets/fonts/inter-tight-latin-400-normal.woff2) format('woff2'); }
@font-face { font-family: 'Inter Tight'; font-weight: 500; src: url(../assets/fonts/inter-tight-latin-500-normal.woff2) format('woff2'); }
@font-face { font-family: 'Inter Tight'; font-weight: 600; src: url(../assets/fonts/inter-tight-latin-600-normal.woff2) format('woff2'); }
@font-face { font-family: 'Source Serif 4'; font-weight: 400; src: url(../assets/fonts/source-serif-4-latin-400-normal.woff2) format('woff2'); }
@font-face { font-family: 'Source Serif 4'; font-weight: 500; src: url(../assets/fonts/source-serif-4-latin-500-normal.woff2) format('woff2'); }
@page { size: 297mm 210mm; margin: 0; }
:root { --teal: ${brand.teal}; --navy: ${brand.navy}; --paper: #f7f7f4; --ink: #15202b; --muted: #5b6670; --line: #d9dcdc; --tint: #eceeea; --fh: 'Inter Tight', Arial, sans-serif; --fb: 'Source Serif 4', Georgia, serif; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; background: #666; color: var(--ink); font-family: var(--fb); }
h1, h2, h3, p, ol, ul, table { margin: 0; padding: 0; }
ol, ul { list-style: none; }
img { display: block; }
.pg { position: relative; width: 297mm; height: 210mm; overflow: hidden; background: var(--paper); padding: 0 15mm; break-after: page; }
@media screen { .pg { margin: 10mm auto; box-shadow: 0 10px 40px rgba(0,0,0,.35); } }
@media print { body { background: none; } }

/* Marca */
.mark { position: absolute; z-index: 5; top: 11mm; left: 15mm; display: flex; align-items: center; gap: 2.2mm; }
.mark__word { font-family: var(--fh); font-weight: 600; font-size: 15pt; letter-spacing: -0.02em; color: var(--navy); line-height: 1; }
.mark__tag { font-family: var(--fh); font-size: 5.2pt; line-height: 1.15; color: var(--teal); }
.mark--light .mark__word { color: #fff; }
.mark--light .mark__tag { color: #7fd6cc; }
.pg--single .mark { left: calc(50% + 12mm); }

.foot { position: absolute; z-index: 5; left: 15mm; right: 15mm; bottom: 9mm; display: flex; justify-content: space-between; font-family: var(--fh); font-size: 6.5pt; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); }
.foot--light { color: rgba(255,255,255,.65); }
.pg--single .foot { left: calc(50% + 12mm); }

/* Tipografía */
.label { font-family: var(--fh); font-size: 7pt; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal); font-weight: 500; }
.label--light { color: #7fd6cc; }
.label.top { margin-top: 27mm; margin-bottom: 4mm; }
.ttl { font-family: var(--fh); font-weight: 400; letter-spacing: -0.025em; line-height: 1.08; color: var(--navy); }
.ttl--cover { margin: 5mm 0 6mm; font-size: 33pt; font-weight: 300; color: #fff; }
.ttl--lg { font-size: 26pt; }
.ttl--md { font-size: 22pt; max-width: 130mm; }
.ttl--md.wide { max-width: 230mm; }
.ttl--div { margin: 4mm 0 5mm; font-size: 30pt; font-weight: 300; color: #fff; }
.ttl--prod { font-size: 25pt; font-weight: 500; }
.prod-kicker { margin-top: 2mm; font-family: var(--fh); font-size: 10pt; color: var(--teal); }
.h3 { font-family: var(--fh); font-weight: 500; font-size: 9.5pt; color: var(--navy); margin-bottom: 2mm; }
.body { font-size: 10pt; line-height: 1.55; color: #2b3640; }
.body--light { color: rgba(255,255,255,.84); font-size: 10.5pt; max-width: 112mm; }
.body.small { font-size: 8.6pt; line-height: 1.5; }
.para { margin-top: 4mm; }
.small-sans { display: block; margin-top: 2mm; font-family: var(--fh); font-size: 7.5pt; color: var(--muted); }
.num-xl { display: block; font-family: var(--fh); font-weight: 300; font-size: 60pt; line-height: 1; color: #fff; }
.num-lg { display: block; font-family: var(--fh); font-weight: 300; font-size: 26pt; line-height: 1; color: var(--navy); }
.rule { display: block; width: 30mm; height: 1pt; background: #fff; opacity: .5; }
.rule--accent { background: var(--teal); opacity: 1; }
.rule--short { width: 24mm; margin: 6mm 0; }
.pending { font-family: var(--fh); font-size: 0.82em; font-weight: 500; color: #a14f12; background: #fff0e3; padding: 0 1.2mm; border-radius: 0.6mm; white-space: nowrap; }

/* Portada */
.pg--cover { padding: 0; background: var(--tint); }
.cover-panel { position: absolute; left: 0; top: 0; bottom: 0; width: 46%; background: var(--navy); color: #fff; padding: 0 15mm; }
.cover-copy { position: absolute; left: 15mm; right: 14mm; top: 50mm; }
.cover-art { position: absolute; left: 46%; right: 0; top: 0; bottom: 0; }
.art { position: absolute; object-fit: contain; filter: drop-shadow(0 6mm 6mm rgba(20,30,40,.18)); }
.art--a { left: 3%; top: 9%; height: 82%; width: 46%; }
.art--b { left: 52%; right: 5%; top: 12%; width: auto; height: 34%; }
.art--c { left: 52%; right: 5%; bottom: 12%; width: auto; height: 36%; }
.art--d { display: none; }

/* Contenido */
.toc { display: grid; grid-template-columns: repeat(5, 1fr); gap: 7mm; margin-top: 12mm; }
.toc li { display: grid; grid-template-rows: auto auto 1fr auto; padding-top: 4mm; border-top: 0.8pt solid var(--navy); }
.toc li:first-child { border-top-color: var(--teal); }
.toc-name { margin: 3mm 0 2mm; font-family: var(--fh); font-size: 11.5pt; color: var(--navy); }
.toc-meta { margin-top: 4mm; font-family: var(--fh); font-size: 7pt; letter-spacing: .12em; text-transform: uppercase; color: var(--teal); }

/* Presentación */
.intro-text { position: absolute; left: 15mm; width: 128mm; top: 0; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6mm; margin-top: 9mm; }
.stat-n { display: block; font-family: var(--fh); font-size: 24pt; color: var(--navy); line-height: 1; }
.intro-art { position: absolute; right: 15mm; top: 22mm; bottom: 20mm; width: 118mm; display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
.tile { background: var(--tint); display: grid; place-items: center; padding: 5mm; border-radius: 1mm; }
.tile { position: relative; min-height: 0; }
.tile img { position: absolute; inset: 5mm; width: calc(100% - 10mm); height: calc(100% - 10mm); object-fit: contain; filter: drop-shadow(0 3mm 3mm rgba(20,30,40,.15)); }

/* Separador */
.pg--divider { padding: 0; }
.div-panel { position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: var(--navy); padding: 0 15mm; }
.div-copy { position: absolute; left: 15mm; right: 14mm; top: 30mm; }
.div-list { margin-top: 7mm; border-top: 0.6pt solid rgba(255,255,255,.25); }
.div-list li { display: flex; justify-content: space-between; padding: 2mm 0; border-bottom: 0.6pt solid rgba(255,255,255,.15); font-family: var(--fh); font-size: 8.5pt; color: rgba(255,255,255,.85); }
.div-list li span:last-child { color: #7fd6cc; letter-spacing: .1em; }
.div-art { position: absolute; left: 50%; right: 0; top: 0; bottom: 0; background: var(--tint); }
.div-art img { position: absolute; inset: 18mm; width: calc(100% - 36mm); height: calc(100% - 36mm); object-fit: contain; filter: drop-shadow(0 6mm 7mm rgba(20,30,40,.2)); }

/* Ficha */
.pg--single { padding: 0; }
.prod-art { position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: var(--tint); }
.prod-img { position: absolute; inset: 16mm 14mm; width: calc(100% - 28mm); height: calc(100% - 32mm); object-fit: contain; filter: drop-shadow(0 6mm 7mm rgba(20,30,40,.2)); }
.prod-img.prod-img--main { inset: auto; left: 8%; top: 9%; width: 60%; height: 70%; }
.prod-img.prod-img--second { inset: auto; right: 6%; bottom: 9%; width: 36%; height: 46%; }
.ill { position: absolute; left: 10mm; bottom: 9mm; font-family: var(--fh); font-size: 6pt; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
.prod-text { position: absolute; left: calc(50% + 12mm); right: 15mm; top: 0; bottom: 16mm; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 6mm; }
.ticks li { position: relative; padding: 1.3mm 0 1.3mm 4mm; border-top: 0.5pt solid var(--line); font-family: var(--fh); font-size: 8.2pt; line-height: 1.35; color: #2b3640; }
.ticks li::before { content: ''; position: absolute; left: 0; top: 2.7mm; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: var(--teal); }
.ticks--small li { font-size: 7.8pt; }
.specs { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; border-collapse: collapse; font-family: var(--fh); font-size: 8pt; }
.specs caption { text-align: left; padding-bottom: 2mm; }
.specs th, .specs td { text-align: left; padding: 1.5mm 0; border-top: 0.5pt solid var(--line); font-weight: 400; }
.specs th { width: 42%; color: var(--muted); }
.specs td { color: var(--ink); }

/* Rejilla */
.grid { display: grid; gap: 8mm; margin-top: 8mm; }
.grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid.cols-1 { grid-template-columns: 1fr 1fr; }
.g-img { position: relative; height: 62mm; background: var(--tint); border-radius: 1mm; }
.grid.cols-2 .g-img { height: 66mm; }
.g-img img { position: absolute; inset: 5mm; width: calc(100% - 10mm); height: calc(100% - 10mm); object-fit: contain; filter: drop-shadow(0 4mm 4mm rgba(20,30,40,.18)); }
.g-name { margin: 4mm 0 1.5mm; font-family: var(--fh); font-weight: 500; font-size: 11.5pt; color: var(--navy); }
.grid .body.small { margin-bottom: 2mm; }

/* Sostenibilidad */
.sus-text { position: absolute; left: 15mm; width: 150mm; top: 0; }
.sus-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm 8mm; margin-top: 8mm; }
.sus-grid > div { border-top: 0.6pt solid var(--line); padding-top: 3mm; }
.sus-art { position: absolute; right: 0; top: 0; bottom: 0; width: 34%; background: var(--tint); }
.sus-art img { position: absolute; inset: 14mm; width: calc(100% - 28mm); height: calc(100% - 28mm); object-fit: contain; filter: drop-shadow(0 6mm 7mm rgba(20,30,40,.2)); }
.pg--sustain .foot { right: calc(34% + 10mm); }

/* Cierre */
.pg--closing { background: var(--navy); color: #fff; }
.pg--closing .ttl { color: #fff; font-weight: 300; }
.closing-copy { position: absolute; left: 15mm; top: 40mm; max-width: 180mm; }
.closing-copy .label { margin: 6mm 0 5mm; }
.closing-copy .ttl { margin-bottom: 7mm; }
.contact { position: absolute; left: 15mm; right: 15mm; bottom: 20mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; padding-top: 6mm; border-top: 0.6pt solid rgba(255,255,255,.25); }
.c-main { margin-top: 3mm; font-family: var(--fh); font-size: 11pt; }
.c-sub { margin-top: 1mm; font-family: var(--fh); font-size: 7.5pt; color: rgba(255,255,255,.6); }
`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Palex · Catálogo de producto · Edición de muestra</title><style>${css}</style></head>
<body>${pages.map((pg, i) => render(pg, i + 1)).join('\n')}</body></html>`;

await mkdir(path.dirname(OUT_HTML), { recursive: true });
await writeFile(OUT_HTML, html);
console.log(`✓ ${path.relative(process.cwd(), OUT_HTML)} (${pages.length} páginas)`);

if (process.argv.includes('--html')) process.exit(0);
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('file://' + OUT_HTML, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const broken = await page.evaluate(() => Array.from(document.images).filter((i) => !i.naturalWidth).map((i) => i.getAttribute('src')));
if (broken.length) console.warn('! Imágenes sin cargar:', [...new Set(broken)].join(', '));
await page.pdf({ path: OUT_PDF, width: '297mm', height: '210mm', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`✓ ${path.relative(process.cwd(), OUT_PDF)}`);
