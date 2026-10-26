import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import PipeTick from "@/components/ui/PipeTick";

// MeterPanel — square-bottom stamp card with subtle border (no heavy heading band).
// Used to break the all-pill rhythm and dodge SaaS-landing drift (~30% of cards).
// Optional `meterLabel` renders as an integrated Geist Mono kicker at the top of
// the content (no colored bar — this version reads as a quiet card label).

type MeterPanelProps = HTMLAttributes<HTMLDivElement> & {
  meterLabel?: string;
  tone?: "cloud" | "pearl";
  children: ReactNode;
};

const TONE = {
  cloud: "bg-white border-black/10",
  pearl: "bg-white border-black/10",
} as const;

export default function MeterPanel({
  meterLabel,
  tone = "cloud",
  className,
  children,
  ...rest
}: MeterPanelProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-2xl border shadow-lift-soft transition-shadow duration-200 ease-out hover:shadow-lift",
        TONE[tone],
        className,
      )}
    >
      {meterLabel && (
        <p className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
          <PipeTick />
          <span>{meterLabel}</span>
        </p>
      )}
      {children}
    </div>
  );
}
