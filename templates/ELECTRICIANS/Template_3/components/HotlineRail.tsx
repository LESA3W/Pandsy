"use client";

/**
 * HotlineRail — small fixed BOTTOM-RIGHT crimson rectangle with phone CTA.
 *
 * CATEGORY PATTERN per claude.md ELECTRICIANS rules: a sticky/floating
 * emergency phone CTA is mandatory for all ELECTRICIANS templates because
 * electrical emergencies need an immediately visible call route.
 *
 * Visual treatment is the T3 editorial-stamp signature: crimson surface,
 * copper-deep left bar, mono kicker + Fraunces phone digits, live-wire dot
 * pulse in the top-LEFT corner of the icon block. Distinct visual register
 * from T1's pulsing red circle and T2's red rectangle.
 *
 * Behavior: fades in after scrolling past one viewport so it doesn't fight
 * the hero CTAs. Cookie consent button stays bottom-LEFT (no overlap).
 */
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

export function HotlineRail() {
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
      aria-label="Call our 24/7 hotline"
      className={cn(
        "group fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5 hidden md:block",
        "transition-all duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <span className="relative flex items-stretch bg-secondary hover:bg-secondary text-secondary-text border-l-0 sm:border-l-4 sm:border-black/30 shadow-[0_8px_30px_rgba(13,13,14,0.35)] transition-colors">
        {/* Icon block — perfect square; matches cookie bubble footprint on mobile */}
        <span className="relative flex h-11 w-11 items-center justify-center bg-secondary sm:h-12 sm:w-12">
          <Phone size={16} strokeWidth={2} className="text-secondary-text" />
        </span>

        {/* Phone label — collapses on small screens (icon stays visible) */}
        <span className="hidden sm:flex flex-col items-start justify-center px-4 py-2 leading-tight">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-secondary-text/70">
            24/7 hotline
          </span>
          <span className="font-display text-base font-bold tracking-tight text-secondary-text">
            {"{{PHONE}}"}
          </span>
        </span>
      </span>
    </a>
  );
}
