/**
 * BlueprintCell — section header card styled like a title block on a
 * technical drawing. Number + title + spec note arranged in a small grid.
 *
 * Reserved visual atom for T2 ELECTRICIANS — replaces what T1 called PanelLabel.
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Sheet number (e.g. "04", "S-04", "LEGAL-01") */
  n: string;
  /** Section title (e.g. "Services", "About the crew") */
  title: string;
  /** Spec note (e.g. "rev. 2026-05 · sheet 04 of 12") */
  spec?: string;
  /** Surface variant — dark = on light bg, light = on dark bg */
  variant?: "dark" | "light";
  className?: string;
};

export function BlueprintCell({
  n,
  title,
  spec,
  variant = "dark",
  className,
}: Props) {
  const isLight = variant === "light";
  const surface = isLight
    ? "bg-black border-white/20 text-white"
    : "bg-white border-black/10 text-black";
  const numberSurface = isLight
    ? "bg-primary text-primary-text"
    : "bg-primary text-primary-text";
  const titleColor = isLight ? "text-white" : "text-black";
  const specColor = isLight ? "text-white/70" : "text-black/50";

  return (
    <div
      className={cn(
        "inline-flex items-stretch border shadow-[0_1px_0_rgba(15,23,42,0.04)]",
        surface,
        className,
      )}
    >
      {/* Sheet number cell */}
      <span
        className={cn(
          "px-3 py-2 flex items-center justify-center min-w-[3rem] font-display text-base font-semibold tracking-tight",
          numberSurface,
        )}
      >
        {n}
      </span>
      {/* Title + spec block */}
      <span className="px-3 py-2 flex flex-col justify-center">
        <span className={cn("font-display text-sm font-semibold leading-tight tracking-tight", titleColor)}>
          {title}
        </span>
        {spec && (
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-widest leading-tight mt-0.5",
              specColor,
            )}
          >
            {spec}
          </span>
        )}
      </span>
    </div>
  );
}
