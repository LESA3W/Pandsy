import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

// StampSeal — circle stamped element. Two roles:
//   1. "REF: NOTE-01" tags on review cards
//   2. Phone-glyph seal on EmergencyStrip and floating CookieConsent button
//
// Use `tone="primary"` for review tags, `tone="secondary"` for the emergency seal.
export function StampSeal({
  children,
  className,
  tone = "primary",
  size = 32,
}: {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "secondary";
  size?: number;
}) {
  const ring =
    tone === "secondary"
      ? "ring-secondary/40 text-secondary bg-secondary/10"
      : "ring-primary/50 text-primary bg-primary/15";
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-full ring-1 font-mono uppercase tracking-widest text-[10px] leading-none",
        ring,
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span className="relative z-10">{children}</span>
    </span>
  );
}

// StampSealLabel — pill-shaped variant for "REF: NOTE-01" inline tags.
export function StampSealLabel({
  children,
  className,
  tone = "primary",
}: {
  children: ReactNode;
  className?: string;
  tone?: "primary" | "secondary";
}) {
  const cls =
    tone === "secondary"
      ? "border-secondary/40 text-secondary bg-secondary/8"
      : "border-primary/50 text-primary bg-primary/10";
  return (
    <span
      className={cn(
        "inline-block border px-2 py-1 font-mono text-[10px] uppercase tracking-widest leading-none",
        cls,
        className,
      )}
    >
      {children}
    </span>
  );
}
