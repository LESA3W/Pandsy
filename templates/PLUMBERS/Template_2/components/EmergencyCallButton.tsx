"use client";

// EmergencyCallButton — sticky floating bottom-RIGHT phone CTA.
//
// Mirrors the T1 PLUMBERS EmergencyButton mechanics (fade in past ~50%
// scroll, click=tel:, secondary pulse dot) but recolored for T2:
//   primary surface · primary-text ink · secondary pulse dot.
//
// Cookie button is bottom-LEFT (CookieConsent.tsx) — no overlap.
// EmergencyStrip remains at the very top of the page; this floating button
// gives a second always-reachable tap-to-call CTA once the user has scrolled
// past the hero.
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

export function EmergencyCallButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
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
        "fixed bottom-5 right-5 z-40 group print:hidden",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <span
        className="relative flex items-center gap-3 bg-primary hover:opacity-90 text-primary-text px-4 py-3 sm:px-5 sm:py-3.5 transition-opacity"
        style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}
      >
        <span className="relative flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/30">
          <Phone size={14} strokeWidth={2} className="text-primary-text" />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-secondary animate-pulse" />
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
