// Dual-logo system per CLAUDE.md hard rule #3.
// NEVER use next/image with Drive URLs (lh3.googleusercontent.com blocks the optimizer).
// Always render a native <img> element with the explicit variant matching the surface.

import { LogoWordmark } from "./LogoWordmark";

type LogoProps = {
  variant: "light" | "dark"; // light = WHITE logo for DARK bg ; dark = BLACK logo for LIGHT bg
  className?: string;
  alt?: string;
};

export default function Logo({ variant, className, alt }: LogoProps) {
  const src: string = variant === "light" ? "{{LOGO_URL_LIGHT}}" : "{{LOGO_URL_DARK}}";
  const hasLogo = src.length > 0 && !src.startsWith("{{");

  if (!hasLogo) {
    const businessName: string = "{{BUSINESS_NAME}}";
    const fontLogo: string = "{{FONT_LOGO}}";
    // Prefer FONT_LOGO from Sheet when provided; fall back to Mona Sans display variable.
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display), 'Mona Sans', 'Inter', sans-serif";
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={22}
        minFontPx={13}
        fontFamily={fontFamily}
        fontWeight={700}
        letterSpacing="-0.01em"
        className={`${variant === "light" ? "text-white " : ""}${className ?? ""}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? "{{BUSINESS_NAME}}"}
      className={`block max-h-full w-auto object-contain ${className ?? ""}`}
      loading="lazy"
      decoding="async"
    />
  );
}
