/**
 * GridScrim — image dim layer per claude.md hard rule #2b.
 * T2 BLUEPRINT/GRID's name for what T1 ELECTRICIANS called ArcScrim.
 *
 * REQUIRED on Hero, CtaSection, QuoteSection (and any image-bg section with
 * foreground text). The dim is steel-deep tinted with a subtle blueprint-grid
 * overlay added on top via GridGlow — the dim layer alone guarantees baseline
 * readability across ANY photo a client uploads.
 */
import { cn } from "@/lib/cn";

type Props = {
  /** dim strength — strong is the default for image-bg + text overlay sections */
  dim?: "soft" | "med" | "strong" | "max";
  className?: string;
};

const DIM_CLASS: Record<NonNullable<Props["dim"]>, string> = {
  soft: "bg-black/30",
  med: "bg-black/45",
  strong: "bg-black/60",
  max: "bg-black/80",
};

export function GridScrim({ dim = "strong", className }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none",
        DIM_CLASS[dim],
        className,
      )}
      aria-hidden="true"
    />
  );
}
