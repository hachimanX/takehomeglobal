// Default baseline exchange rates pegged to 1 USD
export const DEFAULT_EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 154.2,
  CHF: 0.89,
  SGD: 1.34,
  AED: 3.67,
  SAR: 3.75,
  INR: 83.5,
  HKD: 7.81,
  KRW: 1375.0,
  MXN: 18.2,
  BRL: 5.4,
  SEK: 10.6,
  NOK: 10.8,
  DKK: 6.87,
  NZD: 1.65,
  PLN: 3.98,
  THB: 36.5,
  CYP: 0.92,
};

const CACHE_KEY = 'global_tax_exchange_rates_v1';
const CACHE_TIME_KEY = 'global_tax_exchange_rates_time_v1';
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function getExchangeRates(): Promise<Record<string, number>> {
  // Check localStorage cache first
  try {
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const cachedRates = localStorage.getItem(CACHE_KEY);
    if (cachedTime && cachedRates) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_DURATION_MS) {
        return { ...DEFAULT_EXCHANGE_RATES, ...JSON.parse(cachedRates) };
      }
    }
  } catch (e) {
    console.warn('Unable to read cached exchange rates', e);
  }

  // Attempt to fetch fresh rates from free ECB API (Frankfurter)
  try {
    const res = await fetch('https://api.frankfurter.dev/v1/latest?base=USD');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        const mergedRates: Record<string, number> = {
          ...DEFAULT_EXCHANGE_RATES,
          ...data.rates,
          USD: 1.0,
        };
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(mergedRates));
          localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
        } catch {
          // ignore quota error
        }
        return mergedRates;
      }
    }
  } catch (err) {
    console.info('Using offline default exchange rates:', err);
  }

  return DEFAULT_EXCHANGE_RATES;
}

export const SUPPORTED_CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
];
