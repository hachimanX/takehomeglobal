import React, { useState } from 'react';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  Share2,
  Check,
  ArrowRight,
  Code,
} from 'lucide-react';
import { SUPPORTED_CURRENCIES } from '../data/exchangeRates';
import { COUNTRIES } from '../data/taxData';
import { SITE_CONFIG } from '../config';
import type { LanguageCode } from '../types';

interface NavbarProps {
  selectedCurrency: string;
  onSelectCurrency: (currency: string) => void;
  activeView: string;
  onNavigate: (view: string, param?: string) => void;
  onFocusCalculator: () => void;
  language?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  onOpenEmbed?: () => void;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ur', label: 'اردو', flag: '🇵🇰' },
];

export const Navbar: React.FC<NavbarProps> = ({
  selectedCurrency,
  onSelectCurrency,
  activeView,
  onNavigate,
  onFocusCalculator,
  language = 'en',
  onLanguageChange,
  onOpenEmbed,
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

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white flex items-center gap-1.5">
                <span>{SITE_CONFIG.brandName}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {SITE_CONFIG.taxYear}
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            {/* Main Calculator */}
            <button
              onClick={() => {
                onNavigate('home');
                onFocusCalculator();
              }}
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
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#12141e] border border-white/[0.12] shadow-2xl p-2 z-50 animate-fadeIn">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5">
                      Top Country Calculators
                    </div>
                    {['usa', 'uk', 'germany', 'canada', 'uae', 'singapore', 'pakistan', 'japan', 'china', 'south_korea', 'portugal', 'switzerland'].map((id) => {
                      const c = COUNTRIES.find((item) => item.id === id);
                      if (!c) return null;
                      return (
                        <button
                          key={c.id}
                          onClick={() => {
                            onNavigate('country', c.id);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span>{c.name}</span>
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">{c.currency}</span>
                        </button>
                      );
                    })}
                    <div className="border-t border-white/[0.06] mt-1 pt-1">
                      <button
                        onClick={() => {
                          onNavigate('home');
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-indigo-400 font-bold hover:bg-indigo-600/10 cursor-pointer"
                      >
                        Browse all 35+ countries →
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
                  <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-[#12141e] border border-white/[0.12] shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400 px-3 py-1.5">
                      Popular Comparisons
                    </div>
                    <button
                      onClick={() => {
                        onNavigate('guide', 'california-vs-texas-tax');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>California vs Texas (USA)</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Guide</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('guide', 'us-vs-uk-tax');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>USA vs United Kingdom</span>
                      <span className="text-[10px] text-emerald-400 font-semibold">Guide</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('guide', 'no-income-tax-states');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>The 9 No-Income-Tax States</span>
                      <span className="text-[10px] text-indigo-400 font-semibold">Guide</span>
                    </button>
                    <button
                      onClick={() => {
                        onNavigate('guide', 'europe-low-tax-countries');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-white/[0.06] hover:text-white transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>Europe Low-Tax Havens</span>
                      <span className="text-[10px] text-indigo-400 font-semibold">Guide</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Tax Guides */}
            <button
              onClick={() => onNavigate('guides-index')}
              className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                activeView === 'guides-index'
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
                  ? 'text-white bg-white/[0.08]'
                  : 'hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              Advertise
            </button>
          </nav>
        </div>

        {/* Right Tools: Language, Currency, Embed, Share & CTA */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Language Switcher */}
          {onLanguageChange && (
            <div className="relative">
              <button
                onClick={() => toggleDropdown('language')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>{currentLangObj.flag}</span>
                <span className="text-[11px] uppercase font-bold">{currentLangObj.code}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {openDropdown === 'language' && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-[#12141e] border border-white/[0.12] shadow-2xl p-1.5 z-50 animate-fadeIn space-y-0.5">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          onLanguageChange(l.code);
                          setOpenDropdown(null);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                          language === l.code
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </span>
                        {language === l.code && <Check className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Currency Selector */}
          <div className="relative">
            <select
              value={selectedCurrency}
              onChange={(e) => onSelectCurrency(e.target.value)}
              aria-label="Change base currency"
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white focus:outline-none appearance-none pr-8 cursor-pointer transition-colors"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code} className="bg-[#12141e] text-white">
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Embed Modal Trigger */}
          {onOpenEmbed && (
            <button
              onClick={onOpenEmbed}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
              title="Embed this calculator"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Share'}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => {
              onNavigate('home');
              onFocusCalculator();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <span>Calculate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          {onOpenEmbed && (
            <button
              onClick={onOpenEmbed}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08]"
              title="Embed"
            >
              <Code className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#090a0f] px-4 py-6 space-y-4 animate-fadeIn">
          {/* Language Switcher (Mobile) */}
          {onLanguageChange && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                Language
              </div>
              <div className="grid grid-cols-3 gap-2">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                      language === l.code
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'bg-white/[0.03] text-slate-300 border-white/[0.08]'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nav links */}
          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate('home');
                setMobileMenuOpen(false);
                onFocusCalculator();
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-white hover:bg-white/[0.04]"
            >
              Calculator
            </button>
            <button
              onClick={() => {
                onNavigate('guides-index');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-white hover:bg-white/[0.04]"
            >
              Tax Guides & Comparisons
            </button>
            <button
              onClick={() => {
                onNavigate('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-white hover:bg-white/[0.04]"
            >
              About Us
            </button>
            <button
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-white hover:bg-white/[0.04]"
            >
              Contact & CPA Directory
            </button>
            <button
              onClick={() => {
                onNavigate('advertise');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl text-sm font-semibold text-white hover:bg-white/[0.04]"
            >
              Advertise With Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
