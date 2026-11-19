import { useEffect, useState } from 'react';
import {
  CONSENT_EVENT,
  GA_MEASUREMENT_ID,
  applyConsent,
  loadGa4,
  readConsent,
  type ConsentChoice,
} from '../analytics';

function statusFor(choice: ConsentChoice | null, withdrawn: boolean): string {
  if (withdrawn) return 'Analytics consent withdrawn. Reload to confirm Google Analytics is not requested.';
  if (choice === 'accepted') return 'Analytics is allowed in this browser.';
  if (choice === 'declined') return 'Analytics is off in this browser.';
  return 'No analytics choice is saved. Google Analytics is not loaded.';
}

export function AnalyticsConsentControl() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [status, setStatus] = useState('Analytics loads only after an Accept choice in this browser.');

  useEffect(() => {
    const current = readConsent();
    // localStorage is read after mount so the prerendered HTML and the first client render match.
    // oxlint-disable-next-line react/set-state-in-effect
    setChoice(current);
    // oxlint-disable-next-line react/set-state-in-effect
    setStatus(statusFor(current, false));
    if (current === 'accepted') loadGa4();

    const onChange = (event: Event) => {
      const next = (event as CustomEvent<ConsentChoice>).detail;
      setChoice(next);
      setStatus(statusFor(next, next === 'declined'));
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return (
    <div className="space-y-2">
      <p className="text-[11px] text-slate-300 leading-relaxed" aria-live="polite">
        {status}
      </p>
      <button
        type="button"
        onClick={() => applyConsent('declined')}
        className="inline-flex items-center rounded-lg border border-white/20 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-white/10"
        aria-pressed={choice === 'declined'}
      >
        Withdraw analytics consent
      </button>
    </div>
  );
}

export function ConsentBanner() {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    const current = readConsent();
    // oxlint-disable-next-line react/set-state-in-effect
    setChoice(current);
    if (current === 'accepted') loadGa4();
    // oxlint-disable-next-line react/set-state-in-effect
    setReady(true);

    const onChange = (event: Event) => {
      setChoice((event as CustomEvent<ConsentChoice>).detail);
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!ready || choice !== null) return null;

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-300 bg-white text-slate-900 shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col lg:flex-row lg:items-center gap-4">
        <p className="text-sm leading-relaxed flex-1">
          Analytics is off until you choose. Accept loads Google Analytics 4, measurement ID {GA_MEASUREMENT_ID}. That script can set cookies and send page measurements to Google. It is not given the salary you type. Decline loads nothing.{' '}
          <a href="/privacy/" className="underline font-semibold text-indigo-800">
            Read the privacy draft
          </a>
          .
        </p>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => applyConsent('declined')}
            className="px-4 py-2 rounded-lg border-2 border-slate-900 bg-white text-slate-900 text-sm font-semibold"
          >
            Decline analytics
          </button>
          <button
            type="button"
            onClick={() => applyConsent('accepted')}
            className="px-4 py-2 rounded-lg bg-indigo-800 text-white text-sm font-semibold"
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
