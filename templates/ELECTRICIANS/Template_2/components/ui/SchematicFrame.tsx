/**
 * SchematicFrame — image / card frame with crosshair corner marks
 * (NOT L-shaped brackets — T1 ELECTRICIANS reserved that pattern as
 * ConduitFrame).
 *
 * T2's frame reads as setting-out points on a technical drawing — small
 * plus marks at each corner instead of conduit-bracket L-marks.
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
  lg: "p-6 sm:p-8 lg:p-10",
};

export function SchematicFrame({
  surface = "dark",
  padding = "none",
  className,
  children,
}: Props) {
  const tone = surface === "dark" ? "text-primary" : "text-primary";
  return (
    <div className={cn("relative", className)}>
      {/* Corner crosshair marks — small plus signs at each corner. */}
      <Crosshair className={cn("absolute -top-2 -left-2 z-10", tone)} />
      <Crosshair className={cn("absolute -top-2 -right-2 z-10", tone)} />
      <Crosshair className={cn("absolute -bottom-2 -left-2 z-10", tone)} />
      <Crosshair className={cn("absolute -bottom-2 -right-2 z-10", tone)} />
      <div className={PAD[padding]}>{children}</div>
    </div>
  );
}

function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line x1="8" x2="8" y1="2" y2="14" stroke="currentColor" strokeWidth="1.4" />
      <line x1="2" x2="14" y1="8" y2="8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
