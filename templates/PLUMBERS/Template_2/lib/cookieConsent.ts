"use client";

// Cookie consent helpers (CLAUDE.md rule #6).
// Storage shape:
//   { necessary: true, analytics: boolean, marketing: boolean, ts: number }
// State changes broadcast via custom "cookie-consent-change" event so
// CookieConsent + the cookie-policy page button stay in sync.

export type ConsentChoice = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  ts: number;
};

const KEY = "cookie-consent";
const EVENT = "cookie-consent-change";

export function readConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      ts: typeof parsed.ts === "number" ? parsed.ts : Date.now(),
    };
  } catch {
    return null;
  }
}

export function writeConsent(choice: Omit<ConsentChoice, "necessary" | "ts">): void {
  if (typeof window === "undefined") return;
  const stored: ConsentChoice = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    ts: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(stored));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
}

export function subscribeConsent(handler: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = () => handler();
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
