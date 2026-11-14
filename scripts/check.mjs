// Build assertions for the privacy, consent, form, crawl, and India rebate fixes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const failures = [];
const fail = (message) => failures.push(message);

const serverHref = pathToFileURL(path.join(root, 'dist-verify', 'verify-entry.js')).href;
const { allRoutes, calculateCountryTax, COUNTRIES } = await import(serverHref);

const india = COUNTRIES.find((country) => country.id === 'india');
if (!india) fail('India is missing from COUNTRIES');

const salaryExamples = [
  [1200000, 0],
  [1275000, 0],
  [1285000, 10400],
  [1290000, 15600],
  [1350000, 74100],
];

for (const [gross, expected] of india ? salaryExamples : []) {
  const result = calculateCountryTax(india, gross, 'INR', { INR: 1, USD: 1 });
  const taxAndCess = Math.round(result.incomeTaxLocal + result.specialTaxLocal);
  if (taxAndCess !== expected) {
    fail(`India gross ${gross}: income tax + cess rounded to ${taxAndCess}, expected ${expected}`);
  }
  if (Math.round(result.grossLocal) !== gross) {
    fail(`India gross ${gross}: local gross became ${result.grossLocal}`);
  }
}

function htmlFiles(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles(full, found);
    else if (entry.name.endsWith('.html')) found.push(full);
  }
  return found;
}

const forbidden = [
  'googletagmanager.com/gtag/js',
  'Message Sent Successfully',
  "You're in! Check your inbox",
  "You're subscribed!",
  'Inquiry Received',
  'Official Statutory Sources',
  'takehomeglobal.com/#/',
];

for (const file of htmlFiles(dist)) {
  const html = fs.readFileSync(file, 'utf8');
  const label = path.relative(dist, file);
  for (const text of forbidden) {
    if (html.includes(text)) fail(`${label} contains "${text}"`);
  }
  const wiseAnchors = html.match(/<a\b[^>]*href="https:\/\/wise\.com\/invite\/[^"]*"[^>]*>/g) || [];
  for (const anchor of wiseAnchors) {
    if (!anchor.includes('sponsored') || !anchor.includes('nofollow')) {
      fail(`${label} Wise invite link is missing sponsored or nofollow`);
    }
  }
}

function readDist(relative) {
  const file = path.join(dist, relative);
  if (!fs.existsSync(file)) {
    fail(`missing ${relative}`);
    return '';
  }
  return fs.readFileSync(file, 'utf8');
}

const privacy = readDist('privacy/index.html');
for (const text of [
  'Not a finished legal policy',
  'Withdraw analytics consent',
  'G-E6GZRP9KB0',
  'href="/about/"',
  'rel="canonical" href="https://takehomeglobal.com/privacy/"',
]) {
  if (privacy && !privacy.includes(text)) fail(`privacy/index.html missing "${text}"`);
}

const about = readDist('about/index.html');
if (about && !about.includes('href="/privacy/"')) fail('about/index.html missing a privacy link');
if (about && !about.includes('References, not a filing source')) fail('about page still uses the old sourcing heading');

const contact = readDist('contact/index.html');
if (contact && !contact.includes('Messages cannot be sent')) fail('contact page missing the honest notice');
if (contact && contact.includes('<form')) fail('contact page still renders a form');

const advertise = readDist('advertise/index.html');
if (advertise && !advertise.includes('Partnership messages cannot be sent')) fail('advertise page missing the honest notice');
if (advertise && advertise.includes('<form')) fail('advertise page still renders a form');

const notFound = readDist('404.html');
if (notFound && !notFound.includes('name="robots" content="noindex, nofollow"')) fail('404.html is not noindex');
if (notFound && (notFound.includes('location.replace') || notFound.includes('/#'))) {
  fail('404.html still sends people to a hash URL');
}

const sitemap = readDist('sitemap.xml');
for (const route of allRoutes()) {
  const loc = `https://takehomeglobal.com${route}`;
  if (sitemap && !sitemap.includes(`<loc>${loc}</loc>`)) fail(`sitemap missing ${loc}`);
}
if (sitemap && !sitemap.includes('<loc>https://takehomeglobal.com/ai-instructions/</loc>')) {
  fail('sitemap missing the AI instructions URL');
}

const home = readDist('index.html');
if (home && !home.includes('Reference pages, not a filing source')) fail('homepage missing the softened source label');
if (home && !home.includes('rel="canonical" href="https://takehomeglobal.com/"')) fail('homepage missing a clean canonical');

if (failures.length) {
  for (const message of failures) console.error(message);
  process.exit(1);
}

console.log(`Checked India rebate examples, ${htmlFiles(dist).length} HTML files, sitemap, privacy, about, forms, and 404.`);
