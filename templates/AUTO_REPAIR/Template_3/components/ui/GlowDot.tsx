import { cn } from "@/lib/cn";

type GlowDotProps = {
  size?: number;
  className?: string;
  /** When true, render with a softer halo (used in TrustBar separators) */
  soft?: boolean;
  /**
   * Color tone. "amber" is the default sodium identity. "secondary" and "accent"
   * route to var(--color-secondary) / var(--color-accent) for brand visibility.
   */
  tone?: "amber" | "secondary" | "accent";
};

/**
 * 6px dot with a sodium halo. Used as a leading mark on NightTag,
 * as a separator inside TrustBar, and as a lighting accent in WhyChooseUs.
 *
 * Replaces T2's clay chevron triangle and T1's hazard tape leading marks.
 */
export default function GlowDot({
  size = 6,
  className,
  soft = false,
  tone = "amber",
}: GlowDotProps) {
  const bgClass =
    tone === "secondary"
      ? "bg-secondary"
      : tone === "accent"
        ? "bg-accent"
        : "bg-primary";

  const glowStyle =
    tone === "secondary"
      ? soft
        ? "0 0 8px color-mix(in srgb, var(--color-secondary) 50%, transparent)"
        : "0 0 12px color-mix(in srgb, var(--color-secondary) 70%, transparent), 0 0 24px color-mix(in srgb, var(--color-secondary) 35%, transparent)"
      : tone === "accent"
        ? soft
          ? "0 0 8px color-mix(in srgb, var(--color-accent) 50%, transparent)"
          : "0 0 12px color-mix(in srgb, var(--color-accent) 70%, transparent), 0 0 24px color-mix(in srgb, var(--color-accent) 35%, transparent)"
        : soft
          ? "0 0 8px color-mix(in srgb, var(--color-primary) 50%, transparent)"
          : "0 0 12px color-mix(in srgb, var(--color-primary) 70%, transparent), 0 0 24px color-mix(in srgb, var(--color-primary) 35%, transparent)";

  return (
    <span
      aria-hidden
      className={cn("relative inline-block shrink-0", className)}
      style={{ width: size, height: size }}
    >
      <span
        className={cn("absolute inset-0 rounded-full", bgClass)}
        style={{ boxShadow: glowStyle }}
      />
    </span>
  );
}
