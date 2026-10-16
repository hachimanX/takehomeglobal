import type {
  CountryInfo,
  CountryCalculationResult,
  SocialContribution,
  SteppedLevy,
  TaxBracket,
  TaxCredit,
} from '../types';

/**
 * German income tax tariff, § 32a Abs. 1 EStG as in force from Veranlagungszeitraum 2026
 * https://www.gesetze-im-internet.de/estg/__32a.html
 */
export function germanIncomeTax2026(zvE: number): number {
  const x = Math.floor(zvE);
  if (x <= 12348) return 0;
  if (x <= 17799) {
    const y = (x - 12348) / 10000;
    return Math.floor((914.51 * y + 1400) * y);
  }
  if (x <= 69878) {
    const z = (x - 17799) / 10000;
    return Math.floor((173.1 * z + 2397) * z + 1034.87);
  }
  if (x <= 277825) return Math.floor(0.42 * x - 11135.63);
  return Math.floor(0.45 * x - 19470.38);
}

function lowestRate(brackets: TaxBracket[]): number {
  const rates = brackets.map((b) => b.rate).filter((r) => r > 0);
  return rates.length ? Math.min(...rates) : 0;
}

function contributionBase(contrib: SocialContribution, income: number): number {
  if (contrib.floor && income < contrib.floor) return 0;
  let base = contrib.cap ? Math.min(income, contrib.cap) : income;
  if (contrib.floor && contrib.shadeInRate === undefined) base -= contrib.floor;
  return Math.max(0, base);
}

function creditValue(credit: TaxCredit, income: number, lowest: number): number {
  let amount = credit.amount;
  for (const p of credit.phaseOuts ?? []) {
    if (income > p.start) amount -= (Math.min(income, p.end ?? Infinity) - p.start) * p.rate;
  }
  amount = Math.max(credit.minAmount || 0, amount);
  return credit.atLowestRate ? amount * lowest : amount;
}

function steppedLevy(levy: SteppedLevy, income: number): number {
  let step: SteppedLevy['steps'][number] | undefined;
  for (const s of levy.steps) if (income > s.from) step = s;
  return step ? Math.min(step.max, step.base + step.rate * (income - step.from)) : 0;
}

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

  const region =
    selectedSubRegion && country.subRegions ? country.subRegions[selectedSubRegion] : undefined;

  // 1. Social Security & Mandatory Contributions (first, because some are tax-deductible or credited)
  let socialContributions = 0;
  let deductibleContributions = 0;
  let creditableContributions = 0;

  for (const contrib of region?.socialContributions ?? country.socialContributions) {
    const base = contributionBase(contrib, grossLocal);
    if (base <= 0) continue;
    const amount =
      contrib.shadeInRate !== undefined
        ? Math.min(base * contrib.rate, contrib.shadeInRate * (grossLocal - (contrib.floor || 0)))
        : base * contrib.rate;
    socialContributions += amount;
    deductibleContributions += base * (contrib.deductibleRate || 0);
    creditableContributions += base * (contrib.creditRate || 0);
  }

  // 2. Deductions & Allowances
  let totalDeductions = (country.standardDeduction || 0) + deductibleContributions;

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

  // 3. Federal / National Income Tax, after credits and rebates
  let federalTax: number;
  let marginalRate: number;
  if (country.incomeTaxFormula === 'DE_32A_2026') {
    federalTax = germanIncomeTax2026(taxableFederalIncome);
    marginalRate = (germanIncomeTax2026(taxableFederalIncome + 100) - federalTax) / 100;
  } else {
    ({ tax: federalTax, marginalRate } = calculateProgressiveTax(
      taxableFederalIncome,
      country.federalBrackets
    ));
  }

  const nationalLowestRate = lowestRate(country.federalBrackets);
  let federalCredits = creditableContributions * nationalLowestRate;
  for (const credit of country.taxCredits ?? []) {
    federalCredits += creditValue(credit, grossLocal, nationalLowestRate);
  }
  federalTax = Math.max(0, federalTax - federalCredits);

  if (country.taxRebate) {
    const { incomeLimit, maxRebate, marginalRelief } = country.taxRebate;
    if (taxableFederalIncome <= incomeLimit) {
      federalTax = Math.max(0, federalTax - maxRebate);
    } else if (marginalRelief) {
      federalTax = Math.min(federalTax, taxableFederalIncome - incomeLimit);
    }
  }

  if (region?.nationalTaxAbatement) {
    federalTax *= 1 - region.nationalTaxAbatement;
  }

  // 4. Sub-region (State / Provincial) Tax
  let stateTax = 0;
  if (region) {
    const taxableStateIncome = region.useNationalTaxableIncome
      ? taxableFederalIncome
      : Math.max(0, grossLocal - (region.standardDeduction || 0));
    stateTax = calculateProgressiveTax(taxableStateIncome, region.brackets).tax;

    const regionLowestRate = lowestRate(region.brackets);
    let regionCredits = region.applySocialCredits ? creditableContributions * regionLowestRate : 0;
    for (const credit of region.taxCredits ?? []) {
      regionCredits += creditValue(credit, grossLocal, regionLowestRate);
    }
    stateTax = Math.max(0, stateTax - regionCredits);

    let surtax = 0;
    for (const s of region.surtaxes ?? []) {
      if (stateTax > s.threshold) surtax += (stateTax - s.threshold) * s.rate;
    }
    stateTax += surtax;

    for (const levy of region.levies ?? []) {
      stateTax += steppedLevy(levy, taxableStateIncome);
    }
  }

  // 5. Special Rules & Surcharges
  let specialTaxes = 0;
  if (country.specialRules) {
    for (const rule of country.specialRules) {
      if (rule.isPercentageOfTax) {
        const baseTax = rule.compound ? federalTax + specialTaxes : federalTax;
        const measured = rule.triggerBasis === 'income' ? grossLocal : baseTax;
        if (measured > rule.trigger) {
          let charge = baseTax * rule.rate;
          if (rule.reliefRate !== undefined) {
            charge = Math.min(charge, (baseTax - rule.trigger) * rule.reliefRate);
          }
          specialTaxes += charge;
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
