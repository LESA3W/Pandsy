/**
 * FlowWash — atmospheric overlay (radial-gradient teal-fade with copper hint).
 * Sits ON TOP of WaterScrim. NEVER a substitute for the dim layer.
 *
 * Two variants:
 *   - "dark"  → for use over dark images (deep teal + copper glints)
 *   - "light" → for use over light/mist surfaces (subtle teal + copper)
 */
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  variant?: "dark" | "light";
};

export function FlowWash({ className = "", variant = "dark" }: Props) {
  const bg = variant === "dark" ? "bg-flow-wash" : "bg-flow-wash-light";
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", bg, className)}
      aria-hidden="true"
    />
  );
}
