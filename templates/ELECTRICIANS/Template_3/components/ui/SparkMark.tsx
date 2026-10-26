/**
 * SparkMark — small spark glyph (4-arm star) used inline near headlines and
 * as a separator between trust items / benefit columns.
 *
 * T3 HOT WIRE signature. Replaces T2 SchematicMark crosshair role.
 * Reads as an electrical spark / live-wire flicker.
 */
import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  /** "crimson" (default) | "copper" | "ink" | "cream" */
  tone?: "crimson" | "copper" | "ink" | "cream";
  className?: string;
};

const TONE: Record<string, string> = {
  crimson: "text-primary",
  copper: "text-accent",
  ink: "text-black",
  cream: "text-white",
};

export function SparkMark({ size = 12, tone = "crimson", className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      className={cn(TONE[tone], "inline-block shrink-0", className)}
      aria-hidden="true"
    >
      {/* 4-pointed asterisk + small inner cross */}
      <path d="M8 1.5v4M8 10.5v4M1.5 8h4M10.5 8h4" />
      <path d="M3.5 3.5l2.5 2.5M10 10l2.5 2.5M12.5 3.5L10 6M6 10l-2.5 2.5" opacity="0.55" />
    </svg>
  );
}
