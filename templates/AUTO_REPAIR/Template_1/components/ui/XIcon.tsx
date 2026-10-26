/**
 * X (formerly Twitter) brand icon — uses Font Awesome's official x-twitter
 * icon for the authentic filled X mark, since Lucide React only ships the
 * deprecated bird logo.
 *
 * Note: this is the only icon imported from Font Awesome — Instagram, Facebook
 * stay on Lucide and TikTok uses our custom SVG. The visual mismatch (FA filled
 * vs Lucide stroke) is intentional per user preference.
 */
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

export function XIcon({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
  // Accept (and ignore) the strokeWidth prop so the call signature
  // stays compatible with the other icon components in the SOCIALS array.
  strokeWidth?: number;
}) {
  return (
    <FontAwesomeIcon
      icon={faXTwitter}
      style={{ width: size, height: size }}
      className={className}
      aria-hidden="true"
    />
  );
}
