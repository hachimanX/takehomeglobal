import React from 'react';
import { Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080d] text-slate-400 text-xs pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top 5 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-1 space-y-3">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 text-white font-bold text-base cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg">TaxAtlas</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              An independent, free global tax comparison tool covering 30+ major economies and all 50 US states — updated for the 2026 tax year.
            </p>
            <div className="text-[11px] text-slate-500">
              Quietly maintained with reference-grade accuracy.
            </div>
          </div>

          {/* Col 1: Calculators */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              Calculators
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  All Country Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'usa')} className="hover:text-white transition-colors cursor-pointer">
                  US Federal & 50 States
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'uk')} className="hover:text-white transition-colors cursor-pointer">
                  UK Income Tax & NI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'germany')} className="hover:text-white transition-colors cursor-pointer">
                  Germany Tax & Social Security
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'canada')} className="hover:text-white transition-colors cursor-pointer">
                  Canada Provinces
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'portugal')} className="hover:text-white transition-colors cursor-pointer">
                  Portugal IRS & NHR
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'uae')} className="hover:text-white transition-colors cursor-pointer">
                  UAE 0% Expat Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Compare */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              Compare
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('article', 'california-vs-texas')} className="hover:text-white transition-colors cursor-pointer">
                  California vs Texas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article', 'usa-vs-uk')} className="hover:text-white transition-colors cursor-pointer">
                  USA vs UK
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article', 'no-income-tax-states-2026')} className="hover:text-white transition-colors cursor-pointer">
                  The 9 Zero-Tax US States
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article', 'lowest-tax-countries-europe-2026')} className="hover:text-white transition-colors cursor-pointer">
                  Lowest Tax in Europe
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Relocation Arbitrage Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Tax Guides */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              Tax Guides
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('guides')} className="hover:text-white transition-colors cursor-pointer">
                  Browse All Guides & Reports
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article', 'tax-freedom-day-by-country-2026')} className="hover:text-white transition-colors cursor-pointer">
                  Tax Freedom Day 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article', 'germany-steuerklassen-2026')} className="hover:text-white transition-colors cursor-pointer">
                  German Steuerklassen Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('article', 'hsa-401k-limits-2026')} className="hover:text-white transition-colors cursor-pointer">
                  401(k) & HSA Contribution Limits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Legal */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              About
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us & Methodology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advertise')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer">
                  Advertise & Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Verified Tax Expert Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Submit Statutory Correction
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Affiliate Disclosure
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free to use</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>☆</span>
              <span>No sign-up required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🌐</span>
              <span>30+ countries & 50 US states</span>
            </span>
            <span className="flex items-center gap-1.5 text-indigo-300">
              <span>📈</span>
              <span>Updated for 2026</span>
            </span>
          </div>

          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">
            Tax Engine v2.4 · 2026 Edition
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Not tax advice.</strong> Calculations and comparative models provided by TaxAtlas are estimates intended for educational, salary benchmarking, and informational purposes only. Individual circumstances, deductions, residency status, and local municipal laws vary significantly. Always verify your specific tax situation with your local revenue authority or a licensed CPA / fiscal advisor.
          </p>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 pt-2">
          <div>
            &copy; {new Date().getFullYear()} TaxAtlas. All calculations run client-side. Zero personal data stored.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              Disclaimer
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              Affiliate Disclosure
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
