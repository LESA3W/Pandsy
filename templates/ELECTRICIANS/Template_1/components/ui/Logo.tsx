/**
 * Dual-variant logo per claude.md hard rule #3.
 *
 * - variant="light" → {{LOGO_URL_LIGHT}}: WHITE logo for DARK surfaces
 * - variant="dark"  → {{LOGO_URL_DARK}}:  BLACK logo for LIGHT surfaces
 *
 * Uses NATIVE <img> (not next/image) — Drive URLs (lh3.googleusercontent.com)
 * block the Next.js image optimizer.
 *
 * No CSS filter recoloring — always use the explicit variant.
 */
import { LogoWordmark } from "./LogoWordmark";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
  height?: number;
  /** Optional alt override; defaults to "{{BUSINESS_NAME}}" */
  alt?: string;
};

export function Logo({
  variant = "dark",
  className = "",
  width = 160,
  height = 48,
  alt = "{{BUSINESS_NAME}}",
}: Props) {
  const src: string = variant === "light" ? "{{LOGO_URL_LIGHT}}" : "{{LOGO_URL_DARK}}";
  const hasLogo = src.length > 0 && !src.startsWith("{{");

  if (!hasLogo) {
    const businessName: string = "{{BUSINESS_NAME}}";
    const fontLogo: string = "{{FONT_LOGO}}";
    // FONT_LOGO from Sheet overrides; else lock to Archivo Black (display var).
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display), 'Archivo Black', sans-serif";
    // Floor the base so a small header height stays legible; the footer's larger
    // height scales it up. Archivo Black is wide and heavy, so the wordmark's
    // scaleX fallback handles long names at the floor without overflow.
    const baseFontPx = Math.max(22, Math.round(height * 0.6));
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={baseFontPx}
        minFontPx={13}
        fontFamily={fontFamily}
        fontWeight={900}
        letterSpacing="-0.01em"
        className={`uppercase ${variant === "light" ? "text-white" : ""} ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain", display: "block" }}
    />
  );
}
