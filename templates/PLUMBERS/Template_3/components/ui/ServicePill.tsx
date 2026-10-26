import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

// ServicePill — rounded card frame with soft drop-shadow elevation + hover lift.
// The signature card shape of CLEARLINE (~70% of cards). Distinct from T1's
// FittingBracket (copper-bracket-cornered) and T2's PlateLine-topped plate-cards.

type ServicePillProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "cloud" | "pearl" | "aqua-soft";
  interactive?: boolean;
  children: ReactNode;
};

const TONE = {
  cloud: "bg-white border-black/10",
  pearl: "bg-white border-black/10",
  "aqua-soft": "bg-primary/10 border-primary/30",
} as const;

export default function ServicePill({
  tone = "cloud",
  interactive = false,
  className,
  children,
  ...rest
}: ServicePillProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-3xl border shadow-lift-soft",
        TONE[tone],
        interactive &&
          "transition-shadow duration-200 ease-out hover:shadow-lift hover:border-primary/40",
        className,
      )}
    >
      {children}
    </div>
  );
}
