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

/* — Paginación (catálogo de imprenta: fotos reales grandes, poco texto) — */
const photo = (id) => `../img/${id}-foto.jpg`;
const scene = (n) => `../img/escena-${String(n).padStart(2, '0')}.jpg`;
const famPhoto = { equipos: scene(1), proteccion: photo('nido-abeja'), cajas: scene(7), identificacion: scene(8), almacenaje: scene(3) };
/** Productos destacados que lucen mejor con la foto completa (encuadre y posición). */
const singleShot = {
  'caja-isotermica': [scene(7), '50% 30%'],
  'caja-frio-azul': [scene(4), '50% 0%'],
  'carton-rollo': [scene(2), '45% 50%'],
};
const shot = (p) => singleShot[p.image] ?? [photo(p.image), '50% 50%'];
const clean = (arr) => (arr || []).filter((x) => !x.includes(PENDING)).map((x) => x.replace(/:\s*$/, ''));

const pages = [];
const famStart = {};
pages.push({ t: 'cover' }, { t: 'contents' });
families.forEach((f, i) => {
  famStart[f.id] = pages.length + 1;
  const list = products.filter((p) => p.family === f.id);
  pages.push({ t: 'divider', f, i, list });
  list.filter((p) => p.layout === 'single').forEach((p) => pages.push({ t: 'single', f, p }));
  const grid = list.filter((p) => p.layout === 'grid');
  for (let k = 0; k < grid.length; k += 2) pages.push({ t: 'pair', f, list: grid.slice(k, k + 2) });
});
pages.push({ t: 'sustain' }, { t: 'closing' });

const mark = (light = false) => `
  <div class="mark${light ? ' mark--light' : ''}">
    <span class="mark__word">${brand.name}</span>
    <span class="mark__tag">${brand.tagline.map(esc).join('<br>')}</span>
  </div>`;
const folio = (label, n, light = false) => `<div class="folio${light ? ' folio--light' : ''}"><span>${esc(label)}</span><b>${two(n)}</b></div>`;

