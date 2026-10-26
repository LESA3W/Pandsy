"use client";

/**
 * EmergencyButton — sticky floating button bottom-RIGHT.
 *
 * Plumbing has a strong emergency dimension. This puts the 24/7 line
 * in a homeowner's reach without scrolling. Hides on the very top of
 * the page so it doesn't fight the hero CTAs, then fades in on scroll.
 *
 * Cookie button is bottom-LEFT (CookieConsent.tsx) — no overlap.
 */
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

export function EmergencyButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after the user scrolls past ~one viewport (past the hero CTAs)
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="tel:{{PHONE_DIGITS}}"
      aria-label="Call our 24/7 emergency line"
      className={cn(
        "fixed bottom-5 right-5 z-40 group",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <span className="relative flex items-center gap-3 bg-primary hover:opacity-90 text-primary-text px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_8px_30px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] transition-opacity">
        <span className="relative flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/30">
          <Phone size={14} strokeWidth={2} className="text-primary-text" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-secondary animate-pulse-emergency" />
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary-text/80">
            24/7 emergency
          </span>
          <span className="font-display text-base text-primary-text -mt-0.5">
            {"{{PHONE}}"}
          </span>
        </span>
      </span>
    </a>
  );
}
