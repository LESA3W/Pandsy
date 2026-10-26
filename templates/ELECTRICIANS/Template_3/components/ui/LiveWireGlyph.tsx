/**
 * LiveWireGlyph — a vertical hairline curling into a hook at the top, with
 * a crimson live-wire dot terminator. Used as a column separator in the
 * Reviews 2x2 grid + footer info grid.
 *
 * T3 HOT WIRE signature. Replaces T1 VoltageMeter (vertical bars) and T2
 * TargetMarker (large crosshair) roles.
 */
import { cn } from "@/lib/cn";

type Props = {
  height?: number;
  className?: string;
  /** "primary" (default) | "accent" — match the surface */
  tone?: "primary" | "accent";
};

export function LiveWireGlyph({
  height = 56,
  tone = "primary",
  className,
}: Props) {
  const stroke = tone === "primary" ? "stroke-primary" : "stroke-accent";
  const dot = tone === "primary" ? "fill-primary" : "fill-accent";
  return (
    <svg
      width="14"
      height={height}
      viewBox={`0 0 14 ${height}`}
      fill="none"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      {/* Vertical hairline */}
      <line
        x1="7"
        y1="10"
        x2="7"
        y2={height - 4}
        strokeWidth="1.5"
        strokeLinecap="round"
        className={stroke}
      />
      {/* Top hook curl */}
      <path
        d="M7 10c0-3 3-5 5-3"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={stroke}
        fill="none"
      />
      {/* Live-wire dot terminator at bottom */}
      <circle cx="7" cy={height - 4} r="2.6" className={dot} />
    </svg>
  );
}
