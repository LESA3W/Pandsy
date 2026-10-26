import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = {
  Icon: LucideIcon;
  className?: string;
  size?: number;
};

export function ServiceIcon({ Icon, className, size = 28 }: Props) {
  return (
    <span
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center border border-white/15 bg-black text-white",
        className,
      )}
      aria-hidden="true"
    >
      <Icon size={size} strokeWidth={1.5} />
    </span>
  );
}
