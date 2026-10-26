import { cn } from "@/lib/cn";

// AquaScrim — DIM LAYER component (CLAUDE.md hard rule #2b).
// MANDATORY when text overlays an image background. The dim layer guarantees
// baseline readability across ANY photo a client uploads — vignette/halation
// is NOT a substitute.
//
// Layered order:
//   <img>                       (image)
//   <AquaScrim />               (dim — this component)
//   <WaveWash />                (atmospheric overlay, optional)
//   <foreground content />      (text + buttons)

type AquaScrimProps = {
  opacity?: "soft" | "default" | "strong";
  tone?: "ink" | "black" | "primary";
  className?: string;
};

const OPACITY = {
  soft:    { ink: "bg-black/25", black: "bg-black/30", primary: "bg-black/25" },
  default: { ink: "bg-black/40", black: "bg-black/45", primary: "bg-black/40" },
  strong:  { ink: "bg-black/55", black: "bg-black/60", primary: "bg-black/55" },
} as const;

export default function AquaScrim({
  opacity = "default",
  tone = "ink",
  className,
}: AquaScrimProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 pointer-events-none", OPACITY[opacity][tone], className)}
    />
  );
}
