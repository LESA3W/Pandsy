import { cn } from "@/lib/cn";

// WaveWash — atmospheric soft-blue radial-gradient overlay.
// Layered ON TOP of AquaScrim (never replaces it — CLAUDE.md rule #2b).

type WaveWashProps = {
  variant?: "soft" | "deep" | "harbor";
  className?: string;
};

const VARIANT = {
  soft:   "bg-wave-wash",
  deep:   "bg-wave-wash-deep",
  harbor: "bg-harbor-night",
} as const;

export default function WaveWash({ variant = "soft", className }: WaveWashProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none", VARIANT[variant], className)}
    />
  );
}
