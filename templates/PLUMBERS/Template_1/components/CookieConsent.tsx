"use client";

/**
 * CookieConsent — TIDEWATER / SLATE & COPPER direction.
 *
 * Three-state machine: hidden | banner | modal.
 *
 * CRITICAL VISIBILITY RULE per claude.md hard rule #6:
 *   showFloatingButton = !showBanner && !showModal
 * NOT keyed on hasGivenConsent. The floating button must appear at page
 * load if the user already has a consent in localStorage from a prior visit.
 *
 * First visit: no localStorage entry → schedule slide-up banner after 800ms
 * (so it doesn't fight the hero animation). Floating button stays hidden.
 *
 * Returning visit: localStorage entry present → view stays "hidden" and the
 * floating button shows immediately (so the user can revisit preferences).
 */
import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  getCookieConsent,
  saveCookieConsent,
  COOKIE_OPEN_EVENT,
} from "@/lib/cookieConsent";
import { cn } from "@/lib/cn";

type View = "hidden" | "banner" | "modal";

export function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initial mount: read consent + decide first view
  useEffect(() => {
    setMounted(true);
    const existing = getCookieConsent();
    if (!existing) {
      const t = setTimeout(() => setView("banner"), 800);
      return () => clearTimeout(t);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
      // view stays "hidden" → floating button visible
    }
  }, []);

  // External re-open trigger (e.g. /cookie-policy "Manage preferences")
  useEffect(() => {
    const open = () => setView("modal");
    window.addEventListener(COOKIE_OPEN_EVENT, open);
    return () => window.removeEventListener(COOKIE_OPEN_EVENT, open);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (view === "modal") {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [view]);

  const acceptAll = () => {
    saveCookieConsent({ analytics: true, marketing: true });
    setAnalytics(true);
    setMarketing(true);
    setView("hidden");
  };
  const rejectAll = () => {
    saveCookieConsent({ analytics: false, marketing: false });
    setAnalytics(false);
    setMarketing(false);
    setView("hidden");
  };
  const savePrefs = () => {
    saveCookieConsent({ analytics, marketing });
    setView("hidden");
  };

  if (!mounted) return null;

  // CRITICAL: floating button is gated on view, NOT on hasGivenConsent.
  // This means a returning visitor (with localStorage) sees the button at
  // page load even though the banner never re-appears.
  const showBanner = view === "banner";
  const showModal = view === "modal";
  const showFloatingButton = !showBanner && !showModal;

  return (
    <>
      {/* Banner — dark slide-up from bottom with primary accents */}
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 animate-float-up">
          <div className="bg-white border-t border-primary/40 shadow-[0_-12px_40px_color-mix(in_srgb,var(--color-primary)_18%,transparent)]">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 sm:py-6 flex flex-col lg:flex-row items-start lg:items-center gap-3 sm:gap-5">
              <div className="flex items-start gap-2.5 sm:gap-3 flex-1">
                <Cookie size={18} className="text-primary mt-0.5 flex-shrink-0 sm:[&]:[width:22px] sm:[&]:[height:22px]" strokeWidth={1.7} />
                <div>
                  <p className="font-display text-slate-900 text-sm sm:text-lg leading-tight mb-0.5 sm:mb-1">
                    A small splash of cookies.
                  </p>
                  <p className="font-sans text-[11px] sm:text-[14px] text-slate-600 leading-relaxed">
                    We use cookies to make this site work, measure traffic, and
                    occasionally pitch our work. Pick what you&apos;re okay with.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:gap-2.5 w-full lg:w-auto">
                <button
                  onClick={() => setView("modal")}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-slate-200 text-slate-900 hover:border-primary hover:text-primary font-mono text-[11px] sm:text-[12px] uppercase tracking-widest transition-colors"
                >
                  Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 border border-slate-200 text-slate-900 hover:border-primary hover:text-primary font-mono text-[11px] sm:text-[12px] uppercase tracking-widest transition-colors"
                >
                  Reject all
                </button>
                <button
                  onClick={acceptAll}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 bg-primary hover:opacity-90 text-primary-text font-mono text-[11px] sm:text-[12px] uppercase tracking-widest transition-opacity"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal — full-screen with backdrop blur */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            onClick={() => setView("hidden")}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close cookie preferences"
          />
          <div className="relative bg-white border border-primary/40 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 sm:px-8 py-6 border-b border-slate-200 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary mb-2">
                  Privacy preferences
                </p>
                <h2 className="font-display text-2xl sm:text-3xl text-slate-900 leading-tight">
                  Pick what runs in the background.
                </h2>
              </div>
              <button
                onClick={() => setView("hidden")}
                className="text-slate-500 hover:text-primary transition-colors"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            <div className="px-6 sm:px-8 py-6 space-y-5">
              <CookieRow
                title="Strictly necessary"
                body="Required for the site to load and forms to submit. Always on. These cannot be disabled."
                locked
                checked
              />
              <CookieRow
                title="Analytics"
                body="Anonymous traffic stats so we know which pages help homeowners and which don't."
                checked={analytics}
                onChange={setAnalytics}
              />
              <CookieRow
                title="Marketing"
                body="Lets us measure ads and re-share helpful posts with people in similar situations."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="px-6 sm:px-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row gap-2.5 sm:justify-end">
              <button
                onClick={rejectAll}
                className="px-4 py-2.5 border border-slate-200 text-slate-900 hover:border-primary hover:text-primary font-mono text-[12px] uppercase tracking-widest transition-colors"
              >
                Reject all
              </button>
              <button
                onClick={savePrefs}
                className="px-5 py-2.5 bg-primary hover:opacity-90 text-primary-text font-mono text-[12px] uppercase tracking-widest transition-opacity"
              >
                Save preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button — bottom-LEFT, primary circle with cookie icon. */}
      {showFloatingButton && (
        <button
          onClick={() => setView("modal")}
          aria-label="Manage cookie preferences"
          className="fixed bottom-5 left-5 z-40 group"
        >
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-ripple pointer-events-none" />
          <span className="relative flex items-center justify-center h-11 w-11 rounded-full bg-white border border-primary/60 text-primary group-hover:bg-primary group-hover:text-primary-text transition-colors shadow-lg">
            <Cookie size={18} strokeWidth={1.7} />
          </span>
        </button>
      )}
    </>
  );
}

function CookieRow({
  title,
  body,
  checked,
  onChange,
  locked,
}: {
  title: string;
  body: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  locked?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-200 last:border-0 last:pb-0">
      <div className="flex-1">
        <h3 className="font-display text-lg text-slate-900 mb-1.5">{title}</h3>
        <p className="font-sans text-[14px] text-slate-600 leading-relaxed">{body}</p>
      </div>
      <button
        type="button"
        onClick={() => !locked && onChange?.(!checked)}
        disabled={locked}
        aria-pressed={checked}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors mt-1",
          checked ? "bg-primary" : "bg-slate-200",
          locked && "opacity-60 cursor-not-allowed",
        )}
      >
        <span
          className={cn(
            "inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm",
            checked ? "translate-x-5" : "translate-x-0.5",
          )}
        />
      </button>
    </div>
  );
}
