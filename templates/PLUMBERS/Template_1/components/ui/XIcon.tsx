"use client";

/**
 * X (Twitter) icon — wraps FontAwesome's faXTwitter glyph.
 * Lucide.X is the close cross; Lucide.Twitter is the deprecated bird.
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

type Props = {
  size?: number;
  className?: string;
};

export function XIcon({ size = 20, className = "" }: Props) {
  return (
    <FontAwesomeIcon
      icon={faXTwitter}
      style={{ width: size, height: size }}
      className={className}
      aria-hidden="true"
    />
  );
}
