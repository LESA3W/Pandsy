import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// FlowChip — pill-shaped trust-signal badge.
// White fill + primary text + subtle outline. Used in BadgeStrip and Hero trust strips.

type FlowChipProps = {
  tone?: "default" | "ghost" | "aqua-fill";
  children: ReactNode;
  className?: string;
};

const TONE = {
  default:    "bg-white text-primary border-black/10",
  ghost:      "bg-transparent text-primary border-primary/30",
  "aqua-fill": "bg-primary text-primary-text border-primary",
} as const;

export default function FlowChip({ tone = "default", children, className }: FlowChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
