import { cn } from "@/lib/cn";

type HazeOverlayProps = {
  className?: string;
  /** Stronger amber halation — used on the CTA section */
  strong?: boolean;
  /**
   * Adds a subtle full-coverage dark veil on top of the photo so headlines
   * and small-caps copy stay readable even when the source image is bright
   * or busy. Use on Hero and CtaSection (any panel with text overlaid on
   * the image). Skip on Gallery / Services / About — those photos carry
   * captions, not block copy, so the vignette alone is enough.
   */
  dim?: boolean;
};

/**
 * Atmospheric overlay used on top of every photographic image (Hero, About,
 * Gallery, CTA). Stacked layers:
 *  - dim (optional): subtle dark veil for legibility
 *  - vignette: darkens edges so the photo feels lit from within
 *  - halation: warm amber light-leak biased to the top-left, reads as
 *    a sodium lamp glowing off-frame.
 */
export default function HazeOverlay({
  className,
  strong = false,
  dim = false,
}: HazeOverlayProps) {
  return (
    <>
      {dim && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/40"
        />
      )}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 vignette", className)}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0",
          strong ? "halation-strong" : "halation",
        )}
      />
    </>
  );
}
