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
/** Texto con el marcador de dato pendiente resaltado. */
const txt = (s) => {
  const t = esc(s);
  return t.includes(esc(PENDING)) ? t.replace(esc(PENDING), `<span class="pending">${esc(PENDING)}</span>`) : t;
};
const ORD = ['01', '02', '03', '04', '05'];

/* — Paginación (catálogo de producto: fotos de estudio sobre blanco) — */
const shot = (id) => `../img/${id}-estudio.jpg`;
const famHero = { equipos: 'speedman', proteccion: 'nido-abeja', cajas: 'palextand', identificacion: 'etiquetas-frio', almacenaje: 'palets' };
const clean = (arr) => (arr || []).filter((x) => !x.includes(PENDING));

const pages = [];
const famStart = {};
pages.push({ t: 'cover' }, { t: 'contents' });
families.forEach((f, i) => {
  famStart[f.id] = pages.length + 1;
  const list = products.filter((p) => p.family === f.id);
  pages.push({ t: 'opener', f, i, list });
  list.filter((p) => p.layout === 'single').forEach((p) => pages.push({ t: 'single', f, p }));
  const grid = list.filter((p) => p.layout === 'grid');
  // Reparto sin productos sueltos: 1-3 en una fila; 4 = 2+2; 5 = 3+2
  const sizes = grid.length <= 3 ? [grid.length] : grid.length === 4 ? [2, 2] : [3, grid.length - 3];
  let k = 0;
  sizes.filter(Boolean).forEach((sz) => { pages.push({ t: 'row', f, list: grid.slice(k, k + sz) }); k += sz; });
});
pages.push({ t: 'sustain' }, { t: 'closing' });

const mark = (light = false) => `
  <div class="mark${light ? ' mark--light' : ''}">
    <span class="mark__word">${brand.name}</span>
    <span class="mark__tag">${brand.tagline.map(esc).join('<br>')}</span>
  </div>`;
const folio = (label, n, light = false) => `<div class="folio${light ? ' folio--light' : ''}"><span>${esc(label)}</span><b>${two(n)}</b></div>`;
const famLabel = (f) => `${ORD[families.indexOf(f)]} — ${f.name}`;

