// TakeHomeGlobal - Central Application Configuration

export const SITE_CONFIG = {
  brandName: 'TakeHomeGlobal',
  domain: 'takehomeglobal.com',
  siteUrl: 'https://takehomeglobal.com',
  tagline: 'Global Take-Home Pay & Income Tax Calculator (2026)',
  taxYear: '2026',
  author: 'TakeHomeGlobal Team',
  supportEmail: 'hello@takehomeglobal.com',
  
  // Lead Capture & Newsletter Configuration
  // Paste your Formspree Form ID (e.g., 'mqazbopx') or webhook URL here.
  // When left blank, email submissions validate locally and trigger instant PDF download.
  formspreeId: '', 
  newsletterWebhookUrl: '',

  // Partner & Affiliate Links (Cloaked via /go/:slug)
  affiliates: {
    startfleet: {
      name: 'StartFleet',
      tag: 'US INCORPORATION & BANKING',
      headline: 'Register your US LLC or C-Corp from anywhere in the world',
      description:
        'Designed specifically for non-US residents. Form your Delaware or Wyoming company, obtain your US EIN, and secure US business bank accounts (Mercury, Relay) with zero US travel required.',
      destinationUrl: 'https://startfleet.io/?affp=0sfOAFhaZeMG',
      cloakedPath: '/go/startfleet',
      ctaText: 'Start a US Company →',
    },
    wise: {
      name: 'Wise',
      tag: 'INTERNATIONAL MULTI-CURRENCY BANKING',
      headline: 'Send & receive money at the real mid-market exchange rate',
      description:
        'Avoid high bank markups when converting your international salary. Hold 40+ currencies with local account details in USD, EUR, GBP, AUD, and SGD.',
      destinationUrl: 'https://wise.com/invite/dic/mohammadb901',
      cloakedPath: '/go/wise',
      ctaText: 'Open Free Wise Account →',
    },
  },

  // Compliant, generalized affiliate & legal disclaimer
  affiliateDisclosure:
    'Disclosure: TakeHomeGlobal is reader-supported. When you purchase services or open accounts through partner links on our site, we may earn an affiliate commission at no extra cost to you. We only recommend vetted platforms for security, compliance, and value.',

  legalDisclaimer:
    'TakeHomeGlobal is an independent educational and financial literacy tool designed to help individuals understand global take-home pay and tax structures. It is not intended for illegal tax avoidance, evasion, or formal legal, accounting, or tax advice. Calculations are estimates based on standard statutory rates.',
};
