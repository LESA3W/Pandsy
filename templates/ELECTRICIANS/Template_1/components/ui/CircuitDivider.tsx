/**
 * CircuitDivider — section divider with a circuit-trace SVG visual.
 *
 * Single horizontal line with small circuit-node motifs at intervals,
 * suggesting a wiring diagram. Used between major sections in CtaSection
 * and as decorative break.
 *
 * Reserved visual atom for T1 ELECTRICIANS.
 */
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  tone?: "amber" | "arc";
};

export function CircuitDivider({ className, tone = "amber" }: Props) {
  const stroke = tone === "amber" ? "var(--color-primary)" : "var(--color-secondary)";
  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 16"
        preserveAspectRatio="none"
        className="block w-full h-4"
      >
        <line
          x1="0"
          x2="1200"
          y1="8"
          y2="8"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
        />
        {[150, 360, 600, 840, 1050].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="8" r="3" fill="#000000" stroke={stroke} strokeWidth="1.2" />
            <line
              x1={x - 14}
              x2={x + 14}
              y1="8"
              y2="8"
              stroke={stroke}
              strokeWidth="1.5"
              strokeOpacity="0.55"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
