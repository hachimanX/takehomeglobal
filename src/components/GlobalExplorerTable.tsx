import React, { useState, useMemo } from 'react';
import type { CountryInfo } from '../types';
import { calculateCountryTax, formatMoney, dayOfYearToDate } from '../engine/calculator';
import { Search, ArrowUpDown, Plus, Check } from 'lucide-react';

interface GlobalExplorerTableProps {
  countries: CountryInfo[];
  grossIncome: number;
  baseCurrency: string;
  exchangeRates: Record<string, number>;
  selectedCountryIds: string[];
  onAddCountry: (id: string) => void;
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
}) => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('effectiveTaxRate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Compute calculation for each country in the entire catalog
  const tableData = useMemo(() => {
    return countries.map((c) => {
      // Pick default subregion if applicable
      const subRegion = c.subRegions ? Object.keys(c.subRegions)[0] : undefined;
      return calculateCountryTax(c, grossIncome, baseCurrency, exchangeRates, subRegion);
    });
  }, [countries, grossIncome, baseCurrency, exchangeRates]);

  // Filter & Sort
  const filteredAndSorted = useMemo(() => {
    return tableData
      .filter(
        (r) =>
          r.country.name.toLowerCase().includes(search.toLowerCase()) ||
          r.country.code.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
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
  }, [tableData, search, sortField, sortOrder]);


  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder(field === 'netUSD' || field === 'realPurchasingPowerUSD' ? 'desc' : 'asc');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Global Tax & Purchasing Power Index (2026)
          </h2>
          <p className="text-sm text-slate-400">
            Compare all {countries.length} countries at {formatMoney(grossIncome, baseCurrency)} gross salary
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 bg-white/[0.05] border border-white/[0.1] focus:border-indigo-500 rounded-xl pl-9 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-3xl border border-white/[0.08] glass-card shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-white/[0.04] text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-white/[0.08]">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Country</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('effectiveTaxRate')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Effective Tax</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('netUSD')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Monthly Net Pay</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('realPurchasingPowerUSD')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Real Spending Money</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => handleSort('taxFreedomDay')}
                className="py-3.5 px-4 cursor-pointer hover:text-white transition-colors hidden md:table-cell"
              >
                <div className="flex items-center gap-1.5">
                  <span>Tax Freedom Day</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/[0.04]">
            {filteredAndSorted.map((row) => {
              const isSelected = selectedCountryIds.includes(row.country.id);

              return (
                <tr
                  key={row.country.id}
                  className="hover:bg-white/[0.03] transition-colors"
                >
                  {/* Country & Flag */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{row.country.flag}</span>
                      <div>
                        <div className="font-semibold text-white">{row.country.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {formatMoney(row.grossLocal, row.country.currency)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Effective Tax Rate */}
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md font-bold text-xs ${
                        row.effectiveTaxRate <= 15
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : row.effectiveTaxRate <= 30
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                          : row.effectiveTaxRate <= 40
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {row.effectiveTaxRate.toFixed(1)}%
                    </span>
                  </td>

                  {/* Monthly Net Pay */}
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">
                      {formatMoney(row.monthlyNetUSD, baseCurrency)}/mo
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Annual: {formatMoney(row.netUSD, baseCurrency)}
                    </div>
                  </td>

                  {/* Real Purchasing Power */}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">
                      {formatMoney(row.realPurchasingPowerUSD, baseCurrency)}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Living cost: -${Math.round(row.country.costOfLivingAnnualUSD).toLocaleString()}
                    </div>
                  </td>

                  {/* Tax Freedom Day */}
                  <td className="py-3 px-4 hidden md:table-cell text-slate-300">
                    {dayOfYearToDate(row.taxFreedomDay)}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-4 text-right">
                    {isSelected ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold px-2 py-1 bg-emerald-500/10 rounded-lg">
                        <Check className="w-3 h-3" />
                        <span>Added</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onAddCountry(row.country.id)}
                        className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-white font-semibold px-2.5 py-1 bg-indigo-600/15 hover:bg-indigo-600 border border-indigo-500/30 rounded-lg transition-all"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Compare</span>
                      </button>
                    )}
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