const render = (pg, n) => {
  switch (pg.t) {
    case 'cover':
      return `
      <section class="pg cover">
        ${mark()}
        <div class="cover-title">
          <p class="eyebrow">Catálogo de producto ${YEAR}</p>
          <h1>Packaging<br>y consumibles</h1>
          <p class="lede">Embalaje, cadena de frío, identificación y almacenaje para la logística sanitaria.</p>
        </div>
        <div class="cover-stage">
          <img class="st st--a" src="${shot('speedman')}" alt="">
          <img class="st st--b" src="${shot('caja-hu')}" alt="">
          <img class="st st--c" src="${shot('etiquetas-frio')}" alt="">
        </div>
        <div class="cover-band"><span>Equipos de embalaje</span><span>Protección y relleno</span><span>Cajas y envases</span><span>Identificación</span><span>Almacenaje</span></div>
      </section>`;

    case 'contents':
      return `
      <section class="pg contents">
        ${mark()}
        <p class="eyebrow top">Índice</p>
        <h2 class="h-xl">Cinco familias de producto</h2>
        <div class="toc">
          ${families
            .map(
              (f, i) => `
            <div class="toc-item">
              <div class="toc-img"><img src="${shot(famHero[f.id])}" alt=""></div>
              <span class="toc-num">${ORD[i]}</span>
              <span class="toc-name">${esc(f.name)}</span>
              <span class="toc-page">${two(famStart[f.id])}</span>
            </div>`,
            )
            .join('')}
        </div>
        ${folio('Catálogo de producto', n)}
      </section>`;

    case 'opener':
      return `
      <section class="pg opener">
        <div class="op-panel">
          ${mark(true)}
          <span class="op-num">${ORD[pg.i]}</span>
          <h2>${esc(pg.f.name)}</h2>
          <p>${esc(pg.f.intro)}</p>
          <ul>${pg.list.map((p) => `<li>${esc(p.name)}</li>`).join('')}</ul>
        </div>
        <div class="op-img"><img src="${shot(famHero[pg.f.id])}" alt=""></div>
        ${folio(famLabel(pg.f), n)}
      </section>`;

    case 'single': {
      const p = pg.p;
      return `
      <section class="pg single">
        ${mark()}
        <div class="sg-img"><img src="${shot(p.image)}" alt="${esc(p.name)}"></div>
        <div class="sg-copy">
          <p class="eyebrow">${esc(famLabel(pg.f))}</p>
          <h2 class="p-name">${esc(p.name)}</h2>
          <p class="p-kicker">${esc(p.kicker)}</p>
          <p class="p-desc">${esc(p.description)}</p>
          <div class="p-cols">
            <div><h3>Características</h3><ul>${clean(p.features).slice(0, 5).map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>
            ${p.uses ? `<div><h3>Aplicaciones</h3><ul>${p.uses.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></div>` : ''}
          </div>
        </div>
        ${folio(famLabel(pg.f), n)}
      </section>`;
    }

    case 'row':
      return `
      <section class="pg row">
        ${mark()}
        <p class="eyebrow row-eyebrow">${esc(famLabel(pg.f))}</p>
        <div class="row-grid cols-${pg.list.length}">
          ${pg.list
            .map(
              (p) => `
            <article>
              <div class="rw-img"><img src="${shot(p.image)}" alt="${esc(p.name)}"></div>
              <h3>${esc(p.name)}</h3>
              <p>${esc(p.description)}</p>
            </article>`,
            )
            .join('')}
        </div>
        ${folio(famLabel(pg.f), n)}
      </section>`;

    case 'sustain':
      return `
      <section class="pg sustain">
        ${mark()}
        <div class="su-copy">
          <p class="eyebrow">Sostenibilidad</p>
          <h2 class="h-xl">Palex, 100% con<br>la sostenibilidad</h2>
          <div class="su-list">
            ${sustainability.map((x, i) => `<div><span>${two(i + 1)}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join('')}
          </div>
        </div>
        <div class="su-img"><img src="${shot('caja-fsc')}" alt=""></div>
        ${folio('Sostenibilidad', n)}
      </section>`;

    case 'closing':
      return `
      <section class="pg closing">
        ${mark(true)}
        <div class="cl-copy">
          <p class="eyebrow eyebrow--light">Contacto</p>
          <h2>Solicite muestras<br>y fichas técnicas.</h2>
          <p>Le enviamos muestras de los productos que necesite, fichas técnicas completas y una oferta adaptada a su consumo.</p>
        </div>
        <div class="cl-data">
          <div><span>Email</span><b>${esc(brand.email)}</b></div>
          <div><span>Teléfono</span><b>${esc(brand.phones[0].number)}</b><small>${esc(brand.phones[1].label)}: ${esc(brand.phones[1].number)}</small></div>
          <div><span>PALEX MEDICAL</span><b>${esc(brand.address[0])}</b><small>${esc(brand.address[1])}</small></div>
        </div>
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
@page { size: 297mm 210mm; margin: 0; }
:root { --teal: ${brand.teal}; --navy: ${brand.navy}; --ink: #1b232c; --muted: #6b747c; --rule: #e3e6e8; --f: 'Inter Tight', Arial, sans-serif; --s: 'Source Serif 4', Georgia, serif; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; background: #777; color: var(--ink); font-family: var(--f); }
h1, h2, h3, p, ul { margin: 0; padding: 0; }
ul { list-style: none; }
img { display: block; width: 100%; height: 100%; object-fit: contain; }
.pg { position: relative; width: 297mm; height: 210mm; overflow: hidden; background: #fff; break-after: page; }
@media screen { .pg { margin: 10mm auto; box-shadow: 0 10px 40px rgba(0,0,0,.35); } }
@media print { body { background: none; } }

.mark { position: absolute; z-index: 6; top: 12mm; left: 15mm; display: flex; align-items: center; gap: 2.4mm; }
.mark__word { font-weight: 600; font-size: 17pt; letter-spacing: -0.02em; color: var(--navy); line-height: 1; }
.mark__tag { font-size: 5.6pt; line-height: 1.15; color: var(--teal); }
.mark--light .mark__word { color: #fff; }
.mark--light .mark__tag { color: #8fe0d6; }
.folio { position: absolute; z-index: 6; left: 15mm; right: 15mm; bottom: 9mm; display: flex; justify-content: space-between; align-items: baseline; padding-top: 3mm; border-top: 0.5pt solid var(--rule); font-size: 6.8pt; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
.folio b { font-weight: 500; font-size: 8.5pt; letter-spacing: .05em; color: var(--navy); }
.eyebrow { font-size: 7.5pt; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: var(--teal); }
.eyebrow--light { color: #8fe0d6; }
.eyebrow.top { position: absolute; left: 15mm; top: 30mm; }
.h-xl { font-size: 30pt; font-weight: 300; letter-spacing: -0.03em; line-height: 1.05; color: var(--navy); }

/* Portada */
.cover-title { position: absolute; left: 15mm; top: 44mm; width: 105mm; }
.cover-title h1 { margin: 5mm 0 6mm; font-size: 46pt; font-weight: 300; letter-spacing: -0.04em; line-height: .98; color: var(--navy); }
.cover-title .lede { font-family: var(--s); font-size: 11.5pt; line-height: 1.5; color: #46515b; }
.cover-title::after { content: ''; display: block; width: 24mm; height: 1.4mm; margin-top: 9mm; background: var(--teal); }
.cover-stage { position: absolute; left: 118mm; right: 8mm; top: 10mm; bottom: 30mm; }
.st { position: absolute; }
.st--a { left: 0; top: 2%; width: 46%; height: 96%; }
.st--b { right: 0; top: 4%; width: 54%; height: 46%; }
.st--c { right: 6%; bottom: 0; width: 44%; height: 50%; }
.cover-band { position: absolute; left: 0; right: 0; bottom: 0; height: 18mm; padding: 0 15mm; background: var(--navy); display: flex; align-items: center; justify-content: space-between; font-size: 7.5pt; letter-spacing: .18em; text-transform: uppercase; color: rgba(255,255,255,.85); }
.cover-band span + span::before { content: '·'; margin-right: 6mm; color: var(--teal); }

/* Índice */
.contents .h-xl { position: absolute; left: 15mm; top: 37mm; }
.toc { position: absolute; left: 15mm; right: 15mm; top: 62mm; bottom: 24mm; display: grid; grid-template-columns: repeat(5, 1fr); gap: 7mm; }
.toc-item { display: grid; grid-template-rows: 1fr auto auto auto; border-top: 0.8pt solid var(--navy); padding-top: 4mm; }
.toc-item:first-child { border-top-color: var(--teal); }
.toc-img { min-height: 0; margin-bottom: 4mm; }
.toc-num { font-size: 24pt; font-weight: 300; color: var(--teal); line-height: 1; }
.toc-name { margin-top: 2mm; font-size: 11pt; font-weight: 500; color: var(--navy); line-height: 1.2; }
.toc-page { margin-top: 2mm; font-size: 7pt; letter-spacing: .15em; color: var(--muted); }

/* Apertura de familia */
.op-panel { position: absolute; left: 0; top: 0; bottom: 0; width: 40%; background: var(--navy); color: #fff; padding: 0 15mm; }
.op-num { position: absolute; left: 15mm; top: 36mm; font-size: 84pt; font-weight: 300; line-height: .9; color: #8fe0d6; }
.op-panel h2 { position: absolute; left: 15mm; right: 12mm; top: 82mm; font-size: 28pt; font-weight: 400; letter-spacing: -0.025em; line-height: 1.05; }
.op-panel p { position: absolute; left: 15mm; right: 12mm; top: 112mm; font-family: var(--s); font-size: 10.5pt; line-height: 1.5; color: rgba(255,255,255,.82); }
.op-panel ul { position: absolute; left: 15mm; right: 12mm; bottom: 22mm; border-top: 0.5pt solid rgba(255,255,255,.25); }
.op-panel li { padding: 1.8mm 0; border-bottom: 0.5pt solid rgba(255,255,255,.15); font-size: 8.5pt; color: rgba(255,255,255,.85); }
.op-img { position: absolute; left: 44%; right: 4%; top: 12mm; bottom: 22mm; }
.opener .folio { left: calc(40% + 12mm); }

/* Producto destacado */
.sg-img { position: absolute; left: 6mm; top: 22mm; bottom: 20mm; width: 54%; }
.sg-copy { position: absolute; left: calc(57% + 6mm); right: 15mm; top: 34mm; }
.p-name { margin-top: 4mm; font-size: 28pt; font-weight: 400; color: var(--navy); letter-spacing: -0.03em; line-height: 1.04; }
.p-kicker { margin-top: 3mm; font-size: 10.5pt; color: var(--teal); }
.p-desc { margin-top: 7mm; font-family: var(--s); font-size: 10.5pt; line-height: 1.6; color: #3c4650; }
.p-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; margin-top: 8mm; }
.p-cols h3 { font-size: 7.5pt; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--navy); padding-bottom: 2mm; border-bottom: 0.8pt solid var(--navy); }
.p-cols li { padding: 1.8mm 0; border-bottom: 0.5pt solid var(--rule); font-size: 8.4pt; line-height: 1.35; color: #3c4650; }

/* Fila de productos */
.row-eyebrow { position: absolute; left: 15mm; top: 30mm; }
.row-grid { position: absolute; left: 15mm; right: 15mm; top: 38mm; bottom: 22mm; display: grid; gap: 10mm; }
.row-grid.cols-1 { grid-template-columns: 1fr; left: 40mm; right: 40mm; }
.row-grid.cols-2 { grid-template-columns: 1fr 1fr; }
.row-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
.row-grid article { display: grid; grid-template-rows: 1fr auto auto; min-height: 0; }
.rw-img { min-height: 0; }
.row-grid h3 { margin-top: 4mm; padding-top: 3.5mm; border-top: 0.8pt solid var(--navy); font-size: 14pt; font-weight: 400; color: var(--navy); letter-spacing: -0.015em; }
.row-grid p { margin-top: 2mm; font-family: var(--s); font-size: 9.2pt; line-height: 1.5; color: #4a545e; }

/* Sostenibilidad */
.su-copy { position: absolute; left: 15mm; width: 150mm; top: 34mm; }
.su-list { display: grid; grid-template-columns: 1fr 1fr; gap: 7mm 9mm; margin-top: 10mm; }
.su-list span { font-size: 18pt; font-weight: 300; color: var(--teal); }
.su-list h3 { margin-top: 1.5mm; font-size: 10.5pt; font-weight: 500; color: var(--navy); }
.su-list p { margin-top: 1.5mm; font-family: var(--s); font-size: 9pt; line-height: 1.5; color: #4a545e; }
.su-img { position: absolute; right: 12mm; top: 16mm; bottom: 22mm; width: 90mm; }

/* Cierre */
.closing { background: var(--navy); color: #fff; }
.cl-copy { position: absolute; left: 15mm; top: 44mm; width: 170mm; }
.cl-copy h2 { margin: 5mm 0 6mm; font-size: 36pt; font-weight: 300; letter-spacing: -0.03em; line-height: 1.04; }
.cl-copy p { font-family: var(--s); font-size: 11pt; line-height: 1.5; color: rgba(255,255,255,.82); max-width: 130mm; }
.cl-data { position: absolute; left: 15mm; right: 15mm; bottom: 24mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; padding-top: 6mm; border-top: 0.6pt solid rgba(255,255,255,.3); }
.cl-data span { display: block; font-size: 7pt; letter-spacing: .2em; text-transform: uppercase; color: #8fe0d6; }
.cl-data b { display: block; margin-top: 3mm; font-size: 12pt; font-weight: 400; }
.cl-data small { display: block; margin-top: 1mm; font-size: 8pt; color: rgba(255,255,255,.65); }
`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Palex · Catálogo de producto</title><style>${css}</style></head>
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
// Versión ligera para email: recomprime las fotos (conserva transparencias)
const { execFileSync } = await import('node:child_process');
try {
  execFileSync('python3', [path.join(ROOT, '..', 'scripts', 'shrink-pdf.py'), OUT_PDF, OUT_PDF + '.tmp', '1400', '82']);
  (await import('node:fs')).renameSync(OUT_PDF + '.tmp', OUT_PDF);
} catch (e) {
  console.warn('! No se pudo comprimir el PDF (requiere pikepdf):', e.message);
}
console.log(`✓ ${path.relative(process.cwd(), OUT_PDF)}`);
