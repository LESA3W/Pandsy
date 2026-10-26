import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

type NightStarProps = {
  size?: number;
  className?: string;
  /** When false, render as an outlined ghost star (used to fill the missing slots in a 5-star strip) */
  filled?: boolean;
  /**
   * Color tone for filled stars. "accent" routes to var(--color-accent) so
   * review star fills exercise the third brand color slot.
   */
  tone?: "amber" | "accent";
};

/**
 * Single review star. Filled = sodium amber by default. "accent" tone = var(--color-accent).
 * Ghost = slate-line outline.
 */
export function NightStar({
  size = 16,
  className,
  filled = true,
  tone = "accent",
}: NightStarProps) {
  const filledClass =
    tone === "accent" ? "fill-[#fbbf24] text-[#fbbf24]" : "fill-[#fbbf24] text-[#fbbf24]";
  return (
    <Star
      size={size}
      strokeWidth={1.5}
      className={cn(
        filled ? filledClass : "fill-transparent text-white/20",
        className,
      )}
      aria-hidden
    />
  );
}

type StarRowProps = {
  /** Digit 1-5 from REVIEW_N_STARS placeholder */
  count: string | number;
  size?: number;
  className?: string;
  /** Color tone for filled stars. Defaults to "accent" for brand visibility. */
  tone?: "amber" | "accent";
};

/**
 * StarRow helper — converts a digit string into 5 stars (filled + ghost).
 */
export function StarRow({ count, size = 16, className, tone = "accent" }: StarRowProps) {
  const n = Math.max(0, Math.min(5, Number(count) || 0));
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`${n} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <NightStar key={i} size={size} filled={i < n} tone={tone} />
      ))}
    </span>
  );
}

export default NightStar;
