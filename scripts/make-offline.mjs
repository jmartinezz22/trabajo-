/**
 * Genera dist-offline/: copia de la web que se abre con doble clic (file://),
 * sin servidor. Convierte las rutas absolutas en relativas y los enlaces
 * de carpeta en .../index.html.   Uso: npm run build && node scripts/make-offline.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'dist');
const out = path.join(root, 'dist-offline');
await fs.rm(out, { recursive: true, force: true });
await fs.cp(src, out, { recursive: true });

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)])));
  return files.flat();
}

const toRelative = (url, prefix) => {
  // url empieza por "/" (no "//")
  const m = url.match(/^([^?#]*)([?#].*)?$/);
  let p = m[1];
  const rest = m[2] ?? '';
  if (p.endsWith('/')) p += 'index.html';
  return prefix + p.slice(1) + rest;
};

let count = 0;
for (const file of await walk(out)) {
  if (!file.endsWith('.html')) continue;
  const depth = path.relative(out, path.dirname(file)).split(path.sep).filter(Boolean).length;
  const prefix = depth ? '../'.repeat(depth) : './';
  let html = await fs.readFile(file, 'utf8');
  html = html.replace(/(href|src|action)="(\/(?!\/)[^"]*)"/g, (_, attr, url) => `${attr}="${toRelative(url, prefix)}"`);
  // Los módulos externos no cargan desde file:// → script clásico diferido
  html = html.replace(/<script type="module" src=/g, '<script defer src=');
  // La precarga de páginas no aporta nada sin servidor
  html = html.replace(/<script defer src="[^"]*_astro\/page\.[^"]+\.js"><\/script>/g, '');
  await fs.writeFile(file, html);
  count++;
}
console.log(`✓ ${count} páginas convertidas en dist-offline/ (abrir dist-offline/index.html)`);
