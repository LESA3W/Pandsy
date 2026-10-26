/**
 * FittingBracket — T1 PLUMBERS frame component.
 * Wraps content with primary bracket corners + a primary top/bottom rule,
 * evoking a copper pipe fitting joint.
 *
 * Used to frame:
 *  - Image cards (Gallery, About)
 *  - Form containers (QuoteSection)
 *  - Highlight quote blocks
 */
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** "dark" → assumes dark surface (primary corners visible); "light" → on white surface */
  surface?: "dark" | "light";
  /** Outer padding shorthand */
  padding?: "none" | "sm" | "md" | "lg";
};

const PAD: Record<NonNullable<Props["padding"]>, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-12",
};

export function FittingBracket({
  children,
  className = "",
  surface = "dark",
  padding = "none",
}: Props) {
  const surfaceBg =
    surface === "dark"
      ? "bg-white"
      : "bg-white";
  const ruleColor =
    surface === "dark" ? "border-slate-200" : "border-slate-200";

  return (
    <div
      className={cn(
        "relative",
        surfaceBg,
        "border-y",
        ruleColor,
        PAD[padding],
        className,
      )}
    >
      {/* Top-left bracket */}
      <span
        className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary -translate-x-px -translate-y-px"
        aria-hidden="true"
      />
      {/* Top-right bracket */}
      <span
        className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary translate-x-px -translate-y-px"
        aria-hidden="true"
      />
      {/* Bottom-left bracket */}
      <span
        className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary -translate-x-px translate-y-px"
        aria-hidden="true"
      />
      {/* Bottom-right bracket */}
      <span
        className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-primary translate-x-px translate-y-px"
        aria-hidden="true"
      />

      {children}
    </div>
  );
}
