/**
 * Descarga y optimiza la fotografía de la web (ejecutar con acceso a Internet):
 *   npm run images
 * - Si existe public/images/source/<slot>.jpg (foto propia) se usa ese archivo.
 * - Si no, se descarga desde Unsplash (licencia Unsplash).
 * Genera AVIF + WebP en varios anchos y el manifiesto src/data/images.local.json.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const outDir = path.join(root, 'public/images');
const srcDir = path.join(outDir, 'source');
const WIDTHS = [640, 1024, 1600, 2400];

const registry = await fs.readFile(path.join(root, 'src/data/images.ts'), 'utf8');
const slots = [...registry.matchAll(/^\s+(\w+): \{ unsplash: '([^']+)'/gm)].map(([, key, id]) => ({ key, id }));
await fs.mkdir(srcDir, { recursive: true });

const manifest = {};
for (const { key, id } of slots) {
  const own = path.join(srcDir, `${key}.jpg`);
  let input;
  try {
    input = await fs.readFile(own);
    console.log(`· ${key}: foto propia`);
  } catch {
    const res = await fetch(`https://unsplash.com/photos/${id}/download?w=2400`, { redirect: 'follow' });
    if (!res.ok) { console.warn(`✗ ${key}: HTTP ${res.status}`); continue; }
    input = Buffer.from(await res.arrayBuffer());
    console.log(`· ${key}: descargada (${id})`);
  }
  const meta = await sharp(input).metadata();
  const widths = WIDTHS.filter((w) => w <= (meta.width ?? 2400));
  for (const w of widths) {
    const base = sharp(input).resize({ width: w }).modulate({ saturation: 0.85 });
    await base.clone().avif({ quality: 52 }).toFile(path.join(outDir, `${key}-${w}.avif`));
    await base.clone().webp({ quality: 74 }).toFile(path.join(outDir, `${key}-${w}.webp`));
  }
  const max = widths.at(-1);
  manifest[key] = {
    avif: `/images/${key}`,
    webp: `/images/${key}`,
    width: max,
    height: Math.round((meta.height / meta.width) * max),
    widths,
  };
}
await fs.writeFile(path.join(root, 'src/data/images.local.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n✓ ${Object.keys(manifest).length} imágenes optimizadas en public/images`);
