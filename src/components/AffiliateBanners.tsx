import React from 'react';
import { ExternalLink, Shield, Globe2, Briefcase, Building2 } from 'lucide-react';

interface PartnerCard {
  name: string;
  tagline: string;
  badge: string;
  description: string;
  link: string;
  cta: string;
  icon: any;
  color: string;
}

const PARTNERS: PartnerCard[] = [
  {
    name: 'Wise',
    badge: 'International Banking',
    tagline: 'Send & receive money at the real mid-market exchange rate',
    description: 'Avoid inflated bank markups when converting your international salary. Hold 40+ currencies with local account details in USD, EUR, GBP, AUD, and SGD.',
    link: 'https://wise.com/?utm_source=taxatlas&utm_medium=affiliate',
    cta: 'Open Free Wise Account →',
    icon: Globe2,
    color: 'from-emerald-600/20 to-teal-900/10 border-emerald-500/30 text-emerald-400',
  },
  {
    name: 'Deel',
    badge: 'Global Payroll & EOR',
    tagline: 'Hire abroad, automate compliance, or invoice global clients',
    description: 'The preferred infrastructure for remote workers and international teams. Handles local tax withholdings, contractor agreements, and automated invoicing in 150+ countries.',
    link: 'https://www.deel.com/?utm_source=taxatlas&utm_medium=affiliate',
    cta: 'Explore Deel Solutions →',
    icon: Briefcase,
    color: 'from-indigo-600/20 to-purple-900/10 border-indigo-500/30 text-indigo-400',
  },
  {
    name: 'StartFleet',
    badge: 'Incorporation & Residency',
    tagline: 'Incorporate in the US, UK, or UAE with zero travel required',
    description: 'Set up your remote company structure, obtain international bank accounts (Mercury, Brex, Wise), and optimize your global tax footprint with dedicated formation specialists.',
    link: 'https://startfleet.io/?utm_source=taxatlas&utm_medium=partner',
    cta: 'Start Global Company →',
    icon: Building2,
    color: 'from-amber-600/20 to-orange-900/10 border-amber-500/30 text-amber-400',
  },
];

export const AffiliateBanners: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recommended International Tools</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Trusted Partners for Global Earners & Expats
          </h2>
        </div>
        <span className="text-[11px] text-slate-500 hidden sm:block">
          Transparent affiliate & partner disclosures apply
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PARTNERS.map((p) => {
          const Icon = p.icon;

          return (
            <div
              key={p.name}
              className={`rounded-3xl bg-gradient-to-b ${p.color} border p-6 flex flex-col justify-between backdrop-blur-xl shadow-lg hover:border-white/20 transition-all`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-bold text-lg text-white">
                    <Icon className="w-5 h-5" />
                    <span>{p.name}</span>
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300">
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-slate-200 mb-2 leading-snug">
                  {p.tagline}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-5">
                  {p.description}
                </p>
              </div>

              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] transition-all"
              >
                <span>{p.cta}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};
