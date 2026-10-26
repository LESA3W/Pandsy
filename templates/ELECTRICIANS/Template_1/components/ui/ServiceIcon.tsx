/**
 * ServiceIcon — wrapper that resolves a Lucide icon for a service name
 * via the keyword RULES in lib/parseServices.ts.
 */
import { parseServices } from "@/lib/parseServices";
import { cn } from "@/lib/cn";

type Props = {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export function ServiceIcon({
  name,
  size = 24,
  strokeWidth = 1.5,
  className,
}: Props) {
  const Icon = parseServices(name)[0]?.icon;
  if (!Icon) return null;
  return (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={cn(className)}
      aria-hidden="true"
    />
  );
}
