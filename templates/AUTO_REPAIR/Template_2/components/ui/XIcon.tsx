import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/cn";

type XIconProps = {
  size?: number;
  className?: string;
};

/**
 * X (Twitter) glyph. Lucide.X is the close cross and Lucide.Twitter is the
 * deprecated bird, so we wrap the FontAwesome brand glyph instead.
 */
export default function XIcon({ size = 18, className }: XIconProps) {
  return (
    <FontAwesomeIcon
      icon={faXTwitter}
      style={{ fontSize: size }}
      className={cn("inline-block", className)}
      aria-hidden="true"
    />
  );
}
