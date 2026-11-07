import React from 'react';
import { Mail } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      <button
        type="button"
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
      >
        <span>← Back to Calculator</span>
      </button>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <Mail className="w-3.5 h-3.5" />
          <span>Contact</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Contact
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          There is no message inbox on this site. The form is turned off so it cannot say a message was sent. No name, email, or note is stored or delivered. A reply time is not offered.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#12141e]/90 border border-amber-500/30" role="status">
        <h2 className="text-lg font-bold text-white mb-2">Messages cannot be sent</h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Corrections, partnership notes, and directory requests are not collected here. Nothing you type on this page is submitted.
        </p>
      </div>
    </div>
  );
};
