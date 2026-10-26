/**
 * ConduitFrame — image / card frame with corner brackets evoking
 * conduit-bracket fittings. 4 absolutely-positioned L-shaped marks at corners.
 *
 * Reserved visual atom for T1 ELECTRICIANS. Used in About, Gallery, QuoteSection.
 */
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Props = {
  surface?: "dark" | "light";
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
};

const PAD: Record<NonNullable<Props["padding"]>, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-5 sm:p-6",
  lg: "p-4 sm:p-8 lg:p-10",
};

export function ConduitFrame({
  surface = "dark",
  padding = "none",
  className,
  children,
}: Props) {
  const tone = surface === "dark" ? "border-primary/60" : "border-primary/40";
  return (
    <div className={cn("relative", className)}>
      {/* Corner brackets — 4 L-shaped marks */}
      <span
        className={cn(
          "absolute top-0 left-0 h-3.5 w-3.5 border-t-2 border-l-2 z-10",
          tone,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute top-0 right-0 h-3.5 w-3.5 border-t-2 border-r-2 z-10",
          tone,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute bottom-0 left-0 h-3.5 w-3.5 border-b-2 border-l-2 z-10",
          tone,
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "absolute bottom-0 right-0 h-3.5 w-3.5 border-b-2 border-r-2 z-10",
          tone,
        )}
        aria-hidden="true"
      />
      <div className={PAD[padding]}>{children}</div>
    </div>
  );
}
