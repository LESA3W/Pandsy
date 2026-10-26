import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type ServiceMarkProps = {
  Icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  /** Icon color. Defaults to "clay" (primary brand). Use "secondary" or "accent"
   *  to pull in the client's second and third logo colors on service cards. */
  color?: "clay" | "secondary" | "accent";
  className?: string;
};

/**
 * Service mark. A small clay-iconographed disc on stone-soft warm fill
 * with the Heritage Workshop "shadow-paper" raise. Reads as a workshop's
 * clay-stamped parts tag, not a SaaS feature pill.
 *
 * The clay icon hue lines up with the rest of the tool-icon system
 * (TrustSignals trust pills, Hero placards, Workmanship caption marks).
 * `shrink-0` is non-negotiable . without it the flex parent in
 * Services.tsx squeezes the disc into a vertical pill on narrow
 * mobile widths.
 */
export default function ServiceMark({
  Icon,
  size = "md",
  color = "clay",
  className,
}: ServiceMarkProps) {
  const dim =
    size === "lg" ? "h-12 w-12" : size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconSize = size === "lg" ? 22 : size === "sm" ? 14 : 18;
  const iconColor =
    color === "secondary"
      ? "text-secondary"
      : color === "accent"
        ? "text-accent"
        : "text-primary";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-black/5 shadow-paper",
        dim,
        className,
      )}
    >
      <Icon size={iconSize} strokeWidth={1.5} className={iconColor} />
    </span>
  );
}
