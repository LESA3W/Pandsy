/**
 * Service icon resolver — wraps a Lucide icon for a given service name.
 * Used by Services and QuoteForm to keep icon resolution consistent
 * with `parseServices()` from lib/parseServices.ts.
 */
import { parseServices } from "@/lib/parseServices";
import { cn } from "@/lib/cn";

type Props = {
  service: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
};

export function PlumbingIcon({
  service,
  size = 22,
  className = "",
  strokeWidth = 1.7,
}: Props) {
  // Reuse the same matcher used everywhere else for a single source of truth.
  const [resolved] = parseServices(service);
  const Icon = resolved?.icon;
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
