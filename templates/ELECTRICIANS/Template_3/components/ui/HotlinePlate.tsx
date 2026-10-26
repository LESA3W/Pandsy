/**
 * HotlinePlate — embossed crimson editorial card with phone CTA. Used inline
 * in Hero (mobile) and CtaSection. Stamp aesthetic, hand-set type.
 *
 * T3 HOT WIRE signature. Different from T1 EmergencyButton (sticky pulsing
 * red circle) and T2 EmergencyBanner (top horizontal alert band).
 */
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  /** Compact layout for inline header / sticky placements */
  compact?: boolean;
  className?: string;
};

export function HotlinePlate({ compact = false, className }: Props) {
  return (
    <a
      href="tel:{{PHONE_DIGITS}}"
      className={cn(
        "group inline-flex items-center gap-3 bg-primary text-primary-text",
        "border-l-4 border-primary-deep transition-transform duration-200",
        "hover:scale-[1.015] active:animate-stamp-press",
        compact ? "px-4 py-2" : "px-5 py-4",
        className,
      )}
    >
      {/* Live-wire dot pulses */}
      <span
        aria-hidden="true"
        className="relative inline-flex h-2.5 w-2.5"
      >
        <span className="absolute inset-0 inline-block h-full w-full rounded-full bg-white/50 animate-wire-pulse" />
        <span className="relative inline-block h-2.5 w-2.5 rounded-full bg-white" />
      </span>

      <span className="flex flex-col gap-0">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-primary-text/70 leading-none">
          24/7 Hotline
        </span>
        <span
          className={cn(
            "font-display font-bold leading-tight tracking-tight",
            compact ? "text-base" : "text-lg",
          )}
        >
          {"{{PHONE}}"}
        </span>
      </span>

      <Phone
        size={compact ? 16 : 20}
        strokeWidth={2}
        className="ml-1 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
