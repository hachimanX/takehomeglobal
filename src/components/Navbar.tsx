import React, { useState } from 'react';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  Share2,
  Check,
  ArrowRight,
  Scale,
} from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../data/exchangeRates';
import { COUNTRIES } from '../data/taxData';

interface NavbarProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  onFocusCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCurrency,
  onSelectCurrency,
  activeView,
  onNavigate,
  onFocusCalculator,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a0f]/90 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
                <span>TaxAtlas</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  2026
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            {/* Main Calculator */}
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'home'
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Calculator
            </button>

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('calculators')}
                className="flex items-center gap-1 px-3 py-2 rounded-xl hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <span>Calculators</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {openDropdown === 'calculators' && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-[#12141e] border border-white/[0.12] shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5">
                      Top Country Calculators
                    </div>
                    {COUNTRIES.slice(0, 8).map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onNavigate('country', c.id);
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{c.currency}</span>
                      </button>
                    ))}
                    <div className="border-t border-white/[0.06] mt-1 pt-1">
                      <button
                        onClick={() => {
                          onNavigate('home');
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-indigo-400 font-bold hover:bg-indigo-600/10"
                      >
                        Browse all 30+ countries →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Compare Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('compare')}
                className="flex items-center gap-1 px-3 py-2 rounded-xl hover:text-white hover:bg-white/[0.04] transition-colors cursor-pointer"
              >
                <span>Compare</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {openDropdown === 'compare' && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#12141e] border border-white/[0.12] shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5">
                      Trending Comparisons
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('article', 'california-vs-texas');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Scale className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>California vs Texas (Income & Prop Tax)</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('article', 'usa-vs-uk');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Scale className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>USA vs UK (Effective Take-Home)</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('article', 'no-income-tax-states-2026');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Scale className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>The 9 No-Income-Tax US States</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Tax Guides */}
            <button
              onClick={() => onNavigate('guides')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'guides' || activeView === 'article'
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Tax Guides
            </button>

            {/* About */}
            <button
              onClick={() => onNavigate('about')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'about'
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              onClick={() => onNavigate('contact')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'contact'
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Contact
            </button>

            {/* Advertise */}
            <button
              onClick={() => onNavigate('advertise')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'advertise'
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Advertise
            </button>
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Base Currency Select */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] rounded-xl px-2.5 py-1.5 transition-colors">
            <span className="text-[11px] font-medium text-slate-400">Base:</span>
            <select
              value={selectedCurrency}
              onChange={(e) => onSelectCurrency(e.target.value)}
              aria-label="Base Currency"
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#12141e] text-white">
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-all cursor-pointer"
            title="Copy shareable link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </>
            )}
          </button>

          {/* Primary CTA: Start a calculation */}
          <button
            onClick={() => {
              onNavigate('home');
              onFocusCalculator();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/25 cursor-pointer"
          >
            <span>Calculate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e101a] border-b border-white/[0.1] px-4 py-4 space-y-2 text-sm font-medium animate-fadeIn">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/[0.05]"
          >
            Calculator
          </button>
          <button
            onClick={() => {
              onNavigate('guides');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/[0.05]"
          >
            Tax Guides & Comparisons
          </button>
          <button
            onClick={() => {
              onNavigate('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/[0.05]"
          >
            About Us & Methodology
          </button>
          <button
            onClick={() => {
              onNavigate('contact');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/[0.05]"
          >
            Contact & Tax Expert Directory
          </button>
          <button
            onClick={() => {
              onNavigate('advertise');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/[0.05] text-amber-400"
          >
            Advertise & Sponsorships
          </button>
        </div>
      )}
    </header>
  );
};
