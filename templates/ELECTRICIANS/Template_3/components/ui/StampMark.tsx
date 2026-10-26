/**
 * StampMark — small crimson stamped rectangle, slightly rotated, used as a
 * section header marker. T3 HOT WIRE signature, replaces T1 PanelLabel and
 * T2 BlueprintCell roles.
 *
 * Reads as a hand-stamp on cream paper. Each instance lightly rotated so the
 * page feels stamped rather than printed.
 */
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  /** Optional line beneath the label (mono, smaller) */
  meta?: string;
  /** Rotation in degrees — defaults to a slight tilt */
  rotate?: number;
  /** "crimson" (default) | "ink" (for dark surfaces) | "copper" */
  tone?: "crimson" | "ink" | "copper";
  className?: string;
};

export function StampMark({
  label,
  meta,
  rotate = -1.5,
  tone = "crimson",
  className,
}: Props) {
  const surface =
    tone === "ink"
      ? "bg-black text-white"
      : tone === "copper"
      ? "bg-accent text-accent-text"
      : "bg-primary text-primary-text";
  return (
    <div
      className={cn("inline-flex flex-col gap-0", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span
        className={cn(
          "inline-flex items-baseline gap-2 px-3 py-1.5",
          surface,
          "font-mono text-[10px] font-medium uppercase tracking-[0.22em] leading-none",
        )}
      >
        <span aria-hidden="true" className="inline-block h-1 w-1 bg-current opacity-80" />
        {label}
      </span>
      {meta ? (
        <span className="mt-1 self-start font-mono text-[10px] uppercase tracking-[0.18em] text-black/60">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
