import React, { useState } from 'react';
import type { CountryInfo } from '../types';
import { calculateCountryTax, formatMoney, dayOfYearToDate } from '../engine/calculator';
import { COUNTRIES } from '../data/taxData';
import { DonutChart } from './DonutChart';
import { ExternalLink, Calendar, ShoppingCart, ArrowRight, BookOpen, ShieldCheck, Scale } from 'lucide-react';

interface CountryHubPageProps {
  country: CountryInfo;
  exchangeRates: Record<string, number>;
  baseCurrency: string;
  onNavigateHome: () => void;
  onSelectCountryToCompare: (id: string) => void;
}

export const CountryHubPage: React.FC<CountryHubPageProps> = ({
  country,
  exchangeRates,
  baseCurrency,
  onNavigateHome,
  onSelectCountryToCompare,
}) => {
  const [localIncome, setLocalIncome] = useState<number>(75000);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>(
    country.subRegions ? Object.keys(country.subRegions)[0] : ''
  );

  // Compute calculation
  const result = calculateCountryTax(
    country,
    localIncome,
    country.currency,
    exchangeRates,
    selectedSubRegion || undefined
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back button */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors cursor-pointer"
      >
        <span>← Back to Global Comparison Tool</span>
      </button>

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl p-3 rounded-3xl bg-white/[0.04] border border-white/[0.08] shadow-inner">
            {country.flag}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {country.name} Tax Calculator
              </h1>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Official statutory brackets, social contributions, and take-home pay estimator ({country.currency}).
            </p>
          </div>
        </div>

        {country.officialSource && (
          <a
            href={country.officialSource}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-all whitespace-nowrap"
          >
            <span>Official Tax Source</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        )}
      </div>

      {/* Calculator Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Left Col: Interactive Inputs & Result Numbers */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-indigo-400" />
              <span>Calculate Your {country.name} Take-Home Pay</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Annual Gross Salary ({country.currency})
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={localIncome || ''}
                  onChange={(e) => setLocalIncome(Number(e.target.value))}
                  className="w-full px-4 py-3 text-2xl font-black rounded-2xl bg-black/40 border border-white/[0.1] text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="75000"
                />
              </div>

              {/* Slider for intuitive control */}
              <input
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={localIncome || 10000}
                onChange={(e) => setLocalIncome(Number(e.target.value))}
                className="w-full mt-3 accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Sub-region selector if applicable (e.g. US State, Canadian Province) */}
            {country.subRegions && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select {country.subRegionLabel || 'Region'}
                </label>
                <select
                  value={selectedSubRegion}
                  onChange={(e) => setSelectedSubRegion(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-semibold rounded-2xl bg-black/40 border border-white/[0.1] text-indigo-300 focus:border-indigo-500 focus:outline-none"
                >
                  {Object.keys(country.subRegions).map((sub) => (
                    <option key={sub} value={sub} className="bg-[#12141e] text-white">
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Itemized Calculation Summary */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {country.name} Tax & Deduction Breakdown
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-slate-400">Gross Salary:</span>
                <span className="font-bold text-white">{formatMoney(result.grossLocal, country.currency)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                <span className="text-slate-400">National Income Tax:</span>
                <span className="font-semibold text-rose-300">
                  -{formatMoney(result.incomeTaxLocal, country.currency)}
                </span>
              </div>

              {result.stateTaxLocal > 0 && (
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-slate-400">State / Regional Tax ({selectedSubRegion}):</span>
                  <span className="font-semibold text-rose-300">
                    -{formatMoney(result.stateTaxLocal, country.currency)}
                  </span>
                </div>
              )}

              {result.socialContributionsLocal > 0 && (
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-slate-400">Social Security / Mandatory Contributions:</span>
                  <span className="font-semibold text-rose-300">
                    -{formatMoney(result.socialContributionsLocal, country.currency)}
                  </span>
                </div>
              )}

              <div className="flex justify-between py-2 border-b border-white/[0.08] text-sm font-bold">
                <span className="text-white">Annual Net Take-Home:</span>
                <span className="text-emerald-400">{formatMoney(result.netLocal, country.currency)}</span>
              </div>

              <div className="flex justify-between py-2 text-base font-extrabold">
                <span className="text-white">Monthly Take-Home Pay:</span>
                <span className="text-emerald-400">{formatMoney(result.monthlyNetLocal, country.currency)} / mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Donut Visualization & KPIs */}
        <div className="lg:col-span-5 space-y-6">
          {/* Donut Card */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] text-center">
            <div className="text-3xl font-black text-white mb-1">
              {result.effectiveTaxRate.toFixed(1)}%
            </div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-4">
              Effective Tax & Contribution Rate
            </div>
            <div className="flex justify-center py-2">
              <DonutChart result={result} baseCurrency={country.currency} />
            </div>
            <div className="text-xs text-slate-400 mt-3">
              You retain <strong className="text-emerald-400">{(100 - result.effectiveTaxRate).toFixed(1)}%</strong> of your gross income
            </div>
          </div>

          {/* Real Purchasing Power Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/20">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase mb-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Real Purchasing Power</span>
            </div>
            <div className="text-2xl font-black text-white mb-1">
              ${Math.round(result.realPurchasingPowerUSD).toLocaleString()} / yr
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Estimated disposable income in {country.name} after deducting ~${country.costOfLivingAnnualUSD.toLocaleString()}/yr in average essential city living expenses (Numbeo benchmark).
            </p>
          </div>

          {/* Tax Freedom Day */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase mb-2">
              <Calendar className="w-4 h-4" />
              <span>Tax Freedom Day</span>
            </div>
            <div className="text-2xl font-black text-purple-300 mb-1">
              {dayOfYearToDate(result.taxFreedomDay)}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              On day {result.taxFreedomDay} of 365, you have earned enough to satisfy all annual tax and social obligations in {country.name}.
            </p>
          </div>
        </div>
      </div>

      {/* Rich Educational & SEO Content Section (Prevents Thin Content) */}
      <div className="border-t border-white/[0.08] pt-12 mt-12 space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Tax Guide</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            How Taxation Works in {country.name} (2026 Guide)
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {country.overviewText ||
              `${country.name} utilizes a statutory progressive tax structure where higher tiers of taxable income are subject to increasing marginal tax rates. Both domestic residents and foreign professionals residing in ${country.name} are subject to national tax laws, social security obligations, and applicable regional levies.`}
          </p>
        </div>

        {/* 2026 Statutory Tax Brackets Table */}
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08]">
          <h3 className="text-base font-bold text-white mb-3">
            {country.name} 2026 Statutory Tax Brackets & Slabs
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] text-[11px] uppercase font-bold text-slate-400">
                <tr>
                  <th className="py-2.5 px-3">Taxable Income Band ({country.currency})</th>
                  <th className="py-2.5 px-3">Marginal Tax Rate</th>
                  <th className="py-2.5 px-3">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {country.federalBrackets.map((bracket, i) => {
                  const nextBracket = country.federalBrackets[i + 1];
                  const bandLabel = nextBracket
                    ? `${formatMoney(bracket.threshold, country.currency)} to ${formatMoney(nextBracket.threshold, country.currency)}`
                    : `Over ${formatMoney(bracket.threshold, country.currency)}`;
                  return (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="py-2.5 px-3 font-mono text-slate-200">{bandLabel}</td>
                      <td className="py-2.5 px-3 font-bold text-indigo-300">
                        {(bracket.rate * 100).toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">
                        {bracket.rate === 0
                          ? 'Zero-Tax Slab / Exemption'
                          : bracket.rate <= 0.2
                          ? 'Standard Rate'
                          : 'Upper Tier Rate'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two-Column Explanatory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Residency Rules */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Tax Residency & The 183-Day Rule</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {country.residencyRuleText ||
                `In ${country.name}, tax residency is typically established if you reside physically in the country for 183 days or more during any consecutive 12-month period or calendar tax year. Tax residents are generally taxed on their worldwide income, whereas non-residents are only taxed on domestic source earnings.`}
            </p>
          </div>

          {/* Deductions & Allowances */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-400" />
              <span>Standard Deductions & Allowances</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {country.deductionsText ||
                `Taxpayers in ${country.name} benefit from statutory deductions, personal allowances, and social insurance contribution offsets before computing taxable income. Additional allowances may apply for dependents, healthcare expenses, and qualified retirement contributions.`}
            </p>
          </div>
        </div>

        {/* Expat Incentives */}
        {country.expatIncentivesText && (
          <div className="p-6 rounded-3xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🌟 Expat & Remote Worker Tax Policies</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {country.expatIncentivesText}
            </p>
          </div>
        )}
      </div>

      {/* Compare with Other Top Destinations */}
      <div className="mt-16 pt-8 border-t border-white/[0.08]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Compare {country.name} with Other Top Destinations</h3>
            <p className="text-xs text-slate-400">
              Launch instant side-by-side tax comparisons calibrated in {baseCurrency}:
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['usa', 'uk', 'germany', 'switzerland', 'uae', 'singapore', 'portugal', 'spain', 'pakistan', 'japan', 'china']
            .filter((id) => id !== country.id)
            .slice(0, 4)
            .map((id) => {
              const targetCountry = COUNTRIES.find((c) => c.id === id);
              if (!targetCountry) return null;
              return (
                <button
                  key={id}
                  onClick={() => onSelectCountryToCompare(id)}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-indigo-500/40 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{targetCountry.flag}</span>
                    <span className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {targetCountry.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};
