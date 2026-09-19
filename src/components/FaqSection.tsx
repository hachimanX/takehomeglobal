import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How accurate are the tax calculations on TakeHomeGlobal?',
    a: 'Every tax rate, deduction threshold, and contribution schedule is verified against official government tax authorities (IRS for the US, HMRC for the UK, BMF for Germany, ATO for Australia, etc.) and updated for the 2026 fiscal year. While we provide reference-grade estimates using statutory marginal brackets and standard allowances, actual tax liabilities may vary based on itemized deductions, family status, and bilateral tax treaties. Always consult a qualified tax advisor for official filing.',
  },
  {
    q: 'Are employee Social Security and Healthcare contributions included?',
    a: 'Yes. Unlike calculators that only compute statutory income tax, TakeHomeGlobal models mandatory employee-side social contributions—such as FICA (Social Security & Medicare) in the United States, National Insurance (NI) in the United Kingdom, Sozialversicherung in Germany, PRSI & USC in Ireland, and CPP/EI in Canada—so the take-home pay figure accurately reflects the net cash that reaches your bank account.',
  },
  {
    q: 'Are all 50 US State income taxes supported?',
    a: 'Yes. TakeHomeGlobal includes tax brackets, flat rates, standard deductions, and personal exemptions for all 50 US States plus the District of Columbia. States with zero wage income tax (such as Texas, Florida, Washington, Nevada, Tennessee, Wyoming, South Dakota, and Alaska) are correctly modeled at 0%.',
  },
  {
    q: 'Is any of my financial data stored, logged, or sent to a server?',
    a: 'No. TakeHomeGlobal operates 100% client-side inside your web browser. There are no user accounts, no analytics tracking your salary numbers, and zero server communication regarding your income. Your numbers never leave your device.',
  },
  {
    q: 'What is Real Purchasing Power and how is it calculated?',
    a: 'Real Purchasing Power looks beyond tax rates to determine how far your money actually stretches. We take your annual take-home pay (converted to USD) and subtract estimated essential annual living expenses (food, groceries, local transportation, utilities, and healthcare, benchmarked from Numbeo city indexes, excluding rent). This reveals your true disposable spending money.',
  },
  {
    q: 'What is Tax Freedom Day?',
    a: 'Tax Freedom Day is the theoretical date in the calendar year when an individual has earned enough income to satisfy their total annual tax obligations. Before this date, all your earnings theoretically go to taxes; after this date, you keep 100% of your earnings. It is calculated as: 365 × (Total Tax / Gross Income).',
  },
  {
    q: 'How are exchange rates handled when comparing international salaries?',
    a: 'Your gross income is converted from your selected base currency to the target country’s local statutory currency using daily rates from the European Central Bank (ECB) via the public Frankfurter API. Tax brackets are applied strictly in the local legal currency, and net proceeds are converted back into your chosen base currency for direct comparison.',
  },
  {
    q: 'Can this tool be used for official relocation or filing planning?',
    a: 'This application is built for research, salary benchmarking, and informational comparison. Tax regulations and residency definitions (such as statutory 183-day presence tests, split-year treatment, or expat special regimes) are complex. Always verify with a certified public accountant (CPA) or local fiscal advisor before making relocation commitments.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Questions, Answered Straight
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Clear explanations of how calculations, tax bands, and living cost metrics are produced.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/[0.08] bg-[#12141e]/70 backdrop-blur-md overflow-hidden transition-colors hover:border-white/[0.15]"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left py-4 px-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-200 hover:text-white transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-indigo-400' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.04] pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
