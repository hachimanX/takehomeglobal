import type { CountryInfo, SubRegion } from '../types';

// Complete dictionary of all 50 US States + District of Columbia
export const US_STATES: Record<string, SubRegion> = {
  'Alabama': {
    name: 'Alabama',
    standardDeduction: 3000,
    brackets: [
      { threshold: 0, rate: 0.02 },
      { threshold: 500, rate: 0.04 },
      { threshold: 3000, rate: 0.05 },
    ],
  },
  'Alaska': { name: 'Alaska (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'Arizona': { name: 'Arizona (Flat 2.5%)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0.025 }] },
  'Arkansas': {
    name: 'Arkansas',
    standardDeduction: 2470,
    brackets: [
      { threshold: 0, rate: 0 },
      { threshold: 5600, rate: 0.02 },
      { threshold: 11200, rate: 0.03 },
      { threshold: 16000, rate: 0.034 },
      { threshold: 26400, rate: 0.037 },
    ],
  },
  'California': {
    name: 'California',
    standardDeduction: 5706,
    brackets: [
      { threshold: 0, rate: 0.01 },
      { threshold: 11079, rate: 0.02 },
      { threshold: 26264, rate: 0.04 },
      { threshold: 41452, rate: 0.06 },
      { threshold: 57542, rate: 0.08 },
      { threshold: 72724, rate: 0.093 },
      { threshold: 371479, rate: 0.103 },
      { threshold: 445771, rate: 0.113 },
      { threshold: 742953, rate: 0.123 },
      { threshold: 1000000, rate: 0.133 },
    ],
  },
  'Colorado': { name: 'Colorado (Flat 4.4%)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0.044 }] },
  'Connecticut': {
    name: 'Connecticut',
    standardDeduction: 15000,
    brackets: [
      { threshold: 0, rate: 0.02 },
      { threshold: 10000, rate: 0.045 },
      { threshold: 50000, rate: 0.055 },
      { threshold: 100000, rate: 0.06 },
      { threshold: 200000, rate: 0.065 },
      { threshold: 250000, rate: 0.069 },
      { threshold: 500000, rate: 0.0699 },
    ],
  },
  'Delaware': {
    name: 'Delaware',
    standardDeduction: 3250,
    brackets: [
      { threshold: 0, rate: 0 },
      { threshold: 2000, rate: 0.022 },
      { threshold: 5000, rate: 0.039 },
      { threshold: 10000, rate: 0.048 },
      { threshold: 20000, rate: 0.052 },
      { threshold: 25000, rate: 0.0555 },
      { threshold: 60000, rate: 0.066 },
    ],
  },
  'District of Columbia': {
    name: 'District of Columbia',
    standardDeduction: 14600,
    brackets: [
      { threshold: 0, rate: 0.04 },
      { threshold: 10000, rate: 0.06 },
      { threshold: 40000, rate: 0.065 },
      { threshold: 60000, rate: 0.085 },
      { threshold: 250000, rate: 0.0925 },
      { threshold: 500000, rate: 0.0975 },
      { threshold: 1000000, rate: 0.1075 },
    ],
  },
  'Florida': { name: 'Florida (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'Georgia': { name: 'Georgia (Flat 4.99%)', standardDeduction: 15000, brackets: [{ threshold: 0, rate: 0.0499 }] },
  'Hawaii': {
    name: 'Hawaii',
    standardDeduction: 8000,
    brackets: [
      { threshold: 0, rate: 0.014 },
      { threshold: 9600, rate: 0.032 },
      { threshold: 14400, rate: 0.055 },
      { threshold: 19200, rate: 0.064 },
      { threshold: 24000, rate: 0.068 },
      { threshold: 36000, rate: 0.072 },
      { threshold: 48000, rate: 0.076 },
      { threshold: 125000, rate: 0.079 },
      { threshold: 175000, rate: 0.0825 },
      { threshold: 225000, rate: 0.09 },
      { threshold: 275000, rate: 0.10 },
      { threshold: 325000, rate: 0.11 },
    ],
  },
  'Idaho': { name: 'Idaho (Flat 5.3%)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0.053 }] },
  'Illinois': { name: 'Illinois (Flat 4.95%)', standardDeduction: 2925, brackets: [{ threshold: 0, rate: 0.0495 }] },
  'Indiana': { name: 'Indiana (Flat 2.95%)', standardDeduction: 1000, brackets: [{ threshold: 0, rate: 0.0295 }] },
  'Iowa': { name: 'Iowa (Flat 3.8%)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0.038 }] },
  'Kansas': {
    name: 'Kansas',
    standardDeduction: 3605,
    brackets: [
      { threshold: 0, rate: 0.052 },
      { threshold: 23000, rate: 0.0558 },
    ],
  },
  'Kentucky': { name: 'Kentucky (Flat 3.5%)', standardDeduction: 3360, brackets: [{ threshold: 0, rate: 0.035 }] },
  'Louisiana': { name: 'Louisiana (Flat 3.0%)', standardDeduction: 12500, brackets: [{ threshold: 0, rate: 0.03 }] },
  'Maine': {
    name: 'Maine',
    standardDeduction: 15300,
    brackets: [
      { threshold: 0, rate: 0.058 },
      { threshold: 27400, rate: 0.0675 },
      { threshold: 64850, rate: 0.0715 },
      { threshold: 1000000, rate: 0.0915 },
    ],
  },
  'Maryland': {
    name: 'Maryland',
    standardDeduction: 3350,
    brackets: [
      { threshold: 0, rate: 0.052 },
      { threshold: 1000, rate: 0.062 },
      { threshold: 2000, rate: 0.072 },
      { threshold: 3000, rate: 0.0795 },
      { threshold: 100000, rate: 0.082 },
      { threshold: 125000, rate: 0.0845 },
      { threshold: 150000, rate: 0.087 },
      { threshold: 250000, rate: 0.0895 },
      { threshold: 500000, rate: 0.0945 },
      { threshold: 1000000, rate: 0.097 },
    ],
  },
  'Massachusetts': {
    name: 'Massachusetts',
    standardDeduction: 4400,
    brackets: [
      { threshold: 0, rate: 0.05 },
      { threshold: 1107750, rate: 0.09 },
    ],
  },
  'Michigan': { name: 'Michigan (Flat 4.25%)', standardDeduction: 5900, brackets: [{ threshold: 0, rate: 0.0425 }] },
  'Minnesota': {
    name: 'Minnesota',
    standardDeduction: 15300,
    brackets: [
      { threshold: 0, rate: 0.0535 },
      { threshold: 33310, rate: 0.068 },
      { threshold: 109430, rate: 0.0785 },
      { threshold: 203150, rate: 0.0985 },
    ],
  },
  'Mississippi': { name: 'Mississippi (Flat 4.0%)', standardDeduction: 8300, brackets: [{ threshold: 0, rate: 0 }, { threshold: 10000, rate: 0.04 }] },
  'Missouri': {
    name: 'Missouri',
    standardDeduction: 14600,
    brackets: [
      { threshold: 0, rate: 0 },
      { threshold: 1348, rate: 0.02 },
      { threshold: 2696, rate: 0.025 },
      { threshold: 4044, rate: 0.03 },
      { threshold: 5392, rate: 0.035 },
      { threshold: 6740, rate: 0.04 },
      { threshold: 8088, rate: 0.045 },
      { threshold: 9436, rate: 0.047 },
    ],
  },
  'Montana': {
    name: 'Montana',
    standardDeduction: 0,
    brackets: [
      { threshold: 0, rate: 0.047 },
      { threshold: 47500, rate: 0.0565 },
    ],
  },
  'Nebraska': {
    name: 'Nebraska',
    standardDeduction: 8850,
    brackets: [
      { threshold: 0, rate: 0.0246 },
      { threshold: 4130, rate: 0.0351 },
      { threshold: 24760, rate: 0.0455 },
    ],
  },
  'Nevada': { name: 'Nevada (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'New Hampshire': { name: 'New Hampshire (No Wage Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'New Jersey': {
    name: 'New Jersey',
    standardDeduction: 1000,
    brackets: [
      { threshold: 0, rate: 0.014 },
      { threshold: 20000, rate: 0.0175 },
      { threshold: 35000, rate: 0.035 },
      { threshold: 40000, rate: 0.05525 },
      { threshold: 75000, rate: 0.0637 },
      { threshold: 500000, rate: 0.0897 },
      { threshold: 1000000, rate: 0.1075 },
    ],
  },
  'New Mexico': {
    name: 'New Mexico',
    standardDeduction: 0,
    brackets: [
      { threshold: 0, rate: 0.015 },
      { threshold: 5500, rate: 0.032 },
      { threshold: 16500, rate: 0.043 },
      { threshold: 33500, rate: 0.047 },
      { threshold: 66500, rate: 0.049 },
      { threshold: 210000, rate: 0.059 },
    ],
  },
  'New York': {
    name: 'New York',
    standardDeduction: 8000,
    brackets: [
      { threshold: 0, rate: 0.039 },
      { threshold: 8500, rate: 0.044 },
      { threshold: 11700, rate: 0.0515 },
      { threshold: 13900, rate: 0.054 },
      { threshold: 80650, rate: 0.059 },
      { threshold: 215400, rate: 0.0685 },
      { threshold: 1077550, rate: 0.0965 },
      { threshold: 5000000, rate: 0.103 },
      { threshold: 25000000, rate: 0.109 },
    ],
  },
  'North Carolina': { name: 'North Carolina (Flat 3.99%)', standardDeduction: 12750, brackets: [{ threshold: 0, rate: 0.0399 }] },
  'North Dakota': {
    name: 'North Dakota',
    standardDeduction: 0,
    brackets: [
      { threshold: 0, rate: 0 },
      { threshold: 57625, rate: 0.0195 },
      { threshold: 258450, rate: 0.025 },
    ],
  },
  'Ohio': { name: 'Ohio', standardDeduction: 1900, brackets: [{ threshold: 0, rate: 0 }, { threshold: 26050, rate: 0.0275 }] },
  'Oklahoma': {
    name: 'Oklahoma',
    standardDeduction: 7350,
    brackets: [
      { threshold: 0, rate: 0 },
      { threshold: 3750, rate: 0.025 },
      { threshold: 4900, rate: 0.035 },
      { threshold: 7200, rate: 0.045 },
    ],
  },
  'Oregon': {
    name: 'Oregon',
    standardDeduction: 2910,
    brackets: [
      { threshold: 0, rate: 0.0475 },
      { threshold: 4550, rate: 0.0675 },
      { threshold: 11400, rate: 0.0875 },
      { threshold: 125000, rate: 0.099 },
    ],
  },
  'Pennsylvania': { name: 'Pennsylvania (Flat 3.07%)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0.0307 }] },
  'Rhode Island': {
    name: 'Rhode Island',
    standardDeduction: 10550,
    brackets: [
      { threshold: 0, rate: 0.0375 },
      { threshold: 82050, rate: 0.0475 },
      { threshold: 186450, rate: 0.0599 },
    ],
  },
  'South Carolina': {
    name: 'South Carolina',
    standardDeduction: 15000,
    brackets: [
      { threshold: 0, rate: 0.0199 },
      { threshold: 30000, rate: 0.0521 },
    ],
  },
  'South Dakota': { name: 'South Dakota (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'Tennessee': { name: 'Tennessee (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'Texas': { name: 'Texas (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'Utah': { name: 'Utah (Flat 4.45%)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0.0445 }] },
  'Vermont': {
    name: 'Vermont',
    standardDeduction: 7400,
    brackets: [
      { threshold: 0, rate: 0.0335 },
      { threshold: 49400, rate: 0.066 },
      { threshold: 119700, rate: 0.076 },
      { threshold: 249700, rate: 0.0875 },
    ],
  },
  'Virginia': {
    name: 'Virginia',
    standardDeduction: 9680,
    brackets: [
      { threshold: 0, rate: 0.02 },
      { threshold: 3000, rate: 0.03 },
      { threshold: 5000, rate: 0.05 },
      { threshold: 17000, rate: 0.0575 },
    ],
  },
  'Washington': { name: 'Washington (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
  'West Virginia': {
    name: 'West Virginia',
    standardDeduction: 2000,
    brackets: [
      { threshold: 0, rate: 0.0211 },
      { threshold: 10000, rate: 0.0281 },
      { threshold: 25000, rate: 0.0316 },
      { threshold: 40000, rate: 0.0422 },
      { threshold: 60000, rate: 0.0458 },
    ],
  },
  'Wisconsin': {
    name: 'Wisconsin',
    standardDeduction: 14660,
    brackets: [
      { threshold: 0, rate: 0.035 },
      { threshold: 15110, rate: 0.044 },
      { threshold: 51950, rate: 0.053 },
      { threshold: 332720, rate: 0.0765 },
    ],
  },
  'Wyoming': { name: 'Wyoming (No State Income Tax)', standardDeduction: 0, brackets: [{ threshold: 0, rate: 0 }] },
};

export const COUNTRIES: CountryInfo[] = [
  {
    id: 'usa',
    name: 'United States',
    code: 'US',
    currency: 'USD',
    flag: '🇺🇸',
    costOfLivingAnnualUSD: 18000,
    subRegionLabel: 'State',
    // Sources, checked 2026-10-16. Single filer, tax year 2026.
    // Brackets + standard deduction: IRS 2026 inflation adjustments (Rev. Proc. 2025-32),
    //   https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
    // Social Security wage base $184,500: https://www.ssa.gov/oact/cola/cbb.html
    // State tables (US_STATES) have not been checked against state sources yet.
    federalBrackets: [
      { threshold: 0, rate: 0.10 },
      { threshold: 12400, rate: 0.12 },
      { threshold: 50400, rate: 0.22 },
      { threshold: 105700, rate: 0.24 },
      { threshold: 201775, rate: 0.32 },
      { threshold: 256225, rate: 0.35 },
      { threshold: 640600, rate: 0.37 },
    ],
    standardDeduction: 16100,
    socialContributions: [
      { name: 'Social Security (FICA)', rate: 0.062, cap: 184500 },
      { name: 'Medicare', rate: 0.0145 },
    ],
    specialRules: [
      { name: 'Additional Medicare Tax', type: 'medicare_add', trigger: 200000, rate: 0.009 }
    ],
    subRegions: US_STATES,
    officialSource: 'https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill',
    notes: 'IRS 2026 inflation-adjusted brackets + FICA contributions + All 50 states'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    currency: 'GBP',
    flag: '🇬🇧',
    costOfLivingAnnualUSD: 16000,
    // Sources, checked 2026-10-16. Tax year 6 Apr 2026 - 5 Apr 2027, England/Wales/NI rates (Scottish bands not modelled).
    // Bands, £12,570 allowance, £100k taper: https://www.gov.uk/income-tax-rates
    // Class 1 NI 8% / 2%, PT £242/wk, UEL £967/wk (annual £12,570 / £50,270):
    //   https://www.gov.uk/government/publications/rates-and-allowances-national-insurance-contributions/rates-and-allowances-national-insurance-contributions
    // Thresholds below are on taxable income (after the allowance): 40% from £50,270 gross, 45% above £125,140.
    federalBrackets: [
      { threshold: 0, rate: 0.20 },
      { threshold: 37700, rate: 0.40 },
      { threshold: 125140, rate: 0.45 },
    ],
    deductions: [
      { name: 'Personal Allowance', amount: 12570, taperStart: 100000, taperRate: 0.5 }
    ],
    socialContributions: [
      { name: 'National Insurance (Standard)', rate: 0.08, floor: 12570, cap: 50270 },
      { name: 'National Insurance (Above UEL)', rate: 0.02, floor: 50270 },
    ],
    officialSource: 'https://www.gov.uk/income-tax-rates',
    notes: 'HMRC tax bands, £12,570 personal allowance tapering above £100k, 8% employee NI.'
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    flag: '🇩🇪',
    costOfLivingAnnualUSD: 14000,
    // Sources, checked 2026-10-16. Tax class I, statutory health insurance, childless, no church tax.
    // Tariff § 32a EStG from 2026 (Grundfreibetrag €12,348): https://www.gesetze-im-internet.de/estg/__32a.html
    // Payroll rules from the BMF Programmablaufplan 2026 (Lohnsteuer2026.xml on bmf-steuerrechner.de):
    //   €1,230 Arbeitnehmer-Pauschbetrag, €36 Sonderausgaben-Pauschbetrag, Vorsorgepauschale = pension 9.3%
    //   + health 7.0% + half the Zusatzbeitrag + care 2.4%; Soli Freigrenze €20,350 with 11.9% phase-in.
    // Caps €101,400 (pension/unemployment) and €69,750 (health/care): https://www.bundesregierung.de/breg-de/aktuelles/beitragsgemessungsgrenzen-2386514
    // Average Zusatzbeitrag 2.9%: https://www.bundesgesundheitsministerium.de/beitraege
    // The calculation uses the formula; these brackets only feed the table (the rate rises
    // linearly from 14% to 24% and from 24% to 42% inside the first two bands).
    incomeTaxFormula: 'DE_32A_2026',
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 12348, rate: 0.14 },
      { threshold: 17799, rate: 0.24 },
      { threshold: 69878, rate: 0.42 },
      { threshold: 277825, rate: 0.45 },
    ],
    deductions: [
      { name: 'Arbeitnehmer-Pauschbetrag', amount: 1230 },
      { name: 'Sonderausgaben-Pauschbetrag', amount: 36 },
    ],
    socialContributions: [
      { name: 'Rentenversicherung (Pension)', rate: 0.093, cap: 101400, deductibleRate: 0.093 },
      { name: 'Krankenversicherung (Health)', rate: 0.0875, cap: 69750, deductibleRate: 0.0845 },
      { name: 'Pflegeversicherung (Care)', rate: 0.024, cap: 69750, deductibleRate: 0.024 },
      { name: 'Arbeitslosenversicherung (Unemployment)', rate: 0.013, cap: 101400 },
    ],
    specialRules: [
      { name: 'Solidaritätszuschlag (Solidarity)', type: 'solidarity', trigger: 20350, rate: 0.055, isPercentageOfTax: true, reliefRate: 0.119 }
    ],
    officialSource: 'https://www.gesetze-im-internet.de/estg/__32a.html',
    notes: '2026 income tax formula (§ 32a EStG, Grundfreibetrag €12,348), Soli with phase-in, employee social contributions. Tax class I, childless, no church tax.'
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    currency: 'CAD',
    flag: '🇨🇦',
    costOfLivingAnnualUSD: 15000,
    subRegionLabel: 'Province',
    // Sources, checked 2026-10-16. Tax year 2026.
    // Federal + provincial brackets, basic personal amounts, Ontario surtax and Health Premium, CPP/CPP2/EI:
    //   CRA T4127 Payroll Deductions Formulas, 122nd edition (Jan 2026),
    //   https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas/t4127-jan/t4127-jan-payroll-deductions-formulas-computer-programs.html
    // Quebec brackets, BPA $18,952, QPIP 0.43%: https://www.revenuquebec.ca/en/businesses/source-deductions-and-employer-contributions/employers-principal-changes-for-2026/
    // Personal amounts are credits at the lowest rate (14% federal), not deductions. Enhanced CPP is
    // deducted from income; base CPP and EI are credited. Not modelled: Ontario/BC low-income tax
    // reductions, Quebec's own deductions and credits beyond the basic amount.
    federalBrackets: [
      { threshold: 0, rate: 0.14 },
      { threshold: 58523, rate: 0.205 },
      { threshold: 117045, rate: 0.26 },
      { threshold: 181440, rate: 0.29 },
      { threshold: 258482, rate: 0.33 },
    ],
    taxCredits: [
      {
        name: 'Basic personal amount',
        amount: 16452,
        atLowestRate: true,
        phaseOuts: [{ start: 181440, end: 258482, rate: 1623 / 77042 }],
        minAmount: 14829,
      },
      { name: 'Canada employment amount', amount: 1501, atLowestRate: true },
    ],
    socialContributions: [
      { name: 'CPP (Canada Pension Plan)', rate: 0.0595, floor: 3500, cap: 74600, deductibleRate: 0.01, creditRate: 0.0495 },
      { name: 'CPP2 (Second additional CPP)', rate: 0.04, floor: 74600, cap: 85000, deductibleRate: 0.04 },
      { name: 'EI (Employment Insurance)', rate: 0.0163, cap: 68900, creditRate: 0.0163 },
    ],
    subRegions: {
      'Ontario': {
        name: 'Ontario',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [{ name: 'Ontario basic personal amount', amount: 12989, atLowestRate: true }],
        surtaxes: [
          { threshold: 5818, rate: 0.20 },
          { threshold: 7446, rate: 0.36 },
        ],
        levies: [
          {
            name: 'Ontario Health Premium',
            steps: [
              { from: 20000, base: 0, rate: 0.06, max: 300 },
              { from: 36000, base: 300, rate: 0.06, max: 450 },
              { from: 48000, base: 450, rate: 0.25, max: 600 },
              { from: 72000, base: 600, rate: 0.25, max: 750 },
              { from: 200000, base: 750, rate: 0.25, max: 900 },
            ],
          },
        ],
        brackets: [
          { threshold: 0, rate: 0.0505 },
          { threshold: 53891, rate: 0.0915 },
          { threshold: 107785, rate: 0.1116 },
          { threshold: 150000, rate: 0.1216 },
          { threshold: 220000, rate: 0.1316 },
        ]
      },
      'British Columbia': {
        name: 'British Columbia',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [{ name: 'BC basic personal amount', amount: 13216, atLowestRate: true }],
        brackets: [
          { threshold: 0, rate: 0.0506 },
          { threshold: 50363, rate: 0.077 },
          { threshold: 100728, rate: 0.105 },
          { threshold: 115648, rate: 0.1229 },
          { threshold: 140430, rate: 0.147 },
          { threshold: 190405, rate: 0.168 },
          { threshold: 265545, rate: 0.205 },
        ]
      },
      'Quebec': {
        name: 'Quebec',
        useNationalTaxableIncome: true,
        taxCredits: [{ name: 'Quebec basic personal amount', amount: 18952, atLowestRate: true }],
        // Quebec abatement: 16.5% of basic federal tax is refunded to Quebec residents
        nationalTaxAbatement: 0.165,
        // QPP replaces CPP, EI is lower in Quebec, plus QPIP. QPP base/enhanced split is approximate.
        socialContributions: [
          { name: 'QPP (Quebec Pension Plan)', rate: 0.063, floor: 3500, cap: 74600, deductibleRate: 0.01, creditRate: 0.053 },
          { name: 'QPP2 (Second additional QPP)', rate: 0.04, floor: 74600, cap: 85000, deductibleRate: 0.04 },
          { name: 'EI (Employment Insurance, Quebec rate)', rate: 0.013, cap: 68900, creditRate: 0.013 },
          { name: 'QPIP (Parental Insurance)', rate: 0.0043, cap: 103000, creditRate: 0.0043 },
        ],
        brackets: [
          { threshold: 0, rate: 0.14 },
          { threshold: 54345, rate: 0.19 },
          { threshold: 108680, rate: 0.24 },
          { threshold: 132245, rate: 0.2575 },
        ]
      },
      'Alberta': {
        name: 'Alberta',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [{ name: 'Alberta basic personal amount', amount: 22769, atLowestRate: true }],
        brackets: [
          { threshold: 0, rate: 0.08 },
          { threshold: 61200, rate: 0.10 },
          { threshold: 154259, rate: 0.12 },
          { threshold: 185111, rate: 0.13 },
          { threshold: 246813, rate: 0.14 },
          { threshold: 370220, rate: 0.15 },
        ]
      },
      'Manitoba': {
        name: 'Manitoba',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [
          {
            name: 'Manitoba basic personal amount',
            amount: 15780,
            atLowestRate: true,
            phaseOuts: [{ start: 200000, end: 400000, rate: 15780 / 200000 }],
          },
        ],
        brackets: [
          { threshold: 0, rate: 0.108 },
          { threshold: 47000, rate: 0.1275 },
          { threshold: 100000, rate: 0.174 },
        ]
      },
      'Saskatchewan': {
        name: 'Saskatchewan',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [{ name: 'Saskatchewan basic personal amount', amount: 20381, atLowestRate: true }],
        brackets: [
          { threshold: 0, rate: 0.105 },
          { threshold: 54532, rate: 0.125 },
          { threshold: 155805, rate: 0.145 },
        ]
      },
      'Nova Scotia': {
        name: 'Nova Scotia',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [{ name: 'Nova Scotia basic personal amount', amount: 11932, atLowestRate: true }],
        brackets: [
          { threshold: 0, rate: 0.0879 },
          { threshold: 30995, rate: 0.1495 },
          { threshold: 61991, rate: 0.1667 },
          { threshold: 97417, rate: 0.175 },
          { threshold: 157124, rate: 0.21 },
        ]
      },
      'New Brunswick': {
        name: 'New Brunswick',
        useNationalTaxableIncome: true,
        applySocialCredits: true,
        taxCredits: [{ name: 'New Brunswick basic personal amount', amount: 13664, atLowestRate: true }],
        brackets: [
          { threshold: 0, rate: 0.094 },
          { threshold: 52333, rate: 0.14 },
          { threshold: 104666, rate: 0.16 },
          { threshold: 193861, rate: 0.195 },
        ]
      },
    },
    officialSource: 'https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas/t4127-jan/t4127-jan-payroll-deductions-formulas-computer-programs.html',
    notes: 'CRA 2026 federal and provincial rates, personal amounts as 14% credits, CPP/CPP2/EI.'
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    currency: 'AUD',
    flag: '🇦🇺',
    costOfLivingAnnualUSD: 17000,
    // Sources, checked 2026-10-16. Resident, income year 1 Jul 2026 - 30 Jun 2027.
    // Rates (15% bottom rate from 2026-27): https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents
    // LITO $700, tapering to nil at $66,667: https://www.ato.gov.au/individuals-and-families/income-deductions-offsets-and-records/tax-offsets/low-income-tax-offset
    // Medicare levy 2%, shaded in at 10c per $ above the single threshold ($28,011 is the 2025-26
    // figure; 2026-27 not yet published): https://www.ato.gov.au/individuals-and-families/medicare-and-private-health-insurance/medicare-levy/medicare-levy-reduction/medicare-levy-reduction-for-low-income-earners
    // The first $18,200 is a 0% band of taxable income, not a deduction.
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 18200, rate: 0.15 },
      { threshold: 45000, rate: 0.30 },
      { threshold: 135000, rate: 0.37 },
      { threshold: 190000, rate: 0.45 },
    ],
    taxCredits: [
      {
        name: 'Low income tax offset',
        amount: 700,
        phaseOuts: [
          { start: 37500, end: 45000, rate: 0.05 },
          { start: 45000, rate: 0.015 },
        ],
      },
    ],
    socialContributions: [
      { name: 'Medicare Levy', rate: 0.02, floor: 28011, shadeInRate: 0.10 },
    ],
    officialSource: 'https://www.ato.gov.au/tax-rates-and-codes/tax-rates-australian-residents',
    notes: 'ATO 2026-27 resident rates, low income tax offset, 2% Medicare levy with low-income shade-in.'
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    code: 'AE',
    currency: 'AED',
    flag: '🇦🇪',
    costOfLivingAnnualUSD: 24000,
    // Sources, checked 2026-10-16. No income tax on individuals: https://u.ae/en/information-and-services/finance-and-investment/taxation
    // Salaries are outside the corporate tax law (FTA guide "Taxation of Natural Persons").
    // UAE/GCC nationals pay pension contributions (GPSSA); not modelled, the figures are for expats.
    federalBrackets: [{ threshold: 0, rate: 0 }],
    socialContributions: [],
    officialSource: 'https://u.ae/en/information-and-services/finance-and-investment/taxation',
    notes: '0% personal income tax, 0% social security for foreign expatriates.'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SG',
    currency: 'SGD',
    flag: '🇸🇬',
    costOfLivingAnnualUSD: 16000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 20000, rate: 0.02 },
      { threshold: 30000, rate: 0.035 },
      { threshold: 40000, rate: 0.07 },
      { threshold: 80000, rate: 0.115 },
      { threshold: 120000, rate: 0.15 },
      { threshold: 160000, rate: 0.18 },
      { threshold: 200000, rate: 0.19 },
      { threshold: 240000, rate: 0.195 },
      { threshold: 280000, rate: 0.20 },
      { threshold: 320000, rate: 0.22 },
      { threshold: 500000, rate: 0.23 },
      { threshold: 1000000, rate: 0.24 },
    ],
    standardDeduction: 20000,
    socialContributions: [
      { name: 'CPF (Citizens/PR)', rate: 0.20, cap: 102000 }
    ],
    officialSource: 'https://www.iras.gov.sg',
    notes: 'IRAS progressive rates up to 24%. Expatriates exempt from CPF.'
  },
  {
    id: 'switzerland',
    name: 'Switzerland (Zurich Avg)',
    code: 'CH',
    currency: 'CHF',
    flag: '🇨🇭',
    costOfLivingAnnualUSD: 23000,
    // Sources, checked 2026-10-16. Single taxpayer, tax year 2026.
    // Federal direct tax, singles tariff 2026 (ESTV Form. 58c): https://www.estv.admin.ch/dam/de/sd-web/gnde9CmEsalK/dbst-tairfe-58c-2026-dfi.pdf
    //   Above CHF 793,900 the whole income is taxed at 11.5%; the 11.5% band reproduces that.
    // AHV/IV/EO 5.3% and ALV 1.1% up to CHF 148,200 (employee shares): https://www.ahv-iv.ch/p/2.01.d
    // NOT VERIFIED: the cantonal/communal line is a flat 13% estimate, not the Zurich tariff.
    //   Occupational pension (BVG) and accident insurance are not modelled.
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 15200, rate: 0.0077 },
      { threshold: 33200, rate: 0.0088 },
      { threshold: 43500, rate: 0.0264 },
      { threshold: 58000, rate: 0.0297 },
      { threshold: 76200, rate: 0.0594 },
      { threshold: 82100, rate: 0.066 },
      { threshold: 108900, rate: 0.088 },
      { threshold: 141500, rate: 0.11 },
      { threshold: 185100, rate: 0.132 },
      { threshold: 793900, rate: 0.115 },
    ],
    socialContributions: [
      { name: 'AVS / AI / APG (1st Pillar)', rate: 0.053, deductibleRate: 0.053 },
      { name: 'AC (Unemployment)', rate: 0.011, cap: 148200, deductibleRate: 0.011 },
      { name: 'Cantonal/Communal Tax (estimate, ~13%)', rate: 0.13 },
    ],
    officialSource: 'https://www.estv.admin.ch/dam/de/sd-web/gnde9CmEsalK/dbst-tairfe-58c-2026-dfi.pdf',
    notes: 'Federal direct tax (2026 singles tariff) + AHV/ALV + a flat estimate for cantonal and communal tax.'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    code: 'IE',
    currency: 'EUR',
    flag: '🇮🇪',
    costOfLivingAnnualUSD: 21000,
    federalBrackets: [
      { threshold: 0, rate: 0.20 },
      { threshold: 44000, rate: 0.40 },
    ],
    standardDeduction: 0,
    socialContributions: [
      { name: 'PRSI (Class A1)', rate: 0.042375 },
      { name: 'USC (Universal Social Charge)', rate: 0.04, floor: 13000 },
    ],
    deductions: [
      { name: 'Personal & Employee Tax Credit', amount: 4000 }
    ],
    officialSource: 'https://www.revenue.ie',
    notes: 'Progressive income tax (20/40%) + €4,000 tax credit + USC and PRSI.'
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    flag: '🇫🇷',
    costOfLivingAnnualUSD: 15000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 11600, rate: 0.11 },
      { threshold: 29579, rate: 0.30 },
      { threshold: 84577, rate: 0.41 },
      { threshold: 181917, rate: 0.45 },
    ],
    standardDeduction: 11600,
    socialContributions: [
      { name: 'Cotisations Sociales (CSG/CRDS/Retraite)', rate: 0.20 },
    ],
    officialSource: 'https://www.service-public.fr/',
    notes: 'Barème progressif de l’impôt sur le revenu + employee social charges.'
  },
  {
    id: 'spain',
    name: 'Spain',
    code: 'ES',
    currency: 'EUR',
    flag: '🇪🇸',
    costOfLivingAnnualUSD: 12000,
    federalBrackets: [
      { threshold: 0, rate: 0.19 },
      { threshold: 12450, rate: 0.24 },
      { threshold: 20200, rate: 0.30 },
      { threshold: 35200, rate: 0.37 },
      { threshold: 60000, rate: 0.45 },
      { threshold: 300000, rate: 0.47 },
    ],
    standardDeduction: 5550,
    socialContributions: [
      { name: 'Seguridad Social', rate: 0.065, cap: 61214.40 },
    ],
    officialSource: 'https://sede.agenciatributaria.gob.es/',
    notes: 'IRPF combined state and regional averages + Social Security.'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    code: 'PT',
    currency: 'EUR',
    flag: '🇵🇹',
    costOfLivingAnnualUSD: 11000,
    federalBrackets: [
      { threshold: 0, rate: 0.125 },
      { threshold: 8342, rate: 0.157 },
      { threshold: 12587, rate: 0.212 },
      { threshold: 17838, rate: 0.241 },
      { threshold: 23089, rate: 0.311 },
      { threshold: 29397, rate: 0.349 },
      { threshold: 43090, rate: 0.431 },
      { threshold: 46566, rate: 0.446 },
      { threshold: 86634, rate: 0.48 },
    ],
    standardDeduction: 4587.09,
    socialContributions: [
      { name: 'Segurança Social', rate: 0.11 },
    ],
    specialRules: [
      { name: 'Solidarity Surcharge (>€80k)', type: 'solidarity', trigger: 80000, rate: 0.025 }
    ],
    officialSource: 'https://portaldasfinancas.gov.pt',
    notes: 'IRS 9 progressive bands + 11% social security.'
  },
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    currency: 'EUR',
    flag: '🇮🇹',
    costOfLivingAnnualUSD: 13000,
    federalBrackets: [
      { threshold: 0, rate: 0.23 },
      { threshold: 28000, rate: 0.33 },
      { threshold: 50000, rate: 0.43 },
    ],
    standardDeduction: 8500,
    socialContributions: [
      { name: 'INPS (Pension & Social)', rate: 0.0919, cap: 122295 },
      { name: 'Addizionale Regionale / Comunale', rate: 0.025 },
    ],
    officialSource: 'https://www.agenziaentrate.gov.it',
    notes: 'IRPEF 3 progressive brackets + INPS + regional and municipal surtaxes.'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    code: 'NL',
    currency: 'EUR',
    flag: '🇳🇱',
    costOfLivingAnnualUSD: 16000,
    federalBrackets: [
      { threshold: 0, rate: 0.3575 },
      { threshold: 38883, rate: 0.3756 },
      { threshold: 78426, rate: 0.495 },
    ],
    deductions: [
      { name: 'Algemene Heffingskorting', amount: 3115, taperStart: 29736, taperRate: 0.06398 }
    ],
    socialContributions: [
      { name: 'Zvw (Health Insurance)', rate: 0.061, cap: 79409 },
    ],
    officialSource: 'https://www.belastingdienst.nl',
    notes: 'Box 1 income tax + General tax credit + Zvw health contribution.'
  },
  {
    id: 'lithuania',
    name: 'Lithuania',
    code: 'LT',
    currency: 'EUR',
    flag: '🇱🇹',
    costOfLivingAnnualUSD: 10500,
    federalBrackets: [
      { threshold: 0, rate: 0.20 },
      { threshold: 82962, rate: 0.25 },
      { threshold: 138270, rate: 0.32 },
    ],
    standardDeduction: 8964,
    socialContributions: [
      { name: 'SODRA (Social Insurance & Health)', rate: 0.195, cap: 82962 },
    ],
    officialSource: 'https://www.vmi.lt',
    notes: 'Lithuanian GPM progressive PIT rates + SODRA social insurance.'
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'JP',
    currency: 'JPY',
    flag: '🇯🇵',
    costOfLivingAnnualUSD: 13000,
    federalBrackets: [
      { threshold: 0, rate: 0.05105 },
      { threshold: 1950000, rate: 0.1021 },
      { threshold: 3300000, rate: 0.2042 },
      { threshold: 6950000, rate: 0.23483 },
      { threshold: 9000000, rate: 0.33693 },
      { threshold: 18000000, rate: 0.4084 },
      { threshold: 40000000, rate: 0.45945 },
    ],
    standardDeduction: 480000,
    socialContributions: [
      { name: 'Social Insurance (Health & Pension)', rate: 0.15, cap: 17100000 },
      { name: 'Local Inhabitant Tax (住民税)', rate: 0.10 },
    ],
    officialSource: 'https://www.nta.go.jp',
    notes: 'National income tax + 2.1% reconstruction surtax + 10% local inhabitant tax.'
  },
  {
    id: 'south_korea',
    name: 'South Korea',
    code: 'KR',
    currency: 'KRW',
    flag: '🇰🇷',
    costOfLivingAnnualUSD: 14000,
    federalBrackets: [
      { threshold: 0, rate: 0.06 },
      { threshold: 14000000, rate: 0.15 },
      { threshold: 50000000, rate: 0.24 },
      { threshold: 88000000, rate: 0.35 },
      { threshold: 150000000, rate: 0.38 },
      { threshold: 300000000, rate: 0.40 },
      { threshold: 500000000, rate: 0.42 },
      { threshold: 1000000000, rate: 0.45 },
    ],
    standardDeduction: 1500000,
    socialContributions: [
      { name: 'National Pension (NPS)', rate: 0.0475, cap: 79080000 },
      { name: 'Health & Care Insurance', rate: 0.04065, cap: 55100880 },
      { name: 'Local Income Tax', rate: 0.02 },
    ],
    officialSource: 'https://www.nts.go.kr',
    notes: 'NTS progressive income tax + local PIT + NPS/NHI.'
  },
  {
    id: 'hong_kong',
    name: 'Hong Kong',
    code: 'HK',
    currency: 'HKD',
    flag: '🇭🇰',
    costOfLivingAnnualUSD: 19000,
    federalBrackets: [
      { threshold: 0, rate: 0.02 },
      { threshold: 50000, rate: 0.06 },
      { threshold: 100000, rate: 0.10 },
      { threshold: 150000, rate: 0.14 },
      { threshold: 200000, rate: 0.17 },
    ],
    standardDeduction: 132000,
    socialContributions: [
      { name: 'MPF (Mandatory Provident Fund)', rate: 0.05, cap: 18000 },
    ],
    officialSource: 'https://www.ird.gov.hk',
    notes: 'Progressive rates or standard rate 15% with basic allowance HK$132,000.'
  },
  {
    id: 'india',
    name: 'India',
    code: 'IN',
    currency: 'INR',
    flag: '🇮🇳',
    costOfLivingAnnualUSD: 5000,
    // Sources, checked 2026-10-16. New regime, resident individual under 60, FY 2026-27.
    // Slabs, ₹75,000 standard deduction, s.87A rebate up to ₹60,000 for income to ₹12 lakh, surcharge
    //   10/15/25% above ₹50 lakh / ₹1 crore / ₹2 crore: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/itr-2/itr-2-faqs
    //   and https://www.incometaxindia.gov.in/w/tax-rates%E2%80%8B
    // Budget 2026-27 made no change to personal rates (PIB budget summary, Feb 2026).
    // EPF: 12% of basic pay up to the ₹15,000/month wage ceiling; gross is treated as basic pay.
    // Not modelled: marginal relief on the surcharge.
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 400000, rate: 0.05 },
      { threshold: 800000, rate: 0.10 },
      { threshold: 1200000, rate: 0.15 },
      { threshold: 1600000, rate: 0.20 },
      { threshold: 2000000, rate: 0.25 },
      { threshold: 2400000, rate: 0.30 },
    ],
    standardDeduction: 75000,
    taxRebate: { incomeLimit: 1200000, maxRebate: 60000, marginalRelief: true },
    socialContributions: [
      { name: 'EPF (Employee Provident Fund)', rate: 0.12, cap: 180000 }
    ],
    specialRules: [
      { name: 'Surcharge (10% above ₹50 lakh)', type: 'surcharge', trigger: 5000000, rate: 0.10, isPercentageOfTax: true, triggerBasis: 'income' },
      { name: 'Surcharge (15% above ₹1 crore)', type: 'surcharge', trigger: 10000000, rate: 0.05, isPercentageOfTax: true, triggerBasis: 'income' },
      { name: 'Surcharge (25% above ₹2 crore)', type: 'surcharge', trigger: 20000000, rate: 0.10, isPercentageOfTax: true, triggerBasis: 'income' },
      { name: 'Health & Education Cess (4%)', type: 'cess', trigger: 0, rate: 0.04, isPercentageOfTax: true, compound: true }
    ],
    officialSource: 'https://www.incometaxindia.gov.in/w/tax-rates%E2%80%8B',
    notes: 'New Tax Regime (FY 2026-27): ₹75,000 standard deduction, no tax up to ₹12 lakh after the s.87A rebate, surcharge, 4% cess.'
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
    code: 'PK',
    currency: 'PKR',
    flag: '🇵🇰',
    costOfLivingAnnualUSD: 4800,
    // Sources, checked 2026-10-16. Salaried individual, tax year 2027 (1 Jul 2026 - 30 Jun 2027).
    // Slabs: FBR Withholding Tax Rate Card TY2027 (updated to Finance Act 2026), section 149,
    //   https://download1.fbr.gov.pk/Docs/202681113864992WithholdingTaxRatesCard2027.pdf
    // Salaried surcharge abolished by Finance Act 2026 (amendment to s.4AB),
    //   https://download1.fbr.gov.pk/Docs/20266291261044366FinanceAct2026.pdf
    // NOT VERIFIED: the EOBI line (employee pays 1% of the minimum wage, not of salary).
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 600000, rate: 0.01 },
      { threshold: 1200000, rate: 0.11 },
      { threshold: 2200000, rate: 0.20 },
      { threshold: 3200000, rate: 0.25 },
      { threshold: 4100000, rate: 0.29 },
      { threshold: 5600000, rate: 0.32 },
      { threshold: 7000000, rate: 0.35 },
    ],
    socialContributions: [
      { name: 'EOBI (Old-Age Benefits)', rate: 0.01, cap: 18000 }
    ],
    officialSource: 'https://download1.fbr.gov.pk/Docs/202681113864992WithholdingTaxRatesCard2027.pdf',
    notes: 'FBR tax year 2027 salaried slabs (Finance Act 2026): 0% up to ₨600k, rising to 35% above ₨7M. No surcharge for salaried individuals.',
    overviewText: 'Pakistan operates a progressive income tax system administered by the Federal Board of Revenue (FBR). For salaried individuals in tax year 2027, rates run from 0% on the first ₨600,000 to 35% on income above ₨7 million. The Finance Act 2026 removed the surcharge on salaried income above ₨10 million.',
    residencyRuleText: 'An individual is considered a tax resident of Pakistan if physically present in Pakistan for a period of, or periods amounting in aggregate to, 183 days or more in the tax year (July 1 to June 30).',
    deductionsText: 'Salaried individuals benefit from a non-taxable basic slab up to ₨600,000 annually. Deductions and tax credits are available for charitable donations, approved pension funds, and medical insurance schemes.',
    expatIncentivesText: 'Under the Income Tax Ordinance, specialized tax incentives exist for IT and software export freelancers and startups registered with the Pakistan Software Export Board (PSEB).'
  },
  {
    id: 'china',
    name: 'China',
    code: 'CN',
    currency: 'CNY',
    flag: '🇨🇳',
    costOfLivingAnnualUSD: 8400,
    federalBrackets: [
      { threshold: 0, rate: 0.03 },
      { threshold: 36000, rate: 0.10 },
      { threshold: 144000, rate: 0.20 },
      { threshold: 300000, rate: 0.25 },
      { threshold: 420000, rate: 0.30 },
      { threshold: 660000, rate: 0.35 },
      { threshold: 960000, rate: 0.45 },
    ],
    standardDeduction: 60000,
    socialContributions: [
      { name: 'Five Insurances & Housing Fund', rate: 0.105, cap: 42000 }
    ],
    officialSource: 'http://www.chinatax.gov.cn',
    notes: 'State Taxation Administration (STA) Individual Income Tax on Comprehensive Income: standard deduction ¥60,000/yr + 7-tier progressive slabs (3% to 45%).',
    overviewText: 'The People\'s Republic of China taxes individual income on a comprehensive annual progressive scale ranging from 3% to 45%, administered by the State Taxation Administration (STA).',
    residencyRuleText: 'Under Chinese tax law, an individual who resides in China for 183 days or more in a calendar year is recognized as a tax resident subject to worldwide income reporting.',
    deductionsText: 'A statutory basic standard deduction of ¥60,000 annually (¥5,000/month) applies to all comprehensive wage earners, alongside special additional deductions for children\'s education, continuing education, healthcare, and housing rent/mortgage.',
    expatIncentivesText: 'China allows qualifying foreign expatriates to claim tax-exempt fringe benefits (including housing subsidies, children\'s education, language training, and home leave expenses) subject to tax authority filing.'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    code: 'MX',
    currency: 'MXN',
    flag: '🇲🇽',
    costOfLivingAnnualUSD: 7500,
    federalBrackets: [
      { threshold: 0.01, rate: 0.0192 },
      { threshold: 10135.12, rate: 0.064 },
      { threshold: 86022.12, rate: 0.1088 },
      { threshold: 151176.20, rate: 0.16 },
      { threshold: 175735.67, rate: 0.1792 },
      { threshold: 210403.70, rate: 0.2136 },
      { threshold: 424353.98, rate: 0.2352 },
      { threshold: 668840.15, rate: 0.30 },
      { threshold: 1276925.99, rate: 0.32 },
      { threshold: 1702567.98, rate: 0.34 },
      { threshold: 5107703.93, rate: 0.35 },
    ],
    socialContributions: [
      { name: 'IMSS & AFORE', rate: 0.02775, cap: 1070454 }
    ],
    officialSource: 'https://www.sat.gob.mx',
    notes: 'SAT progressive ISR brackets + IMSS employee contributions.'
  },
  {
    id: 'czech_republic',
    name: 'Czech Republic',
    code: 'CZ',
    currency: 'CZK',
    flag: '🇨🇿',
    costOfLivingAnnualUSD: 12000,
    federalBrackets: [
      { threshold: 0, rate: 0.15 },
      { threshold: 1762812, rate: 0.23 },
    ],
    standardDeduction: 30840,
    socialContributions: [
      { name: 'Social & Health Insurance', rate: 0.11 }
    ],
    officialSource: 'https://www.financnisprava.cz/',
    notes: 'Progressive 15% / 23% flat tax with basic personal relief.'
  },
  {
    id: 'malta',
    name: 'Malta',
    code: 'MT',
    currency: 'EUR',
    flag: '🇲🇹',
    costOfLivingAnnualUSD: 18000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 9100, rate: 0.15 },
      { threshold: 14500, rate: 0.25 },
      { threshold: 60000, rate: 0.35 },
    ],
    standardDeduction: 9100,
    socialContributions: [
      { name: 'National Insurance', rate: 0.10, cap: 28000 }
    ],
    officialSource: 'https://mtca.gov.mt/',
    notes: 'Malta progressive rates + National Insurance.'
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
    code: 'LU',
    currency: 'EUR',
    flag: '🇱🇺',
    costOfLivingAnnualUSD: 30000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 13230, rate: 0.08 },
      { threshold: 24255, rate: 0.14 },
      { threshold: 35730, rate: 0.24 },
      { threshold: 47205, rate: 0.34 },
      { threshold: 117450, rate: 0.40 },
      { threshold: 234870, rate: 0.42 },
    ],
    standardDeduction: 13230,
    socialContributions: [
      { name: 'Social Security (CCSS)', rate: 0.1295, cap: 145000 }
    ],
    officialSource: 'https://impotsdirects.public.lu/',
    notes: 'Progressive brackets up to 42% + 12.95% social security.'
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    code: 'ET',
    currency: 'ETB',
    flag: '🇪🇹',
    costOfLivingAnnualUSD: 4000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 24000, rate: 0.15 },
      { threshold: 48000, rate: 0.20 },
      { threshold: 84000, rate: 0.25 },
      { threshold: 120000, rate: 0.30 },
      { threshold: 168000, rate: 0.35 },
    ],
    standardDeduction: 24000,
    socialContributions: [{ name: 'Pension Contribution', rate: 0.07 }],
    officialSource: 'https://www.mor.gov.et/',
    notes: 'Ministry of Revenue personal income tax schedules.'
  },
  {
    id: 'uganda',
    name: 'Uganda',
    code: 'UG',
    currency: 'UGX',
    flag: '🇺🇬',
    costOfLivingAnnualUSD: 6000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 4020000, rate: 0.20 },
      { threshold: 4920000, rate: 0.25 },
      { threshold: 5820000, rate: 0.30 },
      { threshold: 120000000, rate: 0.40 },
    ],
    standardDeduction: 4020000,
    socialContributions: [{ name: 'NSSF (National Social Security)', rate: 0.05 }],
    officialSource: 'https://www.ura.go.ug/',
    notes: 'URA PAYE progressive tax schedule + 5% employee NSSF.'
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
    code: 'KH',
    currency: 'KHR',
    flag: '🇰🇭',
    costOfLivingAnnualUSD: 12000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 18000000, rate: 0.05 },
      { threshold: 24000000, rate: 0.10 },
      { threshold: 102000000, rate: 0.15 },
      { threshold: 150000000, rate: 0.20 },
    ],
    standardDeduction: 18000000,
    socialContributions: [{ name: 'NSSF', rate: 0.02 }],
    officialSource: 'https://www.tax.gov.kh/',
    notes: 'General Department of Taxation salary tax thresholds.'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    code: 'EG',
    currency: 'EGP',
    flag: '🇪🇬',
    costOfLivingAnnualUSD: 6000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 40000, rate: 0.10 },
      { threshold: 55000, rate: 0.15 },
      { threshold: 70000, rate: 0.20 },
      { threshold: 200000, rate: 0.225 },
      { threshold: 400000, rate: 0.25 },
      { threshold: 1200000, rate: 0.275 },
    ],
    standardDeduction: 40000,
    socialContributions: [{ name: 'Social Insurance', rate: 0.11, cap: 130000 }],
    officialSource: 'https://www.eta.gov.eg/',
    notes: 'Egyptian Tax Authority PIT rates + 11% social insurance.'
  },
  {
    id: 'sweden',
    name: 'Sweden',
    code: 'SE',
    currency: 'SEK',
    flag: '🇸🇪',
    costOfLivingAnnualUSD: 15000,
    federalBrackets: [
      { threshold: 0, rate: 0.3238 },
      { threshold: 643000, rate: 0.5238 },
    ],
    socialContributions: [
      { name: 'Pensionsavgift (Public Pension)', rate: 0.07, cap: 625000 }
    ],
    officialSource: 'https://skatteverket.se',
    notes: 'Skatteverket municipal base rate + national high-income bracket.'
  },
  {
    id: 'norway',
    name: 'Norway',
    code: 'NO',
    currency: 'NOK',
    flag: '🇳🇴',
    costOfLivingAnnualUSD: 19000,
    federalBrackets: [
      { threshold: 0, rate: 0.22 },
      { threshold: 226100, rate: 0.237 },
      { threshold: 318300, rate: 0.26 },
      { threshold: 725050, rate: 0.357 },
      { threshold: 980100, rate: 0.388 },
      { threshold: 1467200, rate: 0.398 },
    ],
    socialContributions: [
      { name: 'Trygdeavgift (Social Security)', rate: 0.076 }
    ],
    officialSource: 'https://www.skatteetaten.no',
    notes: 'General income tax 22% + bracket tax (trinnskatt) + social security.'
  },
  {
    id: 'denmark',
    name: 'Denmark',
    code: 'DK',
    currency: 'DKK',
    flag: '🇩🇰',
    costOfLivingAnnualUSD: 18000,
    federalBrackets: [
      { threshold: 0, rate: 0.3701 },
      { threshold: 641200, rate: 0.4451 },
      { threshold: 777900, rate: 0.5201 },
      { threshold: 2592700, rate: 0.5701 },
    ],
    socialContributions: [
      { name: 'AM-bidrag (Labor Market)', rate: 0.08 }
    ],
    officialSource: 'https://skat.dk',
    notes: 'Skat.dk municipal + bottom + top taxes + AM-bidrag 8%.'
  },
  {
    id: 'belgium',
    name: 'Belgium',
    code: 'BE',
    currency: 'EUR',
    flag: '🇧🇪',
    costOfLivingAnnualUSD: 16000,
    federalBrackets: [
      { threshold: 0, rate: 0.25 },
      { threshold: 16720, rate: 0.40 },
      { threshold: 29510, rate: 0.45 },
      { threshold: 51070, rate: 0.50 },
    ],
    standardDeduction: 10570,
    socialContributions: [
      { name: 'ONSS / RSZ (Social Security)', rate: 0.1307 }
    ],
    officialSource: 'https://finances.belgium.be',
    notes: 'Progressive tax up to 50% + 13.07% employee social security.'
  },
  {
    id: 'austria',
    name: 'Austria',
    code: 'AT',
    currency: 'EUR',
    flag: '🇦🇹',
    costOfLivingAnnualUSD: 15000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 13539, rate: 0.20 },
      { threshold: 21992, rate: 0.30 },
      { threshold: 36458, rate: 0.40 },
      { threshold: 70365, rate: 0.48 },
      { threshold: 104859, rate: 0.50 },
      { threshold: 1000000, rate: 0.55 },
    ],
    standardDeduction: 13539,
    socialContributions: [
      { name: 'Sozialversicherung (Social Insurance)', rate: 0.1812, cap: 88200 }
    ],
    officialSource: 'https://www.bmf.gv.at',
    notes: 'BMF tax brackets + statutory social insurance.'
  },
  {
    id: 'poland',
    name: 'Poland',
    code: 'PL',
    currency: 'PLN',
    flag: '🇵🇱',
    costOfLivingAnnualUSD: 11000,
    federalBrackets: [
      { threshold: 0, rate: 0.12 },
      { threshold: 120000, rate: 0.32 },
    ],
    standardDeduction: 30000,
    socialContributions: [
      { name: 'ZUS (Pension & Disability)', rate: 0.1371, cap: 234720 },
      { name: 'Health Contribution (NFZ)', rate: 0.09 },
    ],
    officialSource: 'https://www.podatki.gov.pl',
    notes: 'PIT 12% / 32% with 30,000 PLN tax-free amount + ZUS and NFZ.'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    code: 'TH',
    currency: 'THB',
    flag: '🇹🇭',
    costOfLivingAnnualUSD: 8500,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 150000, rate: 0.05 },
      { threshold: 300000, rate: 0.10 },
      { threshold: 500000, rate: 0.15 },
      { threshold: 750000, rate: 0.20 },
      { threshold: 1000000, rate: 0.25 },
      { threshold: 2000000, rate: 0.30 },
      { threshold: 5000000, rate: 0.35 },
    ],
    standardDeduction: 150000,
    socialContributions: [
      { name: 'Social Security Fund (5%)', rate: 0.05, cap: 9000 }
    ],
    officialSource: 'https://www.rd.go.th',
    notes: 'Revenue Department progressive PIT rates.'
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
    code: 'CY',
    currency: 'EUR',
    flag: '🇨🇾',
    costOfLivingAnnualUSD: 15000,
    federalBrackets: [
      { threshold: 0, rate: 0 },
      { threshold: 19500, rate: 0.20 },
      { threshold: 28000, rate: 0.25 },
      { threshold: 36300, rate: 0.30 },
      { threshold: 60000, rate: 0.35 },
    ],
    standardDeduction: 19500,
    socialContributions: [
      { name: 'Social Insurance', rate: 0.088, cap: 62868 },
      { name: 'GESY (General Healthcare)', rate: 0.0265, cap: 180000 },
    ],
    officialSource: 'https://www.mof.gov.cy',
    notes: '€19,500 tax-free allowance + 60-day tax residency rule.'
  },
  {
    id: 'monaco',
    name: 'Monaco',
    code: 'MC',
    currency: 'EUR',
    flag: '🇲🇨',
    costOfLivingAnnualUSD: 45000,
    federalBrackets: [{ threshold: 0, rate: 0 }],
    socialContributions: [
      { name: 'Social Contributions (Caisse des Congés)', rate: 0.06 }
    ],
    officialSource: 'https://www.gouv.mc',
    notes: '0% personal income tax on worldwide income for residents.'
  },
  {
    id: 'cayman',
    name: 'Cayman Islands',
    code: 'KY',
    currency: 'USD',
    flag: '🇰🇾',
    costOfLivingAnnualUSD: 36000,
    federalBrackets: [{ threshold: 0, rate: 0 }],
    socialContributions: [
      { name: 'National Pension Plan (5%)', rate: 0.05, cap: 87000 }
    ],
    officialSource: 'https://www.gov.ky',
    notes: '0% personal income tax, 0% capital gains tax.'
  },
];
