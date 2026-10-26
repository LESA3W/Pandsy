/**
 * MeasureRule — ruler-style hairline divider with tick increments.
 *
 * Reserved visual atom for T2 ELECTRICIANS — replaces what T1 called
 * VoltageRule (single tick mid-line). T2's rule reads as a set-square or
 * scale ruler on a technical drawing.
 */
import { cn } from "@/lib/cn";

type Props = {
  width?: "short" | "center" | "full";
  tone?: "sapphire" | "steel" | "secondary";
  className?: string;
};

const WIDTH_CLASS: Record<NonNullable<Props["width"]>, string> = {
  short: "w-32",
  center: "w-48",
  full: "w-full",
};

export function MeasureRule({
  width = "short",
  tone = "sapphire",
  className,
}: Props) {
  const stroke =
    tone === "sapphire"
      ? "var(--color-primary)"
      : tone === "secondary"
        ? "var(--color-secondary)"
        : "rgba(0,0,0,0.4)";
  return (
    <div
      className={cn("relative h-3 flex items-center", WIDTH_CLASS[width], className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="block w-full h-3"
      >
        {/* Main rule line */}
        <line x1="0" x2="200" y1="6" y2="6" stroke={stroke} strokeWidth="1" />
        {/* Tick marks every 20 units (small) and every 100 (long) */}
        {[20, 40, 60, 80, 120, 140, 160, 180].map((x) => (
          <line key={x} x1={x} x2={x} y1="3" y2="6" stroke={stroke} strokeWidth="1" />
        ))}
        {[0, 100, 200].map((x) => (
          <line key={`maj-${x}`} x1={x} x2={x} y1="0" y2="9" stroke={stroke} strokeWidth="1.4" />
        ))}
      </svg>
    </div>
  );
}
