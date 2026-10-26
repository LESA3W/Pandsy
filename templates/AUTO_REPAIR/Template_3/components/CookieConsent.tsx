"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  CONSENT_EVENT,
  getConsent,
  setConsent,
  type ConsentState,
} from "@/lib/cookieConsent";
import { cn } from "@/lib/cn";

/**
 * Cookie consent — SODIUM LAMP styled.
 *
 * Banner: AmbientCard sliding up from the bottom on first visit.
 * Modal: full-screen night-tinted backdrop with an AmbientCard at center.
 * Floating button: bottom-LEFT (per claude.md), small ambient pill.
 *
 * Visual language stays inside T3: amber primary CTAs, slate-line borders,
 * bone text, no paper-feel and no garage-floor signage.
 */
export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [consentSet, setConsentSet] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getConsent();
    setAnalytics(initial.analytics);
    setMarketing(initial.marketing);
    setConsentSet(initial.set);

    if (!initial.set) {
      const t = window.setTimeout(() => setBannerOpen(true), 800);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    function onPrefs() {
      setModalOpen(true);
    }
    function onChanged(e: Event) {
      const next = (e as CustomEvent<ConsentState>).detail;
      if (next) {
        setAnalytics(next.analytics);
        setMarketing(next.marketing);
        setConsentSet(next.set);
      }
    }
    window.addEventListener("openCookiePreferences", onPrefs);
    window.addEventListener(CONSENT_EVENT, onChanged);
    return () => {
      window.removeEventListener("openCookiePreferences", onPrefs);
      window.removeEventListener(CONSENT_EVENT, onChanged);
    };
  }, []);

  function acceptAll() {
    setConsent({ analytics: true, marketing: true });
    setBannerOpen(false);
    setModalOpen(false);
  }

  function rejectAll() {
    setConsent({ analytics: false, marketing: false });
    setBannerOpen(false);
    setModalOpen(false);
  }

  function saveCustom() {
    setConsent({ analytics, marketing });
    setBannerOpen(false);
    setModalOpen(false);
  }

  if (!mounted) return null;

  return (
    <>
      {bannerOpen && !modalOpen && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl animate-fade-up"
        >
          <div className="ambient-surface flex flex-col gap-4 p-5 shadow-ambient md:flex-row md:items-center md:p-6">
            <div className="flex-1">
              <p className="font-display text-lg font-bold text-white/90">
                Cookies on this site
              </p>
              <p className="mt-1 text-sm text-white/60">
                We use cookies to keep the site running, understand how
                visitors use it, and improve the experience. You can choose
                what to allow.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center justify-center border border-primary bg-black/70 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:border-primary/80 hover:bg-black/80"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie settings"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className="ambient-surface relative w-full max-w-xl shadow-ambient">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-primary"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="border-b border-white/15 px-6 py-5">
              <p className="small-caps text-xs text-primary">PREFERENCES</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-white/90">
                Cookie settings
              </h3>
            </div>
            <div className="px-6 py-5 text-sm text-white/60">
              <p>
                Choose which categories of cookies you accept. You can change
                these at any time from the cookie button in the bottom-left
                corner.
              </p>
              <ul className="mt-5 space-y-4">
                <ConsentRow
                  title="Necessary"
                  body="Required for the site to function. Always on."
                  checked
                  disabled
                />
                <ConsentRow
                  title="Analytics"
                  body="Anonymous traffic data so we know which pages are working."
                  checked={analytics}
                  onChange={setAnalytics}
                />
                <ConsentRow
                  title="Marketing"
                  body="Used for retargeting and measuring ad performance."
                  checked={marketing}
                  onChange={setMarketing}
                />
              </ul>
            </div>
            <div
              className="flex flex-wrap items-center justify-end gap-2 border-t border-white/15 px-6 py-4"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-primary) 8%, #000)" }}
            >
              <button
                type="button"
                onClick={saveCustom}
                className="inline-flex items-center justify-center border border-primary bg-black/70 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-primary transition-colors hover:border-primary/80 hover:bg-black/80"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating cookie button — always visible once mounted, so users can
          always reopen preferences. Lives in the bottom-LEFT per claude.md
          hard rule #6. Hidden only while the modal itself is open (would be
          redundant) or while the first-visit banner is showing (the banner
          is the entry point). */}
      {!modalOpen && !bannerOpen && (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Open cookie preferences"
          className={cn(
            "fixed bottom-4 left-4 z-40",
            "inline-flex h-10 w-10 items-center justify-center rounded-full",
            "border border-white/15 bg-black/80 text-primary shadow-ambient",
            "transition-colors hover:border-primary",
          )}
        >
          <Cookie size={18} />
        </button>
      )}
    </>
  );
}

function ConsentRow({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-white/15 pb-4 last:border-b-0 last:pb-0">
      <div className="flex-1">
        <p className="font-display text-base font-semibold text-white/90">{title}</p>
        <p className="mt-1 text-sm text-white/60">{body}</p>
      </div>
      <label
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span
          className={cn(
            "h-6 w-11 rounded-full border border-white/15 bg-black/70 transition-colors",
            "peer-checked:border-primary peer-checked:bg-primary",
          )}
        />
        <span
          className={cn(
            "absolute left-0.5 h-5 w-5 rounded-full bg-white/90 shadow transition-transform",
            "peer-checked:translate-x-5",
          )}
        />
      </label>
    </li>
  );
}
