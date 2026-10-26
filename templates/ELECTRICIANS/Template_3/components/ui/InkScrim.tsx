/**
 * InkScrim — image dim layer per claude.md hard rule #2b.
 *
 * MANDATORY whenever a {{HERO}}, {{CTA}}, or any image is used as a section
 * background with foreground text. Without this layer, light/busy client
 * photos make headlines unreadable.
 *
 * T3 HOT WIRE signature. Different from T1 ArcScrim and T2 GridScrim.
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <img src="{{HERO}}" className="absolute inset-0 h-full w-full object-cover" />
 *     <InkScrim opacity={45} />        // mandatory dim layer
 *     <EmberHalo origin="left" />      // optional atmosphere on top
 *     <div className="relative z-10">...foreground...</div>
 *   </section>
 */
import { cn } from "@/lib/cn";

type Props = {
  /** Dim opacity 0-100. Defaults to 45 — strong enough on bright client photos. */
  opacity?: 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75;
  /** Tone: "ink" (matte black, default) | "crimson" (deep crimson tint) */
  tone?: "ink" | "crimson";
  className?: string;
};

const INK_OPACITY: Record<number, string> = {
  30: "bg-black/30",
  35: "bg-black/35",
  40: "bg-black/40",
  45: "bg-black/45",
  50: "bg-black/50",
  55: "bg-black/55",
  60: "bg-black/60",
  65: "bg-black/65",
  70: "bg-black/70",
  75: "bg-black/75",
};

const CRIMSON_OPACITY: Record<number, string> = {
  30: "bg-primary/30",
  35: "bg-primary/35",
  40: "bg-primary/40",
  45: "bg-primary/45",
  50: "bg-primary/50",
  55: "bg-primary/55",
  60: "bg-primary/60",
  65: "bg-primary/65",
  70: "bg-primary/70",
  75: "bg-primary/75",
};

export function InkScrim({ opacity = 45, tone = "ink", className }: Props) {
  const cls = tone === "crimson" ? CRIMSON_OPACITY[opacity] : INK_OPACITY[opacity];
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0", cls, className)}
    />
  );
}
