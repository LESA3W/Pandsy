import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  thin?: boolean;
};

export function HazardDivider({ className, thin = false }: Props) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={cn(
        thin
          ? "h-1.5 bg-primary-tape-thin"
          : "h-3 bg-primary-tape",
        className,
      )}
    />
  );
}
