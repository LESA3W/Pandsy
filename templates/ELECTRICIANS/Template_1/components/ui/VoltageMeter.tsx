/**
 * VoltageMeter — small SVG meter glyph (vertical bars, like a signal indicator).
 *
 * Used as a separator in TrustBar, Footer atmospheric strips, and decorative
 * accents. Reserved visual atom for T1 ELECTRICIANS.
 */
import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  tone?: "amber" | "arc" | "mute";
  className?: string;
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  amber: "var(--color-primary)",
  arc: "var(--color-secondary)",
  mute: "rgba(255,255,255,0.4)",
};

export function VoltageMeter({ size = 12, tone = "amber", className }: Props) {
  const c = TONE[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      className={cn("inline-block flex-shrink-0", className)}
      aria-hidden="true"
    >
      <rect x="0" y="7" width="2" height="5" fill={c} fillOpacity="0.35" />
      <rect x="3" y="4" width="2" height="8" fill={c} fillOpacity="0.6" />
      <rect x="6" y="2" width="2" height="10" fill={c} fillOpacity="0.85" />
      <rect x="9" y="0" width="2" height="12" fill={c} />
    </svg>
  );
}
