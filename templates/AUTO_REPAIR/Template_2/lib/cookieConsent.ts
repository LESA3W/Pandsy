/**
 * Cookie consent helpers. State stored in localStorage under "cookie-consent"
 * as JSON. Components subscribe via the `cookieConsentChanged` custom event
 * so the floating button + banner + modal all stay in sync.
 */

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  set: boolean;
};

const STORAGE_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookieConsentChanged";

const DEFAULT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  set: false,
};

export function getConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
      set: !!parsed.set,
    };
  } catch {
    return DEFAULT;
  }
}

export function setConsent(next: Partial<ConsentState>): void {
  if (typeof window === "undefined") return;
  const merged: ConsentState = {
    necessary: true,
    analytics: !!next.analytics,
    marketing: !!next.marketing,
    set: true,
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: merged }));
}

/**
 * Reopens the cookie preferences modal from anywhere (e.g. the
 * "Manage cookie preferences" button on /cookie-policy).
 */
export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("openCookiePreferences"));
}
