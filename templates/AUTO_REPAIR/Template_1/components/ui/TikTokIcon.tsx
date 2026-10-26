/**
 * TikTok brand icon — Lucide React doesn't include TikTok officially,
 * so we ship our own SVG matching Lucide's stroke-based aesthetic.
 *
 * Stroke-based to fit alongside Lucide's other social icons (Instagram,
 * Facebook, Twitter) without looking like a foreign element.
 */
import type { SVGProps } from "react";

export function TikTokIcon({
  size = 24,
  strokeWidth = 1.75,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* Vertical body of the "d" shape */}
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}
