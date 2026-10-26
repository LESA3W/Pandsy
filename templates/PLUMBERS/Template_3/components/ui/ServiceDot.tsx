import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

// ServiceDot — Lucide icon resolver wrapped in a soft circle.
// Different from T1 PlumbingIcon (copper-bracket frame around the icon) and
// T2 PlumbingMark (bare icon).
// Uses parseServices() keyword mapping per CLAUDE.md rule #15.

type ServiceDotProps = {
  Icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  tone?: "default" | "ghost" | "accent";
  className?: string;
};

const SIZE = {
  sm: { box: "h-9 w-9",  icon: 16 },
  md: { box: "h-12 w-12", icon: 22 },
  lg: { box: "h-16 w-16", icon: 28 },
} as const;

const TONE = {
  default: "bg-primary/10 text-primary ring-1 ring-primary/30",
  ghost:   "bg-white text-primary ring-1 ring-black/10",
  accent:  "bg-accent/10 text-accent ring-1 ring-accent/40",
} as const;

export default function ServiceDot({
  Icon,
  size = "md",
  tone = "default",
  className,
}: ServiceDotProps) {
  const s = SIZE[size];
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-shadow duration-200 ease-out",
        s.box,
        TONE[tone],
        className,
      )}
      aria-hidden
    >
      <Icon size={s.icon} strokeWidth={1.8} />
    </span>
  );
}
