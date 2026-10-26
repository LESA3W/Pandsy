/**
 * StarRow — converts a "1"-"5" digit string to a row of filled Lucide
 * Star icons (with the rest outlined). Used in Reviews + Google badge.
 */
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  /** Digit "1" through "5" — accepts any string, parsed via parseInt */
  rating: string | number;
  size?: number;
  className?: string;
  filledColor?: string;
  outlineColor?: string;
};

export function StarRow({
  rating,
  size = 16,
  className = "",
  filledColor: _filledColor = "text-[#fbbf24]",
  outlineColor = "text-slate-300",
}: Props) {
  const r = Math.max(0, Math.min(5, parseInt(String(rating), 10) || 0));

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-label={`${r} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= r;
        return (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            className={cn(
              active ? "text-[#fbbf24] fill-[#fbbf24]" : cn(outlineColor, "fill-transparent"),
            )}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
