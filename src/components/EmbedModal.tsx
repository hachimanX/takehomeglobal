import React, { useState } from 'react';
import { X, Copy, Check, Code, Globe, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../config';

interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCountry?: string;
  defaultCurrency?: string;
}

export const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  onClose,
  defaultCountry = 'usa',
  defaultCurrency = 'USD',
}) => {
  const [copied, setCopied] = useState(false);
  const [embedWidth, setEmbedWidth] = useState('100%');
  const [embedHeight, setEmbedHeight] = useState('680');

  if (!isOpen) return null;

  const embedCode = `<iframe src="${SITE_CONFIG.siteUrl}/?embed=true&country=${defaultCountry}&currency=${defaultCurrency}" width="${embedWidth}" height="${embedHeight}" style="border:1px solid rgba(255,255,255,0.12);border-radius:16px;box-shadow:0 10px 25px -5px rgba(0,0,0,0.3);" frameborder="0" loading="lazy"></iframe>\n<p style="font-size:12px;color:#94a3b8;font-family:sans-serif;margin-top:8px;">Powered by <a href="${SITE_CONFIG.siteUrl}" target="_blank" rel="noopener" style="color:#6366f1;text-decoration:underline;">${SITE_CONFIG.brandName} Global Tax Calculator</a></p>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#0f111a] border border-white/[0.12] p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Embed This Calculator</h3>
            <p className="text-xs text-slate-400">
              Add the {SITE_CONFIG.brandName} interactive calculator to your website or blog for free.
            </p>
          </div>
        </div>

        {/* Dimension Controls */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Width
            </label>
            <input
              type="text"
              value={embedWidth}
              onChange={(e) => setEmbedWidth(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/[0.1] text-white focus:border-indigo-500 focus:outline-none"
              placeholder="100% or 600px"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Height (px)
            </label>
            <input
              type="text"
              value={embedHeight}
              onChange={(e) => setEmbedHeight(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/[0.1] text-white focus:border-indigo-500 focus:outline-none"
              placeholder="680"
            />
          </div>
        </div>

        {/* Code Snippet Box */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-300">HTML Embed Code</span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <Globe className="w-3 h-3" /> Responsive & Lightweight
            </span>
          </div>
          <div className="relative">
            <textarea
              readOnly
              rows={5}
              value={embedCode}
              className="w-full p-3 font-mono text-[11px] text-indigo-300 bg-black/60 border border-white/[0.1] rounded-2xl focus:outline-none select-all resize-none"
            />
          </div>
        </div>

        {/* Benefits Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-[11px] text-slate-400">
          <Shield className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <span>
            Free for commercial and personal websites. The snippet automatically updates statutory 2026 tax brackets and exchange rates with zero maintenance.
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Embed Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
