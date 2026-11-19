import React from 'react';
import { Megaphone, Sparkles, Target, ShieldCheck } from 'lucide-react';

interface AdvertisePageProps {
  onNavigateHome: () => void;
}

export const AdvertisePage: React.FC<AdvertisePageProps> = ({ onNavigateHome }) => {

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back link */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors cursor-pointer"
      >
        <span>← Back to Calculator</span>
      </button>

      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Megaphone className="w-3.5 h-3.5" />
          <span>Early Partner & Sponsorship Opportunities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Reach High-Intent Global Earners, Expats & Founders
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Position your fintech app, international banking solution, expat health insurance, or corporate formation service in front of people actively planning cross-border moves.
        </p>
      </div>

      {/* Qualitative Value Grid (Honest, authentic, zero inflated fake numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Target className="w-6 h-6 text-indigo-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Laser-Targeted Intent</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every user is actively evaluating take-home salary, cross-border tax deltas, or corporate restructuring. Zero passive or low-quality traffic.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Sparkles className="w-6 h-6 text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Founding Partner Rates</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Lock in long-term foundational sponsorship rates across country hubs, comparison pages, and high-ranking SEO guides.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <ShieldCheck className="w-6 h-6 text-purple-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Clean, Uncluttered UX</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We do not run spammy ad networks or interstitial popups. Partners receive native, beautifully integrated cards that respect user trust.
          </p>
        </div>
      </div>

      {/* Available Ad Placements Spec */}
      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] mb-12 space-y-6">
        <h2 className="text-xl font-bold text-white">Available Sponsorship Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase text-amber-400">Placement A</span>
            <div className="text-sm font-bold text-white">Country Hub Exclusive Banner</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Claim the exclusive partner spot for a specific country (e.g. "Exclusive UAE Banking Partner" or "Official Portugal NHR Advisory").
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase text-indigo-400">Placement B</span>
            <div className="text-sm font-bold text-white">In-Article Contextual Cards</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native embedded recommendation box inside top-ranking relocation articles (e.g. California vs Texas, European Tax Havens).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400">Placement C</span>
            <div className="text-sm font-bold text-white">Homepage Trusted Partner Card</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Featured on the homepage in the curated "Recommended International Solutions" section alongside trusted global platforms like Wise.
            </p>
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl border border-amber-500/30 bg-amber-500/5" role="status">
        <h2 className="text-xl font-bold text-white mb-2">Partnership messages cannot be sent</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          No inquiry form is submitted from this page, and nothing is stored in the browser. A media kit is not sent. The placement descriptions above are not a confirmed offer.
        </p>
      </div>
    </div>
  );
};
