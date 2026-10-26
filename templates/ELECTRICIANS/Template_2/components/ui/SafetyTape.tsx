/**
 * SafetyTape — diagonal hazard-tape divider strip (yellow + steel-deep).
 *
 * Reserved visual atom for T2 ELECTRICIANS. Used SPARING — once or twice per
 * page maximum (Footer top strip, Hero metadata accent). The hazard yellow
 * is reserved for this atom only; primary CTAs use sapphire blue.
 *
 * NOT to be confused with T1's CircuitDivider (which uses circuit-trace SVG).
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Strip thickness */
  thickness?: "thin" | "med" | "thick";
  className?: string;
};

const THICKNESS: Record<NonNullable<Props["thickness"]>, string> = {
  thin: "h-1",
  med: "h-2",
  thick: "h-3",
};

export function SafetyTape({ thickness = "med", className }: Props) {
  return (
    <div
      className={cn("w-full bg-hazard-tape", THICKNESS[thickness], className)}
      aria-hidden="true"
    />
  );
}
