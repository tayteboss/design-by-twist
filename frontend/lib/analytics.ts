export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

export const LINKEDIN_PARTNER_ID =
  process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID ?? "";

export const COOKIE_CONSENT_NAME = "dbt-cookie-consent";

/** Dispatched from the cookie banner when the user accepts. */
export const COOKIE_CONSENT_ACCEPTED_EVENT = "dbt-cookie-accepted";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  // Avoid importing js-cookie here so this module stays safe for SSR imports.
  return document.cookie.includes(`${COOKIE_CONSENT_NAME}=true`);
}

/** Call after setting up a conversion action in LinkedIn Campaign Manager. */
export function trackLinkedInConversion(conversionId: number): void {
  if (typeof window === "undefined" || !window.lintrk) return;
  window.lintrk("track", { conversion_id: conversionId });
}
