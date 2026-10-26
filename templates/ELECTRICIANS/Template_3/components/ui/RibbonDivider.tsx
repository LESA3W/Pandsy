/**
 * RibbonDivider — full-width crimson ribbon section divider with optional
 * editorial pull-quote stamped on it.
 *
 * T3 HOT WIRE signature. Different from T1 CircuitDivider (circuit-trace SVG)
 * and T2 SafetyTape (yellow + steel hazard diagonal).
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Optional pull quote that sits centered on the ribbon */
  quote?: string;
  /** Optional small mono line on the right side (e.g. "TICKET 04 / OPEN") */
  meta?: string;
  className?: string;
};

export function RibbonDivider({ quote, meta, className }: Props) {
  return (
    <div
      role="separator"
      aria-hidden={!quote}
      className={cn(
        "relative flex w-full items-center justify-between gap-4 bg-primary py-5 px-6 sm:px-10",
        "before:absolute before:left-0 before:top-0 before:h-1 before:w-full before:bg-primary",
        "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary",
        className,
      )}
    >
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-primary-text/70">
        Live · Hand-stamped
      </span>
      {quote ? (
        <p className="hidden flex-1 px-6 text-center font-display text-base font-medium italic leading-snug text-primary-text md:block">
          {quote}
        </p>
      ) : null}
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-primary-text/70">
        {meta ?? "Crew on call"}
      </span>
    </div>
  );
}
