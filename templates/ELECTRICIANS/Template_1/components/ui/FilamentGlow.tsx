/**
 * FilamentGlow — warm amber halation overlay (additive, atmospheric).
 *
 * Sits ON TOP of ArcScrim — NOT a replacement for it (claude.md rule #2b).
 * Just adds the warm filament glow that makes the image feel like a 24/7
 * licensed-electrician scene rather than a flat dark photo.
 */
import { cn } from "@/lib/cn";

type Props = {
  variant?: "dark" | "light";
  breath?: boolean;
  className?: string;
};

export function FilamentGlow({ variant = "dark", breath = false, className }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        variant === "dark" ? "bg-filament-glow" : "bg-filament-glow-light",
        breath && "animate-filament-breath",
        className,
      )}
      aria-hidden="true"
    />
  );
}
