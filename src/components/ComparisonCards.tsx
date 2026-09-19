import React, { useState } from 'react';
import type { CountryCalculationResult } from '../types';
import { formatMoney, dayOfYearToDate } from '../engine/calculator';
import { DonutChart } from './DonutChart';
import { Calendar, ShoppingCart, ChevronDown, ChevronUp, ArrowRight, X } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

interface ComparisonCardsProps {
  results: CountryCalculationResult[];
  baseCurrency: string;
  onRemoveCountry?: (id: string) => void;
  onNavigateCountry?: (id: string) => void;
}

export const ComparisonCards: React.FC<ComparisonCardsProps> = ({
  results,
  baseCurrency,
  onRemoveCountry,
  onNavigateCountry,
}) => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  if (results.length === 0) return null;

  // Rank countries by lowest effective tax rate
  const sortedByTax = [...results].sort((a, b) => a.effectiveTaxRate - b.effectiveTaxRate);

  const getRankBadge = (countryId: string) => {
    const rank = sortedByTax.findIndex((r) => r.country.id === countryId) + 1;
    if (rank === 1)
      return { text: '#1 Lowest Tax', medal: '🥇', bg: 'bg-amber-400/10 text-amber-300 border-amber-400/30' };
    if (rank === 2)
      return { text: '#2 Lowest Tax', medal: '🥈', bg: 'bg-slate-300/10 text-slate-200 border-slate-300/30' };
    if (rank === 3)
      return { text: '#3 Lowest Tax', medal: '🥉', bg: 'bg-amber-600/10 text-amber-400 border-amber-600/30' };
    return { text: `#${rank}`, medal: '', bg: 'bg-white/[0.05] text-slate-400 border-white/[0.08]' };
  };

  const getPurchasingPowerBadge = (amountUSD: number) => {
    if (amountUSD > 40000)
      return { label: '🌟 Excellent', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
    if (amountUSD > 25000)
      return { label: '✨ Good', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' };
    if (amountUSD > 10000)
      return { label: '💡 Moderate', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    if (amountUSD > 0)
      return { label: '⚠️ Limited', color: 'text-orange-400 bg-orange-500/10 border-orange-500/20' };
    return { label: '❌ Deficit', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
  };

  return (
    <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            {results.length === 1 ? 'Tax & Take-Home Calculation' : 'Detailed Side-by-Side Breakdown'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {results.length === 1
              ? 'Itemized deductions, social security, and net take-home salary'
              : 'Ranked from lowest effective tax rate to highest'}
          </p>
        </div>
      </div>

      {/* Grid: 1 large card if 1 country, or 2-3 columns if multiple countries */}
      <div
        className={`grid gap-6 ${
          results.length === 1
            ? 'grid-cols-1 max-w-2xl mx-auto'
            : results.length === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
      >
        {results.map((r) => {
          const rank = getRankBadge(r.country.id);
          const powerBadge = getPurchasingPowerBadge(r.realPurchasingPowerUSD);
          const isExpanded = expandedCountry === r.country.id;

          return (
            <div
              key={r.country.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-white/[0.12] bg-[#0f111a]/95"
            >
              {/* Top Row: Rank, Flag, Name, Close */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
                      <CountryFlag code={r.country.code} name={r.country.name} size="lg" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-lg text-white">{r.country.name}</h3>
                        {results.length > 1 && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${rank.bg}`}
                          >
                            {rank.medal} {rank.text}
                          </span>
                        )}
                      </div>
                      {r.subRegion && (
                        <span className="text-xs text-indigo-400 font-semibold">
                          {r.subRegion}
                        </span>
                      )}
                    </div>
                  </div>

                  {results.length > 1 && onRemoveCountry && (
                    <button
                      onClick={() => onRemoveCountry(r.country.id)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Remove country"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Big Effective Rate Display (Matching Competitor) */}
                <div className="my-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
                    {r.effectiveTaxRate.toFixed(1)}%
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    Effective Tax & Contribution Rate
                  </div>
                </div>

                {/* Donut Chart */}
                <div className="my-4 py-2 flex justify-center">
                  <DonutChart result={r} baseCurrency={baseCurrency} />
                </div>

                {/* Take-Home Pay Highlights */}
                <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      Monthly Take-Home
                    </div>
                    <div className="text-lg sm:text-xl font-black text-emerald-400">
                      {formatMoney(r.monthlyNetLocal, r.country.currency)}
                    </div>
                    {r.country.currency !== baseCurrency && (
                      <div className="text-[11px] text-slate-400 font-medium">
                        ≈ {formatMoney(r.monthlyNetUSD, baseCurrency)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                      Annual Net Pay
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white">
                      {formatMoney(r.netLocal, r.country.currency)}
                    </div>
                    {r.country.currency !== baseCurrency && (
                      <div className="text-[11px] text-slate-400 font-medium">
                        ≈ {formatMoney(r.netUSD, baseCurrency)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Itemized Table (Matching Competitor Format) */}
                <div className="space-y-2 text-xs border-t border-white/[0.08] pt-4 mb-4">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span className="text-slate-400">National Income Tax:</span>
                    <span className="font-semibold text-white">
                      {formatMoney(r.incomeTaxLocal, r.country.currency)}{' '}
                      <span className="text-slate-400 text-[11px]">
                        ({((r.incomeTaxLocal / (r.grossLocal || 1)) * 100).toFixed(1)}%)
                      </span>
                    </span>
                  </div>

                  {r.stateTaxLocal > 0 && (
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">State / Local Tax:</span>
                      <span className="font-semibold text-white">
                        {formatMoney(r.stateTaxLocal, r.country.currency)}{' '}
                        <span className="text-slate-400 text-[11px]">
                          ({((r.stateTaxLocal / (r.grossLocal || 1)) * 100).toFixed(1)}%)
                        </span>
                      </span>
                    </div>
                  )}

                  {r.socialContributionsLocal > 0 && (
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span className="text-slate-400">Social Security / NI:</span>
                      <span className="font-semibold text-white">
                        {formatMoney(r.socialContributionsLocal, r.country.currency)}{' '}
                        <span className="text-slate-400 text-[11px]">
                          ({((r.socialContributionsLocal / (r.grossLocal || 1)) * 100).toFixed(1)}%)
                        </span>
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-1.5 font-bold text-white border-b border-white/[0.08]">
                    <span>Total Tax & Social Deductions:</span>
                    <span className="text-rose-400">
                      {formatMoney(r.totalTaxLocal, r.country.currency)}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 font-bold text-emerald-400">
                    <span>Net Annual Take-Home:</span>
                    <span>{formatMoney(r.netLocal, r.country.currency)}</span>
                  </div>
                </div>

                {/* Collapsible Detailed Tax Slabs / Deductions */}
                <div className="pt-1">
                  <button
                    onClick={() => setExpandedCountry(isExpanded ? null : r.country.id)}
                    className="w-full flex items-center justify-between py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Hide Slabs & Allowances' : 'View Statutory Slabs & Surtaxes'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2 text-[11px] animate-in fade-in duration-200">
                      <div className="text-slate-400 font-semibold mb-1">Deduction Schedule:</div>
                      {r.breakdown.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-slate-300">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            <span>{item.label}</span>
                          </span>
                          <span className="font-mono">{formatMoney(item.amountLocal, r.country.currency)}</span>
                        </div>
                      ))}
                      {r.country.notes && (
                        <div className="text-[10px] text-slate-400 pt-2 border-t border-white/[0.06] leading-relaxed">
                          {r.country.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Extra Insights: Living Cost & Tax Freedom Day */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Real Spending Power:</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${powerBadge.color}`}>
                    ${Math.round(r.realPurchasingPowerUSD).toLocaleString()} / yr
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>Tax Freedom Day:</span>
                  </div>
                  <span className="text-purple-300 font-bold">
                    {dayOfYearToDate(r.taxFreedomDay)} (Day {r.taxFreedomDay})
                  </span>
                </div>

                {/* Country Hub Deep Link */}
                {onNavigateCountry && (
                  <button
                    onClick={() => onNavigateCountry(r.country.id)}
                    className="w-full mt-2 py-2.5 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Explore Full {r.country.name} Tax Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
