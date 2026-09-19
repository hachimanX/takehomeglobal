import React from 'react';
import type { CountryCalculationResult } from '../types';
import { formatMoney } from '../engine/calculator';
import { Zap, PiggyBank, ShoppingCart, ArrowRight } from 'lucide-react';

interface ArbitrageCardProps {
  results: CountryCalculationResult[];
  baseCurrency: string;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({ results, baseCurrency }) => {
  // Only show when 2 or more countries are actively being compared
  if (results.length < 2) return null;

  // The primary country is the first one selected by the user
  const primary = results[0];
  // Other countries being compared
  const others = results.slice(1);

  // Find the other country that yields the highest net take-home pay
  const bestOther = [...others].sort((a, b) => b.netUSD - a.netUSD)[0];

  const netDiff = bestOther.netUSD - primary.netUSD;
  const isGain = netDiff > 0;
  const annualSavings = Math.abs(netDiff);
  const tenYearSavings = annualSavings * 10;
  const purchasingPowerDiff = bestOther.realPurchasingPowerUSD - primary.realPurchasingPowerUSD;

  // If the difference is negligible (< $100), don't show
  if (annualSavings <= 100) return null;

  const origin = isGain ? primary : bestOther;
  const destination = isGain ? bestOther : primary;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-[#12141e] border border-indigo-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Direct Relocation Arbitrage</span>
            </div>

            <div className="flex items-center gap-2.5 text-xl sm:text-2xl font-black text-white tracking-tight">
              <span>{origin.country.flag} {origin.country.name}</span>
              <ArrowRight className="w-5 h-5 text-indigo-400" />
              <span>{destination.country.flag} {destination.country.name}</span>
            </div>

            <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
              By basing your tax residency in{' '}
              <strong className="text-white">{destination.country.name}</strong> instead of{' '}
              <strong className="text-white">{origin.country.name}</strong>, you retain an extra{' '}
              <span className="text-emerald-400 font-bold">
                {formatMoney(annualSavings, baseCurrency)} per year
              </span>{' '}
              in net take-home salary after national taxes and social security contributions.
            </p>
          </div>

          {/* KPI Stats Pill Tray */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full lg:w-auto">
            {/* 1-Year Delta */}
            <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[170px]">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
                <span>Annual Take-Home Gain</span>
              </div>
              <div className="text-2xl font-black text-emerald-400">
                +{formatMoney(annualSavings, baseCurrency)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                +{((annualSavings / origin.netUSD) * 100).toFixed(0)}% more take-home
              </div>
            </div>

            {/* 10-Year Cumulative */}
            <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[170px]">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>10-Year Wealth Gain</span>
              </div>
              <div className="text-2xl font-black text-purple-300">
                +{formatMoney(tenYearSavings, baseCurrency)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Without investment compounding
              </div>
            </div>

            {/* Real Purchasing Power Delta */}
            <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[170px]">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                <span>Real Spending Delta</span>
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {purchasingPowerDiff >= 0 ? '+' : ''}
                {formatMoney(purchasingPowerDiff, baseCurrency)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                After benchmark living expenses
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
