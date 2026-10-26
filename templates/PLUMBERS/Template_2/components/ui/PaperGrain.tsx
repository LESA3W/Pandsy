import { cn } from "@/lib/cn";

// PaperGrain — subtle texture overlay for light sections.
// Tiny dot-noise + subtle wash. Always pointer-events-none, always
// aria-hidden. Decorative only.
export function PaperGrain({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none bg-paper-grain opacity-70 mix-blend-multiply",
        className,
      )}
      aria-hidden="true"
    />
  );
}
