/**
 * TargetMarker — larger crosshair / quadrant SVG used as a section accent
 * and as a separator in TrustBar / Footer atmospheric strips.
 *
 * Reserved visual atom for T2 ELECTRICIANS — replaces what T1 called
 * VoltageMeter (vertical bars). T2's marker reads as a measurement target /
 * setting-out point on a blueprint.
 */
import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  tone?: "sapphire" | "steel" | "hazard" | "alert";
  className?: string;
};

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  sapphire: "var(--color-primary)",
  steel: "rgba(0,0,0,0.45)",
  hazard: "var(--color-secondary)",
  alert: "var(--color-accent)",
};

export function TargetMarker({
  size = 16,
  tone = "sapphire",
  className,
}: Props) {
  const c = TONE[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={cn("inline-block flex-shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="2.5" stroke={c} strokeWidth="1.2" />
      <circle cx="8" cy="8" r="0.8" fill={c} />
      <line x1="8" x2="8" y1="0" y2="3" stroke={c} strokeWidth="1.2" />
      <line x1="8" x2="8" y1="13" y2="16" stroke={c} strokeWidth="1.2" />
      <line x1="0" x2="3" y1="8" y2="8" stroke={c} strokeWidth="1.2" />
      <line x1="13" x2="16" y1="8" y2="8" stroke={c} strokeWidth="1.2" />
    </svg>
  );
}
