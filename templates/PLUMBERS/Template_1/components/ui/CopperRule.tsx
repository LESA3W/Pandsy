/**
 * Single 1px primary-color hairline — T1 PLUMBERS divider atom.
 * Used between sections and around card frames.
 */
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** "full" → spans full width; "short" → 64px; "center" → 200px centered */
  width?: "full" | "short" | "center";
};

export function CopperRule({ className = "", width = "full" }: Props) {
  const widthClass =
    width === "short"
      ? "w-16"
      : width === "center"
        ? "w-48 mx-auto"
        : "w-full";

  return (
    <div
      className={cn("h-px bg-primary", widthClass, className)}
      aria-hidden="true"
    />
  );
}
