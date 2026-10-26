/**
 * StarRow — 5-star horizontal strip for reviews + Google badge.
 * Renders 5 Lucide Star icons; first `value` filled in HOT WIRE crimson.
 */
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  /** "1" through "5" (placeholder-friendly) or numeric */
  rating: string | number;
  size?: number;
  tone?: "crimson" | "copper" | "ember";
  className?: string;
};

export function StarRow({ rating, size = 16, tone = "crimson", className }: Props) {
  const value = Math.max(0, Math.min(5, parseInt(String(rating), 10) || 0));
  // Filled stars are always fixed gold regardless of the brand 2-color theme.
  // `tone` retained for API compatibility (referenced so it never triggers a
  // TS unused-param error).
  void tone;
  const fill = "text-[#fbbf24]";
  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${value} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i < value ? fill : "text-black/20"}
          fill={i < value ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}
