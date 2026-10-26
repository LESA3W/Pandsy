import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

// RescuePill — accent pill for emergency framing.
// Two variants: full Hero row (large) and sticky bottom-CENTER (slim).
// CLAUDE.md rule #5b: emergency phone visible without scrolling.
// Accent color is reserved for emergency surfaces ONLY in CLEARLINE.

type RescuePillProps = {
  variant?: "hero-row" | "sticky-slim" | "callout";
  href?: string;
  children: ReactNode;
  className?: string;
};

const SHAPE = {
  "hero-row":
    "flex w-full items-center justify-between gap-4 rounded-2xl bg-rescue-pill px-5 py-4 text-white shadow-rescue",
  "sticky-slim":
    "flex items-center gap-3 rounded-full bg-rescue-pill px-5 py-3 text-white shadow-rescue",
  callout:
    "flex items-start gap-3 rounded-2xl bg-white border border-accent/40 px-4 py-3 text-accent shadow-lift-soft",
} as const;

export default function RescuePill({
  variant = "hero-row",
  href,
  children,
  className,
}: RescuePillProps) {
  const inner = (
    <>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
          variant === "callout"
            ? "border-accent/40 bg-accent/10"
            : "border-white/30 bg-white/15",
        )}
        aria-hidden
      >
        <Phone size={16} strokeWidth={2.4} />
      </span>
      <span className="flex-1">{children}</span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={cn(
          SHAPE[variant],
          "transition-transform duration-150 ease-out hover:-translate-y-0.5",
          className,
        )}
      >
        {inner}
      </a>
    );
  }
  return <div className={cn(SHAPE[variant], className)}>{inner}</div>;
}
