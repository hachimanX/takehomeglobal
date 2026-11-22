import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { configuredFormEndpoint } from '../forms';

export const TopAnnouncementBar: React.FC = () => {
  const endpoint = configuredFormEndpoint();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sent' | 'failed'>('idle');
  const [visible, setVisible] = useState(true);

  if (!endpoint || !visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, source: 'top_announcement_bar' }),
    })
      .then((response) => {
        setStatus(response.ok ? 'sent' : 'failed');
      })
      .catch(() => setStatus('failed'));
  };

  return (
    <div className="bg-[#fffbeb] text-[#78350f] border-b border-[#fde68a] text-xs py-2 px-3 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <p className="font-medium text-[#92400e]">
          Optional email note. This site does not attach a file to the request.
        </p>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {status === 'sent' ? (
            <p className="flex items-center gap-1.5 text-emerald-900 font-semibold bg-emerald-100 px-3 py-1 rounded-md" role="status">
              <Check className="w-3.5 h-3.5" />
              <span>The address was accepted by the configured form endpoint. Delivery of a reply is not confirmed.</span>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address"
                className="bg-white px-2.5 py-1 text-xs rounded border border-amber-300 text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500 w-full sm:w-48"
              />
              <button type="submit" className="bg-[#92400e] text-white px-3 py-1 rounded font-bold text-xs shrink-0">
                Send address
              </button>
            </form>
          )}
          {status === 'failed' && (
            <p role="status">The endpoint did not accept the address. Nothing was saved in this browser.</p>
          )}
          <button type="button" onClick={() => setVisible(false)} className="text-amber-950 p-1" aria-label="Dismiss announcement">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
