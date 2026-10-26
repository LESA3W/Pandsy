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
 * Cookie consent . heritage-styled.
 * Banner: paper card sliding up from bottom on first visit.
 * Modal: full-screen with cream backdrop blur, paper card, forest+clay buttons.
 * Floating button: bottom-LEFT (per claude.md), small paper pill.
 *
 * NOT a generic dark dialog. NOT a modal anchor.
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
          <div className="flex flex-col gap-4 border border-black/15 bg-white p-5 shadow-paper-lg md:flex-row md:items-center md:p-6">
            <div className="flex-1">
              <p className="font-display text-lg font-bold text-black">
                Cookies on this site
              </p>
              <p className="mt-1 text-sm text-black/60">
                We use cookies to keep the site running, understand how
                visitors use it, and improve the experience. You can choose
                what to allow.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="border border-black/15 bg-white px-4 py-2 text-sm font-medium text-black/60 transition-colors hover:bg-black/5"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="border border-black/40 bg-white px-4 py-2 text-sm font-medium text-black/60 transition-colors hover:bg-black/60 hover:text-white"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="bg-secondary px-4 py-2 text-sm font-medium text-secondary-text transition-colors hover:bg-secondary/80"
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
          style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        >
          <div className="relative w-full max-w-xl border border-black/15 bg-white shadow-paper-lg">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center text-black/60 transition-colors hover:text-secondary"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="border-b border-black/15 px-6 py-5">
              <p className="small-caps text-xs text-primary">PREFERENCES</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-black">
                Cookie settings
              </h3>
            </div>
            <div className="px-6 py-5 text-sm text-black/60">
              <p>
                Choose which categories of cookies you accept. You can
                change these settings at any time from the cookie button
                in the bottom-left corner.
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
            <div className="flex flex-wrap items-center justify-end gap-2 border-t border-black/15 bg-white px-6 py-4">
              <button
                type="button"
                onClick={rejectAll}
                className="border border-black/40 bg-white px-4 py-2 text-sm font-medium text-black/60 transition-colors hover:bg-black/60 hover:text-white"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={saveCustom}
                className="bg-secondary px-4 py-2 text-sm font-medium text-secondary-text transition-colors hover:bg-secondary/80"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {consentSet && (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-label="Open cookie preferences"
          className={cn(
            "fixed bottom-4 left-4 z-40",
            "inline-flex h-10 w-10 items-center justify-center",
            "border border-black/15 bg-white text-secondary",
            "transition-colors hover:bg-black/5",
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
    <li className="flex items-start justify-between gap-4 border-b border-black/15 pb-4 last:border-b-0 last:pb-0">
      <div className="flex-1">
        <p className={cn("font-display text-base font-semibold", disabled ? "text-black/40" : "text-black")}>{title}</p>
        <p className={cn("mt-1 text-sm", disabled ? "text-black/35" : "text-black/60")}>{body}</p>
      </div>
      <label
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center",
          disabled && "cursor-not-allowed",
        )}
      >
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        {/* Track — greyed out when disabled (Necessary), brand color when active */}
        <span
          className={cn(
            "h-6 w-11 border transition-colors",
            disabled
              ? "border-black/10 bg-black/15"
              : "border-black/15 bg-white peer-checked:border-secondary peer-checked:bg-secondary",
          )}
        />
        {/* Thumb — no white halo shadow */}
        <span
          className={cn(
            "absolute left-0.5 h-5 w-5 transition-transform",
            disabled ? "bg-black/30" : "bg-white",
            "peer-checked:translate-x-5",
          )}
        />
      </label>
    </li>
  );
}
