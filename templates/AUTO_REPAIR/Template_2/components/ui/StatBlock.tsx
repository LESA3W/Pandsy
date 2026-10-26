import { cn } from "@/lib/cn";

type StatBlockProps = {
  value: string;
  label: string;
  className?: string;
  tone?: "forest" | "clay" | "secondary" | "accent";
};

/**
 * Large slab number + small caps label below. Used in About story for
 * trust stats (years, certifications, satisfaction rate).
 */
export default function StatBlock({
  value,
  label,
  className,
  tone = "forest",
}: StatBlockProps) {
  const valueColor =
    tone === "clay"
      ? "text-primary"
      : tone === "secondary"
        ? "text-secondary"
        : tone === "accent"
          ? "text-accent"
          : "text-secondary";
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "font-display text-4xl font-bold leading-none tracking-tight md:text-5xl",
          valueColor,
        )}
      >
        {value}
      </span>
      <span className="small-caps text-[11px] text-black/60">{label}</span>
    </div>
  );
}
