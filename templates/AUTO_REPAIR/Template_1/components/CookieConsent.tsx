"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import {
  getCookieConsent,
  saveCookieConsent,
  subscribeToCookieConsent,
} from "@/lib/cookieConsent";

type View = "hidden" | "banner" | "modal";

export function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);

  // Initial mount: check if user already consented
  useEffect(() => {
    const existing = getCookieConsent();
    if (existing) {
      setHasConsented(true);
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    } else {
      // First visit — show banner after small delay so it doesn't fight with hero animation
      const t = window.setTimeout(() => setView("banner"), 800);
      return () => window.clearTimeout(t);
    }
  }, []);

  // Listen for "open preferences" events (from floating button)
  useEffect(() => {
    const handler = () => setView("modal");
    window.addEventListener("cookie-consent-open", handler);
    return () => window.removeEventListener("cookie-consent-open", handler);
  }, []);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const unsub = subscribeToCookieConsent((state) => {
      if (state) {
        setHasConsented(true);
        setAnalytics(state.analytics);
        setMarketing(state.marketing);
      }
    });
    return unsub;
  }, []);

  function acceptAll() {
    saveCookieConsent({ analytics: true, marketing: true });
    setHasConsented(true);
    setView("hidden");
  }

  function rejectAll() {
    saveCookieConsent({ analytics: false, marketing: false });
    setHasConsented(true);
    setView("hidden");
  }

  function savePreferences() {
    saveCookieConsent({ analytics, marketing });
    setHasConsented(true);
    setView("hidden");
  }

  return (
    <>
      {/* Banner — slides up from bottom on first visit */}
      {view === "banner" && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="animate-slide-up fixed inset-x-0 bottom-0 z-[60] border-t-2 border-primary bg-black shadow-[0_-12px_32px_rgba(0,0,0,0.5)]"
        >
          <button
            type="button"
            onClick={rejectAll}
            aria-label="Reject all and close"
            className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center text-white/60 transition hover:text-primary md:hidden"
          >
            <X size={16} aria-hidden="true" />
          </button>
          <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:gap-6 sm:px-6 sm:py-6 md:flex-row md:items-center md:gap-10 md:px-10">
            <div className="flex items-start gap-3 sm:gap-4 md:flex-1">
              <Cookie size={20} className="mt-0.5 shrink-0 text-primary sm:mt-1 sm:[&]:size-7" strokeWidth={1.5} />
              <div>
                <p className="font-display text-base uppercase tracking-tight text-white sm:text-xl md:text-2xl">
                  We use cookies.
                </p>
                <p className="mt-1 max-w-2xl font-mono text-[11px] leading-relaxed text-white/70 sm:mt-2 sm:text-xs md:text-[13px]">
                  <span className="hidden sm:inline">
                    We use necessary cookies to make this site work. With your
                    consent, we also use analytics and marketing cookies to
                    understand traffic and improve the experience. You can change
                    your choice at any time.
                  </span>
                  <span className="sm:hidden">
                    Necessary cookies + optional analytics. Change anytime.
                  </span>{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Cookie policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:shrink-0">
              <button
                type="button"
                onClick={() => setView("modal")}
                className="border border-white/40 bg-transparent px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10 sm:px-5 sm:py-3 sm:text-[11px]"
              >
                Customize
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className="border border-white/40 bg-transparent px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10 sm:px-5 sm:py-3 sm:text-[11px]"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="border border-primary bg-primary px-2 py-2 font-mono text-[10px] uppercase tracking-widest text-primary-text transition-colors hover:bg-primary-text hover:text-primary sm:px-5 sm:py-3 sm:text-[11px]"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal — full-screen, opens on Customize or floating button */}
      {view === "modal" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setView(hasConsented ? "hidden" : "banner");
          }}
        >
          <div className="relative w-full max-w-2xl border border-white/15 bg-black/90">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setView(hasConsented ? "hidden" : "banner")}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center text-white/60 transition hover:bg-black hover:text-primary"
            >
              <X size={18} />
            </button>

            <div className="border-b border-white/15 p-4 sm:p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/60 sm:gap-3">
                <span className="bg-primary px-2 py-1 text-primary-text">PREFERENCES</span>
                <span>COOKIE CONSENT · GRANULAR CONTROL</span>
              </div>
              <h2 className="mt-3 font-display text-2xl uppercase leading-tight tracking-tight text-white sm:mt-4 sm:text-3xl md:text-4xl">
                Choose what you allow.
              </h2>
              <p className="mt-2 max-w-lg font-mono text-[11px] leading-relaxed text-white/60 sm:mt-3 sm:text-xs">
                Pick the categories you&rsquo;re comfortable with. Necessary
                cookies are always on. The rest is up to you.
              </p>
            </div>

            <div className="divide-y divide-ink-border">
              <CookieRow
                label="Necessary"
                desc="Required for the site to function: authentication, session, security. These cannot be disabled."
                checked={true}
                disabled
                onChange={() => {}}
              />
              <CookieRow
                label="Analytics"
                desc="Help us understand how visitors use the site so we can improve it. Anonymous, aggregated data only."
                checked={analytics}
                disabled={false}
                onChange={setAnalytics}
              />
              <CookieRow
                label="Marketing"
                desc="Used to show you relevant ads on other sites and measure campaign effectiveness."
                checked={marketing}
                disabled={false}
                onChange={setMarketing}
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-white/15 p-4 sm:p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <Link
                href="/cookie-policy"
                className="font-mono text-[10px] uppercase tracking-widest text-white/60 hover:text-primary sm:text-[11px]"
              >
                Read full cookie policy →
              </Link>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={rejectAll}
                  className="border border-white/40 bg-transparent px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-white transition hover:border-white hover:bg-white/10 sm:px-5 sm:py-3 sm:text-[11px]"
                >
                  Reject all
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="border border-primary bg-primary px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-primary-text transition-colors hover:bg-primary-text hover:text-primary sm:px-5 sm:py-3 sm:text-[11px]"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating button — appears in bottom-left after consent given. Always available. */}
      {hasConsented && view === "hidden" && (
        <button
          type="button"
          onClick={() => setView("modal")}
          aria-label="Cookie preferences"
          className="fixed bottom-3 left-3 z-50 inline-flex h-10 w-10 items-center justify-center border border-white/15 bg-black/90 text-white/70 opacity-60 shadow-lg transition-all hover:border-primary hover:bg-primary hover:text-primary-text hover:opacity-100 focus-visible:opacity-100 sm:bottom-5 sm:left-5 sm:h-12 sm:w-12 sm:opacity-100"
        >
          <Cookie size={18} strokeWidth={1.5} aria-hidden="true" />
        </button>
      )}
    </>
  );
}

function CookieRow({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 sm:gap-6 sm:p-6 md:p-8">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <h3 className="font-display text-lg uppercase tracking-tight text-white sm:text-xl">
            {label}
          </h3>
          {disabled && (
            <span className="bg-primary/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
              Always on
            </span>
          )}
        </div>
        <p className="mt-1.5 max-w-md font-mono text-[11px] leading-relaxed text-white/60 sm:mt-2 sm:text-xs">
          {desc}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`Toggle ${label} cookies`}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`
          relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center
          border transition-colors
          ${checked ? "border-primary bg-primary" : "border-white/15 bg-black"}
          ${disabled ? "cursor-not-allowed opacity-60" : ""}
        `}
      >
        <span
          aria-hidden="true"
          className={`
            inline-block h-5 w-5 transform transition-transform
            ${checked ? "translate-x-6 bg-black" : "translate-x-1 bg-white"}
          `}
        />
      </button>
    </div>
  );
}
