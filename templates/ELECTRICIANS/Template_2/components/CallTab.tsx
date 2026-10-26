"use client";

/**
 * CallTab — sticky bottom-RIGHT 24/7 call button matching the same UX
 * pattern as T1 ELECTRICIANS' EmergencyButton.
 *
 * The user explicitly overrode T1's "bottom-right pulsing red emergency
 * button" reservation so the library has a consistent emergency CTA pattern
 * across ELECTRICIANS templates. T2 keeps the placement + interaction model
 * but uses T2 color tokens (alert red surface, steel-deep inner circle,
 * sapphire-glow icon, sapphire-glow pulsing dot, paper text) so it still
 * reads as part of the BLUEPRINT/GRID brand.
 *
 * Hides on the very top of the page so it doesn't fight the hero CTAs,
 * then fades in on scroll past one viewport. Cookie button is bottom-LEFT
 * (CookieConsent.tsx) — no overlap.
 */
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

export function CallTab() {
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
      aria-label="Call our 24/7 line"
      className={cn(
        "fixed bottom-5 right-5 z-40 group",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <span className="relative flex items-center gap-3 bg-accent hover:bg-accent text-accent-text px-4 py-3 sm:px-5 sm:py-3.5 shadow-[0_8px_30px_rgba(15,23,42,0.35)] transition-colors">
        <span className="relative flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black">
          <Phone size={14} strokeWidth={2} className="text-primary" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-alert-pulse" />
        </span>
        <span className="hidden sm:flex flex-col items-start leading-tight">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/85">
            24/7 line
          </span>
          <span className="font-display text-base text-white -mt-0.5 font-semibold tracking-tight">
            {"{{PHONE}}"}
          </span>
        </span>
      </span>
    </a>
  );
}
