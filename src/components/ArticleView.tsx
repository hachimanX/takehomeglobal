import React from 'react';
import type { Article } from '../data/articlesData';
import { Clock, Calendar, ArrowRight, Sparkles } from 'lucide-react';

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
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back button */}
      <div className="flex items-center gap-3 mb-8 text-xs font-semibold">
        <button
          onClick={onNavigateArticles}
          className="text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          ← All Tax Guides
        </button>
        <span className="text-slate-600">/</span>
        <button
          onClick={onNavigateHome}
          className="text-slate-400 hover:text-white transition-colors"
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

      {/* Bottom CTA to Calculator */}
      <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-[#12141e] border border-indigo-500/30 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Want to calculate your personal tax bill?</h3>
        <p className="text-xs text-slate-400 mb-5 max-w-md mx-auto">
          Enter your gross salary and see your custom monthly take-home pay, social security deductions, and real living cost balance.
        </p>
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
        >
          <span>Calculate Your Taxes Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};
