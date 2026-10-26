import { cn } from "@/lib/cn";

// PlateLine — a thin horizontal hairline with tick-marks at each end.
// Reads as a dimension callout on a shop drawing. Used at the top of every
// card in T2 (where T1 used FittingBracket corners).
export function PlateLine({
  className,
  tone = "primary",
}: {
  className?: string;
  tone?: "primary" | "white" | "black";
}) {
  const stroke =
    tone === "white"
      ? "rgba(255,255,255,0.3)"
      : tone === "black"
      ? "rgba(0,0,0,0.15)"
      : "var(--color-primary)";
  return (
    <div
      className={cn("relative flex items-center w-full h-3", className)}
      aria-hidden="true"
    >
      <span
        className="block"
        style={{
          width: 1,
          height: 8,
          background: stroke,
        }}
      />
      <span className="block flex-1" style={{ height: 1, background: stroke }} />
      <span
        className="block"
        style={{
          width: 1,
          height: 8,
          background: stroke,
        }}
      />
    </div>
  );
}
