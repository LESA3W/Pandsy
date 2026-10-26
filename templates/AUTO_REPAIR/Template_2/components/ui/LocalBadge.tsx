import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";

type LocalBadgeProps = {
  className?: string;
  /**
   * If true, uses cream-on-forest (for use over dark surfaces).
   * Default is forest-on-cream (for use over light or photo surfaces).
   */
  inverse?: boolean;
};

/**
 * Discrete location caption. Inline, single-line, MapPin icon + small-caps city.
 *
 * Designed to sit as an integrated photo caption (bottom-left of an image,
 * inside the image OR as a row below the image), NOT as a floating sticker
 * with framing rules. The previous "two stacked rules" stamp version
 * was rejected for reading as a vintage editorial sticker, which is one of
 * the explicit forbidden aesthetic territories in claude.md hard rule #17.
 */
export default function LocalBadge({ className, inverse }: LocalBadgeProps) {
  const textColor = inverse ? "text-white" : "text-secondary";
  const iconColor = inverse ? "text-white/80" : "text-primary";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 small-caps text-[10px] tracking-wider",
        textColor,
        className,
      )}
    >
      <MapPin size={11} strokeWidth={2} className={iconColor} aria-hidden />
      Local to {"{{CITY}}"}
    </span>
  );
}