const render = (pg, n) => {
  switch (pg.t) {
    case 'cover':
      return `
      <section class="pg cover">
        <div class="cover-photos">
          <div class="cp cp--a"><img src="${photo('speedman')}" alt=""></div>
          <div class="cp cp--b"><img src="${scene(7)}" alt=""></div>
          <div class="cp cp--c"><img src="${photo('etiquetas-frio')}" alt=""></div>
        </div>
        <div class="cover-panel">
          ${mark(true)}
          <div class="cover-title">
            <p class="eyebrow eyebrow--light">Catálogo de producto · ${YEAR}</p>
            <h1>Packaging<br>y consumibles</h1>
            <p class="cover-sub">Embalaje, cadena de frío, identificación y almacenaje</p>
          </div>
        </div>
      </section>`;

    case 'contents':
      return `
      <section class="pg contents">
        ${mark()}
        <h2 class="big-title">Contenido</h2>
        <div class="toc">
          ${families
            .map(
              (f, i) => `
            <div class="toc-item">
              <div class="toc-photo"><img src="${famPhoto[f.id]}" alt=""></div>
              <span class="toc-num">${ORD[i]}</span>
              <span class="toc-name">${esc(f.name)}</span>
              <span class="toc-page">Pág. ${two(famStart[f.id])}</span>
            </div>`,
            )
            .join('')}
        </div>
        ${folio('Catálogo de producto', n)}
      </section>`;

    case 'divider':
      return `
      <section class="pg divider">
        <img class="bleed" src="${famPhoto[pg.f.id]}" alt="">
        <div class="veil"></div>
        ${mark(true)}
        <div class="div-copy">
          <span class="div-num">${ORD[pg.i]}</span>
          <h2>${esc(pg.f.name)}</h2>
          <p>${esc(pg.f.intro)}</p>
        </div>
        ${folio(`${ORD[pg.i]} · ${pg.f.name}`, n, true)}
      </section>`;

    case 'single': {
      const p = pg.p;
      const pts = clean(p.features).slice(0, 5);
      return `
      <section class="pg single">
        <div class="s-photo"><img src="${shot(p)[0]}" style="object-position:${shot(p)[1]}" alt="${esc(p.name)}"></div>
        ${p.image2 ? `<div class="s-inset"><img src="${photo(p.image2)}" alt=""></div>` : ''}
        <div class="s-copy">
          ${mark()}
          <p class="eyebrow">${ORD[families.indexOf(pg.f)]} · ${esc(pg.f.name)}</p>
          <h2 class="p-name">${esc(p.name)}</h2>
          <p class="p-kicker">${esc(p.kicker)}</p>
          <p class="p-desc">${esc(p.description)}</p>
          <ul class="points">${pts.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          ${p.uses ? `<p class="uses"><span>Aplicaciones</span>${p.uses.map(esc).join(' · ')}</p>` : ''}
        </div>
        ${folio(`${ORD[families.indexOf(pg.f)]} · ${pg.f.name}`, n)}
      </section>`;
    }

    case 'pair':
      return `
      <section class="pg pair${pg.list.length === 1 ? ' pair--one' : ''}">
        ${mark()}
        <p class="eyebrow pair-eyebrow">${ORD[families.indexOf(pg.f)]} · ${esc(pg.f.name)}</p>
        <div class="pair-grid">
          ${pg.list
            .map(
              (p) => `
            <article>
              <div class="pr-photo"><img src="${photo(p.image)}" alt="${esc(p.name)}"></div>
              <h3 class="pr-name">${esc(p.name)}</h3>
              <p class="pr-desc">${esc(p.description)}</p>
              <p class="pr-pts">${clean(p.features).map(esc).join('<i>·</i>')}</p>
            </article>`,
            )
            .join('')}
        </div>
        ${folio(`${ORD[families.indexOf(pg.f)]} · ${pg.f.name}`, n)}
      </section>`;

    case 'sustain':
      return `
      <section class="pg sustain">
        <div class="su-photo"><img src="${scene(9)}" style="object-position:60% 60%" alt=""></div>
        <div class="su-copy">
          ${mark()}
          <p class="eyebrow">Sostenibilidad</p>
          <h2 class="p-name">Palex, 100% con<br>la sostenibilidad</h2>
          <div class="su-list">
            ${sustainability.map((x) => `<div><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></div>`).join('')}
          </div>
        </div>
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
        <p class="cl-note">Edición de muestra. Imágenes de producto reales; especificaciones técnicas disponibles bajo petición.</p>
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
:root { --teal: ${brand.teal}; --navy: ${brand.navy}; --ink: #1a222b; --muted: #66707a; --f: 'Inter Tight', Arial, sans-serif; --s: 'Source Serif 4', Georgia, serif; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; background: #666; color: var(--ink); font-family: var(--f); }
h1, h2, h3, p, ul { margin: 0; padding: 0; }
ul { list-style: none; }
img { display: block; width: 100%; height: 100%; object-fit: cover; }
.pg { position: relative; width: 297mm; height: 210mm; overflow: hidden; background: #fff; break-after: page; }
@media screen { .pg { margin: 10mm auto; box-shadow: 0 10px 40px rgba(0,0,0,.35); } }
@media print { body { background: none; } }

.mark { position: absolute; z-index: 6; top: 12mm; left: 14mm; display: flex; align-items: center; gap: 2.4mm; }
.mark__word { font-weight: 600; font-size: 17pt; letter-spacing: -0.02em; color: var(--navy); line-height: 1; }
.mark__tag { font-size: 5.6pt; line-height: 1.15; color: var(--teal); }
.mark--light .mark__word { color: #fff; }
.mark--light .mark__tag { color: #8fe0d6; }
.folio { position: absolute; z-index: 6; left: 14mm; right: 14mm; bottom: 8mm; display: flex; justify-content: space-between; align-items: baseline; font-size: 7pt; letter-spacing: .18em; text-transform: uppercase; color: var(--muted); }
.folio b { font-weight: 500; font-size: 9pt; letter-spacing: 0; color: var(--navy); }
.folio--light, .folio--light b { color: rgba(255,255,255,.85); }
.eyebrow { font-size: 7.5pt; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--teal); }
.eyebrow--light { color: #8fe0d6; }

/* Portada */
.cover { background: var(--navy); }
.cover-photos { position: absolute; left: 38%; right: 0; top: 0; bottom: 0; display: grid; grid-template-columns: 1.15fr 1fr; grid-template-rows: 1fr 1fr; gap: 2mm; }
.cp { overflow: hidden; }
.cp--a { grid-row: span 2; }
.cover-panel { position: absolute; left: 0; top: 0; bottom: 0; width: 38%; padding: 0 14mm; }
.cover-title { position: absolute; left: 14mm; right: 10mm; bottom: 26mm; color: #fff; }
.cover-title h1 { margin: 5mm 0 5mm; font-size: 38pt; font-weight: 300; letter-spacing: -0.03em; line-height: 1.02; }
.cover-sub { font-family: var(--s); font-size: 11pt; line-height: 1.45; color: rgba(255,255,255,.8); }
.cover-title::before { content: ''; display: block; width: 22mm; height: 1.4mm; background: var(--teal); margin-bottom: 7mm; }

/* Contenido */
.contents { padding: 0 14mm; }
.big-title { position: absolute; left: 14mm; top: 30mm; font-size: 30pt; font-weight: 300; color: var(--navy); letter-spacing: -0.03em; }
.toc { position: absolute; left: 14mm; right: 14mm; top: 54mm; bottom: 22mm; display: grid; grid-template-columns: repeat(5, 1fr); gap: 5mm; }
.toc-item { display: grid; grid-template-rows: 1fr auto auto auto; }
.toc-photo { overflow: hidden; margin-bottom: 4mm; }
.toc-num { font-size: 22pt; font-weight: 300; color: var(--teal); line-height: 1; }
.toc-name { margin-top: 2mm; font-size: 11pt; font-weight: 500; color: var(--navy); line-height: 1.2; }
.toc-page { margin-top: 1.5mm; font-size: 7pt; letter-spacing: .15em; text-transform: uppercase; color: var(--muted); }

/* Separador */
.divider .bleed { position: absolute; inset: 0; }
.veil { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(20,30,70,.92) 0%, rgba(20,30,70,.7) 38%, rgba(20,30,70,.05) 75%); }
.div-copy { position: absolute; z-index: 5; left: 14mm; bottom: 28mm; width: 120mm; color: #fff; }
.div-num { display: block; font-size: 80pt; font-weight: 300; line-height: .9; color: #8fe0d6; }
.div-copy h2 { margin: 4mm 0 5mm; font-size: 32pt; font-weight: 400; letter-spacing: -0.025em; line-height: 1.05; }
.div-copy p { font-family: var(--s); font-size: 11pt; line-height: 1.5; color: rgba(255,255,255,.85); }

/* Producto destacado */
.s-photo { position: absolute; left: 0; top: 0; bottom: 0; width: 56%; }
.s-inset { position: absolute; left: calc(56% - 58mm); bottom: 12mm; width: 50mm; height: 62mm; border: 2.5mm solid #fff; box-shadow: 0 4mm 10mm rgba(0,0,0,.25); }
.s-copy { position: absolute; left: calc(56% + 12mm); right: 14mm; top: 0; bottom: 20mm; }
.s-copy .mark { left: 0; }
.s-copy .eyebrow { margin-top: 34mm; }
.p-name { margin-top: 4mm; font-size: 27pt; font-weight: 500; color: var(--navy); letter-spacing: -0.025em; line-height: 1.05; }
.p-kicker { margin-top: 3mm; font-size: 11pt; color: var(--teal); }
.p-desc { margin-top: 6mm; font-family: var(--s); font-size: 10.5pt; line-height: 1.55; color: #36404a; }
.points { margin-top: 6mm; }
.points li { padding: 2.2mm 0 2.2mm 6mm; border-top: 0.5pt solid #dfe3e6; font-size: 9pt; position: relative; }
.points li::before { content: ''; position: absolute; left: 0; top: 3.7mm; width: 3mm; height: 0.6mm; background: var(--teal); }
.uses { position: absolute; left: 0; right: 0; bottom: 0; font-size: 8.5pt; line-height: 1.5; color: #36404a; }
.uses span { display: block; margin-bottom: 1.5mm; font-size: 7pt; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--teal); }
.single .folio { left: calc(56% + 12mm); }

/* Pareja de productos */
.pair-eyebrow { position: absolute; left: 14mm; top: 27mm; }
.pair-grid { position: absolute; left: 14mm; right: 14mm; top: 35mm; bottom: 18mm; display: grid; grid-template-columns: 1fr 1fr; gap: 10mm; }
.pair--one .pair-grid { grid-template-columns: 1.4fr 1fr; }
.pair-grid article { display: grid; grid-template-rows: 1fr auto auto auto; min-height: 0; }
.pr-photo { overflow: hidden; min-height: 0; }
.pr-name { margin-top: 5mm; font-size: 15pt; font-weight: 500; color: var(--navy); letter-spacing: -0.015em; }
.pr-desc { margin-top: 2mm; font-family: var(--s); font-size: 9.5pt; line-height: 1.5; color: #36404a; }
.pr-pts { margin-top: 2.5mm; font-size: 8pt; color: var(--teal); font-weight: 500; }
.pr-pts i { font-style: normal; margin: 0 2mm; color: #b9c2c8; }

/* Sostenibilidad */
.su-photo { position: absolute; right: 0; top: 0; bottom: 0; width: 42%; }
.su-copy { position: absolute; left: 14mm; width: 140mm; top: 0; }
.su-copy .eyebrow { margin-top: 34mm; }
.su-list { display: grid; grid-template-columns: 1fr 1fr; gap: 6mm 8mm; margin-top: 9mm; }
.su-list h3 { font-size: 10.5pt; font-weight: 500; color: var(--navy); padding-top: 3mm; border-top: 1.2pt solid var(--teal); }
.su-list p { margin-top: 2mm; font-family: var(--s); font-size: 9pt; line-height: 1.5; color: #36404a; }
.sustain .folio { right: calc(42% + 10mm); }

/* Cierre */
.closing { background: var(--navy); color: #fff; }
.cl-copy { position: absolute; left: 14mm; top: 42mm; width: 170mm; }
.cl-copy h2 { margin: 5mm 0 6mm; font-size: 34pt; font-weight: 300; letter-spacing: -0.03em; line-height: 1.05; }
.cl-copy p { font-family: var(--s); font-size: 11pt; line-height: 1.5; color: rgba(255,255,255,.82); max-width: 130mm; }
.cl-data { position: absolute; left: 14mm; right: 14mm; bottom: 26mm; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; padding-top: 6mm; border-top: 0.6pt solid rgba(255,255,255,.3); }
.cl-data span { display: block; font-size: 7pt; letter-spacing: .2em; text-transform: uppercase; color: #8fe0d6; }
.cl-data b { display: block; margin-top: 3mm; font-size: 12pt; font-weight: 400; }
.cl-data small { display: block; margin-top: 1mm; font-size: 8pt; color: rgba(255,255,255,.65); }
.cl-note { position: absolute; left: 14mm; bottom: 10mm; font-size: 7pt; color: rgba(255,255,255,.55); }
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
