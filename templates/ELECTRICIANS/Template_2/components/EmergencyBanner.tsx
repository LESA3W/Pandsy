"use client";

/**
 * EmergencyBanner — top-anchored alert band that sits ABOVE the Header.
 *
 * T2 BLUEPRINT/GRID's take on emergency framing — replaces what T1
 * ELECTRICIANS called EmergencyButton (a sticky bottom-right pulsing red
 * circle). T2's emergency framing is institutional/announcement register
 * instead of frantic-late-night-call register: a single horizontal band that
 * stays visible above the fold without blocking content.
 *
 * Visible by default. Dismissable for the session via a small X (state
 * persists in sessionStorage so the band re-appears next visit). The
 * dispatched line is always callable via the alert text.
 */
import { useEffect, useState } from "react";
import { AlertTriangle, Phone, X } from "lucide-react";

const SESSION_KEY = "emergency-banner-dismissed";

export function EmergencyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    try {
      setDismissed(window.sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      // sessionStorage may be unavailable (private mode, etc.) — fall through
    }
  }, []);

  function dismiss() {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!mounted || dismissed) return null;

  return (
    <div className="relative bg-accent text-accent-text" role="alert">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-10 sm:h-11 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 font-mono text-[11px] sm:text-[12px] uppercase tracking-widest leading-none">
          <AlertTriangle
            size={15}
            strokeWidth={2}
            className="flex-shrink-0 animate-alert-pulse"
            aria-hidden="true"
          />
          <span className="hidden sm:inline whitespace-nowrap">After-hours line /</span>
          <span className="sm:hidden whitespace-nowrap">24/7 /</span>
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="flex items-center gap-1.5 underline underline-offset-2 hover:text-white/80 transition-colors min-w-0"
          >
            <Phone size={12} strokeWidth={2} aria-hidden="true" className="flex-shrink-0" />
            <span className="truncate">{"{{PHONE}}"}</span>
          </a>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss emergency notice"
          className="flex-shrink-0 text-white/85 hover:text-white p-2 -mr-1 transition-colors"
        >
          <X size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
