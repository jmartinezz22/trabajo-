/**
 * Genera los catálogos PDF (A4 horizontal) de cada versión a partir de /catalogo/<versión>/pdf/.
 *
 *   npm run build && node scripts/catalog-pdf.mjs
 *
 * Requiere Playwright (npm i --no-save playwright && npx playwright install chromium).
 * Necesita acceso a internet para las fotografías (Pexels) y las tipografías (Google Fonts).
 * Salida: catalogo-pdf/<fileName de catalogConfig>.
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as wait } from 'node:timers/promises';

const PORT = 4329;
const READY_MS = Number(process.env.PDF_WAIT_MS ?? 120_000);
const OUT = 'catalogo-pdf';
const versions = [
  { slug: 'palex', file: 'Catalogo_Servicios_PALEX.pdf' },
  { slug: 'neutro', file: 'Catalogo_Servicios_Logisticos.pdf' },
].filter((v) => !process.env.PUBLIC_CATALOGS || process.env.PUBLIC_CATALOGS.includes(v.slug));

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');

const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { stdio: 'ignore' });
const base = `http://localhost:${PORT}`;
for (let i = 0; i < 60; i++) {
  try {
    if ((await fetch(`${base}/`)).ok) break;
  } catch {}
  await wait(500);
}

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
try {
  for (const v of versions) {
    const page = await browser.newPage({ viewport: { width: 1123, height: 794 } });
    await page.goto(`${base}/catalogo/${v.slug}/pdf/`, { waitUntil: 'load', timeout: 120_000 });
    await page.waitForSelector('body[data-pdf-ready="1"]', { timeout: READY_MS }).catch(() => console.warn(`! ${v.slug}: imágenes o tipografías sin confirmar`));
    const broken = await page.evaluate(() => Array.from(document.images).filter((i) => !i.naturalWidth).length);
    await page.pdf({ path: `${OUT}/${v.file}`, width: '297mm', height: '210mm', printBackground: true, preferCSSPageSize: true });
    console.log(`✓ ${OUT}/${v.file}${broken ? ` (${broken} imágenes sin cargar)` : ''}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.kill();
}
