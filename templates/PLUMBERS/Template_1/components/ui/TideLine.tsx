/**
 * Horizontal hairline divider — T1 PLUMBERS signature atom.
 * Linear gradient: faded black → primary highlight → faded black.
 * Evokes the waterline mark left on a dock at low tide.
 */
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Optional thickness override in px; defaults to 1px hairline. */
  thickness?: number;
};

export function TideLine({
  className = "",
  thickness = 1,
}: Props) {
  return (
    <div
      className={cn("w-full bg-tide-gradient", className)}
      style={{ height: `${thickness}px` }}
      aria-hidden="true"
    />
  );
}
