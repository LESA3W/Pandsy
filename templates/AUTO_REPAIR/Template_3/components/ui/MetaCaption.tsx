import { cn } from "@/lib/cn";

type MetaCaptionProps = {
  children: React.ReactNode;
  className?: string;
  /** "accent" routes to var(--color-accent) for brand color visibility on gallery cell 2. */
  tone?: "amber" | "accent" | "bone" | "mute";
};

/**
 * Tiny photo metadata caption — Geist Mono, used ONLY for gallery file tags
 * and photo credits. Never as a full hero metadata strip (that pattern is T1).
 */
export default function MetaCaption({
  children,
  className,
  tone = "bone",
}: MetaCaptionProps) {
  const toneClass =
    tone === "amber"
      ? "text-primary"
      : tone === "accent"
        ? "text-accent"
        : tone === "mute"
          ? "text-white/50"
          : "text-white/60";
  return (
    <span
      className={cn(
        "font-mono text-[11px] tracking-wider uppercase",
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  );
}
