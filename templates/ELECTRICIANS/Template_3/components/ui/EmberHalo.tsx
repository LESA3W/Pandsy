/**
 * EmberHalo — atmospheric warm halation behind hero text or heading blocks.
 *
 * T3 HOT WIRE signature. Different from T1 FilamentGlow (amber bulb halation)
 * and T2 GridGlow (blueprint-grid background).
 *
 * Soft slow breath. Use as an absolute layer behind foreground copy. Combine
 * with InkScrim if it sits over a photo.
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Position the halo: "center" (default) | "left" | "right" | "top-right" | "bottom-left" */
  origin?: "center" | "left" | "right" | "top-right" | "bottom-left";
  /** Size in tailwind `w-`/`h-` (defaults to a generous spread) */
  className?: string;
};

const POS: Record<string, string> = {
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  left: "left-[12%] top-1/2 -translate-y-1/2",
  right: "right-[12%] top-1/2 -translate-y-1/2",
  "top-right": "right-[8%] top-[12%]",
  "bottom-left": "left-[10%] bottom-[8%]",
};

export function EmberHalo({ origin = "center", className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-[640px] w-[640px] bg-secondary-halo opacity-70 blur-[2px] mix-blend-multiply animate-halo-breath",
        POS[origin],
        className,
      )}
    />
  );
}
