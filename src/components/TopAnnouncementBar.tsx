import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { SITE_CONFIG } from '../config';

export const TopAnnouncementBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('tax_brief_banner_dismissed');
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('tax_brief_banner_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitted(true);

    if (SITE_CONFIG.formspreeId) {
      fetch(`https://formspree.io/f/${SITE_CONFIG.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'top_announcement_bar', timestamp: new Date().toISOString() }),
      }).catch((err) => console.warn('Formspree submit error:', err));
    }

    try {
      // Store email in localStorage lead list
      const existing = JSON.parse(localStorage.getItem('tax_subscribers') || '[]');
      existing.push({ email, date: new Date().toISOString() });
      localStorage.setItem('tax_subscribers', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setTimeout(() => {
      handleDismiss();
    }, 2800);
  };

  if (!visible) return null;

  return (
    <div className="bg-[#fffbeb] text-[#78350f] border-b border-[#fde68a] text-xs py-2 px-3 sm:px-6 relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Banner Tagline */}
        <div className="flex items-center gap-2 font-medium">
          <span className="text-indigo-600 font-black">■</span>
          <span className="font-bold text-[#92400e]">The Tax Brief</span>
          <span className="hidden sm:inline text-slate-400">—</span>
          <span className="text-[#92400e] text-[11px] sm:text-xs">
            2026 Global Tax Arbitrage & Expat Playbook — 100% free download.
          </span>
        </div>

        {/* Email form */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {submitted ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-100 px-3 py-1 rounded-md">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>You're in! Check your inbox for the 2026 Playbook.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-white px-2.5 py-1 text-xs rounded border border-amber-300 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-48"
              />
              <button
                type="submit"
                className="bg-[#d97706] hover:bg-[#b45309] text-white px-3 py-1 rounded font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-sm"
              >
                Get it free →
              </button>
            </form>
          )}

          <button
            onClick={handleDismiss}
            className="text-amber-800 hover:text-amber-950 p-1 transition-colors cursor-pointer"
            title="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
