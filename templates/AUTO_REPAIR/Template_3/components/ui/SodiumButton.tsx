import Link from "next/link";
import { cn } from "@/lib/cn";

type SodiumButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
};

const SIZE_MAP = {
  sm: "px-4 py-3 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-7 py-4 text-sm sm:px-8",
};

/**
 * Primary CTA. Solid amber background with a soft sodium-amber radial halo
 * on hover. No scale, no pulse — just brightening light.
 */
export default function SodiumButton({
  children,
  href,
  type = "button",
  onClick,
  className,
  disabled,
  size = "md",
}: SodiumButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-center gap-2",
    "font-sans font-semibold tracking-wider uppercase",
    "bg-primary text-primary-text",
    "transition-all duration-300 ease-out",
    "hover:bg-white/90 hover:shadow-sodium-glow",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
    "disabled:cursor-not-allowed disabled:opacity-60",
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
    <button type={type} onClick={onClick} disabled={disabled} className={base}>
      {children}
    </button>
  );
}
