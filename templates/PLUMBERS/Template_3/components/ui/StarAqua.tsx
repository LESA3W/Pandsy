import { cn } from "@/lib/cn";

// StarAqua — 5-star row, primary-color-filled stars from a digit string ("1"..."5").
// Uses CSS var(--color-primary) so color adapts to the client's brand at runtime.

type StarAquaProps = {
  rating: string;
  size?: number;
  className?: string;
};

export default function StarAqua({ rating, size = 16, className }: StarAquaProps) {
  const filled = Math.max(0, Math.min(5, parseInt(rating, 10) || 0));
  const stars = Array.from({ length: 5 }, (_, i) => i < filled);
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-label={`${filled} out of 5 stars`}>
      {stars.map((isFilled, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          aria-hidden
          className="shrink-0"
        >
          <path
            d="M12 2 L14.6 9.1 L22 9.6 L16.3 14.4 L18.2 22 L12 17.7 L5.8 22 L7.7 14.4 L2 9.6 L9.4 9.1 Z"
            fill={isFilled ? "#fbbf24" : "transparent"}
            stroke={isFilled ? "#fbbf24" : "rgba(0,0,0,0.15)"}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}
