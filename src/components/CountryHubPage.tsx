import React, { useState } from 'react';
import type { CountryInfo } from '../types';
import { calculateCountryTax, formatMoney, dayOfYearToDate } from '../engine/calculator';
import { COUNTRIES } from '../data/taxData';
import { DonutChart } from './DonutChart';
import { ExternalLink, Calendar, ShoppingCart, UserCheck, ArrowRight } from 'lucide-react';

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
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
      >
        <span>← Back to Global Comparison Tool</span>
      </button>

      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/[0.08] mb-8">
        <div className="flex items-center gap-4">
          <span className="text-5xl p-2 rounded-3xl bg-white/[0.04] border border-white/[0.08]">
            {country.flag}
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {country.name} Tax Calculator
              </h1>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      {/* Main Calculation Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Left 2 Cols: Controls & KPI */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input Box */}
          <div className="p-6 rounded-3xl bg-[#12141e]/90 border border-white/[0.1] shadow-xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Annual Gross Salary ({country.currency})
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="5000"
                    value={localIncome || ''}
                    onChange={(e) => setLocalIncome(Number(e.target.value))}
                    className="w-full sm:w-64 h-12 bg-white/[0.05] border border-white/[0.1] focus:border-indigo-500 rounded-xl px-4 text-xl font-bold text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Subregion dropdown if applicable */}
              {country.subRegions && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">
                    Select {country.subRegionLabel || 'State/Province'}
                  </label>
                  <select
                    value={selectedSubRegion}
                    onChange={(e) => setSelectedSubRegion(e.target.value)}
                    className="h-12 bg-[#181b2a] border border-white/[0.1] rounded-xl px-3 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {Object.keys(country.subRegions).map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/[0.06]">
              <span className="text-xs text-slate-400 mr-1 self-center">Presets:</span>
              {[30000, 60000, 90000, 120000, 200000].map((val) => (
                <button
                  key={val}
                  onClick={() => setLocalIncome(val)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    localIncome === val
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                  }`}
                >
                  {formatMoney(val, country.currency, 0)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Monthly Take-Home
              </div>
              <div className="text-3xl font-black text-emerald-400">
                {formatMoney(result.monthlyNetLocal, country.currency)}
                <span className="text-xs font-normal text-slate-400 ml-1">/mo</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Annual Net: {formatMoney(result.netLocal, country.currency)}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Effective Total Tax Rate
              </div>
              <div className="text-3xl font-black text-white">
                {result.effectiveTaxRate.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Top Marginal Bracket: {result.marginalTaxRate.toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Itemized Tax Breakdown Table */}
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6">
            <h3 className="font-bold text-base text-white mb-4">Itemized Tax & Contribution Schedule</h3>
            <div className="space-y-2.5 text-xs">
              {result.breakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-white/[0.04]">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-300 font-medium">{item.label}</span>
                  </span>
                  <span className="font-mono font-bold text-white">
                    {formatMoney(item.amountLocal, country.currency)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 font-bold text-sm text-emerald-400">
                <span>Total Net Take-Home</span>
                <span>{formatMoney(result.netLocal, country.currency)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Chart & Living Costs */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] flex flex-col items-center text-center">
            <h3 className="text-sm font-bold text-white mb-4">Visual Paycheck Allocation</h3>
            <div className="py-2">
              <DonutChart items={result.breakdown} />
            </div>
            <div className="text-xs text-slate-400 mt-3">
              You keep <strong className="text-emerald-400">{(100 - result.effectiveTaxRate).toFixed(1)}%</strong> of your gross salary
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
              Estimated disposable spending money in {country.name} after deducting ~${country.costOfLivingAnnualUSD.toLocaleString()}/yr in average essential city living expenses (Numbeo benchmark).
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

          {/* Expert Listing Placeholder / Monetization Unit */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-dashed border-white/[0.12] text-center">
            <UserCheck className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-white mb-1">Are you a {country.name} Tax Advisor?</div>
            <p className="text-[11px] text-slate-400 mb-3">
              Reach thousands of expats, nomads, and high earners calculating taxes in {country.name}.
            </p>
            <a
              href="#contact"
              onClick={onNavigateHome}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Claim this partner spot →
            </a>
          </div>
        </div>
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
          {['usa', 'uk', 'germany', 'switzerland', 'uae', 'singapore', 'portugal', 'spain']
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
