import React, { useState, useEffect } from 'react';
import type { Article } from '../data/articlesData';
import { Clock, Calendar, ArrowRight, Sparkles, Calculator, Zap } from 'lucide-react';
import { formatMoney } from '../engine/calculator';

interface ArticleViewProps {
  article: Article;
  onNavigateHome: () => void;
  onNavigateArticles: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigateHome,
  onNavigateArticles,
}) => {
  // Live in-article simulator state for California vs Texas or US vs UK
  const [testSalary, setTestSalary] = useState(150000);

  // Inject dynamic JSON-LD structured data for this article
  useEffect(() => {
    const schemaId = 'article-schema-ld';
    let script = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = schemaId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      author: {
        '@type': 'Organization',
        name: article.author || 'TakeHomeGlobal Research Team',
        url: 'https://takehomeglobal.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'TakeHomeGlobal',
        url: 'https://takehomeglobal.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://takehomeglobal.com/logo.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://takehomeglobal.com/#/tax-guides/${article.slug}/`,
      },
      datePublished: '2026-01-01',
      dateModified: '2026-09-19',
    };

    script.textContent = JSON.stringify(jsonLd);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [article]);

  // Quick calculations for in-article widgets
  const isCalTexas = article.slug.includes('california-vs-texas');

  // Cal vs Texas estimation
  const calStateTax = testSalary * 0.093; // approx blended marginal
  const calFederalTax = testSalary * 0.18;
  const calTakeHome = testSalary - calFederalTax - calStateTax - 9500;
  const texTakeHome = testSalary - calFederalTax - 9500; // 0% state tax
  const texSavings = texTakeHome - calTakeHome;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back button */}
      <div className="flex items-center gap-3 mb-8 text-xs font-semibold">
        <button
          onClick={onNavigateArticles}
          className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          ← All Tax Guides
        </button>
        <span className="text-slate-600">/</span>
        <button
          onClick={onNavigateHome}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Calculator
        </button>
      </div>

      {/* Header */}
      <header className="mb-10 pb-8 border-b border-white/[0.08]">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-4">
          {article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-6">
          {article.description}
        </p>

        {/* Metadata bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="font-semibold text-slate-300">By {article.author}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishDate}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{article.readTime}</span>
          </span>
        </div>
      </header>

      {/* Key Takeaway Callout Box */}
      <div className="p-6 rounded-3xl bg-indigo-950/30 border border-indigo-500/30 mb-10 shadow-xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Key Takeaway</span>
        </div>
        <p className="text-base font-semibold text-white mb-4">
          {article.highlightStat}
        </p>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          {article.summaryPoints.map((pt, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✔</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Interactive In-Article Widget (EEAT & User Engagement Booster) */}
      {isCalTexas && (
        <div className="my-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-900/30 via-slate-900 to-[#0c0e15] border border-indigo-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
              <Calculator className="w-4 h-4" />
              <span>Interactive Take-Home Simulator</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">● 2026 Rates</span>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Test an Annual Gross Salary ($ USD)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                step="10000"
                value={testSalary}
                onChange={(e) => setTestSalary(Number(e.target.value))}
                className="w-44 px-4 py-2 text-lg font-bold rounded-xl bg-black/50 border border-white/[0.1] text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="flex gap-1.5">
                {[100000, 150000, 250000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTestSalary(amt)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 cursor-pointer"
                  >
                    ${amt / 1000}k
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/[0.08]">
            <div className="p-4 rounded-2xl bg-white/[0.03]">
              <span className="text-[11px] text-slate-400 block mb-1">California Take-Home</span>
              <span className="text-xl font-extrabold text-white">
                {formatMoney(calTakeHome, 'USD')}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03]">
              <span className="text-[11px] text-slate-400 block mb-1">Texas Take-Home</span>
              <span className="text-xl font-extrabold text-white">
                {formatMoney(texTakeHome, 'USD')}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[11px] text-emerald-300 font-bold block mb-1 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> Texas Annual Delta
              </span>
              <span className="text-xl font-black text-emerald-400">
                +{formatMoney(texSavings, 'USD')} / yr
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className="space-y-10 text-sm sm:text-base leading-relaxed">
        {article.content.map((sec, idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {sec.heading}
            </h2>

            {sec.body.map((p, pIdx) => (
              <p key={pIdx} className="text-slate-400">
                {p}
              </p>
            ))}

            {/* Embedded Table if present */}
            {sec.table && (
              <div className="overflow-x-auto my-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-white/[0.04] text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/[0.08]">
                    <tr>
                      {sec.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="py-3 px-4">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {sec.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02]">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-3 px-4 ${cIdx === 0 ? 'font-bold text-white' : ''}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Bottom CTA to Full Calculator */}
      <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-[#12141e] border border-indigo-500/30 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Want to benchmark your exact income across 35+ countries?</h3>
        <p className="text-xs text-slate-400 mb-5 max-w-md mx-auto">
          Enter your gross salary into our free, 100% private calculator to see side-by-side net pay, local living costs, and tax freedom days.
        </p>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <span>Open Full Free Tax Calculator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
