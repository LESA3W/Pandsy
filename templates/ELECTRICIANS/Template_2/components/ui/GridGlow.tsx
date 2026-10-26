/**
 * GridGlow — subtle blueprint-grid background overlay (additive, atmospheric).
 * T2 BLUEPRINT/GRID's name for what T1 ELECTRICIANS called FilamentGlow.
 *
 * Sits ON TOP of GridScrim — NOT a replacement for it (claude.md rule #2b).
 * Adds the blueprint-paper feel of a technical drawing breathing under the
 * dark dim layer. On light surfaces, use variant="light" for a soft blue grid
 * tint.
 */
import { cn } from "@/lib/cn";

type Props = {
  variant?: "dark" | "light";
  breath?: boolean;
  className?: string;
};

export function GridGlow({ variant = "dark", breath = false, className }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none bg-[length:24px_24px,24px_24px,96px_96px,96px_96px]",
        variant === "dark" ? "bg-blueprint-grid-dark" : "bg-blueprint-grid",
        breath && "animate-grid-breath",
        className,
      )}
      aria-hidden="true"
    />
  );
}
