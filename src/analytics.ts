// Google Analytics 4 is loaded only after an explicit Accept choice.
// Decline and withdrawal never insert the tag.

export const GA_MEASUREMENT_ID = 'G-E6GZRP9KB0';
export const CONSENT_STORAGE_KEY = 'thg_analytics_consent';
export const CONSENT_EVENT = 'thg-analytics-consent';

export type ConsentChoice = 'accepted' | 'declined';

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function analyticsWindow(): AnalyticsWindow {
  return window as AnalyticsWindow;
}

function gaDisableKey(): string {
  return `ga-disable-${GA_MEASUREMENT_ID}`;
}

function gaDisabled(): boolean {
  return Boolean((window as unknown as Record<string, unknown>)[gaDisableKey()]);
}

function setGaDisabled(disabled: boolean): void {
  (window as unknown as Record<string, unknown>)[gaDisableKey()] = disabled;
}

export function readConsent(): ConsentChoice | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (value === 'accepted' || value === 'declined') return value;
  } catch {
    // Storage can be blocked. Treat that as no choice, which does not load analytics.
  }
  return null;
}

function expireGaCookies(): void {
  if (typeof document === 'undefined') return;
  const names = document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'));
  const host = window.location.hostname;
  for (const name of names) {
    const expiry = `${name}=; Max-Age=0; path=/`;
    document.cookie = expiry;
    document.cookie = `${expiry}; domain=${host}`;
    document.cookie = `${expiry}; domain=.${host}`;
  }
}

export function loadGa4(): void {
  if (typeof document === 'undefined') return;
  if (readConsent() !== 'accepted') return;
  const w = analyticsWindow();
  if (gaDisabled()) return;
  if (document.querySelector(`script[data-thg-ga="${GA_MEASUREMENT_ID}"]`)) return;

  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // gtag.js consumes the arguments object queued on dataLayer.
    w.dataLayer?.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.dataset.thgGa = GA_MEASUREMENT_ID;
  document.head.appendChild(script);
}

export function applyConsent(choice: ConsentChoice): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // If storage fails, still disable or enable for this page view.
  }

  const w = analyticsWindow();
  if (choice === 'declined') {
    setGaDisabled(true);
    w.gtag = () => {};
    document.querySelectorAll(`script[data-thg-ga="${GA_MEASUREMENT_ID}"]`).forEach((node) => node.remove());
    expireGaCookies();
  } else {
    setGaDisabled(false);
    loadGa4();
  }

  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}
