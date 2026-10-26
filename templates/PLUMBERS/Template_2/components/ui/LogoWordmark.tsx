"use client";

/**
 * LogoWordmark — text fallback for the logo when a client has no logo image.
 *
 * Renders BUSINESS_NAME on a single line and AUTO-FITS it to the surrounding
 * slot by MEASURING the rendered width (not guessing from char count):
 *   1. Shrink the font-size until the name fits the parent's width, clamped to
 *      a legibility floor (minFontPx).
 *   2. If a very wide display face + a very long name still overflows at the
 *      floor, compress horizontally (scaleX) just enough to fit — so it never
 *      overflows/collides and is never truncated (full name, one line).
 * Re-fits on resize via ResizeObserver → exact at every breakpoint. Handles any
 * name length (1–30+ chars) and any font.
 *
 * The parent element MUST have a bounded width (max-w-[…]) — that bound is the
 * slot the wordmark fits into.
 */
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  name: string;
  /** Base size for short names that already fit. */
  baseFontPx: number;
  /** Legibility floor — never shrink the FONT below this (scaleX handles the rest). */
  minFontPx: number;
  fontFamily: string;
  fontWeight?: number;
  letterSpacing?: string;
  /** Extra classes (e.g. uppercase) merged onto the span. */
  className?: string;
};

// Coarse seed so SSR / no-JS renders a reasonable size (avoids a big overflow
// flash before the measure pass runs). The client measure pass is the source
// of truth and corrects this precisely.
function seedFontSize(len: number, base: number, min: number): number {
  if (len <= 10) return base;
  const shrunk = Math.round(base * (10 / len));
  return Math.max(min, Math.min(base, shrunk));
}

export function LogoWordmark({
  name,
  baseFontPx,
  minFontPx,
  fontFamily,
  fontWeight,
  letterSpacing,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number>(() =>
    seedFontSize(name.length, baseFontPx, minFontPx),
  );
  const [scaleX, setScaleX] = useState<number>(1);

  useLayoutEffect(() => {
    const el = ref.current;
    const slot = el?.parentElement;
    if (!el || !slot) return;

    const fit = () => {
      const avail = slot.clientWidth;
      if (!avail) return;
      // Measure with no transform (scrollWidth ignores transforms anyway).
      let fs = baseFontPx;
      el.style.fontSize = `${fs}px`;
      let guard = 0;
      while (el.scrollWidth > avail && fs > minFontPx && guard < 240) {
        fs -= 0.5;
        el.style.fontSize = `${fs}px`;
        guard += 1;
      }
      setFontSize(fs);
      // Stage 2: still too wide at the floor → squeeze horizontally to fit.
      const sx = el.scrollWidth > avail ? Math.max(0.5, avail / el.scrollWidth) : 1;
      setScaleX(sx);
    };

    fit();

    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(fit);
      ro.observe(slot);
    }
    return () => ro?.disconnect();
  }, [name, baseFontPx, minFontPx]);

  return (
    <span
      ref={ref}
      className={`inline-flex max-w-full items-center whitespace-nowrap leading-none select-none ${className}`}
      style={{
        fontFamily,
        fontWeight,
        letterSpacing,
        fontSize: `${fontSize}px`,
        transform: scaleX === 1 ? undefined : `scaleX(${scaleX})`,
        transformOrigin: "left center",
      }}
    >
      {name}
    </span>
  );
}
