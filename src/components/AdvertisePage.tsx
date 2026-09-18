import React, { useState } from 'react';
import { Megaphone, Check, Send } from 'lucide-react';

interface AdvertisePageProps {
  onNavigateHome: () => void;
}

export const AdvertisePage: React.FC<AdvertisePageProps> = ({ onNavigateHome }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    placement: 'Country Hub Sponsorship',
    budget: '$500 - $1,500/mo',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      const inquiries = JSON.parse(localStorage.getItem('ad_inquiries') || '[]');
      inquiries.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('ad_inquiries', JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      {/* Back link */}
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
      >
        <span>← Back to Calculator</span>
      </button>

      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Megaphone className="w-3.5 h-3.5" />
          <span>Advertising & Strategic Partnerships</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Reach High-Intent Global Earners, Expats & Founders
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Connect your financial services, expat banking, international health insurance, or tax consultancy with 65,000+ monthly high-earning decision makers.
        </p>
      </div>

      {/* Audience Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <div className="text-2xl sm:text-3xl font-black text-indigo-400 mb-1">65k+</div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Monthly Pageviews</div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 mb-1">$120k+</div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Avg Salary Analyzed</div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <div className="text-2xl sm:text-3xl font-black text-purple-400 mb-1">82%</div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">US / UK / EU Traffic</div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-center">
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 mb-1">4.2 min</div>
          <div className="text-[11px] text-slate-400 uppercase font-semibold">Avg Session Duration</div>
        </div>
      </div>

      {/* Sponsorship Opportunities */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Sponsorship Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-400 uppercase mb-2">Category Exclusive</div>
              <h3 className="text-base font-bold text-white mb-2">Country Hub Sponsor</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Be the exclusive verified local tax advisor or service partner on target country pages (e.g. Germany, UK, Portugal, UAE, Singapore).
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-300 pt-3 border-t border-white/[0.06]">
              From $250 / month
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-purple-400 uppercase mb-2">High Engagement</div>
              <h3 className="text-base font-bold text-white mb-2">Newsletter Feature</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Dedicated sponsor slot in "The Tax Brief" sent bi-weekly to verified expat and remote worker subscribers with 52%+ open rates.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-300 pt-3 border-t border-white/[0.06]">
              From $400 / edition
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase mb-2">Maximum Reach</div>
              <h3 className="text-base font-bold text-white mb-2">Native Comparison Card</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                High-converting native tool card integrated directly into salary comparison and relocation savings views across all countries.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-300 pt-3 border-t border-white/[0.06]">
              Custom CPM / Retainer
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="p-8 rounded-3xl bg-[#12141e]/90 border border-white/[0.1] shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-2">Request Media Kit & Partnership Pricing</h2>
        <p className="text-xs text-slate-400 mb-6">
          Tell us about your brand or practice. We will respond within 24 hours with audience analytics and custom availability.
        </p>

        {formSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-300 space-y-2">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-lg text-white">Inquiry Received!</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you, {formData.name}. Our partnerships team will review your proposal and send the media kit to {formData.email} shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sarah Jenkins"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Business Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@company.com"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Company / Brand</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Global Expat Tax Ltd"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Desired Placement</label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  className="w-full bg-[#12141e] border border-white/[0.1] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Country Hub Sponsorship">Country Hub Exclusive Sponsor</option>
                  <option value="Newsletter Feature">Newsletter Feature ("The Tax Brief")</option>
                  <option value="Native Comparison Tool">Native Comparison Card</option>
                  <option value="Custom Partnership">Custom Campaign</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Campaign Goals & Target Regions</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="We provide US expat tax returns and would like to sponsor the US and UK calculator pages..."
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>Submit Sponsorship Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
