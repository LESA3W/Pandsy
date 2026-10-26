import { cn } from "@/lib/cn";

// PressureGauge — small dial SVG with needle. The trade anchor that pulls
// CLEARLINE away from generic SaaS-landing aesthetic. Renders strings like
// "TESTED · 80 PSI" or "PRESSURE OK · 75 PSI" beside the gauge.
//
// The needle position is controlled by the `psi` prop (0-120 mapped to -120 deg to +120 deg).
// Uses CSS vars so colors adapt to the client's brand at runtime.

type PressureGaugeProps = {
  psi?: number;
  label?: string;
  size?: number;
  tone?: "default" | "accent";
  className?: string;
};

const TONE = {
  default:    { needle: "var(--color-primary)", dial: "var(--color-primary)", arc: "rgba(0,0,0,0.2)" },
  accent:     { needle: "var(--color-accent)",  dial: "var(--color-accent)",  arc: "rgba(0,0,0,0.2)" },
} as const;

export default function PressureGauge({
  psi = 78,
  label,
  size = 36,
  tone = "default",
  className,
}: PressureGaugeProps) {
  const clamped = Math.max(0, Math.min(120, psi));
  const angle = -120 + (clamped / 120) * 240;
  const t = TONE[tone];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden>
        <circle cx="18" cy="18" r="16" fill="none" stroke={t.arc} strokeWidth="1.2" />
        <path
          d="M 6 22 A 13 13 0 0 1 30 22"
          fill="none"
          stroke={t.arc}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <g transform={`rotate(${angle} 18 18)`}>
          <line
            x1="18"
            y1="18"
            x2="18"
            y2="8"
            stroke={t.needle}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <circle cx="18" cy="18" r="2" fill={t.dial} />
      </svg>
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
          {label}
        </span>
      )}
    </span>
  );
}
