/**
 * WaterScrim — the DIM LAYER required by claude.md hard rule #2b.
 *
 * Sits BETWEEN a background image and any foreground text, guaranteeing
 * baseline readability across ANY photo a client uploads. Vignettes and
 * halations are atmospheric, NOT a substitute for a uniform dim layer.
 *
 * Usage:
 *   <section className="relative">
 *     <img src="{{HERO}}" className="absolute inset-0 ..." />
 *     <WaterScrim dim="strong" />        // dim layer
 *     <FlowWash />                        // optional atmospheric overlay
 *     <div className="relative z-10">     // foreground text
 *       <h1>...</h1>
 *     </div>
 *   </section>
 *
 * The default is a pure black wash at 45% opacity. `dim="strong"` raises
 * to 60% for very bright photos; `dim="soft"` drops to 30% for already-dark
 * shots.
 *
 * Class strings are written out in full so Tailwind v3 JIT picks them up
 * (concatenated class names like `"bg-black" + "/45"` do NOT get bundled).
 */
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  dim?: "soft" | "default" | "strong";
};

const SCRIM_CLASSES = {
  soft: "bg-black/35",
  default: "bg-black/50",
  strong: "bg-black/60",
} as const;

export function WaterScrim({
  className = "",
  dim = "default",
}: Props) {
  return (
    <div
      className={cn("absolute inset-0", SCRIM_CLASSES[dim], className)}
      aria-hidden="true"
    />
  );
}
