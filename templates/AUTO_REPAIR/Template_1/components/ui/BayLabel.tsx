import { cn } from "@/lib/cn";

type Props = {
  n: string;
  title: string;
  meta?: string;
  variant?: "light" | "dark";
  className?: string;
  /** Hide the entire BayLabel on mobile, show from md: breakpoint up. */
  hideOnMobile?: boolean;
};

export function BayLabel({ n, title, meta, variant = "dark", className, hideOnMobile = false }: Props) {
  const onLight = variant === "light";
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest sm:gap-x-4 sm:gap-y-2 sm:text-[11px]",
        onLight ? "text-primary-text" : "text-white",
        hideOnMobile && "hidden md:flex",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 border px-2 py-1 leading-none",
          onLight ? "border-primary bg-primary text-primary-text" : "border-primary/50 text-primary",
        )}
      >
        <span className="block h-1.5 w-1.5 bg-primary" aria-hidden="true" />
        BAY {n}
      </span>
      <span className={cn("font-semibold", onLight ? "text-primary-text" : "text-white")}>
        {title}
      </span>
      {meta ? (
        <span className={cn("hidden truncate sm:inline", onLight ? "text-primary-text/60" : "text-white/55")}>
          {meta}
        </span>
      ) : null}
    </div>
  );
}
