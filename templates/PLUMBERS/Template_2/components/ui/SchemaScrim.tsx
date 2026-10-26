import { cn } from "@/lib/cn";

// SchemaScrim — DIM LAYER component (CLAUDE.md rule #2b).
// Required underneath every overlay text on a {{HERO}} / {{CTA}} / image-bg
// section. Also used (with mix-blend-multiply) on framed images to harmonize
// arbitrary client photos with the surface.
//
// `opacity` controls the dim strength.
// `tone` picks the base color of the scrim.
// `blend="multiply"` is for image harmonization (Opening plate / Workshop plate).
// `blend="normal"` (default) is for true dim-layer use under overlay text.
export function SchemaScrim({
  className,
  opacity = "default",
  tone = "harbor",
  blend = "normal",
}: {
  className?: string;
  opacity?: "soft" | "default" | "strong" | "max";
  tone?: "harbor" | "white" | "secondary" | "ink";
  blend?: "normal" | "multiply";
}) {
  const alpha =
    opacity === "soft"
      ? 0.18
      : opacity === "strong"
      ? 0.62
      : opacity === "max"
      ? 0.78
      : 0.4;
  const base =
    tone === "harbor"
      ? `rgba(15, 23, 42, ${alpha})`
      : tone === "white"
      ? `rgba(255, 255, 255, ${alpha})`
      : tone === "secondary"
      ? `color-mix(in srgb, var(--color-secondary) ${Math.round(alpha * 100)}%, transparent)`
      : `rgba(27, 31, 38, ${alpha})`;
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      aria-hidden="true"
      style={{
        background: base,
        mixBlendMode: blend === "multiply" ? "multiply" : "normal",
      }}
    />
  );
}
