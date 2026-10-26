import { cn } from "@/lib/cn";

type HaloRuleProps = {
  className?: string;
  /**
   * Where the glow sits along the rule and which color it uses.
   * "accent-left" uses var(--color-accent) instead of sodium amber.
   */
  align?: "left" | "right" | "center" | "accent-left";
  /** Width override; defaults to full */
  width?: string;
};

/**
 * 1px slate hairline with a soft radial fade-out at one end.
 * Replaces T2's stone hairline and T1's hazard tape.
 * "accent-left" variant routes the glow through var(--color-accent)
 * for brand color visibility inside review cards.
 */
export default function HaloRule({
  className,
  align = "left",
  width = "100%",
}: HaloRuleProps) {
  let gradient: string;
  if (align === "accent-left") {
    // Uses CSS custom property directly — works in all modern browsers.
    gradient =
      "linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 60%, transparent) 0%, rgba(42,53,64,1) 18%, rgba(42,53,64,1) 100%)";
  } else if (align === "left") {
    gradient =
      "linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 60%, transparent) 0%, rgba(42,53,64,1) 18%, rgba(42,53,64,1) 100%)";
  } else if (align === "right") {
    gradient =
      "linear-gradient(90deg, rgba(42,53,64,1) 0%, rgba(42,53,64,1) 82%, color-mix(in srgb, var(--color-primary) 60%, transparent) 100%)";
  } else {
    gradient =
      "linear-gradient(90deg, rgba(42,53,64,1) 0%, color-mix(in srgb, var(--color-primary) 55%, transparent) 50%, rgba(42,53,64,1) 100%)";
  }

  return (
    <div
      aria-hidden
      className={cn("h-px", className)}
      style={{ background: gradient, width }}
    />
  );
}
