export interface TaxBracket {
  threshold: number;
  rate: number;
}

export interface DeductionRule {
  name: string;
  amount: number;
  taperStart?: number;
  taperRate?: number;
}

export interface SocialContribution {
  name: string;
  rate: number;
  cap?: number;
  floor?: number;
  // Low-income phase-in (Australian Medicare levy): min(rate × income, shadeInRate × (income − floor)).
  // With this set, the floor is a threshold only and is not subtracted from the base.
  shadeInRate?: number;
  // Share of the contribution base that is deducted from taxable income (German pension, Canadian enhanced CPP)
  deductibleRate?: number;
  // Share of the contribution base claimed as a non-refundable credit at the lowest tax rate (Canadian CPP/EI)
  creditRate?: number;
}

// Non-refundable credit or offset, subtracted from income tax (never below zero)
export interface TaxCredit {
  name: string;
  amount: number;
  // amount is a credit base (e.g. Canada's basic personal amount) worth amount × lowest bracket rate
  atLowestRate?: boolean;
  // amount shrinks by rate per unit of gross income between start and end
  phaseOuts?: { start: number; end?: number; rate: number }[];
  minAmount?: number;
}

export interface SpecialRule {
  name: string;
  type: string;
  trigger: number;
  rate: number;
  isPercentageOfTax?: boolean;
  // what trigger is compared with: income tax (default when isPercentageOfTax) or gross income
  triggerBasis?: 'tax' | 'income';
  // German Soli phase-in: charge is capped at reliefRate × (tax − trigger)
  reliefRate?: number;
  // percentage applies to income tax plus the surcharges computed before it (India's cess)
  compound?: boolean;
}

// Piecewise flat levy, e.g. the Ontario Health Premium: min(max, base + rate × (income − from))
export interface SteppedLevy {
  name: string;
  steps: { from: number; base: number; rate: number; max: number }[];
}

export interface SubRegion {
  name: string;
  brackets: TaxBracket[];
  // US states: deducted from gross before the state brackets
  standardDeduction?: number;
  // Canadian provinces: tax on national taxable income, minus credits at the lowest provincial rate
  useNationalTaxableIncome?: boolean;
  taxCredits?: TaxCredit[];
  applySocialCredits?: boolean;
  // surtax as a share of regional tax above each threshold (Ontario)
  surtaxes?: { threshold: number; rate: number }[];
  levies?: SteppedLevy[];
  // share of national income tax forgiven for residents (Quebec abatement)
  nationalTaxAbatement?: number;
  // replaces the national contributions (Quebec QPP/QPIP/EI)
  socialContributions?: SocialContribution[];
}

export type LanguageCode = 'en' | 'zh' | 'ja' | 'ko';

export interface CountryInfo {
  id: string;
  name: string;
  code: string; // ISO 2-letter
  currency: string;
  flag: string; // Emoji
  costOfLivingAnnualUSD: number; // Numbeo/World Bank benchmark excluding rent
  federalBrackets: TaxBracket[];
  standardDeduction?: number;
  deductions?: DeductionRule[];
  socialContributions: SocialContribution[];
  taxCredits?: TaxCredit[];
  // Full rebate up to incomeLimit of taxable income (India s.87A); above it, tax is capped at the excess
  taxRebate?: { incomeLimit: number; maxRebate: number; marginalRelief?: boolean };
  // Statutory formula used instead of federalBrackets (which then only feed the brackets table)
  incomeTaxFormula?: 'DE_32A_2026';
  specialRules?: SpecialRule[];
  subRegions?: Record<string, SubRegion>; // States or provinces
  subRegionLabel?: string; // "State" or "Province"
  notes?: string;
  officialSource?: string;
  // Rich SEO & Educational Fields
  overviewText?: string;
  residencyRuleText?: string;
  deductionsText?: string;
  expatIncentivesText?: string;
}

export interface CountryCalculationResult {
  country: CountryInfo;
  subRegion?: string;
  grossLocal: number;
  grossUSD: number;
  incomeTaxLocal: number;
  incomeTaxUSD: number;
  socialContributionsLocal: number;
  socialContributionsUSD: number;
  stateTaxLocal: number;
  stateTaxUSD: number;
  specialTaxLocal: number;
  specialTaxUSD: number;
  totalTaxLocal: number;
  totalTaxUSD: number;
  netLocal: number;
  netUSD: number;
  monthlyNetLocal: number;
  monthlyNetUSD: number;
  effectiveTaxRate: number;
  marginalTaxRate: number;
  realPurchasingPowerUSD: number; // Net USD minus Annual Cost of Living USD
  taxFreedomDay: number; // Day of year 1-365
  breakdown: {
    label: string;
    amountLocal: number;
    amountUSD: number;
    rate?: number;
    color: string;
  }[];
}
