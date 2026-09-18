import React, { useState } from 'react';
import type { CountryCalculationResult } from '../types';
import { formatMoney, dayOfYearToDate } from '../engine/calculator';
import { DonutChart } from './DonutChart';
import { Calendar, ShoppingCart, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ComparisonCardsProps {
  results: CountryCalculationResult[];
  baseCurrency: string;
}

export const ComparisonCards: React.FC<ComparisonCardsProps> = ({ results, baseCurrency }) => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  // Rank countries by lowest effective tax rate
  const sortedByTax = [...results].sort((a, b) => a.effectiveTaxRate - b.effectiveTaxRate);

  const getRankBadge = (countryId: string) => {
    const rank = sortedByTax.findIndex((r) => r.country.id === countryId) + 1;
    if (rank === 1) return { text: '#1 Lowest Tax', medal: '🥇', bg: 'bg-amber-400/10 text-amber-300 border-amber-400/30' };
    if (rank === 2) return { text: '#2 Lowest Tax', medal: '🥈', bg: 'bg-slate-300/10 text-slate-200 border-slate-300/30' };
    if (rank === 3) return { text: '#3 Lowest Tax', medal: '🥉', bg: 'bg-amber-600/10 text-amber-400 border-amber-600/30' };
    return { text: `#${rank}`, medal: '', bg: 'bg-white/[0.05] text-slate-400 border-white/[0.08]' };
  };

  const getPurchasingPowerBadge = (amountUSD: number) => {
    if (amountUSD > 40000) return { label: '🌟 Excellent', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (amountUSD > 25000) return { label: '✨ Good', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
    if (amountUSD > 10000) return { label: '💡 Moderate', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    if (amountUSD > 0) return { label: '⚠️ Limited', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
    return { label: '❌ Deficit', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Detailed Country Breakdown
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Side-by-side comparison ordered by lowest effective tax rate
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((r) => {
          const rank = getRankBadge(r.country.id);
          const powerBadge = getPurchasingPowerBadge(r.realPurchasingPowerUSD);
          const isExpanded = expandedCountry === r.country.id;

          // Percent of gross taken by total tax
          const totalTaxPct = Math.min(100, Math.max(0, r.effectiveTaxRate));
          const netPct = Math.max(0, 100 - totalTaxPct);

          return (
            <div
              key={r.country.id}
              className="glass-card glass-card-hover rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-1 bg-white/[0.04] rounded-2xl border border-white/[0.08]">
                      {r.country.flag}
                    </span>
                    <div>
                      <h3 className="font-bold text-lg text-white leading-tight">
                        {r.country.name}
                      </h3>
                      {r.subRegion && (
                        <p className="text-xs font-semibold text-indigo-400">
                          {r.subRegion}
                        </p>
                      )}
                      <span className="text-[11px] text-slate-400">
                        Gross: {formatMoney(r.grossLocal, r.country.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Rank Badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${rank.bg}`}
                  >
                    <span>{rank.medal}</span>
                    <span>{rank.text}</span>
                  </span>
                </div>

                {/* Main Take-Home Highlight */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Monthly Take-Home Pay
                  </div>
                  <div className="text-3xl font-black text-emerald-400 tracking-tight">
                    {formatMoney(r.monthlyNetUSD, baseCurrency)}
                    <span className="text-xs font-normal text-slate-400 ml-1.5">/mo</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {formatMoney(r.monthlyNetLocal, r.country.currency)}/mo in local currency
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <span className="text-slate-400">Annual Net:</span>
                    <span className="font-bold text-white">
                      {formatMoney(r.netUSD, baseCurrency)}
                    </span>
                  </div>
                </div>

                {/* Visual Chart & KPIs */}
                <div className="flex items-center justify-between gap-4 mb-5 p-3 rounded-2xl bg-white/[0.02]">
                  <DonutChart items={r.breakdown} />

                  <div className="flex-1 space-y-2">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        Effective Tax Rate
                      </div>
                      <div className="text-xl font-bold text-white">
                        {r.effectiveTaxRate.toFixed(1)}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        Marginal Top Bracket
                      </div>
                      <div className="text-sm font-semibold text-slate-300">
                        {r.marginalTaxRate.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar breakdown */}
                <div className="mb-5">
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1.5">
                    <span>Keep {netPct.toFixed(0)}%</span>
                    <span>Taxes {totalTaxPct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/[0.08] rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${netPct}%` }}
                      className="bg-emerald-500 h-full transition-all duration-500"
                      title={`Take Home: ${netPct.toFixed(1)}%`}
                    />
                    <div
                      style={{ width: `${totalTaxPct}%` }}
                      className="bg-indigo-500 h-full transition-all duration-500"
                      title={`Taxes: ${totalTaxPct.toFixed(1)}%`}
                    />
                  </div>
                </div>

                {/* Key Indicators: Purchasing Power & Tax Freedom Day */}
                <div className="space-y-2 mb-4">
                  {/* Real Purchasing Power */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-300">
                          Real Spending Money
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Net Pay minus est. living costs
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-white">
                        {formatMoney(r.realPurchasingPowerUSD, baseCurrency)}
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${powerBadge.color}`}>
                        {powerBadge.label}
                      </span>
                    </div>
                  </div>

                  {/* Tax Freedom Day */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <div>
                        <div className="text-xs font-semibold text-slate-300">
                          Tax Freedom Day
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Day you stop working for taxes
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-purple-300">
                      {dayOfYearToDate(r.taxFreedomDay)}
                      <span className="text-[10px] text-slate-400 block font-normal">
                        (Day {r.taxFreedomDay} of 365)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expandable Band-by-Band Breakdown */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-white/[0.08] space-y-2 animate-fadeIn text-xs">
                    <div className="font-semibold text-slate-300 mb-2">Detailed Deductions:</div>
                    {r.breakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.label}</span>
                        </span>
                        <span className="font-mono font-medium text-slate-200">
                          {formatMoney(item.amountLocal, r.country.currency)}
                        </span>
                      </div>
                    ))}

                    <div className="pt-2 mt-2 border-t border-white/[0.06] text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Source Authority:</span>
                      {r.country.officialSource && (
                        <a
                          href={r.country.officialSource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        >
                          Official Rules <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Details Button */}
              <button
                onClick={() => setExpandedCountry(isExpanded ? null : r.country.id)}
                className="w-full mt-4 py-2 flex items-center justify-center gap-1 text-xs font-semibold text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] rounded-xl transition-all"
              >
                <span>{isExpanded ? 'Hide Detailed Bands' : 'View Itemized Breakdown'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
