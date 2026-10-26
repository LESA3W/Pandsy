import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// PlumbingMark — wraps a resolved Lucide icon (from parseServices.ts) with
// the primary-tinted treatment used across ServiceSheet and Standards.
//
// T2 keeps the icon STROKED (not filled). Different visual register
// than T1's PlumbingIcon (which used a copper-bracket frame around the icon).
export function PlumbingMark({
  icon: Icon,
  size = 22,
  className,
  tone = "primary",
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
  tone?: "primary" | "secondary" | "white" | "black";
}) {
  const color =
    tone === "white"
      ? "text-white"
      : tone === "black"
      ? "text-black"
      : tone === "secondary"
      ? "text-secondary"
      : "text-primary";
  return (
    <Icon
      size={size}
      strokeWidth={1.5}
      className={cn(color, className)}
      aria-hidden="true"
    />
  );
}
