import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

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
    }, 2500);
  };

  if (!visible) return null;

  return (
    <div className="bg-[#fffbeb] text-[#78350f] border-b border-[#fde68a] text-xs py-2 px-3 sm:px-6 relative z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Banner Tagline */}
        <div className="flex items-center gap-2 font-medium">
          <span className="text-blue-600 font-black">■</span>
          <span className="font-bold text-[#92400e]">The Tax Brief</span>
          <span className="hidden sm:inline text-slate-400">—</span>
          <span className="text-[#92400e] text-[11px] sm:text-xs">
            Real effective rates across 111+ countries — delivered bi-weekly, 100% free.
          </span>
        </div>

        {/* Email form */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {submitted ? (
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-100 px-3 py-1 rounded-md">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>You're subscribed! First brief lands shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border border-[#d97706]/30 text-[#1e293b] placeholder-slate-400 text-xs px-2.5 py-1 rounded-md focus:outline-none focus:border-[#b45309] w-full sm:w-48"
              />
              <button
                type="submit"
                className="bg-[#f59e0b] hover:bg-[#d97706] text-[#78350f] hover:text-white font-bold text-xs px-3 py-1 rounded-md whitespace-nowrap transition-colors shadow-xs"
              >
                Get it free →
              </button>
            </form>
          )}

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-black/5 rounded text-slate-500 hover:text-slate-800 transition-colors ml-1"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
