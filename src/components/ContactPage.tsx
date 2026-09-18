import React, { useState } from 'react';
import { Mail, Check, Send, Award } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiryType: 'tax_expert_listing',
    countryJurisdiction: 'United States',
    website: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const contacts = JSON.parse(localStorage.getItem('taxatlas_contacts') || '[]');
      contacts.push({ ...form, timestamp: new Date().toISOString() });
      localStorage.setItem('taxatlas_contacts', JSON.stringify(contacts));
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      <button
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
      >
        <span>← Back to Calculator</span>
      </button>

      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Contact TaxAtlas & Expert Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          Are you a licensed CPA, tax attorney, or relocation consultant looking to feature your practice on country hub calculators? Or do you have a regulatory update to report? Reach out below.
        </p>
      </div>

      {/* Tax Expert Spotlight Banner */}
      <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-3.5 mb-8">
        <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-white block mb-0.5">Are you a Tax Professional?</span>
          <span className="text-slate-300">
            We offer verified directory listings and exclusive header sponsor spots on individual country calculators (e.g. "Featured German Tax Advisor" on <code className="text-indigo-300">/tax-calculator/germany/</code>). Select "Verified Tax Expert Listing" below to connect with our partnerships team.
          </span>
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#12141e]/90 border border-white/[0.1] shadow-2xl">
        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Thank you, {form.name}. Our editorial and partnership team will review your message and reply to <strong className="text-white">{form.email}</strong> within 1 business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="David Miller, CPA"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="david@miller-cpa.com"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Inquiry Purpose</label>
                <select
                  value={form.inquiryType}
                  onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                  className="w-full bg-[#12141e] border border-white/[0.1] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="tax_expert_listing">Verified Tax Expert Listing / Sponsor</option>
                  <option value="tax_rule_update">Suggest Statutory Rate Update</option>
                  <option value="corporate_inquiry">Corporate / API Partnership</option>
                  <option value="general_feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Country / Region of Practice</label>
                <input
                  type="text"
                  value={form.countryJurisdiction}
                  onChange={(e) => setForm({ ...form, countryJurisdiction: e.target.value })}
                  placeholder="e.g. Germany, UK, California, Portugal"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Firm Website or LinkedIn Profile</label>
              <input
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="https://www.yourtaxpractice.com"
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Message / Proposal Details</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your services, credentials, or the specific country page you are interested in sponsoring..."
                className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>Submit Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
