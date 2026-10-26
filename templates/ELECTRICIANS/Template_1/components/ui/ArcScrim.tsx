/**
 * ArcScrim — image dim layer per claude.md hard rule #2b.
 *
 * REQUIRED on Hero, CtaSection, QuoteSection (and any image-bg section with
 * foreground text). Vignette / FilamentGlow are atmospheric — they DO NOT
 * darken uniformly. ArcScrim guarantees baseline readability across ANY
 * photo a client uploads.
 *
 * Sits UNDER any FilamentGlow / vignette overlay, ABOVE the image.
 */
import { cn } from "@/lib/cn";

type Props = {
  /** dim strength — strong is the default for image-bg + text overlay sections */
  dim?: "soft" | "med" | "strong" | "max";
  className?: string;
};

const DIM_CLASS: Record<NonNullable<Props["dim"]>, string> = {
  soft: "bg-black/25",
  med: "bg-black/40",
  strong: "bg-black/55",
  max: "bg-black/75",
};

export function ArcScrim({ dim = "strong", className }: Props) {
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
