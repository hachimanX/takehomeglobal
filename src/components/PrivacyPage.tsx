import React from 'react';
import { SITE_CONFIG } from '../config';
import { GA_MEASUREMENT_ID } from '../analytics';
import { AnalyticsConsentControl } from './ConsentBanner';

interface PrivacyPageProps {
  onNavigateHome: () => void;
  onNavigate: (view: string, param?: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigateHome, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-slate-300">
      <button
        type="button"
        onClick={onNavigateHome}
        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 mb-8 transition-colors"
      >
        <span>← Back to Calculator</span>
      </button>

      <div className="mb-8">
        <p className="text-xs font-semibold tracking-wide text-amber-300 mb-3">
          Draft for review. Not a finished legal policy.
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Privacy
        </h1>
        <p className="text-base text-slate-300 leading-relaxed">
          The operator, postal address, contact mailbox, and governing law for {SITE_CONFIG.brandName} are not published on this site. Do not treat this page as a complete privacy notice or as legal advice. It describes what this version of the site actually does.
        </p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Calculator</h2>
          <p>
            Salary and tax figures are calculated in your browser. There is no account. The calculator does not post your salary to a {SITE_CONFIG.brandName} server.
          </p>
          <p>
            The page can put an income figure in the address (query parameters such as income, currency, and countries). Anything in the address bar is visible on your device and can be sent to another site if you follow a link, through the browser referrer. Exchange rates are requested from the public Frankfurter service. That request does not include your salary.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Analytics</h2>
          <p>
            Google Analytics 4, measurement ID {GA_MEASUREMENT_ID}, is not loaded until you press Accept analytics. Decline analytics stores a decline and does not load the tag.
          </p>
          <p>
            Accepting lets Google&apos;s script run. It can set cookies whose names start with _ga and send page measurements to Google. The tag is not given a copy of the salary field. Google&apos;s handling of that measurement is Google&apos;s, not this draft&apos;s.
          </p>
          <p>
            The choice is stored in this browser under the localStorage key thg_analytics_consent, with the value accepted or declined.
          </p>
          <p>
            Withdraw analytics consent sets that key to declined, asks the tag to stop, and expires Google Analytics cookies this page can see. Reload the page to confirm the tag is not requested again. Withdrawal here does not delete measurements Google may already have stored.
          </p>
          <p>
            The AI instructions page does not load this tag.
          </p>
          <AnalyticsConsentControl />
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Forms</h2>
          <p>
            Contact, partnership, and email-alert forms do not submit. No inbox is connected. Entries are not delivered and are not saved as messages.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Wise link</h2>
          <p>
            Some pages link to a Wise invite URL. Those links use rel=&quot;sponsored nofollow&quot;. The site may earn a commission. This draft does not add an advertiser agreement.
          </p>
          <p>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Affiliate disclosure is on the About page.
            </button>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white">Storage</h2>
          <p>
            Before a choice, this site does not set an analytics cookie. After you accept, Google may. Decline and withdrawal are stored in this browser so the tag stays off on later visits. {SITE_CONFIG.brandName} does not build an advertising profile.
          </p>
        </section>
      </div>
    </div>
  );
};
