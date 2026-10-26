import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg";

type ChromeIconProps = {
  icon: LucideIcon;
  size?: Size;
  className?: string;
};

const SIZE_MAP: Record<Size, { box: string; icon: number }> = {
  sm: { box: "h-9 w-9", icon: 16 },
  md: { box: "h-11 w-11", icon: 18 },
  lg: { box: "h-14 w-14", icon: 22 },
};

/**
 * Lucide icon inside a chrome-tinted ringed circle on a slate-surface fill.
 * Replaces T2's ServiceMark and any T1 hazard-icon-square.
 *
 * The icon stays chrome (not amber) so the amber accent remains scarce and
 * meaningful — saved for CTAs, glow dots, and stars.
 */
export default function ChromeIcon({
  icon: Icon,
  size = "md",
  className,
}: ChromeIconProps) {
  const { box, icon } = SIZE_MAP[size];
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        "border border-white/15 bg-black/80 text-white/70",
        "transition-colors duration-300",
        box,
        className,
      )}
    >
      <Icon size={icon} strokeWidth={1.5} />
    </div>
  );
}
