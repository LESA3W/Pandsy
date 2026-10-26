/**
 * PanelLabel — breaker-panel-style badge used as section header throughout T1.
 *
 * Mono uppercase tags arranged in a horizontal strip with vertical hairlines
 * between, evoking the printed labels on a service-panel cover. Reserved
 * visual atom for T1 ELECTRICIANS — T2/T3 must pick a different naming.
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Circuit number / ordinal (e.g. "01", "LEGAL-01") */
  n: string;
  /** Section title (e.g. "HERO", "PANEL UPGRADE") */
  title: string;
  /** Meta string (e.g. "CIRCUIT 01 · 200A · LIVE") */
  meta?: string;
  /** Surface variant — light = on dark bg, dark = on light bg */
  variant?: "light" | "dark";
  className?: string;
};

export function PanelLabel({ n, title, meta, variant = "light", className }: Props) {
  const isLight = variant === "light";
  return (
    <div
      className={cn(
        "inline-flex items-stretch border font-mono text-[10px] uppercase tracking-widest",
        isLight
          ? "bg-black border-white/20 text-white"
          : "bg-white border-black/15 text-black",
        className,
      )}
    >
      <span
        className={cn(
          "px-2.5 py-1.5 flex items-center font-medium",
          isLight ? "bg-primary text-primary-text" : "bg-primary text-primary-text",
        )}
      >
        {n}
      </span>
      <span
        className={cn(
          "px-3 py-1.5 flex items-center border-l",
          isLight ? "border-white/20" : "border-black/15",
        )}
      >
        {title}
      </span>
      {meta && (
        <span
          className={cn(
            "px-3 py-1.5 hidden sm:flex items-center border-l",
            isLight
              ? "border-white/20 text-primary"
              : "border-black/15 text-primary",
          )}
        >
          {meta}
        </span>
      )}
    </div>
  );
}
