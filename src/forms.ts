import { SITE_CONFIG } from './config';

// Contact, partnership, and email forms may submit only to a configured endpoint.
// An empty id must not report success or write the entry into localStorage.
export function configuredFormEndpoint(): string | null {
  const formspreeId = SITE_CONFIG.formspreeId.trim();
  if (formspreeId) return `https://formspree.io/f/${formspreeId}`;
  const webhook = SITE_CONFIG.newsletterWebhookUrl.trim();
  if (webhook) return webhook;
  return null;
}
