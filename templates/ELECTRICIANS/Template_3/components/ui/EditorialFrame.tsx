/**
 * EditorialFrame — image frame with crimson stamp top-right corner and
 * serif caption bar at the bottom.
 *
 * T3 HOT WIRE signature. Different from T1 ConduitFrame (corner-bracket
 * silhouette) and T2 SchematicFrame (plus-sign crosshair corners).
 */
import { cn } from "@/lib/cn";
import { StampMark } from "./StampMark";

type Props = {
  src: string;
  alt?: string;
  /** Stamp label (top-right) — short uppercase, e.g. "LIVE / 04" */
  stamp?: string;
  /** Optional caption strip below the image */
  caption?: string;
  /** Aspect ratio class — defaults to landscape 4:3 */
  aspect?: string;
  className?: string;
  /** Extra classes on the <img> — e.g. object-position to reframe the crop */
  imgClassName?: string;
};

export function EditorialFrame({
  src,
  alt = "",
  stamp,
  caption,
  aspect = "aspect-[4/3]",
  className,
  imgClassName,
}: Props) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden border border-accent bg-white",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden", aspect)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className={cn("absolute inset-0 h-full w-full object-cover", imgClassName)}
        />
        {stamp ? (
          <div className="absolute right-4 top-4 z-10">
            <StampMark label={stamp} rotate={2} />
          </div>
        ) : null}
        {/* Subtle crimson hairline along the bottom edge (live wire signature) */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-[3px] w-full bg-primary"
        />
      </div>
      {caption ? (
        <figcaption className="flex items-center justify-between gap-4 border-t border-accent bg-white px-4 py-3">
          <span className="font-display text-sm font-medium italic text-black">
            {caption}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/60">
            {"{{BUSINESS_NAME}}"}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}
