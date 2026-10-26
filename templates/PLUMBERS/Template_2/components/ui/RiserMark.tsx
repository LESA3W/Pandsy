import { cn } from "@/lib/cn";

// RiserMark — short divider with circle terminals at each end.
// Reads as a pipe section in an isometric riser diagram. Used between trust
// signals in SpecStrip and as inline divider where T1 used DropSeal.
export function RiserMark({
  className,
  orientation = "horizontal",
  length = 18,
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  length?: number;
}) {
  const isH = orientation === "horizontal";
  return (
    <svg
      width={isH ? length : 6}
      height={isH ? 6 : length}
      viewBox={isH ? `0 0 ${length} 6` : `0 0 6 ${length}`}
      className={cn("inline-block text-primary", className)}
      aria-hidden="true"
    >
      <circle cx={isH ? 3 : 3} cy={isH ? 3 : 3} r="1.6" fill="currentColor" />
      <line
        x1={isH ? 4.6 : 3}
        y1={isH ? 3 : 4.6}
        x2={isH ? length - 4.6 : 3}
        y2={isH ? 3 : length - 4.6}
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle
        cx={isH ? length - 3 : 3}
        cy={isH ? 3 : length - 3}
        r="1.6"
        fill="currentColor"
      />
    </svg>
  );
}
