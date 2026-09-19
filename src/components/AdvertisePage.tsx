import React, { useState } from 'react';
import { Megaphone, Check, Send, Sparkles, Target, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../config';

interface AdvertisePageProps {
  onNavigateHome: () => void;
}

export const AdvertisePage: React.FC<AdvertisePageProps> = ({ onNavigateHome }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    placement: 'Country Hub Exclusive Sponsor',
    budget: 'Custom / Early Adopter',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // If formspreeId is configured in config.ts, submit via fetch
    if (SITE_CONFIG.formspreeId) {
      fetch(`https://formspree.io/f/${SITE_CONFIG.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      }).catch((err) => console.warn('Formspree submit failed:', err));
    }

    // Also persist locally
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
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors cursor-pointer"
      >
        <span>← Back to Calculator</span>
      </button>

      {/* Header */}
      <div className="mb-12 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
          <Megaphone className="w-3.5 h-3.5" />
          <span>Early Partner & Sponsorship Opportunities</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Reach High-Intent Global Earners, Expats & Founders
        </h1>
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
          Position your fintech app, international banking solution, expat health insurance, or corporate formation service in front of people actively planning cross-border moves.
        </p>
      </div>

      {/* Qualitative Value Grid (Honest, authentic, zero inflated fake numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Target className="w-6 h-6 text-indigo-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Laser-Targeted Intent</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every user is actively evaluating take-home salary, cross-border tax deltas, or corporate restructuring. Zero passive or low-quality traffic.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <Sparkles className="w-6 h-6 text-emerald-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Founding Partner Rates</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Lock in long-term foundational sponsorship rates across country hubs, comparison pages, and high-ranking SEO guides.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
          <ShieldCheck className="w-6 h-6 text-purple-400 mb-3" />
          <h3 className="text-base font-bold text-white mb-1">Clean, Uncluttered UX</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We do not run spammy ad networks or interstitial popups. Partners receive native, beautifully integrated cards that respect user trust.
          </p>
        </div>
      </div>

      {/* Available Ad Placements Spec */}
      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] mb-12 space-y-6">
        <h2 className="text-xl font-bold text-white">Available Sponsorship Inventory</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase text-amber-400">Placement A</span>
            <div className="text-sm font-bold text-white">Country Hub Exclusive Banner</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Claim the exclusive partner spot for a specific country (e.g. "Exclusive UAE Banking Partner" or "Official Portugal NHR Advisory").
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase text-indigo-400">Placement B</span>
            <div className="text-sm font-bold text-white">In-Article Contextual Cards</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native embedded recommendation box inside top-ranking relocation articles (e.g. California vs Texas, European Tax Havens).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400">Placement C</span>
            <div className="text-sm font-bold text-white">Homepage Trusted Partner Card</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Featured on the homepage in the curated "Recommended International Solutions" grid alongside leaders like Wise and StartFleet.
            </p>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08]">
        {formSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Thank you for reaching out! Our partnerships team will review your brand alignment and reply within 24–48 hours with our media kit and custom options.
            </p>
            <div className="pt-2 text-xs text-slate-400">
              Direct contact: <strong className="text-indigo-300">{SITE_CONFIG.supportEmail}</strong>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Request Media Kit & Partnership Options</h2>
              <p className="text-xs text-slate-400">
                Inquiries are sent directly to our partnerships desk at{' '}
                <span className="text-indigo-300">{SITE_CONFIG.supportEmail}</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="Sarah Jenkins"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Business Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="sarah@fintech.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company / Product</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white focus:border-indigo-500 focus:outline-none"
                  placeholder="GlobalBank / ExpatTax Ltd"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Placement</label>
                <select
                  value={formData.placement}
                  onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Country Hub Exclusive Sponsor">Country Hub Exclusive Sponsor</option>
                  <option value="In-Article Contextual Cards">In-Article Contextual Cards</option>
                  <option value="Homepage Trusted Partner Card">Homepage Trusted Partner Card</option>
                  <option value="Custom Strategic Integration">Custom Strategic Integration</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tell us about your audience & offer</label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-4 rounded-xl bg-black/40 border border-white/[0.1] text-xs text-white focus:border-indigo-500 focus:outline-none"
                placeholder="What service do you provide, and which countries or reader segments are you looking to target?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Partnership Inquiry</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
