import { COUNTRIES } from './data/taxData';
import { ARTICLES } from './data/articlesData';
import { SITE_CONFIG } from './config';

// Maps a URL path (or legacy #hash route) to a view. Shared by the app and
// the prerender step, which writes one static HTML file per route.
export function parseRoute(rawPath: string): { view: string; param: string } {
  const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const clean = normalized.split('?')[0].replace(/\/+$/, '') || '/';
  if (clean.startsWith('/tax-calculator/')) {
    const countryId = clean.replace('/tax-calculator/', '').replace(/\//g, '');
    if (COUNTRIES.some((c) => c.id === countryId)) return { view: 'country', param: countryId };
  } else if (clean.startsWith('/compare/') || clean.startsWith('/tax-guides/')) {
    const slug = clean.split('/').filter(Boolean).pop();
    if (slug && ARTICLES.some((a) => a.slug === slug)) return { view: 'article', param: slug };
  } else if (clean === '/about') {
    return { view: 'about', param: '' };
  } else if (clean === '/advertise') {
    return { view: 'advertise', param: '' };
  } else if (clean === '/contact') {
    return { view: 'contact', param: '' };
  } else if (clean === '/guides' || clean === '/guides-index') {
    return { view: 'guides', param: '' };
  }
  return { view: 'home', param: '' };
}

export function pathForView(view: string, param?: string): string {
  if (view === 'country' && param) return `/tax-calculator/${param}/`;
  if ((view === 'article' || view === 'guide') && param) return `/tax-guides/${param}/`;
  if (view === 'guides' || view === 'guides-index') return '/guides/';
  if (view === 'about' || view === 'advertise' || view === 'contact') return `/${view}/`;
  return '/';
}

// Every route that gets its own prerendered HTML file.
export function allRoutes(): string[] {
  return [
    '/', '/about/', '/guides/', '/advertise/', '/contact/',
    ...COUNTRIES.map((c) => pathForView('country', c.id)),
    ...ARTICLES.map((a) => pathForView('article', a.slug)),
  ];
}

// Title and description for each prerendered route.
export function headFor(path: string): { title: string; description: string } {
  const { view, param } = parseRoute(path);
  const year = SITE_CONFIG.taxYear;
  if (view === 'country') {
    const c = COUNTRIES.find((x) => x.id === param)!;
    return {
      title: `${c.name} Take-Home Pay Calculator ${year}: Net Salary After Tax`,
      description: `Work out your net salary in ${c.name} for ${year}: income tax, social contributions and take-home pay at any income, converted to your currency. Free, no sign-up.`,
    };
  }
  if (view === 'article') {
    const a = ARTICLES.find((x) => x.slug === param)!;
    return { title: a.title, description: a.description };
  }
  if (view === 'guides') {
    return {
      title: `Tax Guides ${year}: Take-Home Pay, Brackets and Country Comparisons`,
      description: `Guides on ${year} income tax: California vs Texas, USA vs UK, states with no income tax, the lowest-tax countries in Europe and more.`,
    };
  }
  if (view === 'about') return { title: `About ${SITE_CONFIG.brandName}`, description: `Who runs ${SITE_CONFIG.brandName}, where the tax data comes from and how the calculator works.` };
  if (view === 'advertise') return { title: `Advertise on ${SITE_CONFIG.brandName}`, description: `Advertising and partnership options on ${SITE_CONFIG.brandName}.` };
  if (view === 'contact') return { title: `Contact ${SITE_CONFIG.brandName}`, description: `Get in touch with ${SITE_CONFIG.brandName} about corrections, data questions or partnerships.` };
  return {
    title: `${SITE_CONFIG.brandName}: Take-Home Pay & Income Tax Calculator (${year})`,
    description: `Compare take-home pay after income tax and social contributions in ${COUNTRIES.length} countries and all US states for ${year}. Free and private, nothing leaves your browser.`,
  };
}
