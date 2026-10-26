import { cn } from "@/lib/cn";

// AquaRule — 1px hairline divider.
// On dark surfaces, pass tone="light" to switch to a white-tinted hairline.
// tone="aqua" uses the primary CSS var for a colored rule.

type AquaRuleProps = {
  tone?: "default" | "light" | "aqua";
  className?: string;
};

const TONE = {
  default: "bg-black/10",
  light: "bg-white/12",
  aqua: "bg-primary/40",
} as const;

export default function AquaRule({ tone = "default", className }: AquaRuleProps) {
  return <div role="separator" aria-hidden className={cn("h-px w-full", TONE[tone], className)} />;
}
