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
}

export interface SpecialRule {
  name: string;
  type: string;
  trigger: number;
  rate: number;
  isPercentageOfTax?: boolean;
}

export interface SubRegion {
  name: string;
  brackets: TaxBracket[];
  standardDeduction?: number;
}

export type LanguageCode = 'en' | 'zh' | 'ja' | 'ko' | 'ur';

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
