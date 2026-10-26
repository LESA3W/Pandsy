/**
 * VoltageRule — hairline divider with a voltage-indicator tick mark mid-line.
 *
 * Reserved visual atom for T1 ELECTRICIANS. Used for short section dividers
 * and as a subtle break between content blocks.
 */
import { cn } from "@/lib/cn";

type Props = {
  /** width of the rule */
  width?: "short" | "center" | "full";
  /** accent color — amber default, arc-cyan for high-energy moments */
  tone?: "amber" | "arc";
  className?: string;
};

const WIDTH_CLASS: Record<NonNullable<Props["width"]>, string> = {
  short: "w-24",
  center: "w-40",
  full: "w-full",
};

export function VoltageRule({
  width = "short",
  tone = "amber",
  className,
}: Props) {
  const stroke = tone === "amber" ? "bg-primary" : "bg-secondary";
  const muted = "bg-white/20";

  return (
    <div
      className={cn(
        "relative flex items-center",
        WIDTH_CLASS[width],
        className,
      )}
      aria-hidden="true"
    >
      <span className={cn("h-px flex-1", muted)} />
      <span className={cn("h-2 w-0.5 mx-1.5 rounded-sm", stroke)} />
      <span className={cn("h-px flex-1", muted)} />
    </div>
  );
}
