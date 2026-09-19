import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../config';

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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg">{SITE_CONFIG.brandName}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              An independent, free global take-home pay and tax comparison tool covering 35+ major economies and all 50 US states — updated for the {SITE_CONFIG.taxYear} tax year.
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
                <button onClick={() => onNavigate('country', 'pakistan')} className="hover:text-white transition-colors cursor-pointer">
                  Pakistan FBR Slabs & EOBI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'japan')} className="hover:text-white transition-colors cursor-pointer">
                  Japan National & Inhabitant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'china')} className="hover:text-white transition-colors cursor-pointer">
                  China Comprehensive IIT
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('country', 'uae')} className="hover:text-white transition-colors cursor-pointer">
                  UAE 0% Tax Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: High-Volume Comparisons */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              Comparisons
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('guide', 'california-vs-texas-tax')} className="hover:text-white transition-colors cursor-pointer">
                  California vs Texas Tax
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide', 'us-vs-uk-tax')} className="hover:text-white transition-colors cursor-pointer">
                  US vs UK Take-Home Pay
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide', 'no-income-tax-states')} className="hover:text-white transition-colors cursor-pointer">
                  9 States with No Income Tax
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide', 'europe-low-tax-countries')} className="hover:text-white transition-colors cursor-pointer">
                  Europe Low-Tax Havens
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Dubai vs London Relocation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
                  Singapore vs Switzerland
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Expat Resources & Solutions */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              Resources & Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('guides-index')} className="hover:text-white transition-colors cursor-pointer">
                  Browse All Tax Guides
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide', 'tax-freedom-day-by-country-2026')} className="hover:text-white transition-colors cursor-pointer">
                  Tax Freedom Day 2026
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('guide', 'germany-steuerklassen-2026')} className="hover:text-white transition-colors cursor-pointer">
                  German Steuerklassen Guide
                </button>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.affiliates.startfleet.destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  <span>Start a US Company</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.affiliates.wise.destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <span>International Banking (Wise)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Legal */}
          <div>
            <h4 className="text-[11px] font-mono tracking-wider uppercase text-slate-200 font-bold mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Us & Methodology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advertise')} className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer">
                  Advertise With Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & CPA Partner Directory
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
              <span>100% Free Forever</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>☆</span>
              <span>No sign-up required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🌐</span>
              <span>35+ countries & 50 US states</span>
            </span>
            <span className="flex items-center gap-1.5 text-indigo-300">
              <span>📈</span>
              <span>Statutory 2026 tax rates</span>
            </span>
          </div>

          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">
            Tax Engine v2.5 · 2026 Edition
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] text-slate-400 leading-relaxed">
          <p>
            <strong className="text-slate-300">Educational Disclaimer:</strong> {SITE_CONFIG.legalDisclaimer}
          </p>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 pt-2">
          <div>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.brandName}. All calculations execute client-side. Zero personal or income data is stored.
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
