// XIcon — Lucide.X is the close cross, Lucide.Twitter is the deprecated bird
// (CLAUDE.md hard rule #7). We wrap FontAwesome's faXTwitter brand glyph.

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

type XIconProps = {
  className?: string;
};

export default function XIcon({ className }: XIconProps) {
  return <FontAwesomeIcon icon={faXTwitter} className={className} aria-hidden />;
}
