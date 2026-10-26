// TikTokIcon — Lucide does not provide a TikTok glyph (CLAUDE.md hard rule #7).
// Custom outline SVG matching the visual weight of Lucide's Instagram + Facebook.

type TikTokIconProps = {
  className?: string;
  strokeWidth?: number;
};

export default function TikTokIcon({ className, strokeWidth = 2 }: TikTokIconProps) {
  return (
    <svg
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
