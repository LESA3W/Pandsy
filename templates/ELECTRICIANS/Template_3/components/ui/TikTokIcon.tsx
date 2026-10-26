/**
 * Custom TikTok glyph (Lucide doesn't ship one).
 * Stroke-based to match Lucide visual register.
 */
type Props = {
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function TikTokIcon({ size = 20, className = "", strokeWidth = 2 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
