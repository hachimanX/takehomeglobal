import React, { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { COUNTRIES } from '../data/taxData';
import { SUPPORTED_CURRENCIES } from '../data/exchangeRates';

interface HeroSectionProps {
  grossIncome: number;
  onIncomeChange: (val: number) => void;
  baseCurrency: string;
  onCurrencyChange: (curr: string) => void;
  selectedCountries: string[]; // country IDs
  onAddCountry: (id: string) => void;
  onRemoveCountry: (id: string) => void;
  selectedSubRegions: Record<string, string>; // countryId -> subRegionName
  onSubRegionChange: (countryId: string, subRegion: string) => void;
}

const PRESET_INCOMES = [50000, 100000, 150000, 250000, 500000];

export const HeroSection: React.FC<HeroSectionProps> = ({
  grossIncome,
  onIncomeChange,
  baseCurrency,
  onCurrencyChange,
  selectedCountries,
  onAddCountry,
  onRemoveCountry,
  selectedSubRegions,
  onSubRegionChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currSymbol = SUPPORTED_CURRENCIES.find((c) => c.code === baseCurrency)?.symbol || '$';

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      !selectedCountries.includes(c.id) &&
      (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section className="relative pt-12 pb-14 z-30">
      {/* Ambient background glow isolated in pointer-events-none layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/20 via-purple-500/15 to-pink-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs font-medium text-slate-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Statutory Tax Brackets & Social Security Updated for 2026</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
          Compare <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">Global Income Taxes</span> & Real Spending Power
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-10">
          Discover how much you really keep after national taxes, social security, and local living costs across 30+ major economies.
        </p>

        {/* Central Input Box */}
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#12141e]/90 border border-white/[0.1] shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-5">
            {/* Currency Select */}
            <div className="sm:w-32">
              <label className="block text-left text-xs font-semibold text-slate-400 mb-1.5">
                Currency
              </label>
              <div className="relative">
                <select
                  value={baseCurrency}
                  onChange={(e) => onCurrencyChange(e.target.value)}
                  aria-label="Currency"
                  className="w-full h-14 bg-white/[0.05] border border-white/[0.1] focus:border-indigo-500 rounded-2xl px-3 text-white font-bold text-lg focus:outline-none cursor-pointer appearance-none"
                >
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#12141e]">
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Income Input */}
            <div className="flex-1">
              <label className="block text-left text-xs font-semibold text-slate-400 mb-1.5">
                Annual Gross Income
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-xl font-bold text-indigo-400">
                  {currSymbol}
                </span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={grossIncome || ''}
                  onChange={(e) => onIncomeChange(Number(e.target.value))}
                  placeholder="100,000"
                  className="w-full h-14 bg-white/[0.05] border border-white/[0.1] focus:border-indigo-500 rounded-2xl pl-10 pr-4 text-white font-bold text-2xl focus:outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-white/[0.06]">
            <span className="text-xs text-slate-400 mr-1">Quick Select:</span>
            {PRESET_INCOMES.map((amt) => (
              <button
                key={amt}
                onClick={() => onIncomeChange(amt)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  grossIncome === amt
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {currSymbol}
                {(amt / 1000).toFixed(0)}k
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Tray & Country Selectors */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400 px-1">
            <span>COMPARING COUNTRIES ({selectedCountries.length})</span>
            <span>Click to remove or switch regions</span>
          </div>

          {/* Active Country Badges */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-5">
            {selectedCountries.map((id) => {
              const country = COUNTRIES.find((c) => c.id === id);
              if (!country) return null;
              const hasSubRegions = Boolean(country.subRegions);
              const currentSub = selectedSubRegions[id] || (hasSubRegions ? Object.keys(country.subRegions!)[0] : '');

              return (
                <div
                  key={id}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.12] hover:border-indigo-500/50 transition-all text-white text-sm font-medium shadow-sm group"
                >
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>

                  {/* SubRegion selector if available */}
                  {hasSubRegions && (
                    <select
                      value={currentSub}
                      onChange={(e) => onSubRegionChange(id, e.target.value)}
                      className="bg-indigo-950/60 border border-indigo-500/30 rounded-lg px-2 py-0.5 text-xs text-indigo-200 font-semibold focus:outline-none cursor-pointer"
                    >
                      {Object.keys(country.subRegions!).map((sub) => (
                        <option key={sub} value={sub} className="bg-[#12141e] text-white">
                          {sub}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Remove pill button */}
                  <button
                    onClick={() => onRemoveCountry(id)}
                    className="p-0.5 rounded-full hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
                    title={`Remove ${country.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}

            {/* Add Country Button & Dropdown */}
            <div className="relative z-50">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-semibold text-sm transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Country</span>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-[90]"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-2xl bg-[#181b2a] border border-white/[0.15] shadow-2xl p-2 z-[100] text-left">
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.04] rounded-xl mb-2 border border-white/[0.06]">
                      <Search className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search countries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
                        autoFocus
                      />
                    </div>

                    <div className="space-y-1">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              onAddCountry(c.id);
                              setDropdownOpen(false);
                              setSearchQuery('');
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-indigo-600/20 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>{c.name}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {c.currency}
                            </span>
                          </button>
                        ))
                      ) : (
                        <p className="p-3 text-xs text-slate-400 text-center">
                          All matching countries added
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
