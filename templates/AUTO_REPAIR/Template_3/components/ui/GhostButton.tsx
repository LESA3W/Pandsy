import Link from "next/link";
import { cn } from "@/lib/cn";

type GhostButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  /**
   * "outline" (default) — transparent body with slate-line border that warms
   * to amber on hover. The original ghost styling.
   * "filled" — solid amber body with night-deep text. Same shape and size
   * as the outline variant; used when the Call CTA needs the same visual
   * weight as the primary SodiumButton.
   */
  variant?: "outline" | "filled";
};

const SIZE_MAP = {
  sm: "px-4 py-3 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-sm sm:px-8",
};

const VARIANT_MAP = {
  outline: cn(
    "border border-white/15 bg-transparent text-white/90",
    "hover:border-primary hover:text-primary",
  ),
  filled: cn(
    "border border-secondary/70 bg-black/70 text-secondary",
    "hover:bg-secondary hover:text-secondary-text hover:border-secondary",
  ),
};

/**
 * Secondary CTA. Transparent with bone text and a slate-line border that
 * warms to amber on hover. Used as the "Call" partner of SodiumButton.
 *
 * Pass `variant="filled"` for a solid-amber version when the call CTA needs
 * to read as strongly as the primary action.
 */
export default function GhostButton({
  children,
  href,
  onClick,
  className,
  size = "md",
  variant = "outline",
}: GhostButtonProps) {
  const base = cn(
    "inline-flex items-center justify-center gap-2",
    "font-sans font-semibold tracking-wider uppercase",
    VARIANT_MAP[variant],
    "transition-colors duration-300",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber",
    SIZE_MAP[size],
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a href={href} className={base}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}
