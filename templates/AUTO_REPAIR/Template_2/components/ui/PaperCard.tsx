import { cn } from "@/lib/cn";

type PaperCardProps = {
  children: React.ReactNode;
  className?: string;
  elevation?: "soft" | "lift";
};

/**
 * White card on cream background. Subtle stone border, paper-feel shadow.
 * Used for review cards, Google badge, form panels.
 */
export default function PaperCard({
  children,
  className,
  elevation = "soft",
}: PaperCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-black/15",
        elevation === "lift" ? "shadow-paper-lg" : "shadow-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}
