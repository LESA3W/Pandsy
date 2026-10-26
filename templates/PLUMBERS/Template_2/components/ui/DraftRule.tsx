import { cn } from "@/lib/cn";

// DraftRule — single 1px line with tick marks at intervals.
// Reads as the edge of a drafter's ruler. Used as full-width footer divider
// and atmospheric element on dark sections.
export function DraftRule({
  className,
  ticks = 12,
  tone = "primary",
}: {
  className?: string;
  ticks?: number;
  tone?: "primary" | "white" | "black";
}) {
  const color =
    tone === "white"
      ? "rgba(255,255,255,0.2)"
      : tone === "black"
      ? "rgba(0,0,0,0.15)"
      : "var(--color-primary)";
  return (
    <div
      className={cn("relative w-full h-3", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-px"
        style={{ height: 1, background: color, opacity: 0.7 }}
      />
      <div className="absolute inset-x-0 top-0 flex justify-between">
        {Array.from({ length: ticks }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 1,
              height: i % 4 === 0 ? 12 : 6,
              background: color,
              opacity: 0.55,
            }}
          />
        ))}
      </div>
    </div>
  );
}
