import { cn } from "@/lib/cn";

type AmbientCardProps = {
  children: React.ReactNode;
  className?: string;
  /** When true, applies a stronger inner shadow (used for forms) */
  elevated?: boolean;
};

/**
 * Surface card with a subtle slate gradient + slate-line border. NOT paper-feel
 * (T2's PaperCard) and NOT clip-corner (T1's metallic frame). Reads as a panel
 * lit from the side by sodium light.
 */
export default function AmbientCard({
  children,
  className,
  elevated = false,
}: AmbientCardProps) {
  return (
    <div
      className={cn(
        "ambient-surface",
        elevated ? "shadow-ambient" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}
