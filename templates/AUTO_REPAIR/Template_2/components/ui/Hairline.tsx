import { cn } from "@/lib/cn";

type HairlineProps = {
  tone?: "stone" | "forest" | "clay" | "cream";
  className?: string;
};

export default function Hairline({ tone = "stone", className }: HairlineProps) {
  const color =
    tone === "forest"
      ? "bg-secondary/40"
      : tone === "clay"
        ? "bg-primary/60"
        : tone === "cream"
          ? "bg-white/30"
          : "bg-black/10";
  return <div className={cn("h-px w-full", color, className)} aria-hidden />;
}
