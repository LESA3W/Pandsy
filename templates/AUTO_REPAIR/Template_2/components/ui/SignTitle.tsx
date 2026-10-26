import { cn } from "@/lib/cn";

type SignTitleProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "xl" | "display";
  tone?: "ink" | "cream" | "forest";
  className?: string;
};

/**
 * Section heading wrapper. Slab serif (Zilla Slab), generous tracking.
 * NOT condensed, NOT industrial signage . reads as designed shop signage.
 */
export default function SignTitle({
  children,
  as = "h2",
  size = "xl",
  tone = "ink",
  className,
}: SignTitleProps) {
  const Tag = as;
  const sizing =
    size === "display"
      ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      : size === "xl"
        ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        : "text-2xl sm:text-3xl md:text-4xl";
  const color =
    tone === "cream" ? "text-white" : tone === "forest" ? "text-secondary" : "text-black";

  return (
    <Tag
      className={cn(
        "font-display font-bold leading-[1.05] tracking-tight",
        sizing,
        color,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
