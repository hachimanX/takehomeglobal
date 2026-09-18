import React from 'react';
import { ShieldCheck, Database, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back button */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
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
          About TaxAtlas
        </h1>
        <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
          A reference-grade global tax comparison tool designed to provide clarity on international take-home pay, social security burdens, and real purchasing power across the world’s major economies.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Database className="w-6 h-6 text-indigo-400 mb-3" />
          <h2 className="text-base font-bold text-white mb-1.5">Official Sourcing</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every bracket, threshold, and contribution schedule is verified directly from official fiscal agencies and ministries of finance.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Lock className="w-6 h-6 text-emerald-400 mb-3" />
          <h2 className="text-base font-bold text-white mb-1.5">Zero Data Storage</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            100% client-side computing. We do not require accounts, log your entries, or transmit your salary numbers over the network.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <CheckCircle2 className="w-6 h-6 text-cyan-400 mb-3" />
          <h2 className="text-base font-bold text-white mb-1.5">Real Net Economics</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            We model both national taxes and mandatory social security/healthcare contributions, as well as benchmarked city living costs.
          </p>
        </div>
      </div>

      {/* Narrative Sections */}
      <div className="space-y-8 text-sm leading-relaxed border-t border-white/[0.08] pt-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">Our Mission</h2>
          <p className="text-slate-400 mb-3">
            In an increasingly globalized world driven by remote employment, digital nomadism, and international corporate mobility, headline tax rates are deeply misleading. A country advertising a "20% flat tax" might impose 35% mandatory social charges, while a country with progressive 40% brackets might offer generous personal allowances that result in lower effective taxation.
          </p>
          <p className="text-slate-400">
            TaxAtlas was created to cut through marketing noise and provide workers, founders, and HR professionals with an unvarnished, mathematical view of true take-home compensation and purchasing power.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Primary Data Sources</h2>
          <p className="text-slate-400 mb-3">
            Our data engine incorporates statutory figures from leading tax authorities worldwide:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇺🇸 US: Internal Revenue Service (IRS)</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇬🇧 UK: HM Revenue & Customs (HMRC)</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇩🇪 Germany: Bundesfinanzministerium (BMF)</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇨🇦 Canada: Canada Revenue Agency (CRA)</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇦🇺 Australia: Australian Taxation Office (ATO)</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇪🇸 Spain: Agencia Tributaria</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🇵🇹 Portugal: Autoridade Tributária e Aduaneira</li>
            <li className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">🌐 OECD: Tax Database & Policy Statistics</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Editorial Independence & Affiliate Disclosure</h2>
          <p className="text-slate-400 leading-relaxed">
            TaxAtlas is an independently operated web resource. To support ongoing maintenance, server bandwidth, and regular statutory research, we partner with reputable international service providers (such as Wise, Deel, and StartFleet). If you choose to register through our partner links, we may receive compensation at zero additional cost to you. This commercial relationship never influences our tax engine formulas or algorithmic country rankings.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Ready to run your salary numbers?</h3>
        <p className="text-xs text-slate-400 mb-5">Compare 30+ global destinations in under 5 seconds.</p>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30"
        >
          <span>Open Tax Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
