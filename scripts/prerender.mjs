// Writes one static HTML file per route into dist/, so GitHub Pages serves
// real pages (HTTP 200 with content) instead of the 404 fallback.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const BASE = 'https://takehomeglobal.com';

const { render, headFor, allRoutes } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const rootStart = template.indexOf('<div id="root">');
const bodyEnd = template.lastIndexOf('</body>');
if (rootStart < 0 || bodyEnd < 0) throw new Error('template markers not found');

for (const route of allRoutes()) {
  const { title, description } = headFor(route);
  const url = BASE + route;
  let html = template.slice(0, rootStart) + `<div id="root">${render(route)}</div>\n  ` + template.slice(bodyEnd);
  // The JSON-LD in index.html describes the homepage; other pages add their own in the browser.
  if (route !== '/') html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="title" content="[^"]*"\s*\/?>/, `<meta name="title" content="${esc(title)}" />`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>\s*/g, '')
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, '')
    .replace('</title>', `</title>\n    <meta name="description" content="${esc(description)}" />\n    <link rel="canonical" href="${url}" />`)
    .replace(/(<meta property="(?:og|twitter):url" content=")[^"]*(")/g, `$1${url}$2`)
    .replace(/(<meta property="(?:og|twitter):title" content=")[^"]*(")/g, `$1${esc(title)}$2`)
    .replace(/(<meta property="(?:og|twitter):description" content=")[^"]*(")/g, `$1${esc(description)}$2`);
  const outDir = path.join(dist, route);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
}
console.log(`Prerendered ${allRoutes().length} routes.`);
