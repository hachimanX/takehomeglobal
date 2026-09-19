import React, { useState, useMemo } from 'react';
import type { CountryInfo } from '../types';
import { calculateCountryTax, formatMoney, dayOfYearToDate } from '../engine/calculator';
import { Search, ArrowUpDown, Plus, Check, ExternalLink, ArrowRight } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

interface GlobalExplorerTableProps {
  countries: CountryInfo[];
  grossIncome: number;
  baseCurrency: string;
  exchangeRates: Record<string, number>;
  selectedCountryIds: string[];
  onAddCountry: (id: string) => void;
  onNavigateCountry?: (id: string) => void;
}

type SortField = 'name' | 'effectiveTaxRate' | 'netUSD' | 'realPurchasingPowerUSD' | 'taxFreedomDay';
type SortOrder = 'asc' | 'desc';

export const GlobalExplorerTable: React.FC<GlobalExplorerTableProps> = ({
  countries,
  grossIncome,
  baseCurrency,
  exchangeRates,
  selectedCountryIds,
  onAddCountry,
  onNavigateCountry,
}) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('effectiveTaxRate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [activeFilterTab, setActiveFilterTab] = useState<'default' | 'lowestTax' | 'highestTax' | 'highestNet' | 'alpha'>('default');

  // Compute calculation for each country in the entire catalog
  const tableData = useMemo(() => {
    return countries.map((c) => {
      // Pick default subregion if applicable
      const subRegion = c.subRegions ? Object.keys(c.subRegions)[0] : undefined;
      return calculateCountryTax(c, grossIncome, baseCurrency, exchangeRates, subRegion);
    });
  }, [countries, grossIncome, baseCurrency, exchangeRates]);

  // Handle Quick Filter buttons
  const handleQuickFilter = (tab: 'default' | 'lowestTax' | 'highestTax' | 'highestNet' | 'alpha') => {
    setActiveFilterTab(tab);
    if (tab === 'default') {
      setSortField('effectiveTaxRate');
      setSortOrder('asc');
    } else if (tab === 'lowestTax') {
      setSortField('effectiveTaxRate');
      setSortOrder('asc');
    } else if (tab === 'highestTax') {
      setSortField('effectiveTaxRate');
      setSortOrder('desc');
    } else if (tab === 'highestNet') {
      setSortField('netUSD');
      setSortOrder('desc');
    } else if (tab === 'alpha') {
      setSortField('name');
      setSortOrder('asc');
    }
  };

  // Filter & Sort
  const filteredAndSorted = useMemo(() => {
    const list = tableData.filter(
      (r) =>
        r.country.name.toLowerCase().includes(search.toLowerCase()) ||
        r.country.code.toLowerCase().includes(search.toLowerCase())
    );

    return list.sort((a, b) => {
      // In default tab and without an active search, pin USA to the top
      if (activeFilterTab === 'default' && !search) {
        if (a.country.id === 'usa') return -1;
        if (b.country.id === 'usa') return 1;
      }

      let valA: string | number;
      let valB: string | number;

      if (sortField === 'name') {
        valA = a.country.name;
        valB = b.country.name;
      } else {
        valA = a[sortField];
        valB = b[sortField];
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tableData, search, sortField, sortOrder, activeFilterTab]);

  const handleSort = (field: SortField) => {
    setActiveFilterTab('default');
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'effectiveTaxRate' ? 'asc' : 'desc');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
            <span>Global Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Detailed Country Breakdown ({countries.length} Jurisdictions)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Standardized comparison calibrated for {formatMoney(grossIncome, baseCurrency)} gross income.
          </p>
        </div>

        {/* Search & Filter bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by country or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/[0.04] border border-white/[0.1] text-white focus:border-indigo-500 focus:outline-none placeholder-slate-500 transition-all"
          />
        </div>
      </div>

      {/* Quick Sort Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-xs font-semibold text-slate-400 mr-1">Quick Sort:</span>
        <button
          onClick={() => handleQuickFilter('default')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilterTab === 'default'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
          }`}
        >
          Default
        </button>
        <button
          onClick={() => handleQuickFilter('lowestTax')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilterTab === 'lowestTax'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
          }`}
        >
          Lowest Tax First
        </button>
        <button
          onClick={() => handleQuickFilter('highestTax')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilterTab === 'highestTax'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
          }`}
        >
          Highest Tax First
        </button>
        <button
          onClick={() => handleQuickFilter('highestNet')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilterTab === 'highestNet'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
          }`}
        >
          Highest Net Take-Home
        </button>
        <button
          onClick={() => handleQuickFilter('alpha')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeFilterTab === 'alpha'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
              : 'bg-white/[0.03] text-slate-300 hover:bg-white/[0.07]'
          }`}
        >
          Alphabetical (A-Z)
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-3xl border border-white/[0.08] bg-[#0c0e15]/80 backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-white/[0.03] border-b border-white/[0.08] text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="py-4 px-5 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Country & Jurisdiction</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th
                onClick={() => handleSort('effectiveTaxRate')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Effective Tax Rate</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th
                onClick={() => handleSort('netUSD')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Monthly Net Pay</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th
                onClick={() => handleSort('realPurchasingPowerUSD')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors text-right"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Real Purchasing Power</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th
                onClick={() => handleSort('taxFreedomDay')}
                className="py-4 px-4 cursor-pointer hover:text-white transition-colors text-right hidden lg:table-cell"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Tax Freedom Day</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-500" />
                </div>
              </th>

              <th className="py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.04]">
            {filteredAndSorted.map((r) => {
              const isSelected = selectedCountryIds.includes(r.country.id);

              return (
                <tr
                  key={r.country.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Country Name & Flag */}
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <CountryFlag code={r.country.code} name={r.country.name} size="md" />
                      <div>
                        {onNavigateCountry ? (
                          <button
                            onClick={() => onNavigateCountry(r.country.id)}
                            className="font-bold text-white group-hover:text-indigo-400 transition-colors text-left flex items-center gap-1 cursor-pointer"
                          >
                            <span>{r.country.name}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ) : (
                          <span className="font-bold text-white">{r.country.name}</span>
                        )}
                        <span className="text-[10px] text-slate-400 block">
                          Currency: {r.country.currency}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Effective Rate */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold text-sm ${
                          r.effectiveTaxRate <= 15
                            ? 'text-emerald-400'
                            : r.effectiveTaxRate <= 30
                            ? 'text-indigo-300'
                            : 'text-amber-400'
                        }`}
                      >
                        {r.effectiveTaxRate.toFixed(1)}%
                      </span>
                      <div className="w-16 h-1.5 rounded-full bg-white/[0.08] overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            r.effectiveTaxRate <= 15
                              ? 'bg-emerald-400'
                              : r.effectiveTaxRate <= 30
                              ? 'bg-indigo-400'
                              : 'bg-rose-400'
                          }`}
                          style={{ width: `${Math.min(100, r.effectiveTaxRate * 2)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Monthly Net Pay */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="font-bold text-white font-mono text-sm">
                      {formatMoney(r.monthlyNetUSD, baseCurrency)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {formatMoney(r.monthlyNetLocal, r.country.currency)} local
                    </div>
                  </td>

                  {/* Real Purchasing Power */}
                  <td className="py-3.5 px-4 text-right">
                    <div
                      className={`font-bold font-mono text-sm ${
                        r.realPurchasingPowerUSD >= 30000
                          ? 'text-emerald-400'
                          : r.realPurchasingPowerUSD >= 15000
                          ? 'text-cyan-300'
                          : 'text-amber-400'
                      }`}
                    >
                      ${Math.round(r.realPurchasingPowerUSD).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">after basic living</div>
                  </td>

                  {/* Tax Freedom Day */}
                  <td className="py-3.5 px-4 text-right hidden lg:table-cell">
                    <span className="font-semibold text-purple-300">
                      {dayOfYearToDate(r.taxFreedomDay)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      Day {r.taxFreedomDay} of 365
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {onNavigateCountry && (
                        <button
                          onClick={() => onNavigateCountry(r.country.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1"
                        >
                          <span>Guide</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}

                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold">
                          <Check className="w-3 h-3" />
                          <span>Comparing</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => onAddCountry(r.country.id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-indigo-600 border border-white/[0.1] hover:border-transparent text-slate-200 hover:text-white text-[11px] font-bold transition-all cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Compare</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};
