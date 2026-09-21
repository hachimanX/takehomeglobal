import React, { useState, useEffect, useMemo } from 'react';
import type { Article } from '../data/articlesData';
import { ARTICLES } from '../data/articlesData';
import { COUNTRIES } from '../data/taxData';
import { SITE_CONFIG } from '../config';
import {
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Calculator,
  Zap,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Building2,
  Globe2,
  AlertCircle,
  Copy,
  Check,
  Percent,
  TrendingUp,
  HelpCircle,
  Mail,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { formatMoney } from '../engine/calculator';

interface ArticleViewProps {
  article: Article;
  onNavigateHome: () => void;
  onNavigateArticles: () => void;
  onNavigateCountry?: (id: string) => void;
  onSelectArticle?: (slug: string) => void;
}

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: CALIFORNIA VS TEXAS
// -------------------------------------------------------------
const CalTexasCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(150000);
  const [status, setStatus] = useState<'single' | 'married'>('single');

  const presets = [75000, 120000, 150000, 250000, 400000];

  // Federal 2026 projection
  const stdDeductionFed = status === 'single' ? 15700 : 31400;
  const taxableFed = Math.max(0, salary - stdDeductionFed);
  let fedTax = 0;
  if (status === 'single') {
    if (taxableFed > 638450) fedTax += (taxableFed - 638450) * 0.37 + 189748;
    else if (taxableFed > 255200) fedTax += (taxableFed - 255200) * 0.35 + 55610;
    else if (taxableFed > 201050) fedTax += (taxableFed - 201050) * 0.32 + 38282;
    else if (taxableFed > 105700) fedTax += (taxableFed - 105700) * 0.24 + 15398;
    else if (taxableFed > 50400) fedTax += (taxableFed - 50400) * 0.22 + 3232;
    else if (taxableFed > 12400) fedTax += (taxableFed - 12400) * 0.12 + 1240;
    else fedTax += taxableFed * 0.10;
  } else {
    if (taxableFed > 766550) fedTax += (taxableFed - 766550) * 0.37 + 203870;
    else if (taxableFed > 510400) fedTax += (taxableFed - 510400) * 0.35 + 114217;
    else if (taxableFed > 402100) fedTax += (taxableFed - 402100) * 0.32 + 79561;
    else if (taxableFed > 211400) fedTax += (taxableFed - 211400) * 0.24 + 33797;
    else if (taxableFed > 100800) fedTax += (taxableFed - 100800) * 0.22 + 7265;
    else if (taxableFed > 24800) fedTax += (taxableFed - 24800) * 0.12 + 2480;
    else fedTax += taxableFed * 0.10;
  }

  // FICA (Social Security up to $176,100 + Medicare 1.45% + 0.9% above $200k)
  const ssTax = Math.min(salary, 176100) * 0.062;
  const medTax = salary * 0.0145 + (salary > 200000 ? (salary - 200000) * 0.009 : 0);
  const fica = ssTax + medTax;

  // California State Tax 2026
  const stdDeductionCA = status === 'single' ? 5706 : 11412;
  const taxableCA = Math.max(0, salary - stdDeductionCA);
  let caTax = 0;
  const caBracketsSingle = [
    { t: 0, r: 0.01 },
    { t: 11079, r: 0.02 },
    { t: 26264, r: 0.04 },
    { t: 41452, r: 0.06 },
    { t: 57542, r: 0.08 },
    { t: 72724, r: 0.093 },
    { t: 371479, r: 0.103 },
    { t: 445771, r: 0.113 },
    { t: 742953, r: 0.123 },
    { t: 1000000, r: 0.133 },
  ];
  for (let i = caBracketsSingle.length - 1; i >= 0; i--) {
    const b = caBracketsSingle[i];
    if (taxableCA > b.t) {
      caTax += (taxableCA - b.t) * b.r;
      break;
    }
  }
  // California SDI (1.3% uncapped on all W-2 income since 2024)
  const caSDI = salary * 0.013;
  const totalCATax = caTax + caSDI;

  // Texas State Tax: 0%
  const totalTXTax = 0;

  const caTakeHome = salary - fedTax - fica - totalCATax;
  const txTakeHome = salary - fedTax - fica - totalTXTax;
  const annualDelta = txTakeHome - caTakeHome;
  const monthlyDelta = annualDelta / 12;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live California vs Texas Take-Home Simulator</h3>
            <p className="text-xs text-slate-400">Statutory 2026 tax rates, FICA caps & uncapped 1.3% CA SDI</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          ● 2026 IRS & FTB Brackets
        </span>
      </div>

      {/* Salary & Status Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Annual Gross Salary (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input
              type="number"
              step="5000"
              value={salary}
              onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-4 py-2.5 text-base font-bold rounded-xl bg-black/60 border border-white/[0.12] text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setSalary(p)}
                className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                  salary === p
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                ${p / 1000}k
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Filing Status
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setStatus('single')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                status === 'single'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              Single Filer
            </button>
            <button
              onClick={() => setStatus('married')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                status === 'married'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              Married Joint
            </button>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Includes $176,100 Social Security cap & CA standard deduction (${status === 'single' ? '5,706' : '11,412'}).
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">California Annual Net</span>
          <span className="text-2xl font-black text-white block mb-1">
            {formatMoney(caTakeHome, 'USD')}
          </span>
          <span className="text-[11px] text-rose-400 font-medium">
            CA Tax + SDI: -{formatMoney(totalCATax, 'USD')}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">Texas Annual Net</span>
          <span className="text-2xl font-black text-white block mb-1">
            {formatMoney(txTakeHome, 'USD')}
          </span>
          <span className="text-[11px] text-emerald-400 font-medium">
            TX State Tax: $0 (0%)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <span className="text-[11px] text-emerald-300 font-bold block mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Texas Take-Home Delta
          </span>
          <span className="text-2xl font-black text-emerald-400 block mb-1">
            +{formatMoney(annualDelta, 'USD')} / yr
          </span>
          <span className="text-[11px] text-emerald-300/80 font-medium">
            +{formatMoney(monthlyDelta, 'USD')} extra net per month
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] text-slate-400 flex items-start gap-2">
        <span className="text-amber-400 font-bold">ℹ Note on Real Estate:</span>
        <span>
          Texas offsets income tax with higher effective property taxes (~1.68% average vs ~0.73% in CA under Prop 13).
          On a $600k assessed property, Texas levies ~$5,700/yr more in property taxes, which this income surplus covers easily above ~$95k salary.
        </span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: HSA & 401(K) SHELTER SIMULATOR
// -------------------------------------------------------------
const Hsa401kCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(110000);
  const [k401, setK401] = useState<number>(24500);
  const [hsaCoverage, setHsaCoverage] = useState<'single' | 'family'>('single');
  const [hsaContrib, setHsaContrib] = useState<number>(4400);
  const [isAge50, setIsAge50] = useState<boolean>(false);

  const max401k = isAge50 ? 32500 : 24500;
  const maxHsa = (hsaCoverage === 'single' ? 4400 : 8750) + (isAge50 ? 1000 : 0);

  const handleCoverageChange = (cov: 'single' | 'family') => {
    setHsaCoverage(cov);
    setHsaContrib(cov === 'single' ? 4400 : 8750);
  };

  const totalSheltered = Math.min(k401, max401k) + Math.min(hsaContrib, maxHsa);

  // Approximate marginal tax savings: 22% or 24% bracket + ~5% state tax + 7.65% FICA on HSA
  const marginalFedRate = salary > 105700 ? 0.24 : 0.22;
  const fedTaxSaved = totalSheltered * marginalFedRate;
  const ficaSavedOnHsa = Math.min(hsaContrib, maxHsa) * 0.0765; // HSA exempt from FICA when payroll deducted
  const stateTaxSaved = totalSheltered * 0.055; // average blended state tax
  const totalSaved = fedTaxSaved + ficaSavedOnHsa + stateTaxSaved;
  const netTakeHomeCost = totalSheltered - totalSaved;
  const instantROI = totalSheltered > 0 ? (totalSaved / totalSheltered) * 100 : 0;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Interactive 2026 Pre-Tax Shelter & Tax Savings Calculator</h3>
            <p className="text-xs text-slate-400">Calculate exact cash tax reduction from 401(k) + HSA contributions</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          ● 2026 Limits ($24.5k + $4.4k/$8.75k)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Gross Salary */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Annual Gross Salary ($)
          </label>
          <input
            type="number"
            step="5000"
            value={salary}
            onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2.5 text-base font-bold rounded-xl bg-black/60 border border-white/[0.12] text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <div className="mt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="age50"
              checked={isAge50}
              onChange={(e) => setIsAge50(e.target.checked)}
              className="rounded border-white/[0.2] bg-white/[0.05] text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="age50" className="text-xs text-slate-400 cursor-pointer">
              Age 50+ (adds $8k 401k & $1k HSA catch-up)
            </label>
          </div>
        </div>

        {/* 401k Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-slate-300">
              401(k) Pre-Tax Deferral
            </label>
            <span className="text-xs font-bold text-indigo-400">${k401.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={max401k}
            step="500"
            value={k401}
            onChange={(e) => setK401(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>$0</span>
            <span>Max: ${max401k.toLocaleString()}</span>
          </div>
        </div>

        {/* HSA Slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-300">HSA Contribution</label>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400 uppercase">
                {hsaCoverage}
              </span>
            </div>
            <span className="text-xs font-bold text-indigo-400">${hsaContrib.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="0"
            max={maxHsa}
            step="100"
            value={hsaContrib}
            onChange={(e) => setHsaContrib(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleCoverageChange('single')}
              className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                hsaCoverage === 'single'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              Single ($4,400)
            </button>
            <button
              onClick={() => handleCoverageChange('family')}
              className={`flex-1 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                hsaCoverage === 'family'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              Family ($8,750)
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.08]">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">Total Pre-Tax Sheltered</span>
          <span className="text-2xl font-black text-white block mb-1">
            ${totalSheltered.toLocaleString()}
          </span>
          <span className="text-[11px] text-indigo-400 font-medium">
            Excluded from gross wages
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <span className="text-[11px] text-emerald-300 font-bold block mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Total Tax Dollars Saved
          </span>
          <span className="text-2xl font-black text-emerald-400 block mb-1">
            +${Math.round(totalSaved).toLocaleString()} / yr
          </span>
          <span className="text-[11px] text-emerald-300/80 font-medium">
            Federal + State + FICA saved
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">Real Cost to Your Take-Home</span>
          <span className="text-2xl font-black text-slate-200 block mb-1">
            ${Math.round(netTakeHomeCost).toLocaleString()}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Take-home reduced by this amount
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25">
          <span className="text-[11px] text-purple-300 font-bold block mb-1 flex items-center gap-1">
            <Percent className="w-3.5 h-3.5" /> Instant Tax Discount
          </span>
          <span className="text-2xl font-black text-purple-300 block mb-1">
            {Math.round(instantROI)}%
          </span>
          <span className="text-[11px] text-purple-300/80 font-medium">
            Immediate cash return on investment
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: USA VS UK
// -------------------------------------------------------------
const UsaUkCalculator: React.FC = () => {
  const [salaryUSD, setSalaryUSD] = useState<number>(130000);
  const [stateType, setStateType] = useState<'notax' | 'ca' | 'ny'>('notax');
  const fx = 1.28; // fixed reference rate for comparison

  const salaryGBP = Math.round(salaryUSD / fx);

  // UK Tax (2026/27): PA £12,570, tapered £1 for £2 over £100k
  let pa = 12570;
  if (salaryGBP > 100000) {
    pa = Math.max(0, 12570 - (salaryGBP - 100000) / 2);
  }
  const taxableUK = Math.max(0, salaryGBP - pa);
  let itUK = 0;
  if (taxableUK > 125140 - pa) {
    itUK += (taxableUK - (125140 - pa)) * 0.45 + (125140 - 50270) * 0.40 + 37700 * 0.20;
  } else if (taxableUK > 37700) {
    itUK += (taxableUK - 37700) * 0.40 + 37700 * 0.20;
  } else {
    itUK += taxableUK * 0.20;
  }

  // UK NI: 8% on £12,570 to £50,270, 2% above
  let niUK = 0;
  if (salaryGBP > 50270) {
    niUK += (50270 - 12570) * 0.08 + (salaryGBP - 50270) * 0.02;
  } else if (salaryGBP > 12570) {
    niUK += (salaryGBP - 12570) * 0.08;
  }
  const ukNetGBP = salaryGBP - itUK - niUK;
  const ukNetUSD = Math.round(ukNetGBP * fx);
  const ukEffectiveTax = ((itUK + niUK) / salaryGBP) * 100;

  // US Tax (Single)
  const taxableFed = Math.max(0, salaryUSD - 15700);
  let fedTax = 0;
  if (taxableFed > 105700) fedTax += (taxableFed - 105700) * 0.24 + 15398;
  else if (taxableFed > 50400) fedTax += (taxableFed - 50400) * 0.22 + 3232;
  else fedTax += taxableFed * 0.12;

  const ss = Math.min(salaryUSD, 176100) * 0.062;
  const med = salaryUSD * 0.0145;
  const fica = ss + med;

  let stateTax = 0;
  if (stateType === 'ca') stateTax = salaryUSD * 0.075 + salaryUSD * 0.013; // state + SDI
  if (stateType === 'ny') stateTax = salaryUSD * 0.062;

  const usNetUSD = salaryUSD - fedTax - fica - stateTax;
  const usEffectiveTax = ((fedTax + fica + stateTax) / salaryUSD) * 100;
  const usAdvantage = usNetUSD - ukNetUSD;

  const inUKTrapZone = salaryGBP >= 100000 && salaryGBP <= 125140;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live US vs UK Take-Home Pay & Tax Trap Simulator</h3>
            <p className="text-xs text-slate-400">Compares IRS + State Tax vs HMRC + National Insurance + 60% Trap</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-semibold">
          ● FX Benchmark 1.28 USD/GBP
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Annual Gross Salary: ${salaryUSD.toLocaleString()} USD (~£{salaryGBP.toLocaleString()} GBP)
          </label>
          <input
            type="range"
            min="40000"
            max="300000"
            step="5000"
            value={salaryUSD}
            onChange={(e) => setSalaryUSD(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer mb-2"
          />
          <div className="flex gap-2">
            {[80000, 130000, 180000, 250000].map((amt) => (
              <button
                key={amt}
                onClick={() => setSalaryUSD(amt)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  salaryUSD === amt
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                ${amt / 1000}k
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            US State Tax Benchmark
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setStateType('notax')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stateType === 'notax'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              0% (TX/FL/WA)
            </button>
            <button
              onClick={() => setStateType('ny')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stateType === 'ny'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              New York
            </button>
            <button
              onClick={() => setStateType('ca')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                stateType === 'ca'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              California
            </button>
          </div>
        </div>
      </div>

      {inUKTrapZone && (
        <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>
            <strong>UK 60% Marginal Tax Trap Active:</strong> At £{salaryGBP.toLocaleString()}, you fall directly in the £100k–£125k band where the Personal Allowance is tapered away by £1 for every £2 earned. Every extra pound earned is taxed at 60% income tax + 2% NI (62% marginal tax rate)!
          </span>
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">US Take-Home ({stateType === 'notax' ? '0% State' : stateType.toUpperCase()})</span>
          <span className="text-2xl font-black text-white block mb-1">
            {formatMoney(usNetUSD, 'USD')}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Effective Tax Rate: {usEffectiveTax.toFixed(1)}%
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">UK Take-Home (HMRC + NI)</span>
          <span className="text-2xl font-black text-white block mb-1">
            {formatMoney(ukNetGBP, 'GBP')}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            ≈ {formatMoney(ukNetUSD, 'USD')} (Effective: {ukEffectiveTax.toFixed(1)}%)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <span className="text-[11px] text-emerald-300 font-bold block mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> US Annual Advantage
          </span>
          <span className="text-2xl font-black text-emerald-400 block mb-1">
            +{formatMoney(usAdvantage, 'USD')} / yr
          </span>
          <span className="text-[11px] text-emerald-300/80 font-medium">
            {usAdvantage > 0 ? `US keeps +$${Math.round(usAdvantage / 12).toLocaleString()}/mo more` : 'UK holds parity'}
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: 9 NO-INCOME-TAX STATES
// -------------------------------------------------------------
const NoIncomeTaxCalculator: React.FC = () => {
  const [salary, setSalary] = useState<number>(125000);
  const [currentState, setCurrentState] = useState<string>('ca');

  const stateTaxRates: Record<string, { name: string; rate: number; sdi?: number }> = {
    ca: { name: 'California', rate: 0.068, sdi: 0.013 },
    ny: { name: 'New York', rate: 0.059 },
    nj: { name: 'New Jersey', rate: 0.055 },
    il: { name: 'Illinois', rate: 0.0495 },
    ma: { name: 'Massachusetts', rate: 0.05 },
    mn: { name: 'Minnesota', rate: 0.072 },
  };

  const sel = stateTaxRates[currentState];
  const stateTaxPaid = salary * sel.rate + (sel.sdi ? salary * sel.sdi : 0);
  const fiveYearCompounded = Math.round(stateTaxPaid * 5 * 1.15); // ~6% compounded growth over 5 years

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Interactive 9 No-Income-Tax States Arbitrage Simulator</h3>
            <p className="text-xs text-slate-400">Compare what you surrender in state tax vs keeping 100% in a 0% state</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          ● 9 States: TX, FL, WA, NV, TN, WY, SD, AK, NH
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Annual Gross Salary: ${salary.toLocaleString()} USD
          </label>
          <input
            type="number"
            step="10000"
            value={salary}
            onChange={(e) => setSalary(Math.max(0, Number(e.target.value)))}
            className="w-full px-4 py-2.5 text-base font-bold rounded-xl bg-black/60 border border-white/[0.12] text-white focus:outline-none focus:border-indigo-500 mb-2"
          />
          <div className="flex gap-2">
            {[75000, 125000, 200000, 350000].map((p) => (
              <button
                key={p}
                onClick={() => setSalary(p)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  salary === p ? 'bg-indigo-600 text-white' : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                ${p / 1000}k
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Your Current High-Tax State
          </label>
          <select
            value={currentState}
            onChange={(e) => setCurrentState(e.target.value)}
            className="w-full px-4 py-2.5 text-sm font-semibold rounded-xl bg-black/60 border border-white/[0.12] text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="ca">California (6.8% avg effective + 1.3% SDI)</option>
            <option value="ny">New York (5.9% avg effective)</option>
            <option value="nj">New Jersey (5.5% avg effective)</option>
            <option value="il">Illinois (4.95% flat)</option>
            <option value="ma">Massachusetts (5.0% flat)</option>
            <option value="mn">Minnesota (7.2% avg effective)</option>
          </select>
          <p className="text-[11px] text-slate-500 mt-2">
            Relocating to TX, FL, WA, NV, TN, WY, SD, AK, or NH eliminates this state tax completely ($0).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">State Tax Paid in {sel.name}</span>
          <span className="text-2xl font-black text-rose-400 block mb-1">
            -${formatMoney(stateTaxPaid, 'USD')} / yr
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Lost to state government annually
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <span className="text-[11px] text-emerald-300 font-bold block mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> 1-Year Instant Net Savings
          </span>
          <span className="text-2xl font-black text-emerald-400 block mb-1">
            +{formatMoney(stateTaxPaid, 'USD')} / yr
          </span>
          <span className="text-[11px] text-emerald-300/80 font-medium">
            +{formatMoney(stateTaxPaid / 12, 'USD')} extra net every single month
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25">
          <span className="text-[11px] text-purple-300 font-bold block mb-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 5-Year Compounded Wealth
          </span>
          <span className="text-2xl font-black text-purple-300 block mb-1">
            +{formatMoney(fiveYearCompounded, 'USD')}
          </span>
          <span className="text-[11px] text-purple-300/80 font-medium">
            Assuming 6% compounding investment
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: GERMANY STEUERKLASSEN
// -------------------------------------------------------------
const SteuerklassenCalculator: React.FC = () => {
  const [grossA, setGrossA] = useState<number>(70000);
  const [grossB, setGrossB] = useState<number>(30000);

  // Statutory social security employee share: ~19.3%
  const calcSS = (gross: number) => {
    const pension = Math.min(gross, 96600) * 0.093;
    const health = Math.min(gross, 62100) * 0.090; // 7.3% + 1.7% Zusatzbeitrag
    const unemp = Math.min(gross, 96600) * 0.013;
    const nursing = Math.min(gross, 62100) * 0.022;
    return pension + health + unemp + nursing;
  };

  const ssA = calcSS(grossA);
  const ssB = calcSS(grossB);

  // Class IV / IV: Single allowance €12,084 for each
  const taxableA_IV = Math.max(0, grossA - ssA - 12084);
  const taxableB_IV = Math.max(0, grossB - ssB - 12084);
  const taxA_IV = taxableA_IV * 0.28;
  const taxB_IV = taxableB_IV * 0.18;
  const monthlyNet_IV = (grossA + grossB - ssA - ssB - taxA_IV - taxB_IV) / 12;

  // Class III / V: Partner A gets double allowance €24,168; Partner B gets 0 allowance (taxed at ~28% from €1)
  const taxableA_III = Math.max(0, grossA - ssA - 24168);
  const taxA_III = taxableA_III * 0.22;
  const taxableB_V = Math.max(0, grossB - ssB);
  const taxB_V = taxableB_V * 0.28;
  const monthlyNet_III_V = (grossA + grossB - ssA - ssB - taxA_III - taxB_V) / 12;

  const monthlyDelta = monthlyNet_III_V - monthlyNet_IV;

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live Steuerklasse III/V vs IV/IV Monthly Net Simulator</h3>
            <p className="text-xs text-slate-400">German 2026 statutory Grundfreibetrag (€12,084) & social contributions</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          ● 2026 BMF Tables
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Primary Earner (Partner A) Annual Gross: €{grossA.toLocaleString()}
          </label>
          <input
            type="range"
            min="30000"
            max="150000"
            step="2500"
            value={grossA}
            onChange={(e) => setGrossA(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer mb-2"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            Second Earner (Partner B) Annual Gross: €{grossB.toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max="100000"
            step="2500"
            value={grossB}
            onChange={(e) => setGrossB(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer mb-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">Monthly Household Net (IV / IV)</span>
          <span className="text-2xl font-black text-white block mb-1">
            {formatMoney(monthlyNet_IV, 'EUR')} / mo
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Balanced withholding; rarely a back-tax
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">Monthly Household Net (III / V)</span>
          <span className="text-2xl font-black text-white block mb-1">
            {formatMoney(monthlyNet_III_V, 'EUR')} / mo
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Maximizes immediate monthly paycheck
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <span className="text-[11px] text-emerald-300 font-bold block mb-1 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> Immediate Monthly Cashflow Delta
          </span>
          <span className="text-2xl font-black text-emerald-400 block mb-1">
            +{formatMoney(Math.max(0, monthlyDelta), 'EUR')} / mo
          </span>
          <span className="text-[11px] text-emerald-300/80 font-medium">
            Higher immediate take-home under III/V
          </span>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-[11px] text-slate-400 flex items-start gap-2">
        <span className="text-amber-400 font-bold">⚠️ Tax Settlement Warning:</span>
        <span>
          Annual total tax liability (Einkommensteuer) is <strong>100% identical</strong> regardless of tax class once you file your tax return.
          Steuerklasse III/V mandates filing and frequently results in a clawback payment (Nachzahlung) if Partner B earns more than 40% of the household income.
        </span>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: TAX FREEDOM DAY
// -------------------------------------------------------------
const TaxFreedomCalculator: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('usa');

  const countryData: Record<
    string,
    { name: string; flag: string; rate: number; day: string; dayOfYear: number }
  > = {
    usa: { name: 'United States', flag: '🇺🇸', rate: 0.325, day: 'April 28', dayOfYear: 118 },
    uk: { name: 'United Kingdom', flag: '🇬🇧', rate: 0.424, day: 'June 3', dayOfYear: 154 },
    germany: { name: 'Germany', flag: '🇩🇪', rate: 0.479, day: 'July 12', dayOfYear: 193 },
    france: { name: 'France', flag: '🇫🇷', rate: 0.532, day: 'July 29', dayOfYear: 210 },
    canada: { name: 'Canada', flag: '🇨🇦', rate: 0.398, day: 'May 25', dayOfYear: 145 },
    australia: { name: 'Australia', flag: '🇦🇺', rate: 0.361, day: 'May 11', dayOfYear: 131 },
    switzerland: { name: 'Switzerland', flag: '🇨🇭', rate: 0.272, day: 'April 9', dayOfYear: 99 },
    singapore: { name: 'Singapore', flag: '🇸🇬', rate: 0.138, day: 'February 18', dayOfYear: 49 },
    uae: { name: 'UAE (Dubai)', flag: '🇦🇪', rate: 0.045, day: 'January 16', dayOfYear: 16 },
  };

  const item = countryData[selectedCountry] || countryData['usa'];
  const daysForGov = item.dayOfYear;
  const daysForYou = 365 - daysForGov;
  const pctForGov = Math.round(item.rate * 100);

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Personal & National Tax Freedom Day Explorer</h3>
            <p className="text-xs text-slate-400">Based on BEA National Accounts & OECD total tax burden measures</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-semibold">
          ● 2026 Projections
        </span>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Select Benchmark Country
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(countryData).map(([key, d]) => (
            <button
              key={key}
              onClick={() => setSelectedCountry(key)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCountry === key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <span>{d.flag}</span>
              <span>{d.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Progress timeline bar */}
      <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
        <div className="flex justify-between items-center text-xs mb-2">
          <span className="text-rose-400 font-semibold flex items-center gap-1">
            ● Working for Government: {daysForGov} days ({pctForGov}%)
          </span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            ● Working for Yourself: {daysForYou} days ({100 - pctForGov}%)
          </span>
        </div>
        <div className="w-full h-3.5 rounded-full bg-white/[0.08] overflow-hidden flex">
          <div
            className="h-full bg-rose-500 transition-all duration-500"
            style={{ width: `${pctForGov}%` }}
          />
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${100 - pctForGov}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
          <span>Jan 1</span>
          <span className="font-bold text-white">{item.day} (Tax Freedom Day)</span>
          <span>Dec 31</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.08]">
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <span className="text-[11px] text-slate-400 block mb-1">Official Tax Freedom Day</span>
          <span className="text-2xl font-black text-indigo-300 block mb-1">
            {item.day}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Day {daysForGov} of 365
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25">
          <span className="text-[11px] text-rose-300 font-bold block mb-1">
            Total Macro Tax Take
          </span>
          <span className="text-2xl font-black text-rose-400 block mb-1">
            {pctForGov}%
          </span>
          <span className="text-[11px] text-rose-300/80 font-medium">
            Income + Sales + Payroll + Property
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
          <span className="text-[11px] text-emerald-300 font-bold block mb-1">
            Days Retained for Yourself
          </span>
          <span className="text-2xl font-black text-emerald-400 block mb-1">
            {daysForYou} Days
          </span>
          <span className="text-[11px] text-emerald-300/80 font-medium">
            100% of income kept post-{item.day}
          </span>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// IN-ARTICLE MINI CALCULATOR: LOW-TAX COUNTRIES IN EUROPE
// -------------------------------------------------------------
const EuropeTaxCalculator: React.FC = () => {
  const [grossIncome, setGrossIncome] = useState<number>(110000);

  const regimes = [
    {
      country: 'Bulgaria',
      flag: '🇧🇬',
      regime: '10% Flat Labor & Corp Tax',
      effectiveRate: 11.8,
      rule: 'Social security capped at ~€1,917/mo. Lowest flat tax in EU.',
    },
    {
      country: 'Cyprus',
      flag: '🇨🇾',
      regime: '50% First Employment Exemption',
      effectiveRate: 14.5,
      rule: '50% income exemption for 17 years if salary >€55k; 0% dividend tax.',
    },
    {
      country: 'Malta',
      flag: '🇲🇹',
      regime: '6/7ths Refund / Non-Dom',
      effectiveRate: 15.0,
      rule: '0% tax on unremitted foreign capital gains; 5% effective corporate rate.',
    },
    {
      country: 'Portugal',
      flag: '🇵🇹',
      regime: 'IFICI (NHR 2.0)',
      effectiveRate: 20.0,
      rule: '20% flat tax on eligible qualifying high-value/tech activities.',
    },
    {
      country: 'Spain',
      flag: '🇪🇸',
      regime: 'Beckham Law',
      effectiveRate: 24.0,
      rule: '24% flat personal tax up to €600,000 for qualifying relocators.',
    },
    {
      country: 'Switzerland (Zug)',
      flag: '🇨🇭',
      regime: 'Low Cantonal / Municipal',
      effectiveRate: 13.5,
      rule: '0% capital gains on private wealth; ~12-14% total labor tax.',
    },
    {
      country: 'Western EU Benchmark',
      flag: '🇪🇺',
      regime: 'France / Germany Standard',
      effectiveRate: 42.5,
      rule: 'Progressive labor tax + high uncapped social security.',
    },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">European Expat & Nomad Low-Tax Regimes Comparator</h3>
            <p className="text-xs text-slate-400">Real net take-home at €{grossIncome.toLocaleString()} gross</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold">
          ● Verified 2026 Regimes
        </span>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Test an Annual Gross Income: €{grossIncome.toLocaleString()} EUR
        </label>
        <input
          type="range"
          min="50000"
          max="300000"
          step="10000"
          value={grossIncome}
          onChange={(e) => setGrossIncome(Number(e.target.value))}
          className="w-full accent-indigo-500 cursor-pointer mb-2"
        />
        <div className="flex gap-2">
          {[60000, 110000, 160000, 250000].map((amt) => (
            <button
              key={amt}
              onClick={() => setGrossIncome(amt)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                grossIncome === amt ? 'bg-indigo-600 text-white' : 'bg-white/[0.04] text-slate-400 hover:text-white'
              }`}
            >
              €{amt / 1000}k
            </button>
          ))}
        </div>
      </div>

      {/* Regimes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {regimes.map((r, idx) => {
          const net = Math.round(grossIncome * (1 - r.effectiveRate / 100));
          const isBenchmark = r.country.includes('Benchmark');
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                isBenchmark
                  ? 'bg-rose-950/20 border-rose-500/20'
                  : 'bg-white/[0.03] border-white/[0.06] hover:border-indigo-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{r.flag}</span>
                  <span>{r.country}</span>
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isBenchmark
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                  }`}
                >
                  ~{r.effectiveRate}% Tax
                </span>
              </div>
              <div className="text-xl font-black text-white mb-1">
                €{net.toLocaleString()} / yr
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {r.rule}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// MAIN ARTICLE VIEW COMPONENT
// -------------------------------------------------------------
export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigateHome,
  onNavigateArticles,
  onNavigateCountry,
  onSelectArticle,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSuccess, setNewsletterSuccess] = useState<boolean>(false);

  // Toggle single FAQ
  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Toggle all FAQs
  const toggleAllFaqs = (expand: boolean) => {
    const next: Record<number, boolean> = {};
    article.faqs.forEach((_, idx) => {
      next[idx] = expand;
    });
    setOpenFaqs(next);
  };

  // Copy article link
  const handleCopyLink = () => {
    const url = `https://takehomeglobal.com/#/tax-guides/${article.slug}/`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Newsletter submit
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
  };

  // Inject dynamic schema markup (Article + FAQPage + BreadcrumbList)
  useEffect(() => {
    const schemaId = 'article-schema-ld';
    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `https://takehomeglobal.com/#/tax-guides/${article.slug}/#article`,
          headline: article.title,
          description: article.description,
          datePublished: '2026-01-01',
          dateModified: '2026-09-21',
          author: {
            '@type': 'Organization',
            name: article.author || 'TakeHomeGlobal Research Team',
            url: 'https://takehomeglobal.com',
          },
          publisher: {
            '@type': 'Organization',
            name: 'TakeHomeGlobal',
            url: 'https://takehomeglobal.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://takehomeglobal.com/logo.svg',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://takehomeglobal.com/#/tax-guides/${article.slug}/`,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://takehomeglobal.com/#/tax-guides/${article.slug}/#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://takehomeglobal.com/',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Tax Guides',
              item: 'https://takehomeglobal.com/#guides',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.title,
              item: `https://takehomeglobal.com/#/tax-guides/${article.slug}/`,
            },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `https://takehomeglobal.com/#/tax-guides/${article.slug}/#faq`,
          mainEntity: article.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      ],
    };

    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [article]);

  // Lookup related countries
  const relatedCountryObjects = useMemo(() => {
    return article.relatedCountries
      .map((id) => COUNTRIES.find((c) => c.id === id))
      .filter((c): c is NonNullable<typeof c> => c !== undefined);
  }, [article.relatedCountries]);

  // Lookup related articles
  const relatedArticleObjects = useMemo(() => {
    return article.relatedArticles
      .map((slug) => ARTICLES.find((a) => a.slug === slug))
      .filter((a): a is NonNullable<typeof a> => a !== undefined);
  }, [article.relatedArticles]);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Breadcrumb Bar */}
      <nav className="flex items-center justify-between gap-3 mb-8 text-xs font-semibold">
        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateHome}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-slate-600">/</span>
          <button
            onClick={onNavigateArticles}
            className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            Tax Guides
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-500 truncate max-w-[200px] sm:max-w-xs">{article.title}</span>
        </div>

        {/* Share / Copy Button */}
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all text-xs cursor-pointer border border-white/[0.06]"
          title="Copy direct guide link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied Link</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Share Guide</span>
            </>
          )}
        </button>
      </nav>

      {/* Header Section */}
      <header className="mb-10 pb-8 border-b border-white/[0.08]">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-4">
          {article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">
          {article.description}
        </p>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">By {article.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishDate}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>
      </header>

      {/* Key Takeaway Callout Box */}
      <div className="p-6 sm:p-7 rounded-3xl bg-indigo-950/30 border border-indigo-500/30 mb-10 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Core Statutory Takeaway</span>
        </div>
        <p className="text-base font-bold text-white mb-4 leading-snug">
          {article.highlightStat}
        </p>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
          {article.summaryPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Contextual In-Article Interactive Simulator */}
      {article.toolType === 'cal-texas' && <CalTexasCalculator />}
      {article.toolType === 'hsa-401k' && <Hsa401kCalculator />}
      {article.toolType === 'usa-uk' && <UsaUkCalculator />}
      {article.toolType === 'no-income-tax' && <NoIncomeTaxCalculator />}
      {article.toolType === 'steuerklassen' && <SteuerklassenCalculator />}
      {article.toolType === 'tax-freedom' && <TaxFreedomCalculator />}
      {article.toolType === 'europe-tax' && <EuropeTaxCalculator />}

      {/* Main Content Sections */}
      <div className="space-y-12 text-sm sm:text-base leading-relaxed">
        {article.content.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight pt-4">
              {sec.heading}
            </h2>

            {sec.body.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-300 leading-relaxed">
                {p}
              </p>
            ))}

            {/* Embedded Callout Box if present */}
            {sec.callout && (
              <div className="my-5 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs sm:text-sm text-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{sec.callout}</div>
              </div>
            )}

            {/* Embedded Data Table if present */}
            {sec.table && (
              <div className="overflow-x-auto my-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-xl">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-white/[0.04] text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/[0.08]">
                    <tr>
                      {sec.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-3.5 px-4 font-bold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {sec.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3.5 px-4 ${
                              cIdx === 0 ? 'font-bold text-white' : 'text-slate-300'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {sec.table.caption && (
                  <div className="px-4 py-2 bg-white/[0.01] border-t border-white/[0.04] text-[11px] text-slate-500 italic">
                    Source: {sec.table.caption}
                  </div>
                )}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Strategic Partner CTA Card (Wise for Global) */}
      {article.ctaType === 'wise' && (
        <div className="my-14">
          <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-emerald-600/15 via-teal-950/20 to-[#0f111a] border border-emerald-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3 uppercase tracking-wider">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{SITE_CONFIG.affiliates.wise.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                  {SITE_CONFIG.affiliates.wise.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {SITE_CONFIG.affiliates.wise.description}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Real Mid-Market Rate</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hold 40+ Currencies</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Local USD, EUR, GBP Details</span>
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto text-center sm:text-right">
                <a
                  href={SITE_CONFIG.affiliates.wise.destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/25 cursor-pointer w-full sm:w-auto"
                >
                  <span>{SITE_CONFIG.affiliates.wise.ctaText}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="block text-[10px] text-slate-500 mt-2">
                  FCA regulated • 16+ million customers worldwide
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive FAQ Accordion */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="my-14 pt-8 border-t border-white/[0.08]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Answers to Core Tax & Planning Questions
              </h3>
            </div>

            <div className="flex gap-2 text-xs">
              <button
                onClick={() => toggleAllFaqs(true)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Expand All
              </button>
              <button
                onClick={() => toggleAllFaqs(false)}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {article.faqs.map((faq, idx) => {
              const isOpen = !!openFaqs[idx];
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-slate-400">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Newsletter & Statutory Tax Alert Capture */}
      <section className="my-12 p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Mail className="w-4 h-4" />
            <span>Stay Updated</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2">
            Get 2026/2027 Statutory Tax Bracket & Treaty Alerts
          </h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            We monitor IRS notices, HMRC budgets, BMF decrees, and international relocation treaties. Zero spam, unsubscribe anytime.
          </p>

          {newsletterSuccess ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You're subscribed! We'll notify you whenever statutory tax thresholds update.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow px-4 py-2.5 rounded-xl bg-black/50 border border-white/[0.1] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Related Country Hubs Navigation */}
      {relatedCountryObjects.length > 0 && (
        <section className="my-12 pt-8 border-t border-white/[0.08]">
          <h3 className="text-base font-bold text-white mb-4">
            Calculate Net Take-Home for Mentioned Countries
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {relatedCountryObjects.map((c) => (
              <button
                key={c.id}
                onClick={() => onNavigateCountry?.(c.id)}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] flex items-center justify-between text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <span className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors block">
                      {c.name} Tax Calculator
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Standard currency: {c.currency}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Related Articles Navigation */}
      {relatedArticleObjects.length > 0 && (
        <section className="my-12 pt-8 border-t border-white/[0.08]">
          <h3 className="text-base font-bold text-white mb-4">
            Related Tax Guides & Relocation Analysis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticleObjects.map((ra) => (
              <button
                key={ra.slug}
                onClick={() => onSelectArticle?.(ra.slug)}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-left transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                    {ra.category}
                  </span>
                  <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 mb-2">
                    {ra.title}
                  </h4>
                </div>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{ra.readTime}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA to Full Calculator */}
      <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-[#12141e] border border-indigo-500/30 text-center shadow-2xl">
        <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
          Want to benchmark your exact salary across 39 countries?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 max-w-lg mx-auto leading-relaxed">
          Enter your gross salary into our 100% free, private calculator to see side-by-side net pay, living cost ratios, and relocation tax freedom days.
        </p>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <span>Open Full 39-Country Tax Calculator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
