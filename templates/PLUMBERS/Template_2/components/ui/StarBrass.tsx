import { cn } from "@/lib/cn";

// StarBrass — 5 primary-tinted stars from a digit string ("1" .. "5").
// Used in ClientNotes review cards and the Google Business badge above them.
export function StarBrass({
  digit,
  size = 14,
  className,
}: {
  digit: string;
  size?: number;
  className?: string;
}) {
  const filled = Math.max(0, Math.min(5, parseInt(digit, 10) || 0));
  return (
    <span className={cn("inline-flex gap-0.5 align-middle", className)} aria-label={`${filled} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} active={i < filled} />
      ))}
    </span>
  );
}

function Star({ size, active }: { size: number; active: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      aria-hidden="true"
    >
      <path
        d="M7 1.2 8.7 5l4.2.4-3.2 2.8 1 4.1L7 10.2 3.3 12.3l1-4.1L1.1 5.4 5.3 5z"
        fill={active ? "#fbbf24" : "transparent"}
        stroke={active ? "#fbbf24" : "rgba(255,255,255,0.2)"}
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
