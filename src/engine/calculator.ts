import type { CountryInfo, CountryCalculationResult, TaxBracket } from '../types';

/**
 * Calculates progressive tax across standard marginal brackets
 */
export function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): {
  tax: number;
  marginalRate: number;
} {
  if (taxableIncome <= 0 || !brackets.length) {
    return { tax: 0, marginalRate: 0 };
  }

  const sorted = [...brackets].sort((a, b) => a.threshold - b.threshold);
  let totalTax = 0;
  let marginalRate = 0;

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];
    const start = current.threshold;
    const end = next ? next.threshold : Infinity;

    if (taxableIncome > start) {
      const chunk = Math.min(taxableIncome, end) - start;
      totalTax += chunk * current.rate;
      marginalRate = current.rate;
      if (taxableIncome <= end) break;
    }
  }

  return { tax: totalTax, marginalRate };
}

/**
 * Performs complete tax and purchasing power calculation for a country
 */
export function calculateCountryTax(
  country: CountryInfo,
  grossIncomeInput: number,
  inputCurrency: string,
  exchangeRates: Record<string, number>,
  selectedSubRegion?: string
): CountryCalculationResult {
  // Convert input income to USD first, then to Country Local Currency
  const inputRate = exchangeRates[inputCurrency] || 1.0;
  const countryRate = exchangeRates[country.currency] || 1.0;

  const grossUSD = inputCurrency === 'USD' ? grossIncomeInput : grossIncomeInput / inputRate;
  const grossLocal = grossUSD * countryRate;

  if (grossLocal <= 0) {
    return createEmptyResult(country, grossLocal, grossUSD, selectedSubRegion);
  }

  // 1. Calculate Deductions & Allowances
  let totalDeductions = country.standardDeduction || 0;

  if (country.deductions && country.deductions.length > 0) {
    for (const rule of country.deductions) {
      let allowed = rule.amount;
      if (rule.taperStart && grossLocal > rule.taperStart) {
        const excess = grossLocal - rule.taperStart;
        const reduction = excess * (rule.taperRate || 0.5);
        allowed = Math.max(0, allowed - reduction);
      }
      totalDeductions += allowed;
    }
  }

  // Taxable Federal Income
  const taxableFederalIncome = Math.max(0, grossLocal - totalDeductions);

  // 2. Federal / National Income Tax
  const { tax: federalTax, marginalRate } = calculateProgressiveTax(
    taxableFederalIncome,
    country.federalBrackets
  );

  // 3. Sub-region (State / Provincial) Tax
  let stateTax = 0;
  if (selectedSubRegion && country.subRegions && country.subRegions[selectedSubRegion]) {
    const region = country.subRegions[selectedSubRegion];
    const stateDeduction = region.standardDeduction || 0;
    const taxableStateIncome = Math.max(0, grossLocal - stateDeduction);
    const { tax } = calculateProgressiveTax(taxableStateIncome, region.brackets);
    stateTax = tax;
  }

  // 4. Social Security & Mandatory Contributions
  let socialContributions = 0;
  const socialBreakdownItems: { name: string; amount: number }[] = [];

  for (const contrib of country.socialContributions) {
    let base = grossLocal;
    if (contrib.floor && grossLocal < contrib.floor) {
      continue;
    }
    if (contrib.cap && grossLocal > contrib.cap) {
      base = contrib.cap;
    }
    if (contrib.floor) {
      base = base - contrib.floor;
    }
    const amount = base * contrib.rate;
    socialContributions += amount;
    socialBreakdownItems.push({ name: contrib.name, amount });
  }

  // 5. Special Rules & Surcharges
  let specialTaxes = 0;
  if (country.specialRules) {
    for (const rule of country.specialRules) {
      if (rule.isPercentageOfTax) {
        if (federalTax > rule.trigger) {
          specialTaxes += federalTax * rule.rate;
        }
      } else {
        if (grossLocal > rule.trigger) {
          specialTaxes += (grossLocal - rule.trigger) * rule.rate;
        }
      }
    }
  }

  // Totals
  const incomeTaxLocal = federalTax;
  const totalTaxLocal = incomeTaxLocal + stateTax + socialContributions + specialTaxes;
  const netLocal = Math.max(0, grossLocal - totalTaxLocal);

  // Normalized to USD
  const totalTaxUSD = totalTaxLocal / countryRate;
  const netUSD = netLocal / countryRate;
  const incomeTaxUSD = incomeTaxLocal / countryRate;
  const stateTaxUSD = stateTax / countryRate;
  const socialContributionsUSD = socialContributions / countryRate;
  const specialTaxUSD = specialTaxes / countryRate;

  const monthlyNetLocal = netLocal / 12;
  const monthlyNetUSD = netUSD / 12;

  const effectiveTaxRate = grossLocal > 0 ? (totalTaxLocal / grossLocal) * 100 : 0;

  // Real Purchasing Power = Net USD minus estimated average annual living expenses
  const realPurchasingPowerUSD = netUSD - country.costOfLivingAnnualUSD;

  // Tax Freedom Day (day of 365 when earnings shift from taxes to personal income)
  const taxFreedomDay = Math.min(365, Math.max(1, Math.round((totalTaxLocal / grossLocal) * 365)));

  // Visual Breakdown for Charts
  const breakdown = [
    {
      label: 'Net Take-Home',
      amountLocal: netLocal,
      amountUSD: netUSD,
      color: '#10b981', // emerald-500
    },
    {
      label: 'National Tax',
      amountLocal: incomeTaxLocal,
      amountUSD: incomeTaxUSD,
      rate: marginalRate,
      color: '#6366f1', // indigo-500
    },
  ];

  if (stateTax > 0) {
    breakdown.push({
      label: `${country.subRegionLabel || 'State'} Tax`,
      amountLocal: stateTax,
      amountUSD: stateTaxUSD,
      color: '#8b5cf6', // purple-500
    });
  }

  if (socialContributions > 0) {
    breakdown.push({
      label: 'Social & Healthcare',
      amountLocal: socialContributions,
      amountUSD: socialContributionsUSD,
      color: '#06b6d4', // cyan-500
    });
  }

  if (specialTaxes > 0) {
    breakdown.push({
      label: 'Special Surcharges',
      amountLocal: specialTaxes,
      amountUSD: specialTaxUSD,
      color: '#f59e0b', // amber-500
    });
  }

  return {
    country,
    subRegion: selectedSubRegion,
    grossLocal,
    grossUSD,
    incomeTaxLocal,
    incomeTaxUSD,
    socialContributionsLocal: socialContributions,
    socialContributionsUSD,
    stateTaxLocal: stateTax,
    stateTaxUSD,
    specialTaxLocal: specialTaxes,
    specialTaxUSD,
    totalTaxLocal,
    totalTaxUSD,
    netLocal,
    netUSD,
    monthlyNetLocal,
    monthlyNetUSD,
    effectiveTaxRate,
    marginalTaxRate: marginalRate * 100,
    realPurchasingPowerUSD,
    taxFreedomDay,
    breakdown,
  };
}

