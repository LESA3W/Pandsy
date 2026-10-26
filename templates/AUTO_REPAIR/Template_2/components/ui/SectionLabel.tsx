import { cn } from "@/lib/cn";

type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "forest" | "clay" | "cream";
  className?: string;
};

// Small-caps category label sitting above a section heading.
// Composed of a small chevron triangle + horizontal rule + label text.
// The chevron is a shop-signage cue. Reads like a directional sign on a
// garage wall pointing to the next bay.
export default function SectionLabel({
  children,
  tone = "forest",
  className,
}: SectionLabelProps) {
  const textColor =
    tone === "cream"
      ? "text-white/80"
      : tone === "clay"
        ? "text-primary"
        : "text-secondary";
  const ruleColor =
    tone === "cream"
      ? "bg-white/40"
      : tone === "clay"
        ? "bg-primary"
        : "bg-secondary";
  const chevronColor =
    tone === "cream"
      ? "text-white/50"
      : tone === "clay"
        ? "text-primary"
        : "text-primary";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
        className={cn("shrink-0", chevronColor)}
        aria-hidden
      >
        <polygon points="0,0 10,5 0,10" />
      </svg>
      <span className={cn("h-px w-6 transition-all", ruleColor)} aria-hidden />
      <span className={cn("small-caps text-xs", textColor)}>{children}</span>
    </div>
  );
}
