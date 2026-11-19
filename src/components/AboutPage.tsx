import React from 'react';
import { ShieldCheck, Database, Lock, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '../config';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigate?: (view: string, param?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back button */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors cursor-pointer"
      >
        <span>← Back to Calculator</span>
      </button>

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Independent & Transparent</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          About {SITE_CONFIG.brandName}
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          A reference-grade global take-home pay and tax comparison platform designed to provide clarity on international net income, social security obligations, and real purchasing power across 35+ economies and all 50 US states.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Database className="w-6 h-6 text-indigo-400 mb-3" />
          <h2 className="text-base font-bold text-white mb-1.5">References, not a filing source</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Brackets are estimates for a simplified case. Where a country note names a public page, that page was used as a reference. Not every figure is an official extract.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Lock className="w-6 h-6 text-emerald-400 mb-3" />
          <h2 className="text-base font-bold text-white mb-1.5">Zero Data Storage</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Salary figures are calculated in this browser. There is no account. The calculator does not post your salary to a {SITE_CONFIG.brandName} server. An income figure can still appear in the page address.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <CheckCircle2 className="w-6 h-6 text-purple-400 mb-3" />
          <h2 className="text-base font-bold text-white mb-1.5">Live Forex Calibration</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Foreign exchange conversion rates synchronize daily with the European Central Bank (ECB) via the public Frankfurter feed.
          </p>
        </div>
      </div>

      {/* Methodology Narrative */}
      <div className="space-y-6 text-xs sm:text-sm leading-relaxed mb-12 bg-white/[0.02] p-8 rounded-3xl border border-white/[0.06]">
        <h2 className="text-xl font-bold text-white">Calculation Methodology</h2>
        <p>
          Unlike simple marginal bracket tables that calculate isolated tax percentages, {SITE_CONFIG.brandName} models the true sequential tax waterfall experienced by salaried individuals and contractors:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-slate-400">
          <li>
            <strong className="text-slate-200">Gross Baseline Normalization:</strong> Your entered salary is pegged to your chosen base currency and converted to local statutory units using live daily ECB reference rates.
          </li>
          <li>
            <strong className="text-slate-200">Standard Allowances & Slabs:</strong> Modelled allowances (for example a US standard deduction, the UK personal allowance, a German basic allowance, a Pakistan basic slab, and a China wage deduction) are subtracted before the brackets run. The figures in the model can differ from a filed return.
          </li>
          <li>
            <strong className="text-slate-200">Progressive Income Tax Calculation:</strong> Tax is applied incrementally to each income bracket chunk at the statutory marginal percentage.
          </li>
          <li>
            <strong className="text-slate-200">Mandatory Social Insurance Deductions:</strong> Where the model includes them, employee pension, health, and unemployment contributions (for example US FICA and Medicare, UK National Insurance, German social insurance, and Pakistan EOBI) use the caps stored for that country. Some of those lines are estimates.
          </li>
          <li>
            <strong className="text-slate-200">Sub-National Regional Levies:</strong> Where selected, US state income taxes across all 50 states, Canadian provincial taxes, and Japanese local inhabitant taxes are calculated in tandem.
          </li>
          <li>
            <strong className="text-slate-200">Real Purchasing Power Estimator:</strong> Benchmarked cost-of-living indices (Numbeo city averages for single persons excluding rent) are deducted from annual net pay to reveal true disposable spending power.
          </li>
        </ol>
      </div>

      <div id="affiliate-disclosure" className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-xs leading-relaxed space-y-3 mb-8">
        <h2 className="text-xl font-bold text-white">Affiliate disclosure</h2>
        <p className="text-slate-300">{SITE_CONFIG.affiliateDisclosure}</p>
        <p className="text-slate-400">
          The Wise link is an invite link. It is marked sponsored and nofollow. The sentence above is the configured disclosure. It has not had a separate legal review.
        </p>
        <p>
          <a
            href="/privacy/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate?.('privacy');
            }}
            className="text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Privacy draft
          </a>
        </p>
      </div>

      {/* Educational & Legal Disclaimer */}
      <div id="disclaimer" className="p-6 rounded-3xl bg-amber-500/5 border border-amber-500/20 text-xs leading-relaxed space-y-2">
        <h2 className="font-bold text-amber-300 text-sm">Educational notice</h2>
        <p className="text-slate-300">
          {SITE_CONFIG.legalDisclaimer}
        </p>
        <p className="text-slate-400">
          Individual situations involve deductions, treaty benefits, foreign earned income exclusions, marital statuses, and local credits that require personalized guidance from a certified public accountant (CPA), chartered tax advisor (CTA), or enrolled agent.
        </p>
      </div>
    </div>
  );
};
