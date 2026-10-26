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
//   showFloatingButton = mounted && view === "hidden"
// NOT keyed on hasGivenConsent — that's the buggy pattern.
//
// CLEARLINE atoms: bottom-LEFT primary circle with Cookie icon. NO continuous
// animation (T1 owns the continuous ripple). Hover-only soft shadow lift.

type View = "hidden" | "banner" | "modal";

export function CookieConsent() {
  const [view, setView] = useState<View>("hidden");
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
          className="fixed bottom-4 left-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-text shadow-lift ring-1 ring-primary/50 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift-strong print:hidden sm:bottom-5 sm:left-5 sm:h-12 sm:w-12"
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
      className="fixed bottom-0 left-0 right-0 z-50 animate-fade-up border-t border-black/10 bg-white shadow-lift-strong print:hidden"
      role="dialog"
      aria-label="Cookie preferences"
    >
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-5 sm:py-5 lg:px-8">
        <div className="flex flex-col gap-3 sm:gap-5 lg:flex-row lg:items-start lg:gap-8">
          <div className="flex-1">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary sm:text-[11px]">
              <span className="inline-block h-2 w-2 rounded-full bg-primary align-middle" />
              Cookie notice
            </p>
            <h2 className="mt-1.5 font-display text-base font-black tracking-tight-display text-black sm:mt-2 sm:text-xl">
              We use cookies to keep this site useful.
            </h2>
            <p className="mt-1 text-[11px] leading-relaxed text-black/60 sm:mt-1.5 sm:text-sm">
              Necessary cookies always run. Analytics and marketing cookies are
              optional. You can change your mind any time from the cookie button.
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-2 sm:flex-row lg:min-w-[220px] lg:flex-col">
            <button
              type="button"
              onClick={onAccept}
              className="flex-1 rounded-full bg-primary px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift sm:flex-none sm:px-4 sm:py-2.5 sm:text-xs"
            >
              Accept all
            </button>
            <button
              type="button"
              onClick={onReject}
              className="flex-1 rounded-full border border-primary px-3 py-2 font-mono text-[11px] uppercase tracking-widest text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-text sm:flex-none sm:px-4 sm:py-2.5 sm:text-xs"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={onCustomize}
              className="basis-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-black/60 underline-offset-4 hover:underline sm:basis-auto sm:px-4 sm:py-2.5 sm:text-xs"
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8 backdrop-blur-sm print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-black/10 bg-white shadow-lift-strong">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition-colors hover:bg-black/5 hover:text-black"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        <div className="px-5 py-6 sm:px-8 sm:py-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Cookie preferences
          </p>
          <h2 className="mt-2 font-display text-xl font-black tracking-tight-display text-black sm:text-2xl">
            Pick what to allow.
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-black/60 sm:text-sm">
            You can re-open this panel any time from the cookie button at the
            bottom-left of the page.
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
              hint="Helps us see which pages are actually useful."
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
              className="rounded-full border border-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-text"
            >
              Reject all
            </button>
            <button
              type="button"
              onClick={onSave}
              className="rounded-full bg-primary px-4 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift"
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
        <p className="font-display text-base font-bold text-black">{label}</p>
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
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          value ? "bg-primary" : "bg-black/10",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-lift-soft transition-all",
            value ? "left-[22px]" : "left-0.5",
          )}
        />
      </button>
    </div>
  );
}
