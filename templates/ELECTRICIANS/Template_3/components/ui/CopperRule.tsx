/**
 * CopperRule — thin horizontal copper hairline used as a section divider or
 * inline accent. Ends with an optional copper-dot terminator.
 *
 * T3 HOT WIRE signature. Different from T1 VoltageRule (single tick on amber
 * line) and T2 MeasureRule (ruler ticks on steel hairline).
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Width of the rule in `w-` Tailwind class — defaults to a generous span */
  className?: string;
  /** "left" (default) | "right" | "both" — where the dot terminator sits */
  dotSide?: "left" | "right" | "both" | "none";
  /** Lift the line off cream onto a dark surface (uses copper-glow) */
  invert?: boolean;
};

export function CopperRule({
  className,
  dotSide = "left",
  invert = false,
}: Props) {
  const lineColor = invert ? "bg-accent-glow" : "bg-accent";
  const dotColor = invert ? "bg-accent-glow" : "bg-accent-deep";
  return (
    <div className={cn("flex items-center gap-2", className)} aria-hidden="true">
      {(dotSide === "left" || dotSide === "both") && (
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dotColor)} />
      )}
      <span className={cn("h-px flex-1", lineColor)} />
      {(dotSide === "right" || dotSide === "both") && (
        <span className={cn("inline-block h-1.5 w-1.5 rounded-full", dotColor)} />
      )}
    </div>
  );
}
