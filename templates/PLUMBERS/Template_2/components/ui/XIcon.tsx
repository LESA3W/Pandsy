import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

// X (Twitter) icon per CLAUDE.md rule #7.
// Lucide.X is the close-cross; Lucide.Twitter is the deprecated bird.
// Use FontAwesome's faXTwitter brand glyph for the actual platform mark.
export function XIcon({
  className,
  size = 18,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <FontAwesomeIcon
      icon={faXTwitter}
      style={{ width: size, height: size }}
      className={className}
      aria-hidden
    />
  );
}