function createEmptyResult(
  country: CountryInfo,
  grossLocal: number,
  grossUSD: number,
  subRegion?: string
): CountryCalculationResult {
  return {
    country,
    subRegion,
    grossLocal,
    grossUSD,
    incomeTaxLocal: 0,
    incomeTaxUSD: 0,
    socialContributionsLocal: 0,
    socialContributionsUSD: 0,
    stateTaxLocal: 0,
    stateTaxUSD: 0,
    specialTaxLocal: 0,
    specialTaxUSD: 0,
    totalTaxLocal: 0,
    totalTaxUSD: 0,
    netLocal: 0,
    netUSD: 0,
    monthlyNetLocal: 0,
    monthlyNetUSD: 0,
    effectiveTaxRate: 0,
    marginalTaxRate: 0,
    realPurchasingPowerUSD: -country.costOfLivingAnnualUSD,
    taxFreedomDay: 1,
    breakdown: [],
  };
}

/**
 * Format currency with proper symbols and locale formatting
 */
export function formatMoney(amount: number, currency = 'USD', decimals = 0): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString('en-US', {
      maximumFractionDigits: decimals,
    })}`;
  }
}

/**
 * Convert Day of Year (1-365) to Date string (e.g., "April 14")
 */
export function dayOfYearToDate(day: number): string {
  const date = new Date(2026, 0); // Jan 1 2026
  date.setDate(day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
