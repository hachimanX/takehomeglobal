import React from 'react';
import type { CountryCalculationResult } from '../types';
import { formatMoney } from '../engine/calculator';
import { TrendingUp, Zap, PiggyBank, ShoppingCart } from 'lucide-react';

interface ArbitrageCardProps {
  results: CountryCalculationResult[];
  baseCurrency: string;
}

export const ArbitrageCard: React.FC<ArbitrageCardProps> = ({ results, baseCurrency }) => {
  if (results.length < 2) return null;

  // Sort by net take-home USD (highest to lowest)
  const sorted = [...results].sort((a, b) => b.netUSD - a.netUSD);
  const bestCountry = sorted[0];
  const worstCountry = sorted[sorted.length - 1];

  const annualSavings = Math.max(0, bestCountry.netUSD - worstCountry.netUSD);
  const tenYearSavings = annualSavings * 10;
  const purchasingPowerDiff = bestCountry.realPurchasingPowerUSD - worstCountry.realPurchasingPowerUSD;


  if (annualSavings <= 100) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-950/30 to-[#12141e] border border-indigo-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Tax Arbitrage & Relocation Savings</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Moving from {worstCountry.country.name} to {bestCountry.country.name}
            </h3>

            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              By relocating, you retain an extra{' '}
              <span className="text-emerald-400 font-bold">
                {formatMoney(annualSavings, baseCurrency)} per year
              </span>{' '}
              in take-home earnings due to favorable income tax and social contribution policies.
            </p>
          </div>

          {/* KPI Stats Pill Tray */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 w-full lg:w-auto">
            {/* 1-Year Delta */}
            <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[170px]">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
                <span>Annual Savings</span>
              </div>
              <div className="text-2xl font-black text-emerald-400">
                +{formatMoney(annualSavings, baseCurrency)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                +{((annualSavings / (worstCountry.netUSD || 1)) * 100).toFixed(0)}% more take-home
              </div>
            </div>

            {/* 10-Year Delta */}
            <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[170px]">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                <span>10-Year Wealth Gain</span>
              </div>
              <div className="text-2xl font-black text-purple-300">
                +{formatMoney(tenYearSavings, baseCurrency)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Without compounding / investing
              </div>
            </div>

            {/* Real Spending Power Delta */}
            <div className="flex-1 sm:flex-initial p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] min-w-[170px]">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
                <span>Real Spending Delta</span>
              </div>
              <div className="text-2xl font-black text-cyan-300">
                {purchasingPowerDiff >= 0 ? '+' : ''}{formatMoney(purchasingPowerDiff, baseCurrency)}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                After local living expenses
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
