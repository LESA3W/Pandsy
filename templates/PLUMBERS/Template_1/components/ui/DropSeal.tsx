/**
 * Water-droplet seal — T1 PLUMBERS signature inline marker.
 * Used as section markers, list bullets, and trust-bar separators.
 */
import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  className?: string;
  tone?: "primary" | "secondary" | "accent" | "white" | "black";
};

const TONE_CLASSES: Record<NonNullable<Props["tone"]>, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
  white: "text-white",
  black: "text-black",
};

export function DropSeal({ size = 14, className = "", tone = "primary" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(TONE_CLASSES[tone], className)}
      aria-hidden="true"
    >
      {/* Stylized droplet — pointed top, rounded bottom */}
      <path d="M12 2.5c-3.5 5-7 9-7 13a7 7 0 0 0 14 0c0-4-3.5-8-7-13z" />
    </svg>
  );
}
