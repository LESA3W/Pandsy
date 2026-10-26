import { cn } from "@/lib/cn";

// PipeTick — short vertical pipe-segment mark used as inline section-kicker prefix.
// Different shape language from T1's DropSeal-led kickers and T2's BrassMedallion-led.
// Renders as a thin vertical bar with ferrules at top and bottom.
// Uses CSS vars so color adapts to the client's brand at runtime.

type PipeTickProps = {
  tone?: "default" | "light" | "accent";
  className?: string;
};

const TONE = {
  default:    { bar: "var(--color-primary)", cap: "rgba(0,0,0,0.2)" },
  light:      { bar: "var(--color-primary)", cap: "rgba(255,255,255,0.6)" },
  accent:     { bar: "var(--color-accent)",  cap: "rgba(0,0,0,0.2)" },
} as const;

export default function PipeTick({ tone = "default", className }: PipeTickProps) {
  const t = TONE[tone];
  return (
    <span
      role="presentation"
      aria-hidden
      className={cn("relative inline-block align-middle", className)}
      style={{ width: 6, height: 18 }}
    >
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: 6, height: 2, background: t.cap }}
      />
      <span
        className="absolute left-1/2 top-1.5 -translate-x-1/2"
        style={{ width: 2, height: 12, background: t.bar }}
      />
      <span
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{ width: 6, height: 2, background: t.cap }}
      />
    </span>
  );
}
