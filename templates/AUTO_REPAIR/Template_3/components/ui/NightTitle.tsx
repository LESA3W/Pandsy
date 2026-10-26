import { cn } from "@/lib/cn";

type Size = "sm" | "md" | "lg" | "xl";
type Tag = "h1" | "h2" | "h3" | "h4" | "p";

type NightTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
  size?: Size;
};

const SIZE_MAP: Record<Size, string> = {
  sm: "text-lg sm:text-xl md:text-2xl font-bold leading-tight",
  md: "text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.1]",
  lg: "text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]",
  xl: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05]",
};

/**
 * Display headline primitive. Bricolage Grotesque heavy weights with tight
 * tracking. NOT condensed industrial (T1) and NOT slab serif (T2).
 */
export default function NightTitle({
  children,
  className,
  as = "h2",
  size = "md",
}: NightTitleProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "font-display text-white/90 tracking-[-0.02em]",
        SIZE_MAP[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
