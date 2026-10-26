/**
 * Cookie consent state management for TIDEWATER / SLATE & COPPER.
 *
 * Stored in localStorage as JSON under key `cookie-consent`.
 * Categories: necessary (always on, can't be disabled), analytics, marketing.
 *
 * Usage:
 *   - getCookieConsent() → reads the stored consent or null if first visit
 *   - saveCookieConsent(state) → persists to localStorage + dispatches event
 *   - subscribeToCookieConsent(cb) → listens for changes (banner ↔ modal ↔ floating button sync)
 *   - openCookiePreferences() → dispatches `cookie-consent-open` event so the
 *     CookieConsent component can re-open the modal from any other component
 *     (used by the cookie-policy page's "Manage preferences" button).
 */
const STORAGE_KEY = "cookie-consent";
const EVENT_NAME = "cookie-consent-changed";
const OPEN_EVENT = "cookie-consent-open";

export type CookieCategory = "necessary" | "analytics" | "marketing";

export interface CookieConsent {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO 8601 string */
  timestamp: string;
}

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CookieConsent;
    if (parsed && typeof parsed === "object") {
      return { ...parsed, necessary: true };
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(
  state: Omit<CookieConsent, "necessary" | "timestamp">,
) {
  if (typeof window === "undefined") return;
  const payload: CookieConsent = {
    necessary: true,
    analytics: state.analytics,
    marketing: state.marketing,
    timestamp: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
}

export function subscribeToCookieConsent(
  callback: (state: CookieConsent | null) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback(getCookieConsent());
  window.addEventListener(EVENT_NAME, handler);
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) handler();
  };
  window.addEventListener("storage", storageHandler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}

export function openCookiePreferences() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export const COOKIE_OPEN_EVENT = OPEN_EVENT;
