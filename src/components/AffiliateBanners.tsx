import React from 'react';
import { ExternalLink, Shield, Globe2, Building2 } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export const AffiliateBanners: React.FC = () => {
  const partners = [
    {
      name: SITE_CONFIG.affiliates.startfleet.name,
      badge: SITE_CONFIG.affiliates.startfleet.tag,
      headline: SITE_CONFIG.affiliates.startfleet.headline,
      description: SITE_CONFIG.affiliates.startfleet.description,
      link: SITE_CONFIG.affiliates.startfleet.destinationUrl,
      cloakedDisplay: SITE_CONFIG.affiliates.startfleet.cloakedPath,
      cta: SITE_CONFIG.affiliates.startfleet.ctaText,
      icon: Building2,
      gradient: 'from-amber-600/15 via-orange-950/20 to-[#0f111a] border-amber-500/30 text-amber-400',
    },
    {
      name: SITE_CONFIG.affiliates.wise.name,
      badge: SITE_CONFIG.affiliates.wise.tag,
      headline: SITE_CONFIG.affiliates.wise.headline,
      description: SITE_CONFIG.affiliates.wise.description,
      link: SITE_CONFIG.affiliates.wise.destinationUrl,
      cloakedDisplay: SITE_CONFIG.affiliates.wise.cloakedPath,
      cta: SITE_CONFIG.affiliates.wise.ctaText,
      icon: Globe2,
      gradient: 'from-emerald-600/15 via-teal-950/20 to-[#0f111a] border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recommended International Solutions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Trusted Partners for Cross-Border Earners & Founders
          </h2>
        </div>
        <span className="text-[11px] text-slate-500">
          Independent partner recommendations
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partners.map((p, i) => {
          const IconComponent = p.icon;
          return (
            <div
              key={i}
              className={`rounded-3xl p-6 sm:p-7 bg-gradient-to-br ${p.gradient} border backdrop-blur-xl flex flex-col justify-between relative group hover:border-white/[0.2] transition-all duration-300 shadow-xl`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{p.name}</h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                        {p.badge}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 rounded-md bg-white/[0.04]">
                    {p.cloakedDisplay}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-extrabold text-white mb-2 leading-snug">
                  {p.headline}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.1] flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:shadow-lg"
                >
                  <span>{p.cta}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
        {SITE_CONFIG.affiliateDisclosure}
      </div>
    </section>
  );
};
