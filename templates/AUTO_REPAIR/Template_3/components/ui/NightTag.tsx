import { cn } from "@/lib/cn";
import GlowDot from "./GlowDot";

type NightTagProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * Tone of the text and leading GlowDot.
   * "secondary" routes to var(--color-secondary) for brand color visibility.
   */
  tone?: "amber" | "secondary" | "bone" | "mute";
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Pre-title small-caps label. Always opens with a GlowDot so the section
 * starts with a sodium pinprick. Replaces T2's SectionLabel (clay chevron)
 * and T1's BayLabel (workshop number).
 */
export default function NightTag({
  children,
  className,
  tone = "amber",
  ...rest
}: NightTagProps) {
  const toneClass =
    tone === "amber"
      ? "text-primary"
      : tone === "secondary"
        ? "text-secondary"
        : tone === "bone"
          ? "text-white/60"
          : "text-white/50";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 small-caps font-sans text-[11px]",
        toneClass,
        className,
      )}
      {...rest}
    >
      <GlowDot tone={tone === "secondary" ? "secondary" : "amber"} />
      <span>{children}</span>
    </div>
  );
}
