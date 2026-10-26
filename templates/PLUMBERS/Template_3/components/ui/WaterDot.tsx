import { cn } from "@/lib/cn";

// WaterDot — droplet inscribed in a circle.
// Different from T1's bare droplet (DropSeal) and T2's brass-circle (BrassMedallion).
// Used as inline marker / list bullet / kicker prefix / trust-strip separator.
// Uses CSS var(--color-primary) for the droplet so it adapts at runtime.

type WaterDotProps = {
  size?: number;
  tone?: "default" | "light" | "aqua";
  className?: string;
};

const TONE = {
  default: { ring: "rgba(0,0,0,0.15)", drop: "var(--color-primary)" },
  light:   { ring: "rgba(255,255,255,0.35)", drop: "var(--color-primary)" },
  aqua:    { ring: "var(--color-primary)", drop: "var(--color-primary)" },
} as const;

export default function WaterDot({ size = 14, tone = "default", className }: WaterDotProps) {
  const t = TONE[tone];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      className={cn("inline-block shrink-0", className)}
    >
      <circle cx="12" cy="12" r="11" fill="none" stroke={t.ring} strokeWidth="1" />
      <path
        d="M12 6 C 9 11, 8 13, 8 15 a 4 4 0 0 0 8 0 c 0 -2 -1 -4 -4 -9 z"
        fill={t.drop}
      />
    </svg>
  );
}
