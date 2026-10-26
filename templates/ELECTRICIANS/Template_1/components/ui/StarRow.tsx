/**
 * StarRow — 5-star horizontal strip for reviews + Google badge.
 *
 * Renders 5 Lucide Star icons; first `value` filled in tone color, rest
 * outlined in a muted tint appropriate to the surface.
 * Accepts string rating to handle the REVIEW_N_STARS placeholder substitution
 * (which arrives as "5", "4", etc.).
 */
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  /** "1" through "5" (placeholder-friendly) or numeric */
  rating: string | number;
  size?: number;
  tone?: "amber" | "arc";
  /** Surface the star row sits on — drives empty star mute color */
  surface?: "dark" | "light";
  className?: string;
};

export function StarRow({ rating, size = 16, tone = "amber", surface = "light", className }: Props) {
  const value = Math.max(0, Math.min(5, parseInt(String(rating), 10) || 0));
  // Filled stars are always fixed gold regardless of the brand 2-color theme.
  // `tone` retained for API compatibility (referenced so it never triggers a
  // TS unused-param error).
  void tone;
  const fill = "text-[#fbbf24]";
  // Empty star: invisible on the wrong surface without this guard
  const empty = surface === "dark" ? "text-white/30" : "text-black/20";
  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i < value ? fill : empty}
          fill={i < value ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}
