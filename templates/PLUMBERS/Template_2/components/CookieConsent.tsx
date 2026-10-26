"use client";

import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";
import {
  readConsent,
  writeConsent,
  subscribeConsent,
  type ConsentChoice,
} from "@/lib/cookieConsent";
import { cn } from "@/lib/cn";

// CookieConsent — three-state machine per CLAUDE.md rule #6.
// CRITICAL VISIBILITY LOGIC:
//   showFloatingButton = !showBanner && !showModal
// NOT keyed on hasGivenConsent — that's the buggy pattern.

type View = "hidden" | "banner" | "modal";

export function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // First-visit detection
    const existing = readConsent();
    if (!existing) {
      const t = window.setTimeout(() => setView("banner"), 800);
      return () => window.clearTimeout(t);
    }
    setAnalytics(existing.analytics);
    setMarketing(existing.marketing);

    const offSub = subscribeConsent(() => {
      const fresh = readConsent();
      if (fresh) {
        setAnalytics(fresh.analytics);
        setMarketing(fresh.marketing);
      }
    });
    const onPrefs = () => setView("modal");
    window.addEventListener("open-cookie-preferences", onPrefs);
    return () => {
      offSub();
      window.removeEventListener("open-cookie-preferences", onPrefs);
    };
  }, []);

  function applyAndClose(choice: Pick<ConsentChoice, "analytics" | "marketing">) {
    writeConsent(choice);
    setAnalytics(choice.analytics);
    setMarketing(choice.marketing);
    setView("hidden");
  }

  // Per CLAUDE.md rule #6: floating button visibility keyed on view state,
  // NOT on consent presence.
  const showFloatingButton = mounted && view === "hidden";

  return (
    <>
      {view === "banner" && (
        <Banner
          onAccept={() => applyAndClose({ analytics: true, marketing: true })}
          onReject={() => applyAndClose({ analytics: false, marketing: false })}
          onCustomize={() => setView("modal")}
        />
      )}

      {view === "modal" && (
        <Modal
          analytics={analytics}
          marketing={marketing}
          onAnalytics={setAnalytics}
          onMarketing={setMarketing}
          onClose={() => setView("hidden")}
          onSave={() => applyAndClose({ analytics, marketing })}
          onRejectAll={() => applyAndClose({ analytics: false, marketing: false })}
        />
      )}

      {showFloatingButton && (
        <button
          type="button"
          onClick={() => setView("modal")}
          className="fixed bottom-5 left-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-text ring-1 ring-black/20 shadow-lg hover:opacity-90 transition-opacity print:hidden"
          aria-label="Cookie preferences"
        >
          <Cookie size={20} strokeWidth={1.75} />
        </button>
      )}
    </>
  );
}

function Banner({
  onAccept,
  onReject,
  onCustomize,
}: {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/10 bg-white shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.18)] animate-draft-slide print:hidden"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-5 py-3 sm:py-5 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1">
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary">
              <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary mr-2 align-middle" />
              Cookie notice
            </p>
            <h2 className="mt-1.5 sm:mt-2 font-display text-base sm:text-xl text-black">
              We use cookies to keep this site useful.
            </h2>
            <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-sm text-black/60">
              Necessary cookies always run. Analytics and marketing cookies are
              optional. You can change your mind any time from the cookie button.
            </p>
          </div>
          <div className="flex flex-row gap-2 sm:flex-row lg:flex-col lg:min-w-[220px]">
            <button
              type="button"
              onClick={onAccept}
              className="flex-1 lg:flex-none bg-primary px-3 py-2 sm:px-4 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-primary-text hover:opacity-90 transition-opacity"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={onReject}
              className="flex-1 lg:flex-none border border-primary px-3 py-2 sm:px-4 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-text transition-colors"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={onCustomize}
              className="px-3 py-2 sm:px-4 sm:py-2.5 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-black/60 underline-offset-4 hover:underline"
            >
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Modal({
  analytics,
  marketing,
  onAnalytics,
  onMarketing,
  onClose,
  onSave,
  onRejectAll,
}: {
  analytics: boolean;
  marketing: boolean;
  onAnalytics: (v: boolean) => void;
  onMarketing: (v: boolean) => void;
  onClose: () => void;
  onSave: () => void;
  onRejectAll: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4 py-8 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
    >
      <div className="relative w-full max-w-xl border border-black/10 bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center text-black/40 hover:text-black"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="px-6 py-7 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Cookie preferences
          </p>
          <h2 className="mt-2 font-display text-2xl text-black">
            Your choices, written down.
          </h2>
          <p className="mt-1.5 text-sm text-black/60">
            Pick what to allow. You can re-open this panel any time from the
            cookie button.
          </p>

          <div className="mt-6 divide-y divide-black/10">
            <ToggleRow
              label="Necessary"
              hint="Required for the site to work. Always on."
              value={true}
              disabled
              onChange={() => {}}
            />
            <ToggleRow
              label="Analytics"
              hint="Helps us understand which pages are useful."
              value={analytics}
              onChange={onAnalytics}
            />
            <ToggleRow
              label="Marketing"
              hint="Used to measure ad campaign performance."
              value={marketing}
              onChange={onMarketing}
            />
          </div>

          <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onRejectAll}
              className="border border-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-text transition-colors"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={onSave}
              className="bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-text hover:opacity-90 transition-opacity"
            >
              Save preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  disabled,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div>
        <p className="font-display text-base text-black">{label}</p>
        <p className="text-sm text-black/60">{hint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        disabled={disabled}
        onClick={() => !disabled && onChange(!value)}
        className={cn(
          "relative h-6 w-11 shrink-0 transition-colors",
          value ? "bg-primary" : "bg-slate-200",
          disabled && "opacity-60 cursor-not-allowed",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 bg-white transition-all",
            value ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}
