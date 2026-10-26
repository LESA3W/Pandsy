import { cn } from "@/lib/cn";

// BrassMedallion — small filled circle SVG used as inline marker,
// list bullet, kicker prefix. Uses CSS var(--color-primary) so it adapts
// to the client's brand color at runtime.
export function BrassMedallion({
  size = 8,
  className,
  filled = true,
}: {
  size?: number;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 8 8"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      <circle
        cx="4"
        cy="4"
        r="3.2"
        fill={filled ? "var(--color-primary)" : "transparent"}
        stroke="var(--color-primary)"
        strokeWidth="0.6"
        strokeOpacity={filled ? 0.7 : 1}
      />
      {filled && (
        <circle cx="2.8" cy="2.8" r="0.7" fill="white" opacity="0.35" />
      )}
    </svg>
  );
}
