import React, { useState } from 'react';
import { Plus, X, Search, Globe, Shield, Code, Sparkles, ChevronDown, Check } from 'lucide-react';
import { COUNTRIES } from '../data/taxData';
import { SUPPORTED_CURRENCIES } from '../data/exchangeRates';
import { TRANSLATIONS } from '../data/translations';
import { CountryFlag } from './CountryFlag';
import type { LanguageCode } from '../types';

interface HeroSectionProps {
  grossIncome: number;
  onIncomeChange: (val: number) => void;
  baseCurrency: string;
  onCurrencyChange: (curr: string) => void;
  selectedCountries: string[]; // country IDs
  onAddCountry: (id: string) => void;
  onRemoveCountry: (id: string) => void;
  onSetPrimaryCountry: (id: string) => void;
  selectedSubRegions: Record<string, string>; // countryId -> subRegionName
  onSubRegionChange: (countryId: string, subRegion: string) => void;
  onOpenEmbed?: () => void;
  language?: LanguageCode;
}

const PRESET_INCOMES = [50000, 100000, 150000, 250000];

export const HeroSection: React.FC<HeroSectionProps> = ({
  grossIncome,
  onIncomeChange,
  baseCurrency,
  onCurrencyChange,
  selectedCountries,
  onAddCountry,
  onRemoveCountry,
  onSetPrimaryCountry,
  selectedSubRegions,
  onSubRegionChange,
  onOpenEmbed,
  language = 'en',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [primaryDropdownOpen, setPrimaryDropdownOpen] = useState(false);
  const [primarySearchQuery, setPrimarySearchQuery] = useState('');

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const currSymbol = SUPPORTED_CURRENCIES.find((c) => c.code === baseCurrency)?.symbol || '$';

  // Primary country is the first selected country
  const primaryCountryId = selectedCountries[0] || 'usa';
  const primaryCountry = COUNTRIES.find((c) => c.id === primaryCountryId) || COUNTRIES[0];

  const filteredPrimaryCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(primarySearchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(primarySearchQuery.toLowerCase()) ||
      c.currency.toLowerCase().includes(primarySearchQuery.toLowerCase())
  );

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      !selectedCountries.includes(c.id) &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleClearAll = () => {
    // Reset to just the primary country
    selectedCountries.forEach((id) => {
      if (id !== primaryCountryId) onRemoveCountry(id);
    });
    onIncomeChange(100000);
  };

  const handlePrimaryCountryChange = (newId: string) => {
    setPrimaryDropdownOpen(false);
    setPrimarySearchQuery('');
    if (newId === primaryCountryId) return;
    onSetPrimaryCountry(newId);
  };

  return (
    <section className="relative pt-8 pb-12 z-30">
      {/* Ambient background glow isolated in pointer-events-none layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-emerald-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authority, Value Proposition & Sources */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-wide text-[11px] text-emerald-400 font-bold">
                {t.badgeIndependent}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
              {t.heroHeadline}{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent">
                {t.heroHeadlineHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {t.heroSubtitle}
            </p>

            {/* Metric Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white">
                🌍 35+ Countries
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-white">
                🏛️ 50 US States + DC
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-emerald-400">
                ⚡ 2026 Tax Year
              </span>
            </div>

            {/* Sources Citation */}
            <div className="text-xs text-slate-400 pt-1">
              <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block mb-1">
                Official Statutory Sources:
              </span>
              <span className="text-slate-400 font-medium">
                IRS · HMRC · FBR · BZSt · NTA · NTS · ATO · CRA · +30 more
              </span>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>{t.badge100Free}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <span>{t.badgeNoSignup}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                <Globe className="w-3.5 h-3.5" />
                <span>{t.badgePrivate}</span>
              </div>
            </div>

            {/* Embed CTA */}
            {onOpenEmbed && (
              <div className="pt-2">
                <button
                  onClick={onOpenEmbed}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{t.embedBtn} (Free for webmasters & bloggers) →</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Focused Tax Estimator Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl bg-[#0f111a]/95 border border-white/[0.12] p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    {t.cardTitle}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {t.cardLiveBadge}
                </span>
              </div>

              {/* Input 1: Annual Gross Income */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.annualIncomeLabel}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-lg">
                    {currSymbol}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={grossIncome || ''}
                    onChange={(e) => onIncomeChange(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3.5 text-xl sm:text-2xl font-black rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white focus:border-indigo-500 focus:bg-white/[0.06] focus:outline-none transition-all"
                    placeholder="100000"
                  />
                </div>

                {/* Quick select chips */}
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  <span className="text-[11px] text-slate-400 mr-1">Quick:</span>
                  {PRESET_INCOMES.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => onIncomeChange(amt)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${
                        grossIncome === amt
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                          : 'bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      {currSymbol}
                      {(amt / 1000).toLocaleString()}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Input 2: Currency Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.currencyLabel}
                </label>
                <div className="relative">
                  <select
                    value={baseCurrency}
                    onChange={(e) => onCurrencyChange(e.target.value)}
                    aria-label="Select income currency"
                    className="w-full px-4 py-3 text-sm font-semibold rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer"
                  >
                    {SUPPORTED_CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-[#12141e] text-white">
                        {c.code} — {c.name} ({c.symbol})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Input 3: Primary Country */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.countryToCalculateLabel}
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setPrimaryDropdownOpen(!primaryDropdownOpen);
                      setDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-sm font-bold rounded-2xl bg-white/[0.04] border border-white/[0.1] hover:border-indigo-500/50 text-white flex items-center justify-between transition-all cursor-pointer text-left"
                    aria-label="Select country to calculate"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <CountryFlag code={primaryCountry.code} name={primaryCountry.name} size="md" />
                      <span className="truncate">{primaryCountry.name}</span>
                      <span className="text-xs text-slate-400 font-normal shrink-0">
                        ({primaryCountry.currency})
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        primaryDropdownOpen ? 'rotate-180 text-indigo-400' : ''
                      }`}
                    />
                  </button>

                  {/* Primary Country Dropdown Popover */}
                  {primaryDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => {
                          setPrimaryDropdownOpen(false);
                          setPrimarySearchQuery('');
                        }}
                      />
                      <div className="absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto bg-[#131522] border border-white/[0.15] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                        <div className="p-2 border-b border-white/[0.08] sticky top-0 bg-[#131522] z-10">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              type="text"
                              placeholder="Search 35+ countries..."
                              value={primarySearchQuery}
                              onChange={(e) => setPrimarySearchQuery(e.target.value)}
                              className="w-full pl-8 pr-2 py-1.5 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="py-1">
                          {filteredPrimaryCountries.map((c) => {
                            const isSelected = c.id === primaryCountry.id;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => handlePrimaryCountryChange(c.id)}
                                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors text-left cursor-pointer ${
                                  isSelected
                                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30'
                                    : 'text-slate-200 hover:bg-indigo-600 hover:text-white'
                                }`}
                              >
                                <span className="flex items-center gap-2.5">
                                  <CountryFlag code={c.code} name={c.name} size="sm" />
                                  <span>{c.name}</span>
                                </span>
                                <span className="flex items-center gap-2 text-[10px] text-slate-400">
                                  <span>{c.currency}</span>
                                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sub-region (e.g. US State or Canadian Province) */}
              {primaryCountry.subRegions && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    {primaryCountry.name} {primaryCountry.subRegionLabel || t.stateLabel}
                  </label>
                  <div className="relative">
                    <select
                      value={selectedSubRegions[primaryCountry.id] || Object.keys(primaryCountry.subRegions)[0]}
                      onChange={(e) => onSubRegionChange(primaryCountry.id, e.target.value)}
                      aria-label="Select sub-region or state"
                      className="w-full px-4 py-2.5 text-xs font-semibold rounded-2xl bg-white/[0.04] border border-white/[0.1] text-indigo-300 focus:border-indigo-500 focus:outline-none appearance-none cursor-pointer"
                    >
                      {Object.keys(primaryCountry.subRegions).map((sub) => (
                        <option key={sub} value={sub} className="bg-[#12141e] text-white">
                          {sub}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>
              )}

              {/* Primary Actions Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Calculate Estimate Button */}
                <button
                  onClick={() => {
                    const targetEl = document.getElementById('results-section');
                    if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t.calculateBtn}</span>
                </button>

                {/* Add Country to Compare Button */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                      setPrimaryDropdownOpen(false);
                    }}
                    className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-indigo-400" />
                    <span>{t.addCountryBtn}</span>
                  </button>

                  {/* Dropdown Popover */}
                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => {
                          setDropdownOpen(false);
                          setSearchQuery('');
                        }}
                      />
                      <div className="absolute right-0 top-full mt-2 w-72 max-h-72 overflow-y-auto bg-[#131522] border border-white/[0.15] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                        <div className="p-2 border-b border-white/[0.08] sticky top-0 bg-[#131522] z-10">
                          <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                            <input
                              type="text"
                              placeholder="Filter countries..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-8 pr-2 py-1.5 text-xs bg-black/40 border border-white/[0.1] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                              autoFocus
                            />
                          </div>
                        </div>
                        <div className="py-1">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.id}
                              onClick={() => {
                                onAddCountry(c.id);
                                setDropdownOpen(false);
                                setSearchQuery('');
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl text-slate-200 hover:bg-indigo-600 hover:text-white transition-colors text-left cursor-pointer"
                            >
                              <span className="flex items-center gap-2">
                                <CountryFlag code={c.code} name={c.name} size="sm" />
                                <span>{c.name}</span>
                              </span>
                              <span className="text-[10px] text-slate-400 opacity-80">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Active Multi-Country Comparison Tray (if 2+ countries selected) */}
              {selectedCountries.length > 1 && (
                <div className="pt-2 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Comparing {selectedCountries.length} Jurisdictions:
                    </span>
                    <button
                      onClick={handleClearAll}
                      className="text-[11px] text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      {t.clearAllBtn}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCountries.map((cId) => {
                      const c = COUNTRIES.find((item) => item.id === cId);
                      if (!c) return null;
                      return (
                        <div
                          key={cId}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-xs text-white"
                        >
                          <CountryFlag code={c.code} name={c.name} size="sm" />
                          <span className="font-semibold">{c.name}</span>
                          {c.subRegions && selectedSubRegions[c.id] && (
                            <span className="text-[10px] text-indigo-300">
                              ({selectedSubRegions[c.id]})
                            </span>
                          )}
                          {selectedCountries.length > 1 && (
                            <button
                              onClick={() => onRemoveCountry(cId)}
                              className="ml-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Card Footer Micro-copy */}
              <div className="pt-2 text-center text-[11px] text-slate-400 leading-relaxed">
                {t.disclaimerMicro}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
