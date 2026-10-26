import { cn } from "@/lib/cn";

// RippleRule — static SVG sine-wave divider used between sections for visual
// rhythm. Trade-anchored (water motion) without continuous animation
// (T1 owns continuous water-ripple loop).

type RippleRuleProps = {
  tone?: "default" | "light" | "deep";
  className?: string;
};

const STROKE = {
  default: "rgba(0,0,0,0.12)",
  light: "rgba(255,255,255,0.18)",
  deep: "var(--color-primary)",
} as const;

export default function RippleRule({ tone = "default", className }: RippleRuleProps) {
  return (
    <svg
      role="separator"
      aria-hidden
      viewBox="0 0 240 8"
      preserveAspectRatio="none"
      className={cn("h-2 w-full", className)}
    >
      <path
        d="M0,4 C30,0 50,8 80,4 C110,0 130,8 160,4 C190,0 210,8 240,4"
        fill="none"
        stroke={STROKE[tone]}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
