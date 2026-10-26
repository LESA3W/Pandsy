/**
 * Dual-variant logo per claude.md hard rule #3.
 *
 * - variant="light" → {{LOGO_URL_LIGHT}}: WHITE logo for DARK surfaces
 * - variant="dark"  → {{LOGO_URL_DARK}}:  BLACK logo for LIGHT surfaces
 *
 * Uses NATIVE <img> (not next/image) — Drive URLs (lh3.googleusercontent.com)
 * block the Next.js image optimizer.
 */
import { LogoWordmark } from "./LogoWordmark";

type Props = {
  variant?: "light" | "dark";
  className?: string;
  width?: number;
  height?: number;
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
    // FONT_LOGO from Sheet overrides; else lock to Space Grotesk (display var).
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display), 'Space Grotesk', sans-serif";
    const baseFontPx = Math.max(22, Math.round(height * 0.62));
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={baseFontPx}
        minFontPx={14}
        fontFamily={fontFamily}
        fontWeight={600}
        letterSpacing="0.01em"
        className={`${variant === "light" ? "text-white " : ""}${className}`}
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
