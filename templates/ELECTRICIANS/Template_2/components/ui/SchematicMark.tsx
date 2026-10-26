/**
 * SchematicMark — small crosshair / target annotation glyph used as a
 * detail-pointer in section headers and trust strips.
 *
 * Reserved visual atom for T2 ELECTRICIANS.
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

export function SchematicMark({
  size = 12,
  tone = "sapphire",
  className,
}: Props) {
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
      <circle cx="6" cy="6" r="3" stroke={c} strokeWidth="1.2" />
      <circle cx="6" cy="6" r="1" fill={c} />
      <line x1="0" x2="2" y1="6" y2="6" stroke={c} strokeWidth="1" />
      <line x1="10" x2="12" y1="6" y2="6" stroke={c} strokeWidth="1" />
      <line x1="6" x2="6" y1="0" y2="2" stroke={c} strokeWidth="1" />
      <line x1="6" x2="6" y1="10" y2="12" stroke={c} strokeWidth="1" />
    </svg>
  );
}
